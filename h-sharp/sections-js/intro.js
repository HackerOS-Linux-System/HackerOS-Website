window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['intro'] = `
<div class="hero" id="intro">
<div class="hero-tag">H# Language &middot; HackerOS-first compiled language</div>
<h1>H<span class="accent">#</span><br><span class="accent2">Dokumentacja</span> v0.6</h1>
<p class="hero-desc">
H# to kompilowany, statycznie typowany język programowania stworzony dla HackerOS.
Zastępuje Pythona w narzędziach CLI, GUI, cybersec i codziennych skryptach.
Kompiluje do natywnych binarek przez <strong>LLVM 21</strong> (produkcja, O3+AVX2)
lub działa jako JIT przez <strong>Cranelift</strong> (bytes, szybki loop deweloperski).
Składnia inspirowana Ruby/Python, bezpieczeństwo pamięci z opcjonalnym borrow checkerem.
</p>
<div class="badges">
<span class="badge b-red">v0.6</span>
<span class="badge b-cyan">HackerOS-first</span>
<span class="badge b-green">LLVM 21</span>
<span class="badge b-amber">Cranelift JIT</span>
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
<div class="card-title">bytes run</div>
<div class="card-body">JIT w RAM — bez artefaktów. Cache w ~/.hackeros/H#/libs/ (tmpfs). Tryby: interpreter | bytecode | jit (Cranelift). Python interop przez venv. Test runner, formatter, doc gen.</div>
</div>
</div>

<div class="divider"></div>

<h3>Kompilatory H#</h3>
<table class="ref-table">
<tr><th>Narzędzie</th><th>Backend</th><th>Użycie</th><th>Wydajność</th></tr>
<tr><td class="td-syntax">h# preview</td><td class="td-desc">Interpreter</td><td class="td-note">Szybki dev loop, zero kompilacji</td><td class="td-desc">~5-15% C</td></tr>
<tr><td class="td-syntax">h# compile</td><td class="td-desc">LLVM 21 O3+AVX2</td><td class="td-note">Produkcja, natywna binarka</td><td class="td-desc">~85-95% C</td></tr>
<tr><td class="td-syntax">h# compile --target wasm32</td><td class="td-desc">LLVM → WASM</td><td class="td-note">WebAssembly moduł</td><td class="td-desc">~70-80% native</td></tr>
<tr><td class="td-syntax">bytes run --tier jit</td><td class="td-desc">Cranelift JIT</td><td class="td-note">RAM-JIT, brak artefaktów</td><td class="td-desc">~40-60% C</td></tr>
<tr><td class="td-syntax">bytes run --tier interpreter</td><td class="td-desc">Interpreter</td><td class="td-note">Tryb czysty, bez JIT</td><td class="td-desc">~5-15% C</td></tr>
</table>

<div class="divider"></div>

<h3>Roadmap</h3>
<table class="ref-table">
<tr><th>Wersja</th><th>Co zostało zrobione</th><th>Status</th></tr>
<tr><td class="td-syntax">v0.2</td><td class="td-desc">Parser, Interpreter, LLVM codegen, FFI extern, std 51 lib</td><td class="td-note" style="color:var(--c-green)">✅ Done</td></tr>
<tr><td class="td-syntax">v0.3</td><td class="td-desc">Operator ?, closures, stdlib real impl, async/await</td><td class="td-note" style="color:var(--c-green)">✅ Done</td></tr>
<tr><td class="td-syntax">v0.4</td><td class="td-desc">Generics runtime, traits dispatch, modules, string interpolation</td><td class="td-note" style="color:var(--c-green)">✅ Done</td></tr>
<tr><td class="td-syntax">v0.5</td><td class="td-desc">Borrow checker / lifetimes (region-based safety)</td><td class="td-note" style="color:var(--c-green)">✅ Done</td></tr>
<tr><td class="td-syntax">v0.6</td><td class="td-desc">Test suite (200+ testów), std pełne implementacje, szablony web/tui/wasm/lib, fmt/doc</td><td class="td-note" style="color:var(--c-green)">✅ Done</td></tr>
<tr><td class="td-syntax">v0.7</td><td class="td-desc">LLVM codegen rozbudowa, profiling, large projects, WASM target stable, error messages v2</td><td class="td-note" style="color:var(--c-amber)">🔨 In Progress</td></tr>
<tr><td class="td-syntax">v1.0</td><td class="td-desc">Stable + editions (2026, 2027...)</td><td class="td-note" style="color:var(--c-cyan)">🎯 Goal</td></tr>
</table>

<div class="divider"></div>

<h3>Co wymaga rozbudowy w v0.7</h3>
<div class="grid2" style="margin-top:12px">
<div class="card"><div class="card-title">🔨 LLVM codegen — rozbudowa</div><div class="card-body">Codegen obsługuje podstawowe typy i kontrolę przepływu. Brakuje: generics monomorphizacja w codegenie, closures → LLVM IR (lambda lifting), async/await → state machine, match exhaustiveness w LLVM.</div></div>
<div class="card"><div class="card-title">🔨 Error messages v2</div><div class="card-body">Obecne komunikaty błędów są dobre dla prostych przypadków. Brakuje: span-based multiline errors jak w Rust, sugestie poprawek ("did you mean?"), wskazywanie konkretnej kolumny.</div></div>
<div class="card"><div class="card-title">🔨 Stdlib — brakujące ciała</div><div class="card-body">Wiele z 84 modułów std ma API zdefiniowane przez <code>__builtin_*</code>, ale brak bindingów runtime. Priorytet: <code>sqlite</code>, <code>postgres</code>, <code>redis</code>, <code>grpc</code>, <code>websocket</code>.</div></div>
<div class="card"><div class="card-title">🔨 WASM target</div><div class="card-body">Kompilacja WASM działa dla prostych funkcji. Brakuje: importy JS, WASM memory model, wasm-bindgen-style macros, WASI target dla serverless.</div></div>
<div class="card"><div class="card-title">🔨 Profiling & benchmarks</div><div class="card-body">Brak wbudowanego profilera. Plan: <code>h# profile src/main.h#</code> → flamegraph + annotated output. Benchmark runner: <code>bytes bench</code>.</div></div>
<div class="card"><div class="card-title">🔨 Large project support</div><div class="card-body">Incremental compilation (zmienione pliki tylko), build cache między sesjami, parallel compilation, dependency graph z wykrywaniem cykli.</div></div>
</div>
</div>
`;
