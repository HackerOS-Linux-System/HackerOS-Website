(function () {
    const VERSION = "HackerOS V4.7";
    const DATA = {
        pl: { version: VERSION, desc: "Nowa edycja z poprawkami oraz aktualizacjami.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Naprawiono błędy z autologowaniem.", "Zaktualizowano narzędzia CLI/GUI.", "Dodano nową edycję Gaming."] },
        en: { version: VERSION, desc: "New edition with fixes and updates.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Fixed autologin bugs.", "Updated CLI/GUI tools.", "Added new Gaming edition."] },
        de: { version: VERSION, desc: "Neue Edition mit Fehlerbehebungen und Aktualisierungen.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Fehler beim automatischen Anmelden behoben.", "CLI-/GUI-Tools aktualisiert.", "Neue Gaming-Edition hinzugefügt."] },
        fr: { version: VERSION, desc: "Nouvelle édition avec correctifs et mises à jour.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Correction de bogues de connexion automatique.", "Mise à jour des outils CLI/GUI.", "Ajout de la nouvelle édition Gaming."] },
        es: { version: VERSION, desc: "Nueva edición con correcciones y actualizaciones.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Corregidos errores de inicio de sesión automático.", "Actualizadas las herramientas CLI/GUI.", "Añadida la nueva edición Gaming."] },
        it: { version: VERSION, desc: "Nuova edizione con correzioni e aggiornamenti.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Corretti bug del login automatico.", "Aggiornati gli strumenti CLI/GUI.", "Aggiunta la nuova edizione Gaming."] },
        ru: { version: VERSION, desc: "Новая версия с исправлениями и обновлениями.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Исправлены ошибки автологина.", "Обновлены инструменты CLI/GUI.", "Добавлена новая редакция Gaming."] },
        uk: { version: VERSION, desc: "Нове видання з виправленнями та оновленнями.", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["Виправлено помилки автоматичного входу.", "Оновлено інструменти CLI/GUI.", "Додано нове видання Gaming."] },
        zh: { version: VERSION, desc: "带来修复与更新的新版本。", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["修复了自动登录相关的错误。", "更新了 CLI/GUI 工具。", "新增了 Gaming 版本。"] },
        ja: { version: VERSION, desc: "修正と更新を含む新しいエディション。", dates: ["HackerOS Official: 1.06.2026", "HackerOS Cybersecurity: 2.06.2026", "HackerOS Gaming: 3.06.2026"], changelog: ["自動ログインの不具合を修正しました。", "CLI/GUIツールを更新しました。", "新しい Gaming エディションを追加しました。"] },
    };

    window.HACKEROS_RELEASES_REGISTRY = window.HACKEROS_RELEASES_REGISTRY || [];
    window.HACKEROS_RELEASES_REGISTRY.push({ version: VERSION, data: DATA });
})();
