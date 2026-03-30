(function () {
    'use strict';
    var SECTIONS = [
        ['sec-intro',        'intro'],
        ['sec-install',      'install'],
        ['sec-struktura',    'struktura'],
        ['sec-podstawy',     'podstawy'],
        ['sec-sterowanie',   'sterowanie'],
        ['sec-organizacja',  'organizacja'],
        ['sec-async',        'async'],
        ['sec-typy',         'typy'],
        ['sec-zaawansowane', 'zaawansowane'],
        ['sec-przyklady',    'przyklady'],
        ['sec-gramatyka',    'gramatyka'],
    ];
    function injectSections() {
        var reg = window.__HL_SECTIONS || {};
        SECTIONS.forEach(function(pair) {
            var el = document.getElementById(pair[0]);
            if (!el) return;
            var html = reg[pair[1]];
            if (html) {
                el.className = '';
                el.innerHTML = html;
            } else {
                el.innerHTML = '<div style="padding:48px 56px;color:#3a5070;font-family:monospace">Sekcja ' + pair[1] + ' nie zaladowana.</div>';
            }
        });
    }
    function initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var block = btn.closest('.code-block');
                var pre = block ? block.querySelector('pre') : null;
                if (!pre) return;
                var text = pre.innerText || pre.textContent;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(function() {
                        btn.textContent = 'Copied!';
                        setTimeout(function() { btn.textContent = 'Copy'; }, 1800);
                    }).catch(function() {
                        fallbackCopy(text, btn);
                    });
                } else {
                    fallbackCopy(text, btn);
                }
            });
        });
    }
    function fallbackCopy(text, btn) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); btn.textContent = 'Copied!'; }
        catch(e) { btn.textContent = 'Error'; }
        document.body.removeChild(ta);
        setTimeout(function() { btn.textContent = 'Copy'; }, 1800);
    }
    function initActiveNav() {
        var links = document.querySelectorAll('.nav-link');
        var sectionIds = [];
        links.forEach(function(a) {
            var href = a.getAttribute('href');
            if (href && href.startsWith('#')) sectionIds.push(href.slice(1));
        });
            function setActive() {
                var scrollY = window.scrollY + 100;
                var current = '';
                sectionIds.forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el && el.offsetTop <= scrollY) current = id;
                });
                    links.forEach(function(a) {
                        var href = a.getAttribute('href');
                        if (href === '#' + current) a.classList.add('active');
                        else a.classList.remove('active');
                    });
            }
            window.addEventListener('scroll', setActive, { passive: true });
            setActive();
    }
    function init() {
        injectSections();
        // Re-init after sections injected (copy buttons live in injected HTML)
        setTimeout(function() {
            initCopyButtons();
            initActiveNav();
        }, 0);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
