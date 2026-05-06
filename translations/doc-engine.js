const TAB_KEYS = [
    'introduction','hardware','installation','firstSteps',
    'environment','configuration','troubleshooting','license',
    'tools','programming','editions','gaming','gallery'
];

let currentActivePane = 'introduction';
let currentLang = 'pl';

/* ── DOM helpers ─────────────────────────────────────────────────────── */
function el(tag, text, isHTML, forceHTML) {
    const e = document.createElement(tag);
    if (forceHTML)   e.innerHTML  = forceHTML;
    else if (isHTML) e.innerHTML  = text || '';
    else             e.textContent = text || '';
    return e;
}
function ulEl(items) {
    const ul = document.createElement('ul');
    (items || []).forEach(it => { const li = document.createElement('li'); li.innerHTML = it; ul.appendChild(li); });
    return ul;
}
function olEl(items) {
    const ol = document.createElement('ol');
    (items || []).forEach(it => { const li = document.createElement('li'); li.innerHTML = it; ol.appendChild(li); });
    return ol;
}
function mkCopyBtn(cmd, t) {
    const btn = document.createElement('button');
    btn.className = 'copy-button';
    btn.dataset.command = cmd;
    btn.textContent = (t && t.copyBtn) ? t.copyBtn : 'Kopiuj';
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(cmd).then(() => {
            const orig = btn.textContent;
            btn.textContent = (t && t.copiedBtn) ? t.copiedBtn : 'Skopiowano!';
            setTimeout(() => { btn.textContent = orig; }, 1500);
        });
    });
    return btn;
}
function mkPre(cmdText, t) {
    const pre = document.createElement('pre');
    const span = document.createElement('span');
    span.textContent = cmdText;
    pre.appendChild(span);
    pre.appendChild(mkCopyBtn(cmdText, t));
    return pre;
}
function rebindCopyBtns(container, t) {
    container.querySelectorAll('.copy-button').forEach(btn => {
        const cmd = btn.dataset.command;
        btn.textContent = (t && t.copyBtn) ? t.copyBtn : 'Kopiuj';
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(cmd).then(() => {
                const orig = btn.textContent;
                btn.textContent = (t && t.copiedBtn) ? t.copiedBtn : 'Skopiowano!';
                setTimeout(() => { btn.textContent = orig; }, 1500);
            });
        });
    });
}

/* ── Tools table ─────────────────────────────────────────────────────── */
function buildToolsHTML(lang) {
    const en = (lang === 'en');
    const thTool = en ? 'Tool / Application' : 'Narzędzie / Aplikacja';
    const thDesc = en ? 'Description' : 'Opis';
    const thInst = en ? 'Installation / Notes' : 'Instalacja / Uwagi';

    const rows = [
        ['<code>ngt</code>',
            en ? 'File manager inspired by Midnight Commander, written in GoLang.' : 'Narzędzie inspirowane mc (Midnight Commander), napisane w GoLang.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>hedit</code>',
            en ? 'Text editor inspired by nano, written in GoLang.' : 'Edytor tekstu inspirowany nano, napisane w GoLang.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>hdev</code>',
            en ? 'TUI code editor.' : 'TUI edytor kodu.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>hbuild</code>',
            en ? 'Build tool inspired by cmake/meson, written in Rust.' : 'Narzędzie inspirowane cmake/meson, napisane w Rust.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>hacker</code>',
            en ? 'Main HackerOS tool: install, remove, repair, quick update.' : 'Główne narzędzie HackerOS: instaluj, usuwaj, napraw, szybka aktualizacja.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>HackerOS-Steam</code>',
            en ? 'Run Steam in an isolated container.' : 'Uruchom Steam w izolowanym środowisku (kontener).',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>lpm</code>',
            en ? 'Custom successor to apt (faster, optimized for HackerOS).' : 'Własny następca apt (szybszy i zoptymalizowany pod HackerOS).',
            '<code>hacker unpack lpm</code>'],
        ['<code>h#</code>',
            en ? 'Own programming language H# for general use in HackerOS.' : 'Własny język programowania H# do ogólnego zastosowania w HackerOS.',
            '<code>hacker unpack h#</code>'],
        ['<code>bytes</code>',
            en ? 'Package manager for H# (two modes: JIT interpretation, or: compilation to binary via hhc + llvm O3).' : 'Manager pakietów dla H# (dwie możliwości: interpretacja JIT, albo: kompilacja do binarki (za pomocą hhc + llvm O3)).',
            '<code>hacker unpack h#-utils</code>'],
        ['<code>hl</code>',
            en ? 'Hacker Lang – shell alternative / successor.' : 'Hacker Lang – następca shella (lub alternatywa).',
            en ? 'built-in all editions' : 'wbudowany w każdej edycji'],
        ['<code>hexai</code>',
            en ? 'AI for HackerOS – local assistant based on language models.' : 'AI dla HackerOS – lokalny asystent oparty na modelach językowych.',
            '<code>hacker unpack hexai</code>'],
        ['<code>hammer</code>',
            en ? 'Atomic package manager (Atomic edition only).' : 'Atomowy manager pakietów (dla edycji Atomic).',
            en ? 'Atomic edition only' : 'Tylko edycja Atomic'],
        ['<code>anvil</code>',
            en ? 'Read-only system management tool (Atomic edition only).' : 'Narzędzie do zarządzania systemem readonly (dla edycji Atomic).',
            en ? 'Atomic edition only' : 'Tylko edycja Atomic'],
        ['<code>isolator</code>',
            en ? 'Package manager overlay for distrobox/podman.' : 'Manager pakietów / nakładka dla distrobox.',
            en ? 'Atomic built-in; others: <code>hacker unpack isolator</code>' : 'Wbudowane w Atomic; inne: <code>hacker unpack isolator</code>'],
        ['<code>Hacker-Mode</code>',
            en ? 'Gaming session inspired by gamescope / Steam.' : 'Sesja inspirowana gamescope / Steam (tryb gry na pełnym ekranie).',
            '<code>hacker unpack hacker-mode</code>'],
        ['<code>bph</code>',
            en ? 'CLI educational penetration testing tool.' : 'Narzędzie CLI edukacyjne do testów penetracyjnych.',
            en ? 'Cybersecurity edition only' : 'Tylko edycja Cybersecurity'],
        ['<code>Hacker-Term</code>',
            en ? 'Custom HackerOS terminal with additional features.' : 'Własny terminal HackerOS (z dodatkowymi funkcjami).',
            en ? 'built-in all editions' : 'wbudowany w każdej edycji'],
        ['<code>HackerOS-App</code>',
            en ? 'Mobile application for Android phones.' : 'Aplikacja mobilna dla telefonów Android.',
            '<a href="https://github.com/HackerOS-Linux-System/HackerOS-App/releases/download/v0.4/HackerOS-App-0.4.apk" target="_blank" style="color:#FFF">APK v0.4</a>'],
        ['<code>hsh</code>',
            en ? 'Custom HackerOS shell (replaces bash/zsh).' : 'Własna powłoka HackerOS (zastępuje bash/zsh).',
            en ? 'built-in all editions' : 'wbudowana w każdej edycji'],
        ['<code>hpm</code>',
            en ? 'Community package manager repository.' : 'Manager pakietów z repozytorium community.',
            en ? 'built-in all editions' : 'wbudowany w każdej edycji'],
        ['<code>hnm</code>',
            en ? 'Nix overlay – integration with Nixpkgs repository.' : 'Nakładka dla Nix – integracja z repozytorium Nixpkgs.',
            en ? 'built-in all editions' : 'wbudowany we wszystkich edycjach'],
        ['<code>Hacker Launcher</code>',
            en ? 'Application for running Windows games via Proton.' : 'Aplikacja do uruchamiania gier Windowsowych (Proton).',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>HackerOS-Games</code>',
            en ? 'App to launch HackerOS games: StarBlaster, Bit Jump, The Racer, Bark Squadron.' : 'Aplikacja do uruchamiania gier od HackerOS: StarBlaster, Bit Jump, The Racer, Bark Squadron.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>getit</code>',
            en ? 'git + wget + custom GitHub/GitLab directory downloader.' : 'Połączenie git + wget + własnego systemu pobierania katalogów z GitHub/GitLab.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>chker</code>',
            en ? 'CLI tool to change the system kernel (Debian → XanMod or Liquorix).' : 'Narzędzie CLI do zmiany jądra systemowego (Debian → XanMod lub Liquorix).',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>eiq</code>',
            en ? 'Cybersecurity tool (background encryption).' : 'Narzędzie do cyberbezpieczeństwa (szyfrowanie w tle).',
            en ? 'Cybersecurity edition only' : 'Tylko edycja Cybersecurity'],
        ['<code>Cybersecurity Mode</code>',
            en ? 'Session/app overlay for cybersecurity tools (runs in container).' : 'Sesja/aplikacja nakładka dla narzędzi cyberbezpieczeństwa (działa w kontenerze).',
            en ? 'Cybersecurity edition only' : 'Tylko edycja Cybersecurity'],
        ['<code>Penetration Mode</code>',
            en ? 'App with custom penetration testing tools (educational only).' : 'Aplikacja z własnymi narzędziami do testów penetracyjnych (tylko do celów edukacyjnych).',
            en ? 'Cybersecurity edition only' : 'Tylko edycja Cybersecurity'],
        ['<code>HackerOS-Store</code>',
            en ? 'HackerOS store with programs and add-ons.' : 'Sklep HackerOS z programami i dodatkami.',
            en ? 'built-in all editions' : 'wbudowany we wszystkich edycjach'],
        ['<code>HackerOS-Containers</code>',
            en ? 'Custom container system – lightweight isolated environments.' : 'Własny system kontenerów – lekka, zintegrowana platforma izolowanych środowisk.',
            '<code>hacker unpack hackeros-containers</code>'],
        ['<code>HackerOS-Game-Mode</code>',
            en ? 'System overlay optimizing for gaming, shows FPS.' : 'Nakładka optymalizująca system pod kątem grania, wyświetla FPS.',
            '<code>hacker unpack hackeros-game-mode</code>'],
        ['<code>.hk</code>',
            en ? 'Configuration format used mainly in HackerOS, supported in H#/Hacker Lang and Rust.' : 'Format konfiguracyjny stosowany głównie w HackerOS – dostępny w H#/Hacker Lang i bibliotekach Rust.',
            en ? 'H#/Hacker Lang/Rust libs' : 'H#/Hacker Lang/biblioteki Rust'],
        ['Blue Environment',
            en ? 'Used in HackerOS Blue Edition with a custom graphical environment called Blue Environment.' : 'Używane w edycji HackerOS Blue Edition z autorskim środowiskiem graficznym o nazwie Blue Environment.',
            en ? 'Built-in natively in Blue Edition' : 'Wbudowane natywnie w Blue Edition'],
        ['<code>a</code>',
            en ? 'Simple CLI tool for quick system updates, written in Hacker Lang.' : 'Proste narzędzie CLI do prostych aktualizacji systemu napisane w Hacker Lang.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>GhostFS</code>',
            en ? 'Custom file system (Beta) – work in progress.' : 'Autorski system plików (Beta) – trwają prace.',
            en ? 'Not available yet' : 'Niedostępne (w trakcie prac)'],
        ['<code>HackerOS Cockpit</code>',
            en ? 'System control panel in the browser.' : 'Panel sterowania systemu w przeglądarce.',
            en ? 'built-in all editions' : 'wbudowane we wszystkich edycjach'],
        ['<code>vira</code>',
            en ? 'Vira programming language – translated to Rust (designed mainly for GUI applications).' : 'Język programowania vira – tłumaczony do rust (przeznaczony głównie dla aplikacji GUI).',
            '<code>hacker unpack vira-lang</code>'],
        ['<code>gaming-cli</code> / <code>gaming</code> / <code>gamescope-manager</code>',
            en ? 'Suite of CLI tools exclusive to HackerOS Gaming Edition. Manages Game Mode and handles seamless switching between KDE Plasma and gamescope-based Game Mode.' : 'Zestaw narzędzi CLI dostępny wyłącznie w edycji HackerOS Gaming Edition. Zarządza trybem Game Mode oraz obsługuje przełączanie pomiędzy środowiskiem KDE Plasma a trybem Game Mode opartym na Gamescope.',
            en ? 'Built-in – HackerOS Gaming Edition only' : 'Wbudowane w edycji HackerOS Gaming Edition'],
    ];

    const h2txt = en ? '9. Tools and Applications' : '9. Narzędzia i aplikacje';
    const ptxt  = en ? 'Full list of HackerOS custom tools and applications:' : 'Pełna lista autorskich narzędzi i aplikacji HackerOS:';
    const docTxt = en
        ? 'Full advanced tools documentation <a href="https://hackeros-linux-system.github.io/HackerOS-Website/tools-docs/index.html" target="_blank" style="color:#4a9eff">here</a>.'
        : 'Dla tych zaawansowanych narzędzi jest specjalna dokumentacja (<a href="https://hackeros-linux-system.github.io/HackerOS-Website/tools-docs/index.html" target="_blank" style="color:#4a9eff">tutaj</a>).';
    const tableRows = rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('');
    return `<h2>${h2txt}</h2><p>${ptxt}</p>
<table><thead><tr><th>${thTool}</th><th>${thDesc}</th><th>${thInst}</th></tr></thead>
<tbody>${tableRows}</tbody></table><p>${docTxt}</p>`;
}

/* ── Programming languages tab ───────────────────────────────────────── */
function buildProgrammingHTML(lang, t) {
    const en = (lang === 'en');
    const h2 = en ? '10. Programming Languages' : '10. Języki programowania';
    const copyLabel = (t && t.copyBtn) ? t.copyBtn : (en ? 'Copy' : 'Kopiuj');
    return `<h2>${h2}</h2>
<h3>Hacker Lang</h3>
<p>${en
    ? 'An efficient alternative to the shell with a unique syntax and its own shell environment.'
    : 'Jest to wydajna alternatywa dla shella z wyjątkową składnią. Hacker Lang ma zarówno własną unikalną składnię, jak i własną powłokę.'}</p>
<p><strong>${en ? 'Example usage' : 'Przykład użycia'}:</strong></p>
<pre><span>&gt; hacker update</span><button class="copy-button" data-command="hacker update">${copyLabel}</button></pre>
<p>${en ? 'More info in the' : 'Więcej informacji o składni i narzędziach Hacker Lang znajdziesz w'}
<a href="https://hackeros-linux-system.github.io/HackerOS-Website/hacker-lang/docs.html" target="_blank" style="color:#4a9eff">
${en ? 'official Hacker Lang documentation' : 'oficjalnej dokumentacji Hacker Lang'}</a>.</p>

<h3>H#</h3>
<p>${en
    ? 'HackerOS has its own fully integrated programming language called <strong>H#</strong>. Its main goal is use in HackerOS tools and the cybersecurity ecosystem.'
    : 'HackerOS posiada własny, w pełni zintegrowany z systemem język programowania o nazwie <strong>H#</strong>. Jego głównym celem jest zastosowanie w ogólnych narzędziach HackerOS oraz ekosystemie cybersecurity.'}</p>
<p><strong>${en ? 'Run modes' : 'Możliwości uruchomienia'}:</strong></p>
<ul>
<li><strong>${en ? 'Compiled' : 'Kompilowany'}</strong> – ${en ? 'compiles H# programs to native binary code.' : 'kompilacja do natywnego kodu binarnego.'}</li>
<li><strong>${en ? 'Interpreted (efficient - JIT)' : 'Interpretowany (wydajny - JIT)'}</strong> – ${en ? 'efficient JIT execution.' : 'wydajne uruchomienie JIT.'}</li>
<li><strong>${en ? 'Interpreted (preview)' : 'Interpretowany (podgląd)'}</strong> – ${en ? 'quick results preview.' : 'szybki podgląd efektów.'}</li>
</ul>
<p><strong>${en ? 'H# CLI tools' : 'Narzędzia CLI H#'}:</strong></p>
<ul>
<li><code>bytes</code> – ${en ? 'package manager for H#.' : 'manager pakietów dla H#.'}</li>
<li><code>hhc</code> – ${en ? 'LLVM compiler.' : 'kompilator LLVM.'}</li>
<li><code>h#</code> – ${en ? 'quick compilation / quick preview.' : 'szybka kompilacja / szybki podgląd.'}</li>
</ul>
<p>${en ? 'More info in the' : 'Więcej informacji znajdziesz w'}
<a href="https://hackeros-linux-system.github.io/HackerOS-Website/h-sharp/docs.html" target="_blank" style="color:#4a9eff">
${en ? 'official H# documentation' : 'oficjalnej dokumentacji H#'}</a>.</p>

<h3>vira</h3>
<p>${en
    ? 'vira is a programming language translated to Rust, designed mainly for GUI applications.'
    : 'vira to język programowania tłumaczony do Rust, przeznaczony głównie dla aplikacji GUI.'}</p>
<pre><span>hacker unpack vira-lang</span><button class="copy-button" data-command="hacker unpack vira-lang">${copyLabel}</button></pre>`;
}

/* ── Gallery tab ─────────────────────────────────────────────────────── */
function buildGalleryPane(lang) {
    const en = (lang === 'en');
    const div = document.createElement('div');
    div.id = 'pane-gallery';
    div.className = 'tab-pane';

    div.appendChild(el('h2', en ? '13. Gallery' : '13. Galeria'));

    const loadingP = document.createElement('p');
    loadingP.id = 'gallery-loading';
    loadingP.textContent = en ? 'Loading images from GitHub...' : 'Ładowanie zdjęć z GitHub...';
    loadingP.style.cssText = 'color:#888;font-style:italic;';
    div.appendChild(loadingP);

    const grid = document.createElement('div');
    grid.id = 'gallery-grid';
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:20px;';
    div.appendChild(grid);

    // Fetch gallery images from GitHub API (client-side, no CORS issue)
    const RAW_BASE = 'https://raw.githubusercontent.com/HackerOS-Linux-System/HackerOS-Website/main/gallery/';
    const API_URL = 'https://api.github.com/repos/HackerOS-Linux-System/HackerOS-Website/contents/gallery';

    fetch(API_URL, { headers: { 'Accept': 'application/vnd.github+json' } })
        .then(r => r.json())
        .then(files => {
            const images = Array.isArray(files)
                ? files.filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f.name))
                : [];

            loadingP.style.display = 'none';

            if (images.length === 0) {
                const noImg = document.createElement('p');
                noImg.textContent = en
                    ? 'No images found in the gallery yet. Check back later!'
                    : 'Brak zdjęć w galerii. Sprawdź ponownie później!';
                noImg.style.color = '#888';
                div.appendChild(noImg);
                return;
            }

            images.forEach(file => {
                const imgUrl = RAW_BASE + file.name;
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'background:#121212;border-radius:10px;overflow:hidden;border:1px solid #2f3a44;transition:transform .2s,box-shadow .2s;cursor:pointer;';
                wrapper.addEventListener('mouseover', () => { wrapper.style.transform = 'translateY(-3px)'; wrapper.style.boxShadow = '0 8px 20px rgba(0,0,0,.5)'; });
                wrapper.addEventListener('mouseout',  () => { wrapper.style.transform = ''; wrapper.style.boxShadow = ''; });

                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = file.name;
                img.loading = 'lazy';
                img.style.cssText = 'width:100%;height:180px;object-fit:cover;display:block;';
                img.onerror = () => { wrapper.style.display = 'none'; };

                // Click to open full size
                img.addEventListener('click', () => {
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
                    const bigImg = document.createElement('img');
                    bigImg.src = imgUrl;
                    bigImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.8);';
                    overlay.appendChild(bigImg);
                    overlay.addEventListener('click', () => overlay.remove());
                    document.body.appendChild(overlay);
                });

                const caption = document.createElement('p');
                caption.textContent = file.name.replace(/\.(png|jpg|jpeg|webp|gif)$/i, '').replace(/[-_]/g, ' ');
                caption.style.cssText = 'color:#888;font-size:12px;padding:8px 12px;text-align:center;';

                wrapper.appendChild(img);
                wrapper.appendChild(caption);
                grid.appendChild(wrapper);
            });
        })
        .catch(() => {
            loadingP.textContent = en
                ? 'Could not load gallery. Visit the GitHub repository directly.'
                : 'Nie można załadować galerii. Odwiedź repozytorium GitHub bezpośrednio.';
            loadingP.style.color = '#e05';
            const link = document.createElement('a');
            link.href = 'https://github.com/HackerOS-Linux-System/HackerOS-Website/tree/main/gallery';
            link.target = '_blank';
            link.textContent = en ? 'Open gallery on GitHub' : 'Otwórz galerię na GitHub';
            link.style.cssText = 'display:block;margin-top:8px;color:#4a9eff;';
            div.appendChild(link);
        });

    return div;
}

/* ── Editions tab ────────────────────────────────────────────────────── */
function buildEditionsPane(c, lang) {
    const div = document.createElement('div');
    div.id = 'pane-editions';
    div.className = 'tab-pane';

    div.appendChild(el('h2', c.h2));

    const editionDefs = [
        ['Official',       'official',  'official-edition.png', null],
        ['Hydra',          'hydra',      'hydra-edition.png', null],
        ['GNOME',          'gnome',      'gnome-edition.png', null],
        ['XFCE',           'xfce',       'xfce-edition.png', null],
        ['Blue',           'blue',       'blue-edition.png',
            'https://hackeros-linux-system.github.io/HackerOS-Website/Blue-Environment/docs.html'],
        ['Gaming',         'gaming',     'gaming-edition.png', null],
        ['Cybersecurity',  'cybersec',   null, null],
        ['LTS',            'lts',        null, null],
        ['Atomic',         'atomic',     null, null],
        ['NVIDIA',         'nvidia',     null, null],
    ];

    editionDefs.forEach(([name, cKey, imgSrc, docsUrl]) => {
        div.appendChild(el('h3', 'Edition ' + name));
        if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc; img.alt = name;
            img.style.cssText = 'max-width:100%;border-radius:12px;margin:15px 0;box-shadow:0 4px 12px rgba(0,0,0,.6);';
            div.appendChild(img);
        }
        div.appendChild(el('p', c[cKey], true));

        // Add documentation link for Blue edition
        if (docsUrl) {
            const en = (lang === 'en');
            const linkP = document.createElement('p');
            linkP.style.marginTop = '-8px';
            linkP.innerHTML = `${en ? 'Full documentation:' : 'Pełna dokumentacja:'} <a href="${docsUrl}" target="_blank" style="color:#4a9eff">${en ? 'here' : 'tutaj'}</a>`;
            div.appendChild(linkP);
        }
    });

    const rc = document.createElement('div');
    rc.className = 'release-cycle';
    rc.appendChild(el('h3', c.releaseCycleH));
    rc.appendChild(el('p', c.releaseCycleP, true));
    div.appendChild(rc);

    return div;
}

/* ── Build a single tab pane ─────────────────────────────────────────── */
function buildPane(key, c, t, lang) {
    if (key === 'gallery') return buildGalleryPane(lang);

    const div = document.createElement('div');
    div.id = 'pane-' + key;
    div.className = 'tab-pane';

    if (key === 'tools')       { div.innerHTML = buildToolsHTML(lang); rebindCopyBtns(div, t); return div; }
    if (key === 'programming') { div.innerHTML = buildProgrammingHTML(lang, t); rebindCopyBtns(div, t); return div; }
    if (key === 'editions')    { return buildEditionsPane(c || window.HACKEROS_TRANS_DOCS.en.content.editions, lang); }

    if (!c) {
        div.appendChild(el('p', '[Content not yet translated – showing English fallback]'));
        return div;
    }

    switch (key) {
        case 'introduction': {
            const heroImg = document.createElement('img');
            heroImg.src = 'installed-hackeros.png';
            heroImg.alt = 'Zainstalowany HackerOS';
            heroImg.style.cssText = 'max-width:100%;border-radius:10px;margin-bottom:20px;';
            div.appendChild(heroImg);
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('p', c.p1, true));
            div.appendChild(ulEl(c.list1));
            div.appendChild(el('p', c.p2, true));
            div.appendChild(el('h3', c.hPhilosophy));
            div.appendChild(el('p', c.pPhilosophy, true));
            div.appendChild(ulEl(c.listPhilosophy));
            div.appendChild(el('h3', c.hGoal));
            div.appendChild(el('p', c.pGoal, true));
            div.appendChild(ulEl(c.listGoal));
            break;
        }

        case 'hardware':
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('h3', c.hMin));
            div.appendChild(ulEl(c.listMin));
            div.appendChild(el('p', c.pMin));
            div.appendChild(el('h3', c.hRec));
            div.appendChild(ulEl(c.listRec));
            div.appendChild(el('h3', c.hArch));
            div.appendChild(ulEl(c.listArch));
            break;

        case 'installation':
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('h3', c.hDownload));
            div.appendChild(el('p', c.pDownload));
            div.appendChild(el('p', '', true,
                '<a href="https://hackeros-linux-system.github.io/HackerOS-Website/download.html" style="color:#4a9eff">https://hackeros-linux-system.github.io/HackerOS-Website/download.html</a>'));
            div.appendChild(el('h3', c.hBootable));
            div.appendChild(ulEl(c.listBootable));
            div.appendChild(mkPre('sudo dd if=HackerOS.iso of=/dev/sdX bs=4M status=progress oflag=sync', t));
            div.appendChild(el('h3', c.hLive));
            div.appendChild(el('p', c.pLive1, true));
            div.appendChild(el('p', c.pLive2, true));
            div.appendChild(el('h3', c.hInstall));
            div.appendChild(olEl(c.listInstall));
            div.appendChild(el('h3', c.hDual));
            div.appendChild(ulEl(c.listDual));
            break;

        case 'firstSteps':
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('h3', c.hLogin));
            div.appendChild(ulEl(c.listLogin));
            div.appendChild(el('h3', c.hPkgMgr));
            div.appendChild(el('p', c.pPkgMgr));
            div.appendChild(el('h4', 'APT (Debian)'));
            div.appendChild(mkPre('sudo apt update\nsudo apt upgrade\nsudo apt install <package>\nsudo apt remove <package>\nsudo apt autoremove\nsudo apt autoclean', t));
            div.appendChild(el('h4', 'Flatpak'));
            div.appendChild(mkPre('flatpak install <package>\nflatpak update\nflatpak remove <package>\nflatpak search <name>', t));
            div.appendChild(el('h4', 'Snap'));
            div.appendChild(mkPre('snap install <package>\nsnap refresh\nsnap remove <package>\nsnap find <name>', t));
            div.appendChild(el('h4', 'Brew (Homebrew)'));
            div.appendChild(mkPre('brew install <package>\nbrew upgrade\nbrew uninstall <package>\nbrew update', t));
            div.appendChild(el('h4', 'HackerOS Package Manager (hpm)'));
            div.appendChild(el('p', '', true, 'hpm – <a href="https://hackeros-linux-system.github.io/HackerOS-Website/tools-docs/hpm.html" target="_blank" style="color:#4a9eff">dokumentacja / documentation</a>'));
            div.appendChild(el('h4', 'HackerOS Nix Manager (hnm)'));
            div.appendChild(el('p', '', true, 'hnm – <a href="https://hackeros-linux-system.github.io/HackerOS-Website/tools-docs/hnm.html" target="_blank" style="color:#4a9eff">dokumentacja / documentation</a>'));
            div.appendChild(el('h3', c.hNetwork));
            div.appendChild(mkPre('hacker network', t));
            div.appendChild(el('p', c.pNetwork, true));
            div.appendChild(el('h3', c.hKernels));
            div.appendChild(el('p', c.pKernels, true));
            div.appendChild(mkPre('sudo chker xanmod\n# or / lub:\nsudo chker liquorix', t));
            div.appendChild(el('p', c.pKernelsDiff));
            break;

        case 'environment':
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('h3', c.hDefault));
            div.appendChild(el('p', c.pDefault, true));
            div.appendChild(el('h3', c.hPreinstalled));
            div.appendChild(ulEl(c.listPreinstalled));
            div.appendChild(el('h3', c.hInstallSoft));
            div.appendChild(ulEl(c.listInstallSoft));
            break;

        case 'configuration':
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('p', c.p1));
            div.appendChild(ulEl(c.list1));
            break;

        case 'troubleshooting':
            div.appendChild(el('h2', c.h2));
            div.appendChild(ulEl(c.list1));
            break;

        case 'license':
            div.appendChild(el('h2', c.h2));
            div.appendChild(ulEl(c.list1));
            break;

        case 'gaming':
            div.appendChild(el('h2', c.h2));
            div.appendChild(el('p', c.p1, true));
            div.appendChild(el('p', c.p2, true));
            break;
    }

    return div;
}

/* ── Build tab menu ──────────────────────────────────────────────────── */
function buildMenu(t, activePaneKey) {
    const ul = document.getElementById('tab-menu-ul');
    ul.innerHTML = '';
    t.tabs.forEach((label, i) => {
        const key = TAB_KEYS[i];
        const li = document.createElement('li');
        li.className = 'tab-link' + (key === activePaneKey ? ' active' : '');
        li.dataset.tab   = key;
        li.dataset.label = label;
        li.textContent = label;
        li.addEventListener('click', () => switchTab(key));
        ul.appendChild(li);
    });
}

function switchTab(key) {
    currentActivePane = key;
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    const targetLink = document.querySelector(`.tab-link[data-tab="${key}"]`);
    if (targetLink) targetLink.classList.add('active');
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const pane = document.getElementById('pane-' + key);
    if (pane) pane.classList.add('active');
    clearSearch();
}

/* ── Main applyLang ──────────────────────────────────────────────────── */
function applyLang(lang) {
    currentLang = lang;
    const t = window.HACKEROS_TRANS_DOCS[lang];
    if (!t) return;

    const contentSrc = (t.content && t.content !== null)
        ? t.content
        : (window.HACKEROS_TRANS_DOCS.en ? window.HACKEROS_TRANS_DOCS.en.content : {});

    document.documentElement.lang = lang;
    document.title = t.pageTitle;

    const si = document.getElementById('search-input');
    if (si) si.placeholder = t.searchPlaceholder;

    const fc = document.getElementById('footer-copy');
    if (fc) fc.textContent = t.footerCopy;

    ['home','download','releases','team','docs'].forEach(k => {
        const a = document.getElementById('nav-' + k);
        if (a) a.textContent = t['nav' + k.charAt(0).toUpperCase() + k.slice(1)];
    });

    buildMenu(t, currentActivePane);

    const area = document.getElementById('tab-content-area');
    area.innerHTML = '';
    TAB_KEYS.forEach(key => {
        const pane = buildPane(key, contentSrc[key] || null, t, lang);
        if (key === currentActivePane) pane.classList.add('active');
        area.appendChild(pane);
    });

    clearSearch();
}

window.__hackeros_applyLang = applyLang;

/* ── Full-content Search ─────────────────────────────────────────────── */
function clearSearch() {
    const si   = document.getElementById('search-input');
    const cb   = document.getElementById('clear-search');
    const note = document.getElementById('search-note');
    if (si) si.value = '';
    if (cb) cb.style.display = 'none';
    if (note) note.textContent = '';
    document.querySelectorAll('.tab-link').forEach(li => {
        li.classList.remove('search-hidden');
        li.textContent = li.dataset.label || li.textContent;
    });
}

function escapeRE(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function doSearch(rawTerm) {
    const note = document.getElementById('search-note');
    if (!rawTerm) { clearSearch(); return; }

    const term = rawTerm.toLowerCase();
    const re   = new RegExp(`(${escapeRE(rawTerm)})`, 'gi');
    let matchCount = 0;

    document.querySelectorAll('.tab-link').forEach(li => {
        const key    = li.dataset.tab;
        const label  = li.dataset.label || li.textContent;

        // Search in tab label AND full pane text content
        const pane     = document.getElementById('pane-' + key);
        const paneText = pane ? pane.innerText.toLowerCase() : '';
        const matches  = label.toLowerCase().includes(term) || paneText.includes(term);

        li.classList.toggle('search-hidden', !matches);

        if (matches) {
            matchCount++;
            // Highlight in the label only
            li.innerHTML = label.replace(re, '<span class="hl">$1</span>');
        } else {
            li.textContent = label;
        }
    });

    if (note) {
        note.textContent = matchCount > 0
            ? `${matchCount} result${matchCount > 1 ? 's' : ''} / wynik${matchCount > 1 ? 'i' : ''}`
            : 'No results / Brak wyników';
    }
}

/* ── Init ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const lang = window.HackerLang.getLang();
    applyLang(lang);

    const searchInput = document.getElementById('search-input');
    const clearBtn    = document.getElementById('clear-search');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const v = searchInput.value.trim();
            if (clearBtn) clearBtn.style.display = v ? 'block' : 'none';
            doSearch(v);
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearSearch();
            if (searchInput) searchInput.focus();
        });
    }
});
