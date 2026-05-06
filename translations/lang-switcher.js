(function () {

    /* ── Inject CSS ────────────────────────────────────────────────────── */
    const STYLE = `
#hl-overlay{
    position:fixed;inset:0;z-index:99998;
    background:rgba(0,0,0,.55);
    display:flex;align-items:center;justify-content:center;
    opacity:0;pointer-events:none;
    transition:opacity .2s ease;
}
#hl-overlay.hl-open{opacity:1;pointer-events:all;}
#hl-modal{
    background:#1a2028;
    border:1px solid #2f3a44;
    border-radius:16px;
    padding:28px 32px 24px;
    min-width:280px;
    box-shadow:0 20px 50px rgba(0,0,0,.7);
    transform:scale(.93);
    transition:transform .2s ease;
    font-family:'Arial',sans-serif;
    color:#fff;
}
#hl-overlay.hl-open #hl-modal{transform:scale(1);}
#hl-modal h3{
    margin:0 0 18px;font-size:17px;font-weight:700;
    color:#b0b0b0;letter-spacing:.5px;
    border-bottom:1px solid #2f3a44;padding-bottom:12px;
}
.hl-grid{
    display:grid;grid-template-columns:1fr 1fr;
    gap:8px;
}
.hl-btn{
    display:flex;align-items:center;gap:9px;
    background:#242e38;border:1px solid #2f3a44;
    border-radius:10px;padding:10px 14px;
    cursor:pointer;transition:background .18s,border-color .18s,transform .12s;
    color:#e0e6ed;font-size:14px;font-weight:600;
    font-family:'Arial',sans-serif;
    text-align:left;
}
.hl-btn:hover{background:#2f3d4d;border-color:#6f8aac;transform:translateY(-1px);}
.hl-btn.hl-active{background:#2f3a44;border-color:#b0b0b0;color:#fff;}
.hl-btn .hl-flag{font-size:20px;line-height:1;}
#hl-close{
    display:block;width:100%;margin-top:16px;
    background:transparent;border:1px solid #3a4a55;
    border-radius:8px;padding:8px;color:#888;
    cursor:pointer;font-size:13px;font-family:'Arial',sans-serif;
    transition:color .15s,border-color .15s;
}
#hl-close:hover{color:#fff;border-color:#888;}
/* settings gear button in nav */
.hl-settings-btn{
    background:none;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    padding:4px;border-radius:8px;
    transition:opacity .2s,transform .2s;
    margin-left:6px;
}
.hl-settings-btn:hover{opacity:.75;transform:rotate(22deg);}
.hl-settings-btn img{width:30px;height:30px;display:block;object-fit:contain;}
`;

    function injectCSS() {
        if (document.getElementById('hl-style')) return;
        const s = document.createElement('style');
        s.id = 'hl-style';
        s.textContent = STYLE;
        document.head.appendChild(s);
    }

    /* ── Build modal DOM ───────────────────────────────────────────────── */
    function buildModal() {
        if (document.getElementById('hl-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'hl-overlay';

        const modal = document.createElement('div');
        modal.id = 'hl-modal';

        const heading = document.createElement('h3');
        heading.id = 'hl-heading';
        heading.textContent = '🌐 Wybierz język / Select language';
        modal.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'hl-grid';

        const current = window.HackerLang.getLang();
        window.HackerLang.SUPPORTED.forEach(code => {
            const info = window.HackerLang.LANG_LABELS[code];
            const btn = document.createElement('button');
            btn.className = 'hl-btn' + (code === current ? ' hl-active' : '');
            btn.dataset.lang = code;

            const flag = document.createElement('span');
            flag.className = 'hl-flag';
            flag.textContent = info.flag;

            const label = document.createElement('span');
            label.textContent = info.name;

            btn.appendChild(flag);
            btn.appendChild(label);

            btn.addEventListener('click', () => {
                window.HackerLang.setLang(code);
                // update active state
                grid.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('hl-active'));
                btn.classList.add('hl-active');
                // apply translation
                if (typeof window.__hackeros_applyLang === 'function') {
                    window.__hackeros_applyLang(code);
                }
                closeModal();
            });

            grid.appendChild(btn);
        });

        modal.appendChild(grid);

        const closeBtn = document.createElement('button');
        closeBtn.id = 'hl-close';
        closeBtn.textContent = '✕ Zamknij / Close';
        closeBtn.addEventListener('click', closeModal);
        modal.appendChild(closeBtn);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // close on overlay click
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

        // close on Escape
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    function openModal() {
        // refresh active state
        const current = window.HackerLang.getLang();
        document.querySelectorAll('.hl-btn').forEach(b => {
            b.classList.toggle('hl-active', b.dataset.lang === current);
        });
        document.getElementById('hl-overlay').classList.add('hl-open');
    }

    function closeModal() {
        const overlay = document.getElementById('hl-overlay');
        if (overlay) overlay.classList.remove('hl-open');
    }

    /* ── Inject settings button into nav ──────────────────────────────── */
    function injectSettingsBtn(imgPath) {
        const navUl = document.querySelector('header nav ul') ||
                      document.querySelector('header .nav-list');
        if (!navUl) return;
        if (document.getElementById('hl-settings-li')) return;

        const li = document.createElement('li');
        li.id = 'hl-settings-li';

        const btn = document.createElement('button');
        btn.className = 'hl-settings-btn';
        btn.title = 'Language / Język';
        btn.setAttribute('aria-label', 'Change language');

        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = 'Settings';
        // fallback: if image fails, show gear emoji
        img.onerror = function() { this.style.display='none'; btn.textContent='⚙️'; btn.style.fontSize='20px'; };

        btn.appendChild(img);
        btn.addEventListener('click', openModal);

        li.appendChild(btn);
        navUl.appendChild(li);
    }

    /* ── Main init ─────────────────────────────────────────────────────── */
    function init(imgPath) {
        injectCSS();
        buildModal();
        injectSettingsBtn(imgPath || 'settings.png');
    }

    // Auto-detect path based on page location
    function autoInit() {
        // tools-docs pages need ../settings.png
        const isSubdir = window.location.pathname.includes('/tools-docs/');
        const imgPath  = isSubdir ? '../settings.png' : 'settings.png';
        init(imgPath);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

    window.HackerLangSwitcher = { open: openModal, close: closeModal };
})();
