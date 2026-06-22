window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['install'] = `
<div class="section" id="install">
<div class="sec-header"><span class="sec-num">01</span><h2>Instalacja &amp; narzędzia</h2></div>
<p>Ekosystem H# składa się z dwóch narzędzi: <strong>h#</strong> (kompilator + interpreter CLI) i <strong>bytes</strong> (JIT package manager z własnym build systemem).</p>

<div class="grid2">
<div class="card"><div class="card-title">h#</div><div class="card-body">Główne CLI. Kompiluje przez <strong>LLVM 21 O3+AVX2</strong> (produkcja), uruchamia interpreter (preview), sprawdza składnię i typy, tworzy projekty z szablonami (<code>app</code>, <code>web</code>, <code>tui</code>, <code>wasm</code>, <code>lib</code>, <code>cybersec</code>).</div></div>
<div class="card"><div class="card-title">bytes</div><div class="card-body">RAM-JIT package manager z własnym systemem buildowania. Konfiguracja: <code>bytes.toml</code> lub <code>bytes.hk</code>. Tryby: interpreter / bytecode / JIT. Workspace, Python interop, test runner, formatter, doc gen.</div></div>
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

<h3>bytes — JIT Package Manager &amp; Build System</h3>
<p><strong>bytes</strong> to nie tylko package manager — to kompletny system budowania projektów H# z trójpoziomowym JIT, workspace dla projektów wielojęzykowych i pełnym pipeline'em CI.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — bytes</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Nowy projekt</span>
bytes new myapp && cd myapp

<span class="t-comment">;; ── Uruchomienie ──────────────────────────────────────</span>
bytes run                        <span class="t-comment">;; JIT (domyślny)</span>
bytes run --tier interpreter     <span class="t-comment">;; czysty interpreter</span>
bytes run --tier bytecode        <span class="t-comment">;; bytecode VM (pośredni)</span>
bytes run --tier jit             <span class="t-comment">;; Cranelift JIT (RAM, brak artefaktów)</span>

<span class="t-comment">;; ── Pakiety H# ────────────────────────────────────────</span>
bytes add scanner                <span class="t-comment">;; z bytes registry</span>
bytes add github.com/user/repo   <span class="t-comment">;; z GitHub</span>
bytes install                    <span class="t-comment">;; zainstaluj wszystkie z bytes.toml</span>
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
bytes clean                      <span class="t-comment">;; czyść ~/.hackeros/H#/libs/</span>
bytes cache                      <span class="t-comment">;; info o cache JIT</span>
bytes settings                   <span class="t-comment">;; TUI ustawień (motyw progress bara)</span>

<span class="t-comment">;; ── Workspace (multi-projekt) ─────────────────────────</span>
bytes workspace new monorepo --members "backend:h# frontend:rust tools:h#"
bytes workspace build            <span class="t-comment">;; zbuduj wszystkich członków równolegle</span>
bytes workspace run backend      <span class="t-comment">;; uruchom konkretny member</span></pre></div></div>
</div>

<h3>Tryby JIT — jak działa trójpoziomowy executor</h3>
<table class="ref-table">
<tr><th>Tryb</th><th>Jak działa</th><th>Cache</th><th>Wydajność</th></tr>
<tr><td class="td-syntax">interpreter</td><td class="td-desc">Drzewo AST ewaluowane bezpośrednio. Zero kompilacji, maksymalna elastyczność.</td><td class="td-note">Brak</td><td class="td-desc">~5-15% C</td></tr>
<tr><td class="td-syntax">bytecode</td><td class="td-desc">AST → bajtkod VM. Szybszy start niż JIT przy małych plikach.</td><td class="td-note">Sesja</td><td class="td-desc">~20-30% C</td></tr>
<tr><td class="td-syntax">jit <em>(domyślny)</em></td><td class="td-desc">Hot functions (po <code>hot_thresh</code> wywołań) kompilowane Cranetliftem do natywnego kodu w RAM. Artefakty w <code>~/.hackeros/H#/libs/session-PID/</code> (tmpfs) — znikają po zakończeniu.</td><td class="td-note">tmpfs RAM</td><td class="td-desc">~40-60% C</td></tr>
</table>

<h3>bytes.toml</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes.toml</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>[package]
name    = "myapp"
version = "0.1.0"
entry   = "src/main.h#"

[jit]
tier       = "jit"   <span class="t-comment">;; interpreter | bytecode | jit</span>
hot_thresh = 100     <span class="t-comment">;; JIT po 100 wywołaniach funkcji</span>

[run]
<span class="t-comment"># args    = ["--verbose"]</span>
<span class="t-comment"># timeout = 30</span>

[dependencies]
<span class="t-comment"># scanner = "latest"</span>

[python]
version  = "3.13"
packages = ["numpy", "cryptography"]

[workspace]
members = []
mode    = "standard"</pre></div></div>
</div>

<h3>bytes.hk (format HK — alternatywny)</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes.hk</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! H# project — bytes.hk</span>

[package]
-> name        => myapp
-> version     => 0.1.0
-> description => H# script project
-> entry       => src/main.h#

[jit]
-> tier       => jit
-> hot_thresh => 100

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
├── bytes.toml          <span class="t-comment">← konfiguracja (lub bytes.hk)</span>
├── src/
│   ├── main.h#         <span class="t-comment">← punkt wejścia (entry)</span>
│   └── utils.h#
├── tests/
│   └── main_test.h#
└── docs/               <span class="t-comment">← generowane przez bytes doc</span></pre></div></div>
</div>

<h3>Pliki konfiguracyjne</h3>
<table class="ref-table">
<tr><th>Narzędzie</th><th>Plik</th><th>Format</th><th>Opis</th></tr>
<tr><td class="td-syntax">h#</td><td class="td-note">h#.json</td><td class="td-desc">JSON</td><td class="td-desc">Metadane projektu</td></tr>
<tr><td class="td-syntax">bytes</td><td class="td-note">bytes.toml</td><td class="td-desc">TOML</td><td class="td-desc">Projekt + JIT config + workspace + Python deps</td></tr>
<tr><td class="td-syntax">bytes</td><td class="td-note">bytes.hk</td><td class="td-desc">HK</td><td class="td-desc">Alternatywny format (HackerOS native, <code>-> key => val</code>)</td></tr>
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
