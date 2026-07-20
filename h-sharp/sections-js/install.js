window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['install'] = `
<div class="section" id="install">
<div class="sec-header"><span class="sec-num">01</span><h2>Instalacja &amp; narzędzia</h2></div>
<p>Ekosystem H# składa się z dwóch narzędzi: <strong>h#</strong> (kompilator + interpreter CLI) i <strong>bytes</strong> (package manager i build system, napisany w H#).</p>

<div class="grid2">
<div class="card"><div class="card-title">h#</div><div class="card-body">Główne CLI. Kompiluje przez <strong>LLVM 21 O3+AVX2</strong> (produkcja), uruchamia interpreter (preview), sprawdza składnię i typy, tworzy projekty z szablonami (<code>app</code>, <code>web</code>, <code>tui</code>, <code>wasm</code>, <code>lib</code>, <code>cybersec</code>).</div></div>
<div class="card"><div class="card-title">bytes</div><div class="card-body">Package manager napisany w H#. Konfiguracja: <code>bytes.hk</code> (jeden plik, prosty format sekcyjny). Workspace, Python interop, test runner, formatter, doc gen.</div></div>
</div>

<h3>Instalacja na HackerOS</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Przez package manager HackerOS</span>
hacker unpack h#
hacker unpack h#-utils</pre></div></div>
</div>

<h3>Komendy h#</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Interpreter — natychmiastowy podgląd</span>
h# preview src/main.h#

<span class="t-comment">;; Kompilacja LLVM (natywna binarka)</span>
h# compile src/main.h#
h# compile src/main.h# --release -o myapp
h# compile src/main.h# --target linux-aarch64
h# compile src/main.h# --target wasm32 -o module.wasm

<span class="t-comment">;; Sprawdź składnię i typy</span>
h# check src/main.h#
h# check a.h# b.h# c.h#

<span class="t-comment">;; Nowy projekt</span>
h# new myapp
h# new myapp --template cybersec
h# new myapp --template web
h# new myapp --template tui
h# new myapp --template wasm
h# new myapp --template lib

<span class="t-comment">;; Dostępne targety kompilacji</span>
h# targets</pre></div></div>
</div>

<h3>bytes — Package Manager &amp; Build System</h3>
<p><strong>bytes</strong> to package manager i build system dla projektów H# — napisany w samym H# (nie w Rust), buduje przez <code>hsharp compile</code>/<code>build</code> (LLVM). Workspace dla projektów wielojęzykowych, Python interop, test runner, formatter, doc gen.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — bytes</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Nowy projekt</span>
bytes new myapp && cd myapp

<span class="t-comment">;; ── Budowanie / uruchomienie ──────────────────────────</span>
bytes build                      <span class="t-comment">;; kompiluje przez hsharp build (LLVM)</span>
bytes build --release
bytes run                        <span class="t-comment">;; build + uruchom</span>

<span class="t-comment">;; ── Pakiety H# ────────────────────────────────────────</span>
bytes add scanner                <span class="t-comment">;; z bytes registry</span>
bytes add github.com/user/repo   <span class="t-comment">;; z GitHub</span>
bytes install                    <span class="t-comment">;; zainstaluj wszystkie z bytes.hk</span>
bytes update                     <span class="t-comment">;; aktualizuj do latest</span>
bytes remove scanner

<span class="t-comment">;; ── Python interop ────────────────────────────────────</span>
bytes python numpy               <span class="t-comment">;; zainstaluj bibliotekę Python</span>
bytes python cryptography

<span class="t-comment">;; ── Narzędzia deweloperskie ───────────────────────────</span>
bytes test                       <span class="t-comment">;; test runner</span>
bytes test tests/core/ --verbose
bytes fmt                        <span class="t-comment">;; formatter (in-place)</span>
bytes doc                        <span class="t-comment">;; generuj HTML docs do docs/</span>

<span class="t-comment">;; ── Cache / środowisko ────────────────────────────────</span>
bytes clean                      <span class="t-comment">;; czyść .cache/ i build/</span>

<span class="t-comment">;; ── Workspace (multi-projekt) ─────────────────────────</span>
bytes workspace new monorepo --members "backend:h# frontend:rust tools:h#"
bytes workspace build            <span class="t-comment">;; zbuduj wszystkich członków równolegle</span>
bytes workspace run backend      <span class="t-comment">;; uruchom konkretny member</span></pre></div></div>
</div>

<h3>bytes.hk</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes.hk</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! H# project — bytes.hk</span>

[package]
-> name        => myapp
-> version     => 0.1.0
-> description => H# script project
-> entry       => src/main.h#

[build]
-> emit     => bin
-> mem-mode => safety    <span class="t-comment">! default | safety | arc | arena | pointers</span>

[dependencies]
<span class="t-comment">! scanner => latest</span>

[registry]
-> mode   => release     <span class="t-comment">! release (latest tag) | source (HEAD)</span></pre></div></div>
</div>

<h3>Workspace (bytes.hk — multi-language)</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes.hk — workspace</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! H# SPECIAL workspace — bytes.hk</span>

[workspace]
-> name    => monorepo
-> version => 0.1.0
-> mode    => special
-> members => ["backend", "frontend", "tools"]
-> languages
--> backend   => h#
--> frontend  => rust
--> tools     => h#

[build]
-> parallel => true
-> cache    => .cache/</pre></div></div>
</div>

<h3>Struktura projektu bytes</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">struktura</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>myapp/
├── bytes.hk            <span class="t-comment">← konfiguracja</span>
├── src/
│   ├── main.h#         <span class="t-comment">← punkt wejścia (entry)</span>
│   └── utils.h#
├── tests/
│   └── main_test.h#
└── docs/               <span class="t-comment">← generowane przez bytes doc</span></pre></div></div>
</div>

<h3>Plik konfiguracyjny</h3>
<table class="ref-table">
<tr><th>Narzędzie</th><th>Plik</th><th>Format</th><th>Opis</th></tr>
<tr><td class="td-syntax">bytes</td><td class="td-note">bytes.hk</td><td class="td-desc">HK (własny)</td><td class="td-desc">Projekt + build + dependencies + workspace + Python deps (<code>-> key => val</code>)</td></tr>
</table>

<h3>Rozszerzenia plików</h3>
<table class="ref-table">
<tr><th>Rozszerzenie</th><th>Opis</th></tr>
<tr><td class="td-syntax">.h#</td><td class="td-desc">Główny format kodu źródłowego H#</td></tr>
<tr><td class="td-syntax">.hsp</td><td class="td-desc">Alternatywne rozszerzenie (H# script)</td></tr>
<tr><td class="td-syntax">.hsl</td><td class="td-desc">H# Library — skompilowana biblioteka</td></tr>
</table>
</div>
`;
