(function () {
  'use strict';

  /* ---- mobile nav toggle ---- */
  var navToggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 860) {
        sidebar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- copy buttons ---- */
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta); done();
  }
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.code-block');
      var pre = block && block.querySelector('pre');
      if (!pre) return;
      var text = pre.innerText;
      var original = btn.textContent;
      function done() {
        btn.textContent = 'Skopiowano';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
      } else { fallbackCopy(text, done); }
    });
  });

  /* ---- scrollspy ---- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.doc-section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.sidebar a'));
  function linkFor(id) {
    for (var i = 0; i < links.length; i++) if (links[i].getAttribute('href') === '#' + id) return links[i];
    return null;
  }
  if ('IntersectionObserver' in window && sections.length) {
    var current = null;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var l = linkFor(en.target.id);
        if (!l) return;
        if (current) current.classList.remove('active');
        l.classList.add('active'); current = l;
      });
    }, { rootMargin: '-12% 0px -75% 0px', threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ---- sidebar search ("/" focuses it) ---- */
  var input = document.getElementById('docSearch');
  if (input) {
    var haystack = {};
    sections.forEach(function (s) { haystack[s.id] = (s.innerText || s.textContent || '').toLowerCase(); });
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      links.forEach(function (a) {
        var id = (a.getAttribute('href') || '').slice(1);
        var match = !q || a.textContent.toLowerCase().indexOf(q) !== -1 || (haystack[id] || '').indexOf(q) !== -1;
        a.parentElement.classList.toggle('no-match', !match);
      });
    });
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); input.focus(); }
      if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; input.dispatchEvent(new Event('input')); input.blur(); }
    });
  }

  /* ---- back to top ---- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 700);
    }, { passive: true });
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();
