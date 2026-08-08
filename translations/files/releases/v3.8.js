(function () {
    const VERSION = "HackerOS V3.8";
    const DATA = {
        pl: { version: VERSION, desc: "Nowa wersja z zaktualizowanymi narzędziami i naprawionymi skryptami.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Zaktualizowano narzędzia - hacker, hackerc.", "Naprawiono skrypty."] },
        en: { version: VERSION, desc: "New version with updated tools and fixed scripts.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Updated tools - hacker, hackerc.", "Fixed scripts."] },
        de: { version: VERSION, desc: "Neue Version mit aktualisierten Tools und behobenen Skripten.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Tools aktualisiert – hacker, hackerc.", "Skripte behoben."] },
        fr: { version: VERSION, desc: "Nouvelle version avec outils mis à jour et scripts corrigés.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Mise à jour des outils – hacker, hackerc.", "Correction des scripts."] },
        es: { version: VERSION, desc: "Nueva versión con herramientas actualizadas y scripts corregidos.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Actualizadas las herramientas – hacker, hackerc.", "Corregidos los scripts."] },
        it: { version: VERSION, desc: "Nuova versione con strumenti aggiornati e script corretti.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Aggiornati gli strumenti – hacker, hackerc.", "Corretti gli script."] },
        ru: { version: VERSION, desc: "Новая версия с обновлёнными инструментами и исправленными скриптами.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Обновлены инструменты — hacker, hackerc.", "Исправлены скрипты."] },
        uk: { version: VERSION, desc: "Нова версія з оновленими інструментами та виправленими скриптами.", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["Оновлено інструменти — hacker, hackerc.", "Виправлено скрипти."] },
        zh: { version: VERSION, desc: "带来更新工具和修复脚本的新版本。", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["更新了工具 —— hacker、hackerc。", "修复了脚本。"] },
        ja: { version: VERSION, desc: "ツールを更新しスクリプトを修正した新しいバージョン。", dates: ["HackerOS Official: 16.11.2025", "HackerOS Hydra: 16.11.2025", "HackerOS Cybersecurity: 16.11.2025"], changelog: ["ツール（hacker、hackerc）を更新しました。", "スクリプトを修正しました。"] },
    };

    window.HACKEROS_RELEASES_REGISTRY = window.HACKEROS_RELEASES_REGISTRY || [];
    window.HACKEROS_RELEASES_REGISTRY.push({ version: VERSION, data: DATA });
})();
