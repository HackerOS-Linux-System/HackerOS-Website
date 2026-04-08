window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['struktura'] = `
<div class="section" id="struktura">
<div class="sec-header"><span class="sec-num">02</span><h2>Struktura projektu</h2></div>
<div class="grid2">
<div class="card"><div class="card-title">vira — projekt kompilowany</div><div class="card-body">Używa <code>vira.hcl</code>. Build przez Cranelift (debug) lub LLVM (--release). Cache w <code>.cache/</code> obok <code>vira.hcl</code>.</div></div>
<div class="card"><div class="card-title">bytes — projekt JIT</div><div class="card-body">Używa <code>bytes.toml</code>. Cache w <code>~/.hackeros/H#/libs/session-PID/</code> (tmpfs, RAM). Znika przy restarcie.</div></div>
</div>

<h3>Struktura projektu vira</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">vira projekt</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>moj-projekt/
├── vira.hcl          ← konfiguracja (HCL)
├── h#.json           ← metadane (opcjonalne)
├── .gitignore
├── src/              ← lub lib/ lub cmd/
│   ├── main.h#
│   └── utils.h#
├── .cache/           ← zależności (obok vira.hcl)
└── build/            ← skompilowana binarka</pre></div></div>
</div>

<h3>vira.hcl</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">vira.hcl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>project "myapp" {
  version     = "0.1.0"
  description = "H# app for HackerOS"
  h_sharp     = "0.1"
  src_dir     = "src"
}

output {
  type = "binary"   <span class="t-comment">;; binary | so | a | hsl</span>
}

dependencies {
  scanner        = "1.2"
  github.com/user/repo = "latest"
}</pre></div></div>
</div>

<h3>bytes.toml</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">bytes.toml</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>[package]
name    = "myapp"
version = "0.1.0"
entry   = "src/main.h#"

[jit]
tier       = "jit"   <span class="t-comment">;; interpreter | bytecode | jit</span>
hot_thresh = 100     <span class="t-comment">;; JIT after 100 calls</span>

[dependencies]
scanner = "1.2"

[python]
version  = "3.13"
packages = ["numpy", "cryptography"]</pre></div></div>
</div>

<h3>Struktura pliku .h#</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">szablon.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; 1. Importy</span>
<span class="t-kw">use</span> <span class="t-str">"std -> io"</span>       <span class="t-kw">from</span> <span class="t-str">"io"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sec"</span>      <span class="t-kw">from</span> <span class="t-str">"sec"</span>
<span class="t-kw">use</span> <span class="t-str">"vira -> scanner"</span> <span class="t-kw">from</span> <span class="t-str">"sc"</span>

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
