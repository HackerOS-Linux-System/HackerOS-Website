(function () {
    const STORAGE_KEY = 'hackeros_lang';
    const SUPPORTED = ['pl', 'en'];

    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.includes(stored)) return stored;
        // fallback: browser language
        const browser = (navigator.language || navigator.userLanguage || 'pl').slice(0, 2);
        return SUPPORTED.includes(browser) ? browser : 'pl';
    }

    function setLang(lang) {
        if (!SUPPORTED.includes(lang)) return;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    window.HackerLang = { getLang, setLang, SUPPORTED };
})();
