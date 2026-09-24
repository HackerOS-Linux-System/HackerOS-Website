(function () {
  'use strict';

  var state = { lang: 'pl', articles: {}, order: [], tags: {}, query: '', tag: 'all', loaded: false, failed: false };
  var view = document.getElementById('view');

  // ---------- helpers ----------
  function T() { var all = window.HACKEROS_TRANS_ARTICLES; return all[state.lang] || all.en; }
  function loc(obj) { return obj ? (obj[state.lang] || obj.en || obj.pl || '') : ''; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function plain(html) { return String(html || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' '); }
  function loadScript(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = src; s.onload = ok; s.onerror = function () { fail(new Error(src)); };
      document.head.appendChild(s);
    });
  }

  // Inline HTML in article data is limited to a tiny allow-list (same subset the apps support).
  var ALLOWED = { STRONG: 1, B: 1, EM: 1, I: 1, CODE: 1, A: 1, BR: 1 };
  function cleanHtml(html) {
    var doc = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html');
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) return;
        if (ch.nodeType !== 1) { ch.remove(); return; }
        if (!ALLOWED[ch.tagName]) { ch.replaceWith(document.createTextNode(ch.textContent)); return; }
        Array.prototype.slice.call(ch.attributes).forEach(function (a) {
          if (!(ch.tagName === 'A' && a.name === 'href')) ch.removeAttribute(a.name);
        });
        if (ch.tagName === 'A') {
          var h = ch.getAttribute('href') || '';
          if (/^https?:\/\//i.test(h)) { ch.target = '_blank'; ch.rel = 'noopener noreferrer'; }
          else if (!/^(mailto:|#|(?!\/\/)[\w.\/-]+([?#].*)?$)/i.test(h)) ch.removeAttribute('href');
        }
        walk(ch);
      });
    })(doc.body);
    return doc.body.innerHTML;
  }

  // ---------- tiny syntax highlighter (H#, bash, bytes.hk) ----------
  var KW = 'fn|is|end|let|mut|if|elsif|else|while|for|in|match|enum|struct|use|from|return|nil|true|false|as|pub|impl|trait|using|async|await';
  var TYPES = 'int|uint|string|bool|bytes|void|f32|f64|[iu](?:8|16|32|64|128)';
  var TOKEN = new RegExp('(;;[^\\n]*|\\/\\/[^\\n]*)|("(?:[^"\\\\\\n]|\\\\.)*")|\\b(' + KW + ')\\b|\\b(' + TYPES + ')\\b|\\b(0x[0-9a-fA-F_]+|0b[01_]+|\\d[\\d_]*(?:\\.\\d+)?)\\b', 'g');
  function highlight(src, lang) {
    if (lang === 'text') return escapeHtml(src);
    var out = '', last = 0, m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src))) {
      out += escapeHtml(src.slice(last, m.index));
      var cls = m[1] ? 'tk-c' : m[2] ? 'tk-s' : m[3] ? 'tk-k' : m[4] ? 'tk-t' : 'tk-n';
      if (lang === 'bash' && (m[3] || m[4])) out += escapeHtml(m[0]);
      else out += '<span class="' + cls + '">' + escapeHtml(m[0]) + '</span>';
      last = m.index + m[0].length;
    }
    return out + escapeHtml(src.slice(last));
  }
  function copyText(text, btn) {
    var done = function () { var o = btn.textContent; btn.textContent = T().copied; setTimeout(function () { btn.textContent = T().copy; }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else { var ta = el('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); done(); }
  }

  // ---------- block renderer ----------
  function renderBlocks(blocks, toc) {
    var frag = document.createDocumentFragment(), n = 0;
    (blocks || []).forEach(function (b) {
      var node;
      switch (b.t) {
        case 'h2':
        case 'h3':
          node = el(b.t, null, b.text);
          if (b.t === 'h2') { node.id = 'sec-' + (++n); toc.push({ id: node.id, text: b.text }); }
          break;
        case 'p': node = el('p'); node.innerHTML = cleanHtml(b.html); break;
        case 'quote': node = el('blockquote'); node.innerHTML = cleanHtml(b.html); break;
        case 'ul': case 'ol':
          node = el(b.t);
          (b.items || []).forEach(function (it) { var li = el('li'); li.innerHTML = cleanHtml(it); node.appendChild(li); });
          break;
        case 'code': {
          var src = Array.isArray(b.code) ? b.code.join('\n') : String(b.code || '');
          node = el('div', 'code');
          var bar = el('div', 'code-bar');
          bar.appendChild(el('span', null, b.title || b.lang || ''));
          var cp = el('button', 'cp', T().copy); cp.type = 'button';
          cp.addEventListener('click', function () { copyText(src, cp); });
          bar.appendChild(cp);
          var pre = el('pre'), code = el('code');
          code.innerHTML = highlight(src, b.lang || 'text');
          pre.appendChild(code); node.appendChild(bar); node.appendChild(pre);
          break;
        }
        case 'note': {
          var kind = ['info', 'tip', 'warn'].indexOf(b.kind) >= 0 ? b.kind : 'info';
          node = el('div', 'note ' + kind);
          var lbl = { info: 'ℹ️', tip: '💡', warn: '⚠️' }[kind];
          node.appendChild(el('span', 'nl', lbl));
          var body = el('div'); body.innerHTML = cleanHtml(b.html); node.appendChild(body);
          break;
        }
        case 'table': {
          node = el('div', 'table-wrap');
          var tbl = el('table'), thead = el('thead'), trh = el('tr');
          (b.head || []).forEach(function (h) { var th = el('th'); th.innerHTML = cleanHtml(h); trh.appendChild(th); });
          thead.appendChild(trh); tbl.appendChild(thead);
          var tb = el('tbody');
          (b.rows || []).forEach(function (r) {
            var tr = el('tr');
            r.forEach(function (c) { var td = el('td'); td.innerHTML = cleanHtml(c); tr.appendChild(td); });
            tb.appendChild(tr);
          });
          tbl.appendChild(tb); node.appendChild(tbl);
          break;
        }
      }
      if (node) frag.appendChild(node);
    });
    return frag;
  }

  // ---------- data ----------
  function sorted() {
    return state.order.map(function (id) { return state.articles[id]; }).filter(Boolean)
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  }
  function fmtDate(d) {
    try { return new Date(d + 'T00:00:00').toLocaleDateString(state.lang, { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return d; }
  }
  function tagLabel(id) { return loc(state.tags[id]) || id; }
  function haystack(a) {
    if (a._hay && a._hayLang === state.lang) return a._hay;
    var blocks = (a.content && (a.content[state.lang] || a.content.en || a.content.pl)) || [];
    var text = blocks.map(function (b) { return plain(b.html || b.text || (b.items || []).join(' ') || ''); }).join(' ');
    a._hayLang = state.lang;
    a._hay = (loc(a.title) + ' ' + loc(a.summary) + ' ' + (a.tags || []).map(tagLabel).join(' ') + ' ' + text).toLowerCase();
    return a._hay;
  }

  // ---------- views ----------
  function metaLine(a) {
    var m = el('div', 'meta');
    m.appendChild(el('span', null, fmtDate(a.date)));
    m.appendChild(el('span', null, a.readingMinutes + ' ' + T().minRead));
    (a.tags || []).forEach(function (t) { m.appendChild(el('span', 'tag', tagLabel(t))); });
    return m;
  }

  function renderList() {
    var t = T();
    view.innerHTML = '';
    var head = el('div', 'list-head');
    head.appendChild(el('h1', null, t.h1));
    head.appendChild(el('p', null, t.intro));
    view.appendChild(head);

    var bar = el('div', 'toolbar');
    var sw = el('div', 'search'), input = el('input');
    input.type = 'search'; input.placeholder = t.searchPlaceholder; input.value = state.query;
    input.setAttribute('aria-label', t.searchPlaceholder.replace(/^\S+\s/, ''));
    var clear = el('button', null, '✕'); clear.type = 'button'; clear.setAttribute('aria-label', 'Clear');
    clear.style.display = state.query ? 'block' : 'none';
    sw.appendChild(input); sw.appendChild(clear); bar.appendChild(sw);

    var chips = el('div', 'chips'); bar.appendChild(chips);
    view.appendChild(bar);
    var grid = el('div', 'grid'); view.appendChild(grid);

    function drawChips() {
      chips.innerHTML = '';
      var used = {}; sorted().forEach(function (a) { (a.tags || []).forEach(function (x) { used[x] = 1; }); });
      ['all'].concat(Object.keys(used)).forEach(function (id) {
        var c = el('button', 'chip', id === 'all' ? t.allTags : tagLabel(id)); c.type = 'button';
        c.setAttribute('aria-pressed', state.tag === id ? 'true' : 'false');
        c.addEventListener('click', function () { state.tag = id; drawChips(); drawGrid(); });
        chips.appendChild(c);
      });
    }
    function drawGrid() {
      grid.innerHTML = '';
      var q = state.query.trim().toLowerCase();
      var items = sorted().filter(function (a) {
        return (state.tag === 'all' || (a.tags || []).indexOf(state.tag) >= 0) && (!q || haystack(a).indexOf(q) >= 0);
      });
      if (!items.length) { grid.appendChild(el('div', 'empty', state.failed ? t.loadError : t.noResults)); return; }
      var filtering = q || state.tag !== 'all';
      items.forEach(function (a, i) {
        var card = el('a', 'card' + (i === 0 && !filtering ? ' featured' : ''));
        card.href = '#/' + a.id;
        card.appendChild(el('span', 'ico', a.icon || '📄'));
        var body = el('div', 'body');
        body.appendChild(el('h2', null, loc(a.title)));
        body.appendChild(el('p', 'sum', loc(a.summary)));
        body.appendChild(metaLine(a));
        card.appendChild(body);
        grid.appendChild(card);
      });
    }
    input.addEventListener('input', function () { state.query = input.value; clear.style.display = input.value ? 'block' : 'none'; drawGrid(); });
    clear.addEventListener('click', function () { input.value = ''; state.query = ''; clear.style.display = 'none'; drawGrid(); input.focus(); });
    drawChips(); drawGrid();
    document.title = t.pageTitle;
  }

  function renderArticle(id) {
    var t = T(), a = state.articles[id];
    view.innerHTML = '';
    var back = el('a', 'back', t.back); back.href = '#/'; view.appendChild(back);
    if (!a) { view.appendChild(el('div', 'notice', t.notFound)); document.title = t.pageTitle; return; }

    var blocks = a.content[state.lang] || a.content.en || a.content.pl || [];
    var wrap = el('div', 'article-wrap'), main = el('article');
    var head = el('div', 'article-head');
    head.appendChild(el('span', 'ico', a.icon || '📄'));
    head.appendChild(el('h1', null, loc(a.title)));
    head.appendChild(el('p', 'lead', loc(a.summary)));
    var meta = metaLine(a); if (a.author) meta.insertBefore(el('span', null, a.author), meta.firstChild);
    head.appendChild(meta);
    main.appendChild(head);
    if (!a.content[state.lang] && t.fallback) main.appendChild(el('div', 'notice', t.fallback));

    var toc = [], prose = el('div', 'prose');
    prose.appendChild(renderBlocks(blocks, toc));
    main.appendChild(prose); wrap.appendChild(main);

    if (toc.length > 2) {
      var side = el('nav', 'toc'); side.setAttribute('aria-label', t.toc);
      side.appendChild(el('h4', null, t.toc));
      toc.forEach(function (x) { var l = el('a', null, x.text); l.href = '#' + x.id; l.addEventListener('click', function (e) { e.preventDefault(); document.getElementById(x.id).scrollIntoView(); }); side.appendChild(l); });
      wrap.appendChild(side);
    }
    view.appendChild(wrap);
    document.title = loc(a.title) + ' - HackerOS';
  }

  function route() {
    if (!state.loaded) return;
    var m = /^#\/([\w-]+)/.exec(location.hash);
    if (m) renderArticle(m[1]); else renderList();
    window.scrollTo(0, 0);
  }

  // ---------- language ----------
  function applyLang(lang) {
    if (!window.HACKEROS_TRANS_ARTICLES[lang]) lang = 'en';
    state.lang = lang;
    var t = T(), team = (window.HACKEROS_TRANS_TEAM || {})[lang] || (window.HACKEROS_TRANS_TEAM || {}).en || {};
    document.documentElement.lang = lang;
    ['home', 'download', 'releases', 'team', 'docs'].forEach(function (k) {
      var a = document.getElementById('nav-' + k), key = 'nav' + k.charAt(0).toUpperCase() + k.slice(1);
      if (a && team[key]) a.textContent = team[key];
    });
    var na = document.getElementById('nav-articles'); if (na) na.textContent = t.navArticles;
    var f = document.getElementById('footer-copy'); if (f && team.footerCopy) f.textContent = team.footerCopy;
    if (state.loaded) route(); else document.title = t.pageTitle;
  }
  window.__hackeros_applyLang = applyLang;

  // ---------- boot ----------
  function boot() {
    applyLang(window.HackerLang.getLang());
    view.appendChild(el('p', 'notice', '…'));
    loadScript('articles/index.js').then(function () {
      var idx = window.HACKEROS_ARTICLES_INDEX || { articles: [] };
      state.tags = idx.tags || {};
      return Promise.all(idx.articles.map(function (e) {
        return loadScript('articles/' + e.file).then(function () { state.order.push(e.id); }, function () { /* skip broken entry */ });
      }));
    }).then(function () {
      state.articles = window.HACKEROS_ARTICLES || {};
      state.order = state.order.filter(function (id) { return state.articles[id]; });
    }).catch(function () { state.failed = true; }).then(function () {
      state.loaded = true; route();
    });
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', boot);
})();
