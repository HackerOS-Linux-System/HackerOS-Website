(function () {
    function createSwitcher() {
        const lang = window.HackerLang.getLang();

        const wrapper = document.createElement('li');
        wrapper.id = 'lang-switcher';
        wrapper.style.cssText = 'display:flex;align-items:center;gap:6px;margin-left:8px;';

        const btnPL = document.createElement('button');
        btnPL.textContent = 'PL';
        btnPL.dataset.l = 'pl';

        const btnEN = document.createElement('button');
        btnEN.textContent = 'EN';
        btnEN.dataset.l = 'en';

        const style = `
        cursor:pointer;
        border:1px solid rgba(255,255,255,0.35);
        border-radius:4px;
        padding:3px 9px;
        font-size:13px;
        font-weight:bold;
        background:transparent;
        color:#fff;
        transition:background 0.2s,color 0.2s;
        `;
        btnPL.style.cssText = style;
        btnEN.style.cssText = style;

        function applyActive(l) {
            [btnPL, btnEN].forEach(b => {
                if (b.dataset.l === l) {
                    b.style.background = '#B0B0B0';
                    b.style.color = '#121212';
                } else {
                    b.style.background = 'transparent';
                    b.style.color = '#fff';
                }
            });
        }

        applyActive(lang);

        function handleClick(e) {
            const chosen = e.currentTarget.dataset.l;
            window.HackerLang.setLang(chosen);
            applyActive(chosen);
            if (typeof window.__hackeros_applyLang === 'function') {
                window.__hackeros_applyLang(chosen);
            }
        }

        btnPL.addEventListener('click', handleClick);
        btnEN.addEventListener('click', handleClick);

        wrapper.appendChild(btnPL);
        wrapper.appendChild(btnEN);
        return wrapper;
    }

    function inject() {
        // Works for both nav ul layouts across all pages
        const navUl = document.querySelector('header nav ul') ||
        document.querySelector('header .nav-list');
        if (!navUl) return;
        if (document.getElementById('lang-switcher')) return;
        navUl.appendChild(createSwitcher());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
