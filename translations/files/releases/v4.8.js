(function () {
    const VERSION = "HackerOS V4.8";
    const DATA = {
        pl: { version: VERSION, desc: "Nowa edycja z zaktualizowanymi narzędziami.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Zaktualizowano i rozbudowano HackerOS Games.", "Rozbudowano narzędzie CLI hacker.", "Aktualizacja konfiguracji."] },
        en: { version: VERSION, desc: "New edition with updated tools.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Updated and expanded HackerOS Games.", "Expanded the hacker CLI tool.", "Configuration update."] },
        de: { version: VERSION, desc: "Neue Edition mit aktualisierten Tools.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["HackerOS Games aktualisiert und erweitert.", "Das CLI-Tool hacker erweitert.", "Konfigurationsaktualisierung."] },
        fr: { version: VERSION, desc: "Nouvelle édition avec des outils mis à jour.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Mise à jour et enrichissement de HackerOS Games.", "Extension de l'outil CLI hacker.", "Mise à jour de la configuration."] },
        es: { version: VERSION, desc: "Nueva edición con herramientas actualizadas.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Actualizado y ampliado HackerOS Games.", "Ampliada la herramienta CLI hacker.", "Actualización de configuración."] },
        it: { version: VERSION, desc: "Nuova edizione con strumenti aggiornati.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Aggiornato ed esteso HackerOS Games.", "Esteso lo strumento CLI hacker.", "Aggiornamento della configurazione."] },
        ru: { version: VERSION, desc: "Новая версия с обновлёнными инструментами.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Обновлён и расширен HackerOS Games.", "Расширен CLI-инструмент hacker.", "Обновление конфигурации."] },
        uk: { version: VERSION, desc: "Нове видання з оновленими інструментами.", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["Оновлено та розширено HackerOS Games.", "Розширено CLI-інструмент hacker.", "Оновлення конфігурації."] },
        zh: { version: VERSION, desc: "带来更新工具的新版本。", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["更新并扩展了 HackerOS Games。", "扩展了 hacker CLI 工具。", "配置更新。"] },
        ja: { version: VERSION, desc: "ツールを更新した新しいエディション。", dates: ["HackerOS Official: 30.06.2026", "HackerOS Cybersecurity: 19.06.2026"], changelog: ["HackerOS Games を更新・拡張しました。", "CLIツール hacker を拡張しました。", "設定を更新しました。"] },
    };

    window.HACKEROS_RELEASES_REGISTRY = window.HACKEROS_RELEASES_REGISTRY || [];
    window.HACKEROS_RELEASES_REGISTRY.push({ version: VERSION, data: DATA });
})();
