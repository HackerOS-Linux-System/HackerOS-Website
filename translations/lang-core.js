(function () {
    const STORAGE_KEY = 'hackeros_lang';
    const SUPPORTED = ['pl', 'en', 'de', 'fr', 'es', 'it', 'ru', 'uk', 'zh', 'ja'];

    const LANG_LABELS = {
        pl: { flag: '🇵🇱', name: 'Polski' },
        en: { flag: '🇬🇧', name: 'English' },
        de: { flag: '🇩🇪', name: 'Deutsch' },
        fr: { flag: '🇫🇷', name: 'Français' },
        es: { flag: '🇪🇸', name: 'Español' },
        it: { flag: '🇮🇹', name: 'Italiano' },
        ru: { flag: '🇷🇺', name: 'Русский' },
        uk: { flag: '🇺🇦', name: 'Українська' },
        zh: { flag: '🇨🇳', name: '中文' },
        ja: { flag: '🇯🇵', name: '日本語' },
    };

    // Label of the "Articles" nav link (added to every page's nav). Kept here, in the one script
    // every page already loads, so pages don't each need their own translation entry for it.
    const NAV_ARTICLES = {
        pl: 'Artykuły', en: 'Articles', de: 'Artikel', fr: 'Articles', es: 'Artículos',
        it: 'Articoli', ru: 'Статьи', uk: 'Статті', zh: '文章', ja: '記事',
    };

    function applyNavArticles() {
        const el = document.getElementById('nav-articles');
        if (el) el.textContent = NAV_ARTICLES[getLang()] || NAV_ARTICLES.en;
    }

    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.includes(stored)) return stored;
        const browser = (navigator.language || navigator.userLanguage || 'pl').slice(0, 2);
        return SUPPORTED.includes(browser) ? browser : 'pl';
    }

    function setLang(lang) {
        if (!SUPPORTED.includes(lang)) return;
        localStorage.setItem(STORAGE_KEY, lang);
        applyNavArticles();
    }

    window.HackerLang = { getLang, setLang, SUPPORTED, LANG_LABELS, NAV_ARTICLES, applyNavArticles };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyNavArticles);
    } else {
        applyNavArticles();
    }
})();
