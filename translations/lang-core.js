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

    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.includes(stored)) return stored;
        const browser = (navigator.language || navigator.userLanguage || 'pl').slice(0, 2);
        return SUPPORTED.includes(browser) ? browser : 'pl';
    }

    function setLang(lang) {
        if (!SUPPORTED.includes(lang)) return;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    window.HackerLang = { getLang, setLang, SUPPORTED, LANG_LABELS };
})();
