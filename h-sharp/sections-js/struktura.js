window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['struktura'] = `
<div class="section" id="struktura">
<div class="sec-header"><span class="sec-num">02</span><h2>Struktura projektu</h2></div>
<div class="grid2">
<div class="card"><div class="card-title">bytes — package manager H#</div><div class="card-body">Używa jednego pliku <code>bytes.hk</code> (własny prosty format sekcyjny, nie HCL ani TOML). Napisany w H# (zobacz <code>bytes_final</code>), buduje przez <code>hsharp compile</code>/<code>build</code> (LLVM).</div></div>
<div class="card"><div class="card-title">Python interop</div><div class="card-body">Sekcja <code>[python]</code> w <code>bytes.hk</code>. Pakiety instalowane do <code>~/.hackeros/H#/libs/session-PID/pyenv/</code> (tmpfs, RAM) — znikają przy restarcie.</div></div>
</div>

<h3>Struktura projektu bytes</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes projekt</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>moj-projekt/
├── bytes.hk           ← konfiguracja
├── .gitignore
├── src/              ← lub lib/ lub cmd/
│   ├── main.h#
│   └── utils.h#
├── .cache/           ← zależności (obok bytes.hk)
└── build/            ← skompilowana binarka</pre></div></div>
</div>

<h3>bytes.hk</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes.hk</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>[package]
-> name        => myapp
-> version     => 0.1.0
-> description => H# app for HackerOS
-> entry       => src/main.h#

[build]
-> emit        => bin        <span class="t-comment">;; bin | so | a</span>
-> flags       =>
;; Domyślny @tryb pamięci dla całego projektu (patrz sekcja "@ Adnotacje
;; trybu pamięci") — silniejsze niż to jest tylko własna @adnotacja
;; funkcji albo @: tryb na początku konkretnego pliku.
-> mem-mode    => safety     <span class="t-comment">;; default | safety | arc | arena | pointers</span>

[dependencies]
-> scanner => 1.2
-> github.com/user/repo => latest

[python]
-> packages => numpy,cryptography</pre></div></div>
</div>

<h3>Struktura pliku .h#</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">szablon.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; 1. Importy</span>
<span class="t-kw">use</span> <span class="t-str">"std -> io"</span>       <span class="t-kw">from</span> <span class="t-str">"io"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sec"</span>      <span class="t-kw">from</span> <span class="t-str">"sec"</span>
<span class="t-kw">use</span> <span class="t-str">"bytes -> scanner"</span> <span class="t-kw">from</span> <span class="t-str">"sc"</span>

<span class="t-comment">;; 2. Typy: struct, enum, trait</span>
<span class="t-kw">struct</span> Config <span class="t-kw">is</span>
    <span class="t-kw">pub</span> host: string
    <span class="t-kw">pub</span> port: int
<span class="t-kw">end</span>

<span class="t-comment">;; 3. Implementacje + funkcje</span>
<span class="t-kw">fn</span> <span class="t-func">init</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"Start!"</span>)
<span class="t-kw">end</span>

<span class="t-comment">;; 4. fn main() — punkt wejścia</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    init()
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
