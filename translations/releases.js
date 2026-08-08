window.HACKEROS_TRANS_RELEASES = {
    pl: {
        pageTitle: "HackerOS - Releases",
        sectionH1: "Wydania HackerOS",
        releaseDateLabel: "Data wydania:",
        changelogLabel: "Changelog:",
        footerCopy: "© 2026 HackerOS. Wszelkie prawa zastrzeżone.",
        navHome: "Home",
        navDownload: "Download",
        navReleases: "Releases",
        navTeam: "HackerOS Team",
        navDocs: "Documentation",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    en: {
        pageTitle: "HackerOS - Releases",
        sectionH1: "HackerOS Releases",
        releaseDateLabel: "Release date:",
        changelogLabel: "Changelog:",
        footerCopy: "© 2026 HackerOS. All rights reserved.",
        navHome: "Home",
        navDownload: "Download",
        navReleases: "Releases",
        navTeam: "HackerOS Team",
        navDocs: "Documentation",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    de: {
        pageTitle: "HackerOS - Releases",
        sectionH1: "HackerOS Versionen",
        releaseDateLabel: "Veröffentlichungsdatum:",
        changelogLabel: "Changelog:",
        footerCopy: "© 2026 HackerOS. Alle Rechte vorbehalten.",
        navHome: "Home",
        navDownload: "Download",
        navReleases: "Releases",
        navTeam: "HackerOS Team",
        navDocs: "Dokumentation",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    fr: {
        pageTitle: "HackerOS - Versions",
        sectionH1: "Versions de HackerOS",
        releaseDateLabel: "Date de publication :",
        changelogLabel: "Journal des modifications :",
        footerCopy: "© 2026 HackerOS. Tous droits réservés.",
        navHome: "Accueil",
        navDownload: "Télécharger",
        navReleases: "Versions",
        navTeam: "Équipe HackerOS",
        navDocs: "Documentation",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    es: {
        pageTitle: "HackerOS - Versiones",
        sectionH1: "Versiones de HackerOS",
        releaseDateLabel: "Fecha de lanzamiento:",
        changelogLabel: "Registro de cambios:",
        footerCopy: "© 2026 HackerOS. Todos los derechos reservados.",
        navHome: "Inicio",
        navDownload: "Descargar",
        navReleases: "Versiones",
        navTeam: "Equipo HackerOS",
        navDocs: "Documentación",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    it: {
        pageTitle: "HackerOS - Versioni",
        sectionH1: "Versioni di HackerOS",
        releaseDateLabel: "Data di rilascio:",
        changelogLabel: "Changelog:",
        footerCopy: "© 2026 HackerOS. Tutti i diritti riservati.",
        navHome: "Home",
        navDownload: "Download",
        navReleases: "Versioni",
        navTeam: "Team HackerOS",
        navDocs: "Documentazione",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    ru: {
        pageTitle: "HackerOS - Релизы",
        sectionH1: "Релизы HackerOS",
        releaseDateLabel: "Дата выпуска:",
        changelogLabel: "Список изменений:",
        footerCopy: "© 2026 HackerOS. Все права защищены.",
        navHome: "Главная",
        navDownload: "Скачать",
        navReleases: "Релизы",
        navTeam: "Команда HackerOS",
        navDocs: "Документация",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    uk: {
        pageTitle: "HackerOS - Релізи",
        sectionH1: "Релізи HackerOS",
        releaseDateLabel: "Дата випуску:",
        changelogLabel: "Список змін:",
        footerCopy: "© 2026 HackerOS. Усі права захищені.",
        navHome: "Головна",
        navDownload: "Завантажити",
        navReleases: "Релізи",
        navTeam: "Команда HackerOS",
        navDocs: "Документація",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    zh: {
        pageTitle: "HackerOS - 版本",
        sectionH1: "HackerOS 版本",
        releaseDateLabel: "发布日期：",
        changelogLabel: "更新日志：",
        footerCopy: "© 2026 HackerOS. 保留所有权利。",
        navHome: "主页",
        navDownload: "下载",
        navReleases: "版本",
        navTeam: "HackerOS 团队",
        navDocs: "文档",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
    ja: {
        pageTitle: "HackerOS - リリース",
        sectionH1: "HackerOS リリース",
        releaseDateLabel: "リリース日：",
        changelogLabel: "変更履歴：",
        footerCopy: "© 2026 HackerOS. 全著作権所有。",
        navHome: "ホーム",
        navDownload: "ダウンロード",
        navReleases: "リリース",
        navTeam: "HackerOS チーム",
        navDocs: "ドキュメント",
        releases: [] // filled in below from translations/files/all/{lang}.js
    },
};

/* ── Portal wiring ──────────────────────────────────────────────────
 * Pull each language's release list from the canonical per-language
 * file (translations/files/all/{lang}.js). If a language's file was
 * not loaded for some reason, fall back to English so the page never
 * renders empty.
 * ------------------------------------------------------------------ */
(function () {
    const ALL = window.HACKEROS_RELEASES_ALL || {};
    Object.keys(window.HACKEROS_TRANS_RELEASES).forEach(function (lang) {
        window.HACKEROS_TRANS_RELEASES[lang].releases = ALL[lang] || ALL.en || [];
    });
})();
