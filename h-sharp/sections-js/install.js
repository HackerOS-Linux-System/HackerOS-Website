window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['install'] = `
<div class="section" id="install">
<div class="sec-header"><span class="sec-num">01</span><h2>Instalacja &amp; narzędzia</h2></div>
<p>Ekosystem H# składa się z dwóch narzędzi CLI: <strong>hsharp</strong> — główny kompilator/interpreter, oraz <strong>bytes</strong> — package manager.</p>

<div class="grid2">
<div class="card"><div class="card-title">hsharp</div><div class="card-body">Główne narzędzie CLI. Kompiluje <code>.h#</code> do natywnej statycznej binarki, uruchamia interpreter (preview mode), sprawdza składnię i typy, tworzy nowe projekty.</div></div>
<div class="card"><div class="card-title">bytes</div><div class="card-body">Package manager H#. Pobiera biblioteki z repozytorium Bytes, zarządza zależnościami w <code>h#.json</code>, wyświetla animowany progress bar podczas instalacji.</div></div>
</div>

<h3>Podstawowe komendy</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment"># Uruchom w trybie interpretera (szybki dev loop)</span>
hsharp preview src/main.h#

<span class="t-comment"># Skompiluj do natywnej binarki (Linux x86_64 musl, w pełni statyczna)</span>
hsharp build

<span class="t-comment"># Cross-kompilacja na wybrany cel</span>
hsharp build --target windows-x86_64
hsharp build --target macos-aarch64
hsharp build --target linux-aarch64

<span class="t-comment"># Sprawdź składnię i typy (bez kompilacji)</span>
hsharp check
hsharp check src/main.h#

<span class="t-comment"># Utwórz nowy projekt</span>
hsharp new moj-tool
hsharp new pentest-kit --template cybersec
hsharp new net-scanner --template network
hsharp new mylib --template lib

<span class="t-comment"># Pokaż dostępne cele cross-kompilacji</span>
hsharp targets</pre></div></div>
</div>

<h3>Package manager: bytes</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — bytes</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment"># Dodaj bibliotekę (najnowsza wersja)</span>
bytes add scanner

<span class="t-comment"># Dodaj konkretną wersję</span>
bytes add scanner/1.2

<span class="t-comment"># Usuń bibliotekę</span>
bytes remove scanner

<span class="t-comment"># Zainstaluj wszystkie zależności z h#.json</span>
bytes install

<span class="t-comment"># Aktualizuj wszystkie pakiety</span>
bytes update

<span class="t-comment"># Lista zainstalowanych</span>
bytes list

<span class="t-comment"># Szukaj w rejestrze Bytes</span>
bytes search crypto
bytes info sandbox</pre></div></div>
</div>

<div class="callout c-info"><div class="ci">ℹ</div><div class="cb"><strong>Rozszerzenia plików:</strong> H# obsługuje trzy rozszerzenia — <code>.h#</code> (zalecane), <code>.hsp</code>, <code>.h-sharp</code>. Wszystkie są traktowane identycznie przez kompilator.</div></div>

<h3>Dostępne cele kompilacji</h3>
<table class="ref-table">
<tr><th>Cel</th><th>Opis</th></tr>
<tr><td class="td-syntax">linux-x86_64</td><td class="td-desc">Linux x86_64 musl (w pełni statyczna) <strong>[domyślny na Linux]</strong></td></tr>
<tr><td class="td-syntax">linux-x86_64-gnu</td><td class="td-desc">Linux x86_64 glibc</td></tr>
<tr><td class="td-syntax">linux-aarch64</td><td class="td-desc">Linux ARM64</td></tr>
<tr><td class="td-syntax">windows-x86_64</td><td class="td-desc">Windows x86_64 MSVC</td></tr>
<tr><td class="td-syntax">windows-aarch64</td><td class="td-desc">Windows ARM64</td></tr>
<tr><td class="td-syntax">macos-x86_64</td><td class="td-desc">macOS Intel</td></tr>
<tr><td class="td-syntax">macos-aarch64</td><td class="td-desc">macOS Apple Silicon</td></tr>
</table>

<div class="callout c-tip"><div class="ci">💡</div><div class="cb"><strong>Domyślnie statyczna:</strong> H# kompiluje do w pełni statycznej binarki — zero zależności w runtime. Użyj <code>~ "dynamic:libname"</code> jeśli chcesz dynamiczne linkowanie.</div></div>
</div>
`;
