(function () {
    const VERSION = "HackerOS V4.4";
    const DATA = {
        pl: { version: VERSION, desc: "Nowa edycja głównie z poprawkami.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Naprawiono błędy w narzędziach z AppImage", "Zaktualizowano narzędzia CLI", "Zaktualizowano język programowania HackerOS"] },
        en: { version: VERSION, desc: "New edition mainly with fixes.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Fixed bugs in AppImage tools", "Updated CLI tools", "Updated HackerOS programming language"] },
        de: { version: VERSION, desc: "Neue Edition, hauptsächlich mit Fehlerbehebungen.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Fehler in den AppImage-Tools behoben.", "CLI-Tools aktualisiert.", "Die HackerOS-Programmiersprache aktualisiert."] },
        fr: { version: VERSION, desc: "Nouvelle édition axée principalement sur les correctifs.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Correction de bogues dans les outils AppImage.", "Mise à jour des outils CLI.", "Mise à jour du langage de programmation HackerOS."] },
        es: { version: VERSION, desc: "Nueva edición centrada principalmente en correcciones.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Corregidos errores en las herramientas AppImage.", "Actualizadas las herramientas CLI.", "Actualizado el lenguaje de programación HackerOS."] },
        it: { version: VERSION, desc: "Nuova edizione incentrata principalmente sulle correzioni.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Corretti bug negli strumenti AppImage.", "Aggiornati gli strumenti CLI.", "Aggiornato il linguaggio di programmazione HackerOS."] },
        ru: { version: VERSION, desc: "Новая версия, в основном с исправлениями.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Исправлены ошибки в инструментах AppImage.", "Обновлены CLI-инструменты.", "Обновлён язык программирования HackerOS."] },
        uk: { version: VERSION, desc: "Нове видання, переважно з виправленнями.", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["Виправлено помилки в інструментах AppImage.", "Оновлено CLI-інструменти.", "Оновлено мову програмування HackerOS."] },
        zh: { version: VERSION, desc: "主要带来修复的新版本。", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["修复了 AppImage 工具中的错误。", "更新了 CLI 工具。", "更新了 HackerOS 编程语言。"] },
        ja: { version: VERSION, desc: "主に修正を含む新しいエディション。", dates: ["HackerOS Official: 6.03.2026", "HackerOS NVIDIA: 7.03.2026", "HackerOS Cybersecurity: 8.03.2026"], changelog: ["AppImage ツールの不具合を修正しました。", "CLIツールを更新しました。", "HackerOS プログラミング言語を更新しました。"] },
    };

    window.HACKEROS_RELEASES_REGISTRY = window.HACKEROS_RELEASES_REGISTRY || [];
    window.HACKEROS_RELEASES_REGISTRY.push({ version: VERSION, data: DATA });
})();
