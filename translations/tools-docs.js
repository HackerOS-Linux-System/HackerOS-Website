window.HACKEROS_TRANS_TOOLS = {
    pl: {
        pageTitle:    'HackerOS · Ekosystem & narzędzia',
        sectionH2:    'Poznaj ekosystem HackerOS.',
        footerCopy:   'HackerOS · © 2026 HackerOS. Wszelkie prawa zastrzeżone. | Dokumentacja ekosystemu HackerOS',
        langDropBtn:  'Języki programowania',
        navItems: {
            'gaming-cli':          'gaming-cli',
            'hpm':                 'HPM',
            'hackeros-containers': 'HackerOS Containers',
            'hackeros-builder':    'HackerOS Builder',
            'hammer':              'hammer',
            'hacker':              'hacker',
            'hbuild':              'hbuild',
            // 'ulb' – usunięte
            'hk':                  '.hk',
            'hsh':                 'hsh',
            'hedit':               'hedit',
            'hdev':                'hdev',
            'ngt':                 'ngt',
            'penetration-mode':    'Penetration Mode',
            'cybersecurity-mode':  'Cybersecurity Mode',
            'hacker-term':         'Hacker Term',
            'hackerdeck':          'HackerDeck',
            'ghostfs':             'GhostFS',
            'hexai':               'HexAI',
            'hnm':                 'HNM',
            'hacker-mode':         'Hacker Mode',
            'isolator':            'Isolator',
            'hackeros-steam':      'HackerOS Steam',
            // Nowe pozycje (na przyszłość, gdybyś chciał użyć data-key)
            'hackeros-games':      'HackerOS Games',
            'deb-ostree':          'deb-ostree',
            'hackeros-kernel':     'HackerOS Kernel',
            'hwde':                'HWDE',
            'hacker-launcher':     'Hacker Launcher'
        },
        langDropLinks: {
            hsharp:     'H# – dokumentacja',
            hackerLang: 'Hacker Lang – dokumentacja',
        },
        slides: [
            { title: "gaming-cli", desc: "Narzędzie CLI dostępne wyłącznie w edycji HackerOS Gaming Edition. Jego kluczową funkcją jest przełączanie środowiska między KDE Plasma a trybem Game Mode. Oferuje również szereg dodatkowych funkcji ułatwiających zarządzanie środowiskiem gamingowym." },
            { title: "HPM", desc: "HackerOS Package Manager – repozytorium społecznościowe dla HackerOS. Każdy użytkownik może tworzyć, udostępniać i instalować pakiety, budując otwarty, dynamiczny ekosystem." },
            { title: "HackerOS Containers", desc: "Autorski system kontenerów zaprojektowany z myślą o lekkiej izolacji, wysokiej wydajności i łatwym zarządzaniu środowiskami aplikacji. W pełni zintegrowany z jądrem HackerOS." },
            { title: "HackerOS Builder", desc: "Narzędzie do budowania obrazów OCI inspirowane bootc. Może działać jako nakładka dla live-build, jako samodzielny niezależny builder lub jako narzędzie do tworzenia w pełni konfigurowalnych środowisk live i obrazów wdrożeniowych." },
            { title: "hammer", desc: "Narzędzie do atomowej instalacji oraz aktualizacji pakietów. Wykorzystywane wyłącznie w edycji Atomic HackerOS – gwarantuje nieuszkadzalne aktualizacje i możliwość przywracania poprzednich stanów systemu." },
            { title: "hacker", desc: "hacker – serce systemu. Zaawansowane narzędzie do monitorowania, zarządzania procesami i konfiguracją w czasie rzeczywistym. Stanowi fundament interakcji z jądrem oraz usprawnia diagnostykę." },
            { title: "hbuild", desc: "Własna, autorska alternatywa dla Meson, CMake, Make oraz Ninja. Upraszcza proces kompilacji oprogramowania dzięki deklaratywnym skryptom, inteligentnemu cache'owaniu i modułowej architekturze." },
            { title: ".hk", desc: "Format plików .hk używany do konfiguracji systemu oraz aplikacji. Zapewnia czytelną, hierarchiczną składnię, natywne wsparcie w narzędziach HackerOS oraz możliwość rozszerzeń poprzez wbudowane schematy." },
            { title: "hsh", desc: "hsh – nowoczesna powłoka systemowa, zaawansowana alternatywa dla ZSH i Bash. Oferuje rozszerzone możliwości skryptowe, lepszą autokompletację, wbudowane wsparcie dla kontenerów i natywne integracje z .hk." },
            { title: "HexAI", desc: "HexAI – Zintegrowany asystent AI dla HackerOS, wymagający wydajnego komputera. Oferuje lokalne wnioskowanie, analizę kodu źródłowego, generowanie skryptów oraz inteligentne wsparcie administracji z zachowaniem pełnej prywatności." },
            { title: "GhostFS", desc: "GhostFS – Zaawansowany system plików dla HackerOS, dostępny w dwóch edycjach: Cybersecurity (szyfrowanie, ukrywanie śladów, steganografia) oraz Normal (szybkość, niezawodność i pełna zgodność z aplikacjami). Idealny do zarządzania danymi." },
            { title: "HackerDeck", desc: "HackerDeck – nakładka środowiskowa dla Waydroid, pozwalająca uruchamiać aplikacje Android w HackerOS z pełną integracją, optymalizacją wydajności i dedykowanymi ustawieniami dla graczy oraz programistów." },
            { title: "hedit", desc: "hedit – edytor tekstu inspirowany klasycznym nano, w pełni zintegrowany z HackerOS. Łączy prostotę obsługi z zaawansowanymi funkcjami, takimi jak podświetlanie składni, obsługa makr oraz bezpośrednia edycja plików systemowych w trybie tekstowym." },
            { title: "hdev", desc: "hdev – edytor TUI i GUI dla HackerOS. Zaawansowane środowisko programistyczne z interfejsem tekstowym (TUI) oraz graficznym (GUI). Obsługuje projekty w wielu językach, debugowanie, terminal integracji i wbudowany system kontroli wersji." },
            { title: "ngt", desc: "ngt – narzędzie do zarządzania plikami inspirowane Midnight Commanderem (MC). Oferuje dwupanelowy interfejs, szybką nawigację, zaawansowane operacje na plikach (kopiowanie, przenoszenie, uprawnienia) oraz wbudowany podgląd plików i archiwów – niezbędne w codziennej pracy administratora." },
            { title: "Penetration Mode", desc: "Sesja z własnymi narzędziami do testów penetracyjnych. Jest to aplikacja wbudowana w HackerOS Cybersecurity Edition, która uruchamia dedykowane środowisko z frameworkami (Metasploit, Nmap, Burp Suite, własne skrypty) – idealna dla etycznych hackerów i zespołów Red Team." },
            { title: "Cybersecurity Mode", desc: "Narzędzie zarówno do defensywy, jak i ofensywy. Działa w lekkim kontenerze, używane i wbudowane w HackerOS Cybersecurity Edition jako aplikacja oraz jako sesja. Łączy monitoring zagrożeń, IDS/IPS, skanowanie podatności oraz taktyki adversary emulation – wszystko w izolowanym środowisku." },
            { title: "Hacker Term", desc: "Terminal dla dystrybucji Linuxa HackerOS. Nowoczesna powłoka z zaawansowaną autokompletacją, wieloma oknami, natywnym wsparciem dla kontenerów HackerOS, skryptami .hk i integracją z narzędziami pentesterskimi. Zapewnia pełną kontrolę nad systemem i środowiskiem deweloperskim." },
            { title: "HackerOS Nix Manager", desc: "Nakładka dla Nix – zarządzanie pakietami i środowiskami w HackerOS z wykorzystaniem Nix. Umożliwia deklaratywną konfigurację systemu, odtwarzalne środowiska deweloperskie oraz integrację z ekosystemem Nixpkgs." },
            { title: "Hacker Mode", desc: "Sesja do gier inspirowana GameHub / Steam GamePadUI. Uruchamia specjalne środowisko zoptymalizowane dla kontrolerów, dużego ekranu i łatwego dostępu do bibliotek gier. Idealne do Steam, emulatorów i natywnych tytułów." },
            { title: "Isolator", desc: "Nakładka dla podmana z własną listą pakietów. Określa, w którym kontenerze każdy pakiet ma być instalowany. Dzięki temu łatwo zarządzasz aplikacjami w izolowanych środowiskach, zapewniając separację i bezpieczeństwo." },
            { title: "HackerOS Steam", desc: "Uruchom Steam w kontenerze Arch Linux. Dzięki izolacji i pełnej kompatybilności z bibliotekami Steam, możesz grać w swoje ulubione tytuły na HackerOS, zachowując czystość systemu głównego." },
            { title: "vira", desc: "Język programowania vira – tłumaczony do Rust, przeznaczony głównie dla aplikacji GUI. Instalacja: hacker unpack vira-lang." },
            // Nowe slajdy dla dodanych narzędzi
            { title: "HackerOS Games", desc: "HackerOS Games to platforma do uruchamiania i zarządzania grami, zintegrowana z systemem. Umożliwia łatwy dostęp do bibliotek gier natywnych oraz emulowanych, oferując wygodny interfejs i optymalizację pod kątem wydajności." },
            { title: "deb-ostree", desc: "deb‑ostree to odpowiednik rpm‑ostree dla Debiana – umożliwia atomowe aktualizacje całego systemu, zapewniając niezawodność, możliwość wycofania zmian oraz sprawne zarządzanie wersjami obrazów systemowych." },
            { title: "HackerOS Kernel", desc: "HackerOS domyślnie wykorzystuje autorskie jądro HackerOS Kernel w edycji cybersecurity, które jest specjalnie dostosowane do wymogów tej edycji. Planowane jest również wprowadzenie HackerOS Kernel jako domyślnego jądra w wersji official, zastępując standardowe jądro Debiana." },
            { title: "HWDE", desc: "HWDE (HackerOS Wayland Desktop Environment) to dedykowane środowisko graficzne dla HackerOS, zbudowane na bazie Wayland. Stanowi nowoczesną, lekką i wydajną alternatywę dla KDE czy GNOME, zoptymalizowaną pod kątem bezpieczeństwa i pracy w systemach cybersecurity." },
            { title: "Hacker Launcher", desc: "Hacker Launcher to aplikacja umożliwiająca uruchamianie natywnych gier Linuxa oraz gier z Windowsa (przy użyciu Protona). Zapewnia wygodny dostęp do bibliotek gier, zarządzanie konfiguracjami i optymalizację ustawień dla różnych tytułów." }
        ]
    },
    en: {
        pageTitle:    'HackerOS · Ecosystem & Tools',
        sectionH2:    'Explore the HackerOS ecosystem.',
        footerCopy:   'HackerOS · © 2026 HackerOS. All rights reserved. | HackerOS ecosystem documentation',
        langDropBtn:  'Programming Languages',
        navItems: {
            'gaming-cli':          'gaming-cli',
            'hpm':                 'HPM',
            'hackeros-containers': 'HackerOS Containers',
            'hackeros-builder':    'HackerOS Builder',
            'hammer':              'hammer',
            'hacker':              'hacker',
            'hbuild':              'hbuild',
            // 'ulb' removed
            'hk':                  '.hk',
            'hsh':                 'hsh',
            'hedit':               'hedit',
            'hdev':                'hdev',
            'ngt':                 'ngt',
            'penetration-mode':    'Penetration Mode',
            'cybersecurity-mode':  'Cybersecurity Mode',
            'hacker-term':         'Hacker Term',
            'hackerdeck':          'HackerDeck',
            'ghostfs':             'GhostFS',
            'hexai':               'HexAI',
            'hnm':                 'HNM',
            'hacker-mode':         'Hacker Mode',
            'isolator':            'Isolator',
            'hackeros-steam':      'HackerOS Steam',
            // New entries
            'hackeros-games':      'HackerOS Games',
            'deb-ostree':          'deb-ostree',
            'hackeros-kernel':     'HackerOS Kernel',
            'hwde':                'HWDE',
            'hacker-launcher':     'Hacker Launcher'
        },
        langDropLinks: {
            hsharp:     'H# – documentation',
            hackerLang: 'Hacker Lang – documentation',
        },
        slides: [
            { title: "gaming-cli", desc: "A CLI tool available exclusively in HackerOS Gaming Edition. Its primary function is seamlessly switching the desktop environment between KDE Plasma and Game Mode. It also provides a range of additional features designed to streamline gaming environment management." },
            { title: "HPM", desc: "HackerOS Package Manager – community repository for HackerOS. Any user can create, share and install packages, building an open, dynamic ecosystem." },
            { title: "HackerOS Containers", desc: "Custom container system designed for lightweight isolation, high performance and easy application environment management. Fully integrated with the HackerOS kernel." },
            { title: "HackerOS Builder", desc: "A tool for building OCI images inspired by bootc. Can be used as an overlay for live-build, as a fully independent standalone builder, or as a tool for creating configurable live environments and deployment images." },
            { title: "hammer", desc: "Tool for atomic package installation and updates. Used exclusively in the HackerOS Atomic edition – guarantees non-destructive updates and the ability to restore previous system states." },
            { title: "hacker", desc: "hacker – the heart of the system. Advanced tool for real-time monitoring, process and configuration management. It forms the foundation of kernel interaction and improves diagnostics." },
            { title: "hbuild", desc: "Custom alternative to Meson, CMake, Make and Ninja. Simplifies the software compilation process through declarative scripts, intelligent caching and modular architecture." },
            { title: ".hk", desc: "The .hk file format used for system and application configuration. Provides a readable, hierarchical syntax, native support in HackerOS tools and extensibility through built-in schemas." },
            { title: "hsh", desc: "hsh – modern system shell, advanced alternative to ZSH and Bash. Offers extended scripting capabilities, better autocomplete, built-in container support and native .hk integrations." },
            { title: "HexAI", desc: "HexAI – Integrated AI assistant for HackerOS, requiring a powerful computer. Offers local inference, source code analysis, script generation and intelligent administration support with full privacy." },
            { title: "GhostFS", desc: "GhostFS – Advanced file system for HackerOS, available in two editions: Cybersecurity (encryption, trace hiding, steganography) and Normal (speed, reliability and full application compatibility). Ideal for data management." },
            { title: "HackerDeck", desc: "HackerDeck – environmental overlay for Waydroid, allowing Android apps to run in HackerOS with full integration, performance optimization and dedicated settings for gamers and developers." },
            { title: "hedit", desc: "hedit – text editor inspired by classic nano, fully integrated with HackerOS. Combines ease of use with advanced features such as syntax highlighting, macro support and direct system file editing in text mode." },
            { title: "hdev", desc: "hdev – TUI and GUI editor for HackerOS. Advanced development environment with text (TUI) and graphical (GUI) interface. Supports multi-language projects, debugging, integration terminal and built-in version control system." },
            { title: "ngt", desc: "ngt – file management tool inspired by Midnight Commander (MC). Offers dual-panel interface, fast navigation, advanced file operations (copy, move, permissions) and built-in file and archive preview – essential for daily administrator work." },
            { title: "Penetration Mode", desc: "Session with custom penetration testing tools. It is an application built into HackerOS Cybersecurity Edition that launches a dedicated environment with frameworks (Metasploit, Nmap, Burp Suite, custom scripts) – ideal for ethical hackers and Red Teams." },
            { title: "Cybersecurity Mode", desc: "Tool for both defense and offense. Runs in a lightweight container, used and built into HackerOS Cybersecurity Edition as an application and session. Combines threat monitoring, IDS/IPS, vulnerability scanning and adversary emulation tactics – all in an isolated environment." },
            { title: "Hacker Term", desc: "Terminal for the HackerOS Linux distribution. Modern shell with advanced autocomplete, multiple windows, native HackerOS container support, .hk scripts and pentesting tool integration. Provides full control over the system and development environment." },
            { title: "HackerOS Nix Manager", desc: "Nix overlay – package and environment management in HackerOS using Nix. Enables declarative system configuration, reproducible development environments and integration with the Nixpkgs ecosystem." },
            { title: "Hacker Mode", desc: "Gaming session inspired by GameHub / Steam GamePadUI. Launches a special environment optimized for controllers, large screens and easy access to game libraries. Perfect for Steam, emulators and native titles." },
            { title: "Isolator", desc: "Podman overlay with its own package list. Specifies which container each package should be installed in. This makes it easy to manage applications in isolated environments, ensuring separation and security." },
            { title: "HackerOS Steam", desc: "Run Steam in an Arch Linux container. Thanks to isolation and full compatibility with Steam libraries, you can play your favorite titles on HackerOS while keeping the main system clean." },
            { title: "vira", desc: "vira programming language – translated to Rust, designed mainly for GUI applications. Install: hacker unpack vira-lang." },
            // New slides for added tools
            { title: "HackerOS Games", desc: "HackerOS Games is a platform for launching and managing games, fully integrated with the system. It provides easy access to native and emulated game libraries, offering a user-friendly interface and performance optimization." },
            { title: "deb-ostree", desc: "deb‑ostree is the Debian counterpart of rpm‑ostree – enabling atomic system updates, ensuring reliability, rollback capabilities and efficient version management of system images." },
            { title: "HackerOS Kernel", desc: "HackerOS by default uses the custom HackerOS Kernel in the cybersecurity edition, which is specially tailored for that edition's requirements. There are also plans to adopt HackerOS Kernel as the default kernel in the official version, replacing the standard Debian kernel." },
            { title: "HWDE", desc: "HWDE (HackerOS Wayland Desktop Environment) is a dedicated graphical environment for HackerOS, built on Wayland. It serves as a modern, lightweight and performant alternative to KDE or GNOME, optimized for security and cybersecurity workflows." },
            { title: "Hacker Launcher", desc: "Hacker Launcher is an application that allows you to run native Linux games as well as Windows games (using Proton). It provides convenient access to game libraries, configuration management and optimised settings for various titles." }
        ]
    }
};

// Language stubs (DE, FR, ES, IT, RU, UK, ZH, JA)
// They inherit from EN, but we keep them for consistency.
// They don't include new slides/navItems by default – but they will fall back to EN for missing keys.
// If you want to translate them fully, you can copy the EN slides and translate later.
// For now, we use the same slides as EN for all languages (except PL which is separate).
['de','fr','es','it','ru','uk','zh','ja'].forEach(function(lang) {
    window.HACKEROS_TRANS_TOOLS[lang] = Object.assign({},
                                                      window.HACKEROS_TRANS_TOOLS.en,
                                                      // Override only page-specific strings; slides/navItems remain from EN
                                                      {
                                                          // These are just examples – you can adjust translations as needed.
                                                          pageTitle: {
                                                              'de': 'HackerOS · Ökosystem & Tools',
                                                              'fr': 'HackerOS · Écosystème & outils',
                                                              'es': 'HackerOS · Ecosistema & herramientas',
                                                              'it': 'HackerOS · Ecosistema & strumenti',
                                                              'ru': 'HackerOS · Экосистема и инструменты',
                                                              'uk': 'HackerOS · Екосистема та інструменти',
                                                              'zh': 'HackerOS · 生态系统与工具',
                                                              'ja': 'HackerOS · エコシステム & ツール'
                                                          }[lang],
                                                          sectionH2: {
                                                              'de': 'Das HackerOS-Ökosystem entdecken.',
                                                              'fr': 'Découvrez l\'écosystème HackerOS.',
                                                              'es': 'Explora el ecosistema de HackerOS.',
                                                              'it': 'Scopri l\'ecosistema di HackerOS.',
                                                              'ru': 'Познакомьтесь с экосистемой HackerOS.',
                                                              'uk': 'Ознайомтеся з екосистемою HackerOS.',
                                                              'zh': '探索 HackerOS 生态系统。',
                                                              'ja': 'HackerOS エコシステムを探索する。'
                                                          }[lang],
                                                          footerCopy: {
                                                              'de': 'HackerOS · © 2026 HackerOS. Alle Rechte vorbehalten. | HackerOS Ecosystem-Dokumentation',
                                                              'fr': 'HackerOS · © 2026 HackerOS. Tous droits réservés. | Documentation écosystème HackerOS',
                                                              'es': 'HackerOS · © 2026 HackerOS. Todos los derechos reservados. | Documentación del ecosistema HackerOS',
                                                              'it': 'HackerOS · © 2026 HackerOS. Tutti i diritti riservati. | Documentazione ecosistema HackerOS',
                                                              'ru': 'HackerOS · © 2026 HackerOS. Все права защищены. | Документация экосистемы HackerOS',
                                                              'uk': 'HackerOS · © 2026 HackerOS. Усі права захищені. | Документація екосистеми HackerOS',
                                                              'zh': 'HackerOS · © 2026 HackerOS. 保留所有权利。| HackerOS 生态系统文档',
                                                              'ja': 'HackerOS · © 2026 HackerOS. 全著作権所有。| HackerOS エコシステムドキュメント'
                                                          }[lang],
                                                          langDropBtn: {
                                                              'de': 'Programmiersprachen',
                                                              'fr': 'Langages de programmation',
                                                              'es': 'Lenguajes de programación',
                                                              'it': 'Linguaggi di programmazione',
                                                              'ru': 'Языки программирования',
                                                              'uk': 'Мови програмування',
                                                              'zh': '编程语言',
                                                              'ja': 'プログラミング言語'
                                                          }[lang],
                                                          langDropLinks: {
                                                              hsharp: {
                                                                  'de': 'H# – Dokumentation',
                                                                  'fr': 'H# – documentation',
                                                                  'es': 'H# – documentación',
                                                                  'it': 'H# – documentazione',
                                                                  'ru': 'H# – документация',
                                                                  'uk': 'H# – документація',
                                                                  'zh': 'H# – 文档',
                                                                  'ja': 'H# – ドキュメント'
                                                              }[lang],
                                                              hackerLang: {
                                                                  'de': 'Hacker Lang – Dokumentation',
                                                                  'fr': 'Hacker Lang – documentation',
                                                                  'es': 'Hacker Lang – documentación',
                                                                  'it': 'Hacker Lang – documentazione',
                                                                  'ru': 'Hacker Lang – документация',
                                                                  'uk': 'Hacker Lang – документація',
                                                                  'zh': 'Hacker Lang – 文档',
                                                                  'ja': 'Hacker Lang – ドキュメント'
                                                              }[lang]
                                                          }
                                                      }
    );
    // Ensure slides and navItems are copied from EN (they already are via Object.assign)
    // but if you want them explicitly, you can assign:
    // window.HACKEROS_TRANS_TOOLS[lang].slides = window.HACKEROS_TRANS_TOOLS.en.slides.slice();
    // window.HACKEROS_TRANS_TOOLS[lang].navItems = Object.assign({}, window.HACKEROS_TRANS_TOOLS.en.navItems);
});
