(function () {
  'use strict';

  if (window.__HOS_OFFLINE__) return;
  window.__HOS_OFFLINE__ = true;

  var KEY = 'hackeros:offline-dialog';   // zapisany dialog (html, css, i18n)
  var STATE_KEY = 'hackeros:offline-state'; // stan użytkownika
  var LANG_KEY = 'hackeros_lang';        // ten sam klucz co translations/lang-core.js
  var VERSION = 1;                       // zwiększ, aby wymusić ponowny zapis szablonu

  /* ------------------------------------------------------------------ */
  /* Ścieżka bazowa serwisu (działa w katalogu głównym i w /HackerOS-Website/) */
  /* ------------------------------------------------------------------ */
  var cs = document.currentScript;
  var BASE_URL;
  try {
    BASE_URL = cs && cs.src ? cs.src.replace(/offline-dialog\.js(\?.*)?$/, '') : location.origin + '/';
  } catch (e) { BASE_URL = location.origin + '/'; }
  var BASE = (function () {
    try { return new URL(BASE_URL).pathname; } catch (e) { return '/'; }
  })();

  /* ------------------------------------------------------------------ */
  /* Bezpieczny dostęp do localStorage (tryb prywatny, brak miejsca itd.) */
  /* ------------------------------------------------------------------ */
  function lsGet(k) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
  }

  /* ------------------------------------------------------------------ */
  /* Tłumaczenia                                                        */
  /* ------------------------------------------------------------------ */
  var I18N = {
    pl: { tag: 'OFFLINE', title: 'Brak połączenia z internetem', msg: 'Nie możesz teraz przeglądać strony HackerOS. Sprawdź kabel, Wi-Fi lub dane komórkowe – wrócimy automatycznie, gdy sieć wróci.', hint: 'Ten komunikat jest zapisany lokalnie w Twojej przeglądarce, więc wyświetli się nawet bez internetu.', lastOnline: 'Ostatnio online:', lastPage: 'Ostatnia strona:', never: 'brak danych', retry: 'Spróbuj ponownie', home: 'Strona główna', dismiss: 'Kontynuuj offline', checking: 'Sprawdzanie połączenia...', still: 'Nadal brak sieci.', restored: 'Połączenie przywrócone!' },
    en: { tag: 'OFFLINE', title: 'No internet connection', msg: 'You cannot browse the HackerOS website right now. Check your cable, Wi-Fi or mobile data – we will come back automatically when the network returns.', hint: 'This message is stored locally in your browser, so it shows even without internet.', lastOnline: 'Last online:', lastPage: 'Last page:', never: 'no data', retry: 'Try again', home: 'Home page', dismiss: 'Continue offline', checking: 'Checking connection...', still: 'Still offline.', restored: 'Connection restored!' },
    de: { tag: 'OFFLINE', title: 'Keine Internetverbindung', msg: 'Du kannst die HackerOS-Website gerade nicht aufrufen. Prüfe Kabel, WLAN oder mobile Daten – wir kehren automatisch zurück, sobald das Netz wieder da ist.', hint: 'Diese Meldung ist lokal in deinem Browser gespeichert und erscheint daher auch ohne Internet.', lastOnline: 'Zuletzt online:', lastPage: 'Letzte Seite:', never: 'keine Daten', retry: 'Erneut versuchen', home: 'Startseite', dismiss: 'Offline fortfahren', checking: 'Verbindung wird geprüft...', still: 'Weiterhin offline.', restored: 'Verbindung wiederhergestellt!' },
    fr: { tag: 'OFFLINE', title: 'Pas de connexion Internet', msg: 'Vous ne pouvez pas consulter le site HackerOS pour le moment. Vérifiez votre câble, le Wi-Fi ou les données mobiles – nous reviendrons automatiquement dès que le réseau sera rétabli.', hint: 'Ce message est enregistré localement dans votre navigateur ; il s’affiche donc même sans Internet.', lastOnline: 'Dernière connexion :', lastPage: 'Dernière page :', never: 'aucune donnée', retry: 'Réessayer', home: 'Accueil', dismiss: 'Continuer hors ligne', checking: 'Vérification de la connexion...', still: 'Toujours hors ligne.', restored: 'Connexion rétablie !' },
    es: { tag: 'OFFLINE', title: 'Sin conexión a internet', msg: 'No puedes navegar por el sitio de HackerOS ahora mismo. Revisa el cable, el Wi-Fi o los datos móviles – volveremos automáticamente cuando regrese la red.', hint: 'Este mensaje está guardado localmente en tu navegador, así que se muestra incluso sin internet.', lastOnline: 'Última conexión:', lastPage: 'Última página:', never: 'sin datos', retry: 'Reintentar', home: 'Inicio', dismiss: 'Continuar sin conexión', checking: 'Comprobando conexión...', still: 'Sigue sin conexión.', restored: '¡Conexión restablecida!' },
    it: { tag: 'OFFLINE', title: 'Nessuna connessione a internet', msg: 'Al momento non puoi navigare sul sito di HackerOS. Controlla cavo, Wi-Fi o dati mobili – torneremo automaticamente quando la rete sarà di nuovo disponibile.', hint: 'Questo messaggio è salvato localmente nel tuo browser, quindi appare anche senza internet.', lastOnline: 'Ultima connessione:', lastPage: 'Ultima pagina:', never: 'nessun dato', retry: 'Riprova', home: 'Pagina iniziale', dismiss: 'Continua offline', checking: 'Controllo della connessione...', still: 'Ancora offline.', restored: 'Connessione ripristinata!' },
    ru: { tag: 'OFFLINE', title: 'Нет подключения к интернету', msg: 'Сейчас вы не можете просматривать сайт HackerOS. Проверьте кабель, Wi-Fi или мобильные данные – мы автоматически вернёмся, когда сеть появится.', hint: 'Это сообщение сохранено локально в вашем браузере, поэтому оно отображается даже без интернета.', lastOnline: 'Последний раз онлайн:', lastPage: 'Последняя страница:', never: 'нет данных', retry: 'Повторить', home: 'Главная', dismiss: 'Продолжить офлайн', checking: 'Проверка соединения...', still: 'Сети по-прежнему нет.', restored: 'Соединение восстановлено!' },
    uk: { tag: 'OFFLINE', title: 'Немає підключення до інтернету', msg: 'Зараз ви не можете переглядати сайт HackerOS. Перевірте кабель, Wi-Fi або мобільні дані – ми автоматично повернемося, коли мережа з’явиться.', hint: 'Це повідомлення збережено локально у вашому браузері, тому воно відображається навіть без інтернету.', lastOnline: 'Востаннє онлайн:', lastPage: 'Остання сторінка:', never: 'немає даних', retry: 'Спробувати знову', home: 'Головна', dismiss: 'Продовжити офлайн', checking: 'Перевірка з’єднання...', still: 'Мережі все ще немає.', restored: 'З’єднання відновлено!' },
    zh: { tag: 'OFFLINE', title: '无法连接到互联网', msg: '您目前无法浏览 HackerOS 网站。请检查网线、Wi-Fi 或移动数据——网络恢复后我们会自动返回。', hint: '此提示已保存在您浏览器的本地存储中，因此即使没有网络也能显示。', lastOnline: '上次在线：', lastPage: '上次访问的页面：', never: '无数据', retry: '重试', home: '首页', dismiss: '继续离线浏览', checking: '正在检查连接…', still: '仍处于离线状态。', restored: '连接已恢复！' },
    ja: { tag: 'OFFLINE', title: 'インターネットに接続できません', msg: '現在 HackerOS のサイトを閲覧できません。ケーブル、Wi-Fi、モバイルデータを確認してください。ネットワークが回復すると自動的に戻ります。', hint: 'このメッセージはブラウザのローカルストレージに保存されているため、インターネットがなくても表示されます。', lastOnline: '最後にオンラインだった時刻：', lastPage: '最後のページ：', never: 'データなし', retry: '再試行', home: 'ホーム', dismiss: 'オフラインのまま続ける', checking: '接続を確認しています…', still: 'まだオフラインです。', restored: '接続が回復しました！' }
  };

  /* ------------------------------------------------------------------ */
  /* Szablon dialogu (HTML + CSS) – to właśnie ląduje w localStorage      */
  /* ------------------------------------------------------------------ */
  var TEMPLATE_HTML =
    '<div class="hos-off-card">' +
      '<div class="hos-off-ico" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M2 8.8a15 15 0 0 1 4.2-2.6"/><path d="M10.7 5.1A15 15 0 0 1 22 8.8"/>' +
          '<path d="M5 12.6a10 10 0 0 1 3.4-2"/><path d="M15.5 10.1a10 10 0 0 1 3.5 2.5"/>' +
          '<path d="M8.5 16.4a5 5 0 0 1 4.3-1.3"/><path d="M15.6 16.4a5 5 0 0 0-.6-.5"/>' +
          '<circle cx="12" cy="20" r="1" fill="currentColor"/><path d="M2 2l20 20"/>' +
        '</svg>' +
      '</div>' +
      '<div class="hos-off-tag"><i></i><span data-i18n="tag"></span></div>' +
      '<h2 class="hos-off-title" id="hos-off-title" data-i18n="title"></h2>' +
      '<p class="hos-off-msg" data-i18n="msg"></p>' +
      '<ul class="hos-off-info">' +
        '<li><span data-i18n="lastOnline"></span> <b data-slot="lastOnline"></b></li>' +
        '<li><span data-i18n="lastPage"></span> <b data-slot="lastPage"></b></li>' +
      '</ul>' +
      '<div class="hos-off-status" data-slot="status" role="status" aria-live="polite"></div>' +
      '<div class="hos-off-btns">' +
        '<button type="button" class="hos-off-btn" data-act="retry" data-i18n="retry"></button>' +
        '<a class="hos-off-btn alt" data-act="home" href="#" data-i18n="home"></a>' +
        '<button type="button" class="hos-off-btn alt" data-act="dismiss" data-i18n="dismiss"></button>' +
      '</div>' +
      '<p class="hos-off-hint" data-i18n="hint"></p>' +
    '</div>';

  var TEMPLATE_CSS =
    '.hos-off-backdrop{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:18px;' +
      'background:radial-gradient(circle at 50% 40%,rgba(47,58,68,.92) 0%,rgba(10,12,14,.97) 100%);font-family:Arial,sans-serif;color:#fff;overflow:auto;}' +
    '.hos-off-backdrop[hidden]{display:none!important;}' +
    '.hos-off-card{width:100%;max-width:520px;background:rgba(18,18,18,.92);border:1px solid #3A4A55;border-radius:12px;padding:28px 24px 22px;text-align:center;' +
      'box-shadow:0 12px 40px rgba(0,0,0,.65),0 0 30px rgba(0,212,255,.10);line-height:1.55;}' +
    '.hos-off-ico{color:#ff4d5e;display:flex;justify-content:center;margin-bottom:6px;animation:hosOffPulse 2s ease-in-out infinite;}' +
    '.hos-off-tag{display:inline-flex;align-items:center;gap:8px;font-family:"Courier New",Consolas,monospace;font-size:12.5px;letter-spacing:3px;color:#ff4d5e;' +
      'border:1px solid #ff4d5e;background:rgba(255,77,94,.1);border-radius:3px;padding:3px 12px;margin-bottom:12px;}' +
    '.hos-off-tag i{width:8px;height:8px;border-radius:50%;background:currentColor;animation:hosOffBlink .9s infinite;}' +
    '.hos-off-card.ok .hos-off-tag{color:#35e08a;border-color:#35e08a;background:rgba(53,224,138,.1);}' +
    '.hos-off-card.ok .hos-off-ico{color:#35e08a;animation:none;}' +
    '.hos-off-title{font-size:clamp(20px,5vw,26px);margin:0 0 8px;font-weight:bold;color:#fff;}' +
    '.hos-off-msg{color:#B0B0B0;font-size:15px;margin:0 0 14px;}' +
    '.hos-off-info{list-style:none;margin:0 0 12px;padding:10px 12px;background:rgba(47,58,68,.7);border-radius:8px;text-align:left;font-family:"Courier New",Consolas,monospace;font-size:12.5px;color:#B0B0B0;}' +
    '.hos-off-info li{margin:2px 0;word-break:break-all;}.hos-off-info b{color:#00d4ff;font-weight:normal;}' +
    '.hos-off-status{min-height:1.4em;margin-bottom:10px;font-family:"Courier New",Consolas,monospace;font-size:13px;color:#00d4ff;}' +
    '.hos-off-status.bad{color:#ff4d5e;}.hos-off-status.good{color:#35e08a;}' +
    '.hos-off-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:12px;}' +
    '.hos-off-btn{display:inline-block;padding:10px 20px;background:#B0B0B0;color:#121212;text-decoration:none;border-radius:5px;font-weight:bold;border:2px solid #B0B0B0;cursor:pointer;font-size:15px;font-family:inherit;transition:background-color .25s,transform .25s,box-shadow .25s;}' +
    '.hos-off-btn:hover,.hos-off-btn:focus-visible{background:#fff;transform:scale(1.04);box-shadow:0 4px 14px rgba(0,212,255,.35);outline:none;}' +
    '.hos-off-btn.alt{background:transparent;color:#fff;border-color:#3A4A55;}' +
    '.hos-off-btn.alt:hover,.hos-off-btn.alt:focus-visible{background:#2F3A44;border-color:#00d4ff;}' +
    '.hos-off-backdrop[data-mode="page"] [data-act="dismiss"]{display:none;}' +
    '.hos-off-hint{margin:0;font-size:11.5px;color:#6f7f8a;}' +
    '@keyframes hosOffPulse{50%{opacity:.45;transform:scale(.94)}}@keyframes hosOffBlink{50%{opacity:.15}}' +
    '@media(prefers-reduced-motion:reduce){.hos-off-ico,.hos-off-tag i{animation:none!important}}';

  /* ------------------------------------------------------------------ */
  /* Zapis dialogu w localStorage                                       */
  /* ------------------------------------------------------------------ */
  function buildPayload() {
    return { v: VERSION, base: BASE, savedAt: Date.now(), html: TEMPLATE_HTML, css: TEMPLATE_CSS, i18n: I18N };
  }

  function persistDialog() {
    var cur = lsGet(KEY);
    if (cur && cur.v === VERSION && cur.base === BASE && cur.html && cur.css && cur.i18n) return cur;
    var p = buildPayload();
    lsSet(KEY, p);
    return p;
  }

  function getPayload() {
    var p = lsGet(KEY);
    return (p && p.html && p.css && p.i18n) ? p : buildPayload();
  }

  /* ------------------------------------------------------------------ */
  /* Stan: ostatnia strona, ostatni moment online, licznik rozłączeń     */
  /* ------------------------------------------------------------------ */
  function getState() { return lsGet(STATE_KEY) || { lastOnline: 0, lastPage: '', lastTitle: '', offlineCount: 0, lastOffline: 0, visits: 0 }; }
  function saveState(s) { lsSet(STATE_KEY, s); }

  function touchOnline(newVisit) {
    var s = getState();
    s.lastOnline = Date.now();
    s.lastPage = location.href;
    s.lastTitle = document.title || '';
    if (newVisit) s.visits = (s.visits || 0) + 1;
    saveState(s);
  }

  /* ------------------------------------------------------------------ */
  /* Język                                                              */
  /* ------------------------------------------------------------------ */
  function getLang() {
    var l = null;
    try { l = localStorage.getItem(LANG_KEY); } catch (e) {}
    if (!l || !I18N[l]) l = (navigator.language || 'pl').slice(0, 2).toLowerCase();
    return I18N[l] ? l : 'pl';
  }

  /* ------------------------------------------------------------------ */
  /* Renderowanie dialogu z zapisanych danych                           */
  /* ------------------------------------------------------------------ */
  function fmtAgo(ts, lang, never) {
    if (!ts) return never;
    var diff = Math.round((ts - Date.now()) / 1000), abs = Math.abs(diff), rel = '';
    try {
      var rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
      if (abs < 60) rel = rtf.format(diff, 'second');
      else if (abs < 3600) rel = rtf.format(Math.round(diff / 60), 'minute');
      else if (abs < 86400) rel = rtf.format(Math.round(diff / 3600), 'hour');
      else rel = rtf.format(Math.round(diff / 86400), 'day');
    } catch (e) {}
    var abs2 = '';
    try { abs2 = new Date(ts).toLocaleString(lang); } catch (e) { abs2 = new Date(ts).toString(); }
    return rel ? abs2 + ' (' + rel + ')' : abs2;
  }

  function fill(root, payload, lang) {
    var t = payload.i18n[lang] || payload.i18n.pl || {};
    var s = getState();
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t[el.getAttribute('data-i18n')] || ''; });
    var lo = root.querySelector('[data-slot="lastOnline"]'); if (lo) lo.textContent = fmtAgo(s.lastOnline, lang, t.never);
    var lp = root.querySelector('[data-slot="lastPage"]');
    if (lp) lp.textContent = s.lastPage ? (s.lastTitle ? s.lastTitle + ' – ' : '') + s.lastPage.replace(/^https?:\/\/[^/]+/, '') : t.never;
    var home = root.querySelector('[data-act="home"]'); if (home) home.setAttribute('href', (payload.base || BASE) + 'Home-page.html');
    return t;
  }

  /* ------------------------------------------------------------------ */
  /* Sprawdzanie realnej łączności (navigator.onLine bywa mylące)        */
  /* ------------------------------------------------------------------ */
  function ping() {
    return new Promise(function (resolve) {
      if (!window.fetch) return resolve(navigator.onLine);
      var done = false, ctrl = window.AbortController ? new AbortController() : null;
      var to = setTimeout(function () { if (ctrl) ctrl.abort(); if (!done) { done = true; resolve(false); } }, 4000);
      // sw.js nie jest przechwytywany przez Service Worker -> to zawsze prawdziwe zapytanie do sieci
      fetch(BASE + 'sw.js?_=' + Date.now(), { method: 'HEAD', cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { clearTimeout(to); if (!done) { done = true; resolve(!!r && r.status < 500); } })
        .catch(function () { clearTimeout(to); if (!done) { done = true; resolve(false); } });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Overlay na otwartej stronie                                        */
  /* ------------------------------------------------------------------ */
  var NO_OVERLAY = !!window.HOS_OFFLINE_NO_OVERLAY; // 404.html ma własny ekran offline
  var root = null, styleEl = null, prevFocus = null, dismissed = false, checking = false, prevOverflow = '';

  function ensureOverlay() {
    if (root) return root;
    var payload = getPayload();
    styleEl = document.createElement('style');
    styleEl.id = 'hos-off-style';
    styleEl.textContent = payload.css;
    (document.head || document.documentElement).appendChild(styleEl);

    root = document.createElement('div');
    root.id = 'hos-off-root';
    root.className = 'hos-off-backdrop';
    root.setAttribute('role', 'alertdialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'hos-off-title');
    root.setAttribute('data-mode', 'overlay');
    root.hidden = true;
    root.innerHTML = payload.html;
    (document.body || document.documentElement).appendChild(root);

    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'retry') { e.preventDefault(); recheck(); }
      else if (act === 'dismiss') { e.preventDefault(); dismissed = true; hide(); }
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { dismissed = true; hide(); return; }
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call(root.querySelectorAll('button,a[href]'), function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    return root;
  }

  function setStatus(txt, cls) {
    if (!root) return;
    var el = root.querySelector('[data-slot="status"]');
    if (el) { el.textContent = txt || ''; el.className = 'hos-off-status' + (cls ? ' ' + cls : ''); }
  }

  function show() {
    if (NO_OVERLAY || dismissed) return;
    var r = ensureOverlay();
    var lang = getLang();
    var t = fill(r, getPayload(), lang);
    r.querySelector('.hos-off-card').classList.remove('ok');
    setStatus('', '');
    r.lang = lang;
    if (r.hidden) {
      prevFocus = document.activeElement;
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      r.hidden = false;
      var btn = r.querySelector('[data-act="retry"]'); if (btn) btn.focus();
    }
    return t;
  }

  function hide() {
    if (!root || root.hidden) return;
    root.hidden = true;
    document.documentElement.style.overflow = prevOverflow;
    try { if (prevFocus && prevFocus.focus) prevFocus.focus(); } catch (e) {}
  }

  function recheck() {
    if (checking) return;
    checking = true;
    var t = (getPayload().i18n[getLang()]) || {};
    setStatus(t.checking, '');
    ping().then(function (ok) {
      checking = false;
      if (ok) {
        touchOnline(false);
        if (root) root.querySelector('.hos-off-card').classList.add('ok');
        setStatus(t.restored, 'good');
        setTimeout(function () { dismissed = false; hide(); }, 1200);
      } else {
        setStatus(t.still, 'bad');
        if (!root || root.hidden) show();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Zdarzenia sieci                                                    */
  /* ------------------------------------------------------------------ */
  window.addEventListener('offline', function () {
    var s = getState();
    s.offlineCount = (s.offlineCount || 0) + 1;
    s.lastOffline = Date.now();
    saveState(s);
    dismissed = false;
    show();
  });
  window.addEventListener('online', function () {
    if (root && !root.hidden) recheck(); else touchOnline(false);
  });

  // Tętno: gdy użytkownik jest online, odświeżamy "ostatnio online"
  setInterval(function () { if (navigator.onLine && (!root || root.hidden)) touchOnline(false); }, 20000);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && !navigator.onLine) show();
  });

  /* ------------------------------------------------------------------ */
  /* Start                                                              */
  /* ------------------------------------------------------------------ */
  function init() {
    if (navigator.onLine) {
      persistDialog();   // zapis dialogu w localStorage
      touchOnline(true); // zapis stanu
    } else {
      show();            // strona z cache przeglądarki otwarta bez sieci
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // Dialog zapisujemy od razu (jeszcze przed DOMContentLoaded), gdy jest sieć
  if (navigator.onLine) persistDialog();

  /* ------------------------------------------------------------------ */
  /* Service Worker – serwuje offline.html, gdy nie ma sieci             */
  /* ------------------------------------------------------------------ */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(BASE + 'sw.js', { scope: BASE }).catch(function () {});
    });
  }

  // Publiczne API (np. do testów: HackerOffline.show())
  window.HackerOffline = { show: function () { dismissed = false; show(); }, hide: hide, check: recheck, ping: ping, key: KEY, stateKey: STATE_KEY };
})();
