window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['install'] = `
<div class="section" id="install">
<div class="sec-header"><span class="sec-num">01</span><h2>Instalacja &amp; narzędzia</h2></div>
<p>Ekosystem H# składa się z czterech narzędzi: <strong>hsharp</strong>, <strong>vira</strong>, <strong>bytes</strong> i <strong>hsharp-compiler-llvm</strong>.</p>

<div class="grid2">
<div class="card"><div class="card-title">hsharp</div><div class="card-body">Główne CLI. Kompiluje przez <strong>Cranelift</strong> (natywnie — bez transpilacji do C), uruchamia interpreter (preview), sprawdza składnię i typy.</div></div>
<div class="card"><div class="card-title">vira</div><div class="card-body">Build manager dla projektów H#. Używa <strong>Cranelift</strong> dla debugowania i <strong>LLVM O3+AVX2</strong> dla release. Zarządza zależnościami z <code>vira.hcl</code>.</div></div>
<div class="card"><div class="card-title">bytes</div><div class="card-body">RAM-JIT package manager. Pakiety w <code>~/.hackeros/H#/libs/</code> (tmpfs). Konfiguracja: <code>bytes.toml</code>. Python interop przez venv.</div></div>
<div class="card"><div class="card-title">hsharp-compiler-llvm</div><div class="card-body">LLVM O3+AVX2 compiler dla release. Instalowany w <code>~/.hackeros/H#/bins/</code>. Wymaga <code>libLLVM-17.so</code>.</div></div>
</div>

<h3>Instalacja na HackerOS (Debian forky)</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Pobierz release</span>
tar -xzf h-sharp-0.1.0.tar.gz && cd h-sharp-0.1
sudo ./install.sh

<span class="t-comment">;; Binaries są teraz w:</span>
<span class="t-comment">;; /usr/local/bin/hsharp</span>
<span class="t-comment">;; /usr/local/bin/vira</span>
<span class="t-comment">;; /usr/local/bin/bytes</span>
<span class="t-comment">;; /usr/local/bin/hsharp-compiler-llvm</span>
<span class="t-comment">;; ~/.hackeros/H#/bins/*</span></pre></div></div>
</div>

<h3>Instalacja LLVM 17 (dla hsharp-compiler-llvm)</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">Debian forky/trixie</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Dodaj repo apt.llvm.org</span>
sudo tee /etc/apt/sources.list.d/llvm17.list << 'LLVM'
Types: deb
Architectures: amd64
Signed-By: /etc/apt/trusted.gpg.d/apt.llvm.org.asc
URIs: https://apt.llvm.org/unstable/
Suites: llvm-toolchain-17
Components: main
LLVM

wget -qO- https://apt.llvm.org/llvm-snapshot.gpg.key | \\
    sudo tee /etc/apt/trusted.gpg.d/apt.llvm.org.asc

sudo apt update
sudo apt install llvm-17-dev libpolly-17-dev libzstd-dev

<span class="t-comment">;; Build LLVM compiler ze źródeł</span>
LLVM_SYS_170_PREFIX=/usr/lib/llvm-17 \\
    cargo build --release -p hsharp-llvm-compiler</pre></div></div>
</div>

<h3>Podstawowe komendy</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — hsharp</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Interpreter — szybki podgląd</span>
hsharp preview src/main.h#

<span class="t-comment">;; Kompilacja Cranelift (natywna binarka, szybka kompilacja)</span>
hsharp build src/main.h#
hsharp build                        <span class="t-comment">;; wszystkie .h# w projekcie</span>

<span class="t-comment">;; Sprawdź składnię i typy</span>
hsharp check src/main.h#
hsharp check a.h# b.h# c.h#        <span class="t-comment">;; wiele plików naraz</span>

<span class="t-comment">;; Nowy projekt</span>
hsharp new moj-tool
hsharp new myapp --template cybersec</pre></div></div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — vira</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Nowy projekt</span>
vira new myapp

<span class="t-comment">;; Build: Cranelift (debug)</span>
vira build

<span class="t-comment">;; Build: LLVM O3+AVX2 (release — używa hsharp-compiler-llvm)</span>
vira build --release

<span class="t-comment">;; Zarządzanie pakietami</span>
vira add scanner/1.2
vira add github.com/user/mylib
vira install
vira clean                          <span class="t-comment">;; czyści .cache/ obok vira.hcl</span>
vira settings                       <span class="t-comment">;; TUI ustawień</span></pre></div></div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — bytes</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Nowy projekt bytes</span>
bytes new myapp && cd myapp

<span class="t-comment">;; Uruchom z JIT (RAM cache w ~/.hackeros/H#/libs/)</span>
bytes run
bytes run --tier interpreter         <span class="t-comment">;; czysty interpreter</span>
bytes run --tier bytecode            <span class="t-comment">;; bytecode VM</span>
bytes run --tier jit                 <span class="t-comment">;; Cranelift JIT (default)</span>

<span class="t-comment">;; Pakiety H#</span>
bytes add scanner
bytes add github.com/user/repo

<span class="t-comment">;; Pakiety Python</span>
bytes python numpy
bytes python cryptography

<span class="t-comment">;; Cache</span>
bytes clean                          <span class="t-comment">;; czyści ~/.hackeros/H#/libs/</span>
bytes cache                          <span class="t-comment">;; info o cache</span>
bytes settings                       <span class="t-comment">;; TUI motywu progress bara</span></pre></div></div>
</div>

<h3>Pliki konfiguracyjne</h3>
<table class="ref-table">
<tr><th>Narzędzie</th><th>Plik</th><th>Format</th><th>Opis</th></tr>
<tr><td class="td-syntax">hsharp</td><td class="td-note">h#.json</td><td class="td-desc">JSON</td><td class="td-desc">Metadane projektu</td></tr>
<tr><td class="td-syntax">vira</td><td class="td-note">vira.hcl / Vira.hcl</td><td class="td-desc">HCL</td><td class="td-desc">Projekt + zależności + typ wyjścia</td></tr>
<tr><td class="td-syntax">bytes</td><td class="td-note">bytes.toml</td><td class="td-desc">TOML</td><td class="td-desc">Projekt + JIT config + Python deps</td></tr>
</table>

<h3>Rozszerzenia plików</h3>
<table class="ref-table">
<tr><th>Rozszerzenie</th><th>Opis</th></tr>
<tr><td class="td-syntax">.h#</td><td class="td-desc">Główny format kodu źródłowego H#</td></tr>
<tr><td class="td-syntax">.hsp</td><td class="td-desc">Alternatywne rozszerzenie (H# script)</td></tr>
<tr><td class="td-syntax">.hsl</td><td class="td-desc">H# Library — skompilowana biblioteka (vira output type = "hsl")</td></tr>
</table>
</div>
`;
