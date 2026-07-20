window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['intro'] = `
<div class="hero" id="intro">
<div class="hero-tag">H# Language &middot; HackerOS-first compiled language</div>
<h1>H<span class="accent">#</span><br><span class="accent2">Dokumentacja</span> v0.6</h1>
<p class="hero-desc">
H# to kompilowany, statycznie typowany język programowania stworzony dla HackerOS.
Zastępuje Pythona w narzędziach CLI, GUI, cybersec i codziennych skryptach.
Kompiluje do natywnych binarek przez <strong>LLVM 21</strong> (produkcja, O3+AVX2)
lub uruchamia się od razu przez interpreter (<strong>h# preview</strong>, szybki loop deweloperski).
Składnia inspirowana Ruby/Python, bezpieczeństwo pamięci z opcjonalnymi trybami <code>@safety</code>/<code>@arc</code>/<code>@arena</code>/<code>@pointers</code>.
</p>
<div class="badges">
<span class="badge b-red">v0.6</span>
<span class="badge b-cyan">HackerOS-first</span>
<span class="badge b-green">LLVM 21</span>
<span class="badge b-purple">bytes PM</span>
<span class="badge b-blue">84 std modules</span>
</div>

<div class="divider"></div>

<div class="grid3" style="margin-top:20px">
<div class="card">
<div class="card-title">h# preview</div>
<div class="card-body">Interpreter — natychmiastowe uruchomienie bez kompilacji. Idealny do skryptowania i debugowania. Pełna obsługa closures, async/await, string interpolation.</div>
</div>
<div class="card">
<div class="card-title">h# compile</div>
<div class="card-body">LLVM 21 O3+AVX2 — produkcyjna kompilacja do natywnej binarki. Zero transpilacji do C. AST → LLVM IR → obiekt → link. Cross-compilation: linux-x86_64, linux-aarch64, wasm32.</div>
</div>
<div class="card">
<div class="card-title">bytes build / run</div>
<div class="card-body">Package manager i build system napisany w H# — czyta <code>bytes.hk</code>, shelluje do <code>h# compile</code>/<code>build</code>. Python interop przez venv. Test runner, formatter, doc gen.</div>
</div>
</div>

<div class="divider"></div>

<h3>Kompilatory H#</h3>
<table class="ref-table">
<tr><th>Narzędzie</th><th>Backend</th><th>Użycie</th><th>Wydajność</th></tr>
<tr><td class="td-syntax">h# preview</td><td class="td-desc">Interpreter</td><td class="td-note">Szybki dev loop, zero kompilacji</td><td class="td-desc">~5-15% C</td></tr>
<tr><td class="td-syntax">h# compile</td><td class="td-desc">LLVM 21 O3+AVX2</td><td class="td-note">Produkcja, natywna binarka</td><td class="td-desc">~85-95% C</td></tr>
<tr><td class="td-syntax">h# compile --target wasm32</td><td class="td-desc">LLVM → WASM</td><td class="td-note">WebAssembly moduł</td><td class="td-desc">~70-80% native</td></tr>
<tr><td class="td-syntax">bytes build</td><td class="td-desc">LLVM (via h# compile)</td><td class="td-note">Produkcja, z bytes.hk</td><td class="td-desc">~85-95% C</td></tr>
</table>
</div>
`;
