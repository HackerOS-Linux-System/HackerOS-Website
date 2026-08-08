(function () {
    const VERSION = "HackerOS V4.6";
    const DATA = {
        pl: { version: VERSION, desc: "Nowa edycja z zaktualizowanymi narzędziami CLI oraz zaktualizowanym motd.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Rozbudowano narzędzia: hacker, Hacker Lang (narzędzie hl), hdev, hnm, hpm, hedit", "Zaktualizowano motd"] },
        en: { version: VERSION, desc: "New edition with updated CLI tools and updated MOTD.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Expanded tools: hacker, Hacker Lang (hl tool), hdev, hnm, hpm, hedit", "Updated MOTD"] },
        de: { version: VERSION, desc: "Neue Edition mit aktualisierten CLI-Tools und aktualisiertem MOTD.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Tools erweitert: hacker, Hacker Lang (Tool hl), hdev, hnm, hpm, hedit.", "MOTD aktualisiert."] },
        fr: { version: VERSION, desc: "Nouvelle édition avec outils CLI mis à jour et MOTD mis à jour.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Extension des outils : hacker, Hacker Lang (outil hl), hdev, hnm, hpm, hedit.", "Mise à jour du MOTD."] },
        es: { version: VERSION, desc: "Nueva edición con herramientas CLI actualizadas y MOTD actualizado.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Ampliadas las herramientas: hacker, Hacker Lang (herramienta hl), hdev, hnm, hpm, hedit.", "Actualizado el MOTD."] },
        it: { version: VERSION, desc: "Nuova edizione con strumenti CLI aggiornati e MOTD aggiornato.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Estesi gli strumenti: hacker, Hacker Lang (strumento hl), hdev, hnm, hpm, hedit.", "Aggiornato il MOTD."] },
        ru: { version: VERSION, desc: "Новая версия с обновлёнными CLI-инструментами и обновлённым MOTD.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Расширены инструменты: hacker, Hacker Lang (инструмент hl), hdev, hnm, hpm, hedit.", "Обновлён MOTD."] },
        uk: { version: VERSION, desc: "Нове видання з оновленими CLI-інструментами та оновленим MOTD.", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["Розширено інструменти: hacker, Hacker Lang (інструмент hl), hdev, hnm, hpm, hedit.", "Оновлено MOTD."] },
        zh: { version: VERSION, desc: "带来更新的 CLI 工具和更新的 MOTD 的新版本。", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["扩展了工具：hacker、Hacker Lang（hl 工具）、hdev、hnm、hpm、hedit。", "更新了 MOTD。"] },
        ja: { version: VERSION, desc: "CLIツールおよび MOTD を更新した新しいエディション。", dates: ["HackerOS Official: 6.05.2026", "HackerOS NVIDIA: 5.05.2026", "HackerOS Cybersecurity: 5.05.2026"], changelog: ["ツールを拡張：hacker、Hacker Lang（hl ツール）、hdev、hnm、hpm、hedit。", "MOTD を更新しました。"] },
    };

    window.HACKEROS_RELEASES_REGISTRY = window.HACKEROS_RELEASES_REGISTRY || [];
    window.HACKEROS_RELEASES_REGISTRY.push({ version: VERSION, data: DATA });
})();
