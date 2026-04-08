window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['intro'] = `
<div class="hero" id="intro">
<div class="hero-tag">H# Language &middot; HackerOS-first compiled language</div>
<h1>H<span class="accent">#</span><br><span class="accent2">Dokumentacja</span> v0.1</h1>
<p class="hero-desc">
H# to skompilowany, statycznie typowany język programowania stworzony dla HackerOS.
Zastępuje Pythona w narzędziach CLI, GUI, cybersec i codziennych skryptach.
Kompiluje do natywnych binarek przez <strong>Cranelift</strong> (szybka kompilacja)
lub <strong>LLVM O3+AVX2</strong> (maksymalna wydajność przez vira --release).
Składnia inspirowana Ruby/Python, bezpieczeństwo pamięci jak w Rust.
</p>
<div class="badges">
<span class="badge b-red">v0.1</span>
<span class="badge b-cyan">HackerOS-first</span>
<span class="badge b-green">Cranelift backend</span>
<span class="badge b-amber">LLVM release</span>
<span class="badge b-purple">bytes JIT</span>
</div>

<div class="divider"></div>

<div class="grid3" style="margin-top:20px">
<div class="card">
<div class="card-title">hsharp build</div>
<div class="card-body">Cranelift — szybka kompilacja do natywnej binarki. Zero transpilacji do C. Bezpośrednio AST → LLVM IR via Cranelift.</div>
</div>
<div class="card">
<div class="card-title">vira build --release</div>
<div class="card-body">LLVM O3+AVX2 — produkcyjna kompilacja z pełną optymalizacją. Używa hsharp-compiler-llvm z ~/.hackeros/H#/bins/.</div>
</div>
<div class="card">
<div class="card-title">bytes run</div>
<div class="card-body">JIT w RAM — bez artefaktów. Cache w ~/.hackeros/H#/libs/ (tmpfs). Interpretery: interpreter | bytecode | jit.</div>
</div>
</div>

<div class="divider"></div>

<h3>Kompilatory H#</h3>
<table class="ref-table">
<tr><th>Narzędzie</th><th>Backend</th><th>Użycie</th><th>Wydajność</th></tr>
<tr><td class="td-syntax">hsharp preview</td><td class="td-desc">Interpreter</td><td class="td-note">Szybki dev loop, zero kompilacji</td><td class="td-desc">~5-15% C</td></tr>
<tr><td class="td-syntax">hsharp build</td><td class="td-desc">Cranelift</td><td class="td-note">Kompilacja do natywnej binarki</td><td class="td-desc">~65-75% C</td></tr>
<tr><td class="td-syntax">vira build</td><td class="td-desc">Cranelift</td><td class="td-note">Projekt multi-plikowy</td><td class="td-desc">~65-75% C</td></tr>
<tr><td class="td-syntax">vira build --release</td><td class="td-desc">LLVM O3+AVX2</td><td class="td-note">Produkcja, HackerOS release</td><td class="td-desc">~85-95% C</td></tr>
<tr><td class="td-syntax">bytes run --tier jit</td><td class="td-desc">Cranelift JIT</td><td class="td-note">RAM-JIT, brak artefaktów</td><td class="td-desc">~40-60% C</td></tr>
</table>
</div>
`;
