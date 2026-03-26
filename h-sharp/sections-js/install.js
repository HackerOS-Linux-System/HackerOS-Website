window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['install'] = `<div class="section" id="install">
<div class="sec-header"><span class="sec-num">01</span><h2>Narzędzia Hacker Lang</h2></div>

<p>Ekosystem Hacker Lang składa się z czterech narzędzi. Wszystkie są częścią HackerOS.</p>
<div class="grid2">
<div class="card"><div class="card-title">hl-runtime</div><div class="card-body">Interpreter — uruchamia <code>.hl</code> i skompilowane <code>.hlb</code>. Obsługuje async, pluginy, lockowanie zasobów i środowisko wykonawcze.</div></div>
<div class="card"><div class="card-title">hl-plsa</div><div class="card-body">Static analyser — analizuje składnię, typy, biblioteki, pluginy i komendy <code>^sudo</code> <em>bez uruchamiania</em>. Generuje JSON AST.</div></div>
<div class="card"><div class="card-title">hl-compiler</div><div class="card-body">Kompilator do bytecodu — generuje zoptymalizowany <code>.hlb</code>. Bytecode jest przenośny i gotowy do dystrybucji bez źródeł.</div></div>
<div class="card"><div class="card-title">bit</div><div class="card-body">Menedżer pakietów — instaluje biblioteki <code>core</code>, <code>bytes</code>, <code>vira</code> i pluginy z repozytoriów HackerOS.</div></div>
</div>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment"># Kompilacja skryptu/programu</span>
hl compile skrypt.hl

<span class="t-comment"># Analiza statyczna</span>
hl check skrypt.hl

<span class="t-comment"># Uruchomienie przez wydajny interpreter z JIT i bytecode</span>
hl run skrypt.hl

<span class="t-comment"># Zarządzanie pakietami</span>
bit remove vira/nazwa-liba
bit install vira/template
bit install bytes/sqlite3
bit install vira/moj-util
bit build --release
bit clean
bit update
bit search nazwa-liba
bit list</pre></div></div>
</div>
<div class="callout c-info"><div class="ci">ℹ</div><div class="cb"><strong>Rozszerzenia:</strong> Skrypty Hacker Lang mają rozszerzenie <code>.hl</code>.</div></div>

</div>`;
