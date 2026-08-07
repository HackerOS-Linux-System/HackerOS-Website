(function () {
    const NAV = {
        de: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        fr: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        es: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        it: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        ru: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        uk: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        zh: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
        ja: { 'hackeros-store': 'HackerOS Store', 'hackerscript': 'HackerScript', 'hwde': 'HWDE', 'blue-environment': 'Blue Environment', 'hacker-launcher': 'Hacker Launcher' },
    };

    const SLIDES = {
        de: {
            'HackerOS Store':  'HackerOS Store ist der Store für alle in HackerOS verfügbaren Programme – ein zentraler, komfortabler Ort zum Durchsuchen, Installieren und Aktualisieren von Anwendungen und Add-ons.',
            'HackerScript':    'HackerScript – eine experimentelle Hobby-Programmiersprache (nicht nur für HackerOS), die in einer einzigen Datei nach Rust und Python transpiliert wird und viele Ökosysteme unterstützt.',
            'HWDE':            'HWDE (HackerOS Wayland Desktop Environment) – die native grafische Umgebung von HackerOS: die Shell starthwde und der Wayland/XWayland-Compositor comphwde.',
            'Blue Environment':'Blue Environment – eine von LegendaryOS entwickelte grafische Umgebung, verfügbar im HackerOS-Werkzeug-Ökosystem.',
            'Hacker Launcher': 'Hacker Launcher ist eine Anwendung, mit der native Linux-Spiele sowie Windows-Spiele (über Proton) in einer einzigen Anwendung ausgeführt werden können.'
        },
        fr: {
            'HackerOS Store':  'HackerOS Store est la boutique de tous les programmes disponibles sur HackerOS – un endroit centralisé et pratique pour parcourir, installer et mettre à jour applications et extensions.',
            'HackerScript':    'HackerScript – un langage de programmation expérimental et amateur (pas seulement pour HackerOS), transpilé en Rust et Python dans un seul fichier, prenant en charge de nombreux écosystèmes.',
            'HWDE':            'HWDE (HackerOS Wayland Desktop Environment) – l\'environnement graphique natif de HackerOS : le shell starthwde et le compositeur Wayland/XWayland comphwde.',
            'Blue Environment':'Blue Environment – un environnement graphique développé par LegendaryOS, disponible dans l\'écosystème d\'outils HackerOS.',
            'Hacker Launcher': 'Hacker Launcher est une application permettant de lancer des jeux natifs Linux ainsi que des jeux Windows (via Proton) dans une seule application.'
        },
        es: {
            'HackerOS Store':  'HackerOS Store es la tienda de todos los programas disponibles en HackerOS: un lugar centralizado y cómodo para explorar, instalar y actualizar aplicaciones y complementos.',
            'HackerScript':    'HackerScript: un lenguaje de programación experimental y de hobby (no solo para HackerOS), transpilado a Rust y Python en un solo archivo, compatible con multitud de ecosistemas.',
            'HWDE':            'HWDE (HackerOS Wayland Desktop Environment): el entorno gráfico nativo de HackerOS, formado por el shell starthwde y el compositor Wayland/XWayland comphwde.',
            'Blue Environment':'Blue Environment: un entorno gráfico desarrollado por LegendaryOS, disponible dentro del ecosistema de herramientas de HackerOS.',
            'Hacker Launcher': 'Hacker Launcher es una aplicación que permite ejecutar juegos nativos de Linux y juegos de Windows (mediante Proton) en una sola aplicación.'
        },
        it: {
            'HackerOS Store':  'HackerOS Store è il negozio di tutti i programmi disponibili in HackerOS: un luogo centralizzato e comodo per sfogliare, installare e aggiornare applicazioni e componenti aggiuntivi.',
            'HackerScript':    'HackerScript – un linguaggio di programmazione sperimentale e amatoriale (non solo per HackerOS), transpilato in Rust e Python in un unico file, con supporto per numerosi ecosistemi.',
            'HWDE':            'HWDE (HackerOS Wayland Desktop Environment) – l\'ambiente grafico nativo di HackerOS: la shell starthwde e il compositor Wayland/XWayland comphwde.',
            'Blue Environment':'Blue Environment – un ambiente grafico sviluppato da LegendaryOS, disponibile nell\'ecosistema di strumenti di HackerOS.',
            'Hacker Launcher': 'Hacker Launcher è un\'applicazione che consente di avviare giochi nativi Linux e giochi Windows (tramite Proton) in un\'unica applicazione.'
        },
        ru: {
            'HackerOS Store':  'HackerOS Store — магазин всех доступных программ в HackerOS: единое удобное место для просмотра, установки и обновления приложений и дополнений.',
            'HackerScript':    'HackerScript — экспериментальный, любительский язык программирования (не только для HackerOS), транспилируемый в Rust и Python в одном файле, с поддержкой множества экосистем.',
            'HWDE':            'HWDE (HackerOS Wayland Desktop Environment) — нативное графическое окружение HackerOS: оболочка starthwde и композитор Wayland/XWayland comphwde.',
            'Blue Environment':'Blue Environment — графическое окружение, разрабатываемое LegendaryOS, доступное в экосистеме инструментов HackerOS.',
            'Hacker Launcher': 'Hacker Launcher — приложение, позволяющее запускать нативные Linux-игры, а также игры для Windows (через Proton) в одном приложении.'
        },
        uk: {
            'HackerOS Store':  'HackerOS Store — магазин усіх доступних програм у HackerOS: єдине зручне місце для перегляду, встановлення й оновлення застосунків і доповнень.',
            'HackerScript':    'HackerScript — експериментальна, аматорська мова програмування (не лише для HackerOS), яка транспілюється в Rust і Python в одному файлі та підтримує безліч екосистем.',
            'HWDE':            'HWDE (HackerOS Wayland Desktop Environment) — нативне графічне середовище HackerOS: оболонка starthwde та композитор Wayland/XWayland comphwde.',
            'Blue Environment':'Blue Environment — графічне середовище, що розробляється LegendaryOS, доступне в екосистемі інструментів HackerOS.',
            'Hacker Launcher': 'Hacker Launcher — застосунок, що дозволяє запускати нативні Linux-ігри, а також ігри для Windows (через Proton) в одному застосунку.'
        },
        zh: {
            'HackerOS Store':  'HackerOS Store 是 HackerOS 中所有可用程序的商店——一个集中、便捷的位置，用于浏览、安装和更新应用程序及附加组件。',
            'HackerScript':    'HackerScript ——一种实验性的业余爱好编程语言（不仅限于 HackerOS），在单个文件中转译为 Rust 和 Python，支持大量生态系统。',
            'HWDE':            'HWDE（HackerOS Wayland 桌面环境）—— HackerOS 的原生图形环境：starthwde 外壳程序与 comphwde Wayland/XWayland 合成器。',
            'Blue Environment':'Blue Environment —— 由 LegendaryOS 开发的图形环境，是 HackerOS 工具生态系统的一部分。',
            'Hacker Launcher': 'Hacker Launcher 是一款可在单一应用中运行原生 Linux 游戏以及（通过 Proton）Windows 游戏的启动器。'
        },
        ja: {
            'HackerOS Store':  'HackerOS Store は HackerOS で利用可能なすべてのプログラムのストアです。アプリやアドオンの閲覧・インストール・更新を行える一元化された便利な場所です。',
            'HackerScript':    'HackerScript は実験的なホビー向けプログラミング言語（HackerOS専用ではありません）で、単一ファイル内で Rust と Python にトランスパイルされ、多数のエコシステムをサポートします。',
            'HWDE':            'HWDE（HackerOS Wayland Desktop Environment）は HackerOS のネイティブなグラフィカル環境です：シェル starthwde と Wayland/XWayland コンポジター comphwde で構成されます。',
            'Blue Environment':'Blue Environment は LegendaryOS が開発するグラフィカル環境で、HackerOS ツールエコシステムの一部として利用できます。',
            'Hacker Launcher': 'Hacker Launcher は、ネイティブの Linux ゲームおよび（Proton経由の）Windowsゲームを1つのアプリケーションで実行できるアプリです。'
        }
    };

    if (!window.HACKEROS_TRANS_TOOLS) return;

    Object.keys(NAV).forEach(function (lang) {
        const bucket = window.HACKEROS_TRANS_TOOLS[lang];
        if (!bucket) return;

        // navItems: merge into a NEW object so we don't mutate the shared `en` reference.
        bucket.navItems = Object.assign({}, bucket.navItems, NAV[lang]);

        // slides: rebuild as a NEW array, translating titles we have text for.
        if (Array.isArray(bucket.slides)) {
            bucket.slides = bucket.slides.map(function (s) {
                if (SLIDES[lang] && SLIDES[lang][s.title]) {
                    return { title: s.title, desc: SLIDES[lang][s.title] };
                }
                return s;
            });
        }
    });
})();
