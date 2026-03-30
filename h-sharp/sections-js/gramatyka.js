window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['gramatyka'] = `
<!-- ─ GRAMATYKA ──────────────────────────────────────────────────────────── -->
<div class="section" id="gramatyka">
<div class="sec-header"><span class="sec-num">29</span><h2>Gramatyka H# — przegląd</h2></div>
<p>H# używa <strong>parsera rekurencyjnego z Pratt parsing</strong> dla wyrażeń. Lekser obsługuje wieloznakowe tokeny, hex/binary literały i separatory <code>_</code> w liczbach.</p>

<h3>Tokeny leksykalne</h3>
<table class="ref-table">
<tr><th>Token</th><th>Wzorzec</th><th>Przykład</th></tr>
<tr><td class="td-syntax">ident</td><td class="td-desc"><code>(alpha|_)(alnum|_)*</code></td><td class="td-note">my_func, Scanner, main</td></tr>
<tr><td class="td-syntax">integer</td><td class="td-desc"><code>digit+ | 0x[hex]+ | 0b[01]+</code></td><td class="td-note">42, 0xFF, 0b1010, 1_000</td></tr>
<tr><td class="td-syntax">float</td><td class="td-desc"><code>digit+ . digit+ ([eE][+-]?digit+)?</code></td><td class="td-note">3.14, 2.5e10</td></tr>
<tr><td class="td-syntax">string</td><td class="td-desc"><code>"..."</code> z escape <code>\\n \\t \\\\ \\" \\0</code></td><td class="td-note">"hello\\n", "tekst"</td></tr>
<tr><td class="td-syntax">bool</td><td class="td-desc"><code>true | false</code></td><td class="td-note">true, false</td></tr>
<tr><td class="td-syntax">nil</td><td class="td-desc"><code>nil</code></td><td class="td-note">nil</td></tr>
<tr><td class="td-syntax">comment</td><td class="td-desc"><code># .*</code> — do końca linii</td><td class="td-note"># komentarz</td></tr>
<tr><td class="td-syntax">directive</td><td class="td-desc"><code>~</code> lub <code>~~</code> przed stringiem</td><td class="td-note">~ "dynamic:ssl"</td></tr>
</table>

<h3>Typy w wyrażeniach</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">typy-gramatyka</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>type_expr =
| "int" | "uint" | "i8" | "i16" | "i32" | "i64" | "i128"
| "u8" | "u16" | "u32" | "u64" | "u128"
| "f32" | "f64" | "bool" | "string" | "bytes" | "void" | "any"
| "[" type_expr "]"              <span class="t-comment"># tablica</span>
| "(" type_expr "," ... ")"      <span class="t-comment"># tuple</span>
| "&" type_expr                  <span class="t-comment"># referencja</span>
| "&" "mut" type_expr            <span class="t-comment"># mutowalna referencja</span>
| type_expr "?"                  <span class="t-comment"># optional</span>
| ident "&lt;" type_expr "," ... "&gt;" <span class="t-comment"># generic: Vec&lt;T&gt;</span>
| ident                          <span class="t-comment"># named type: Config</span></pre></div></div>
</div>

<h3>Priorytety operatorów (od najniższego)</h3>
<table class="ref-table">
<tr><th>Poziom</th><th>Operatory</th><th>Łączność</th></tr>
<tr><td class="td-note">1 (najniższy)</td><td class="td-syntax">= += -= *= /=</td><td class="td-desc">prawostronna</td></tr>
<tr><td class="td-note">2</td><td class="td-syntax">||</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">3</td><td class="td-syntax">&amp;&amp;</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">4</td><td class="td-syntax">|</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">5</td><td class="td-syntax">^</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">6</td><td class="td-syntax">&amp;</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">7</td><td class="td-syntax">== !=</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">8</td><td class="td-syntax">&lt; &gt; &lt;= &gt;=</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">9</td><td class="td-syntax">&lt;&lt; &gt;&gt;</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">10</td><td class="td-syntax">+ -</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">11</td><td class="td-syntax">* / %</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">12</td><td class="td-syntax">as</td><td class="td-desc">lewostronna</td></tr>
<tr><td class="td-note">13 (najwyższy)</td><td class="td-syntax">. [] ()</td><td class="td-desc">lewostronna</td></tr>
</table>

<h3>Prefiksowe (unary)</h3>
<table class="ref-table">
<tr><th>Operator</th><th>Opis</th></tr>
<tr><td class="td-syntax">-expr</td><td class="td-desc">Negacja arytmetyczna</td></tr>
<tr><td class="td-syntax">!expr</td><td class="td-desc">Negacja logiczna</td></tr>
<tr><td class="td-syntax">~expr</td><td class="td-desc">Bitowe NOT</td></tr>
<tr><td class="td-syntax">&amp;expr</td><td class="td-desc">Referencja (niemutowalna)</td></tr>
<tr><td class="td-syntax">&amp;mut expr</td><td class="td-desc">Referencja mutowalna</td></tr>
<tr><td class="td-syntax">*expr</td><td class="td-desc">Dereferencja</td></tr>
</table>
</div>

<!-- ─ BŁĘDY SKŁADNI ──────────────────────────────────────────────────────── -->
<div class="section" id="bledy">
<div class="sec-header"><span class="sec-num">30</span><h2>Błędy składni — diagnostyka Elm-like</h2></div>
<p>H# generuje czytelne błędy w stylu Elm — z numerem linii, wskazaniem kolumny, karetkami <code>^^^</code> i wskazówkami. Kompilator raportuje błędy z obu etapów: lexer i parser.</p>

<h3>Format błędu</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — przykładowy błąd H#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>-- SYNTAX ERROR (src/main.h#) -------
--> src/main.h#:5:15

4 | fn add(a: int, b: int) -> int do
5 |     return a ++ b
^^
6 | end

Error: unexpected token \`+\`

Hint: add \`)\` here</pre></div></div>
</div>

<h3>Najczęstsze błędy i poprawki</h3>
<table class="ref-table">
<tr><th>Błędna linia</th><th>Przyczyna</th><th>Poprawka</th></tr>
<tr><td class="td-syntax">fn foo(a: int b: int)</td><td class="td-desc">Brak przecinka w parametrach</td><td class="td-note">fn foo(a: int, b: int)</td></tr>
<tr><td class="td-syntax">if x > 0</td><td class="td-desc">Brak <code>do</code> po warunku</td><td class="td-note">if x > 0 do...end</td></tr>
<tr><td class="td-syntax">fn foo() do ... (brak end)</td><td class="td-desc">Niezamknięty blok</td><td class="td-note">Dodaj <code>end</code> po ciele funkcji</td></tr>
<tr><td class="td-syntax">let x = "abc" as int</td><td class="td-desc">Nieprawidłowe rzutowanie string → int</td><td class="td-note">Użyj parse_int("abc")</td></tr>
<tr><td class="td-syntax">import std:io</td><td class="td-desc">Brak cudzysłowów wokół ścieżki</td><td class="td-note">import "std:io::keyboard"</td></tr>
<tr><td class="td-syntax">struct Foo { a: int }</td><td class="td-desc">Składnia C — H# używa do...end</td><td class="td-note">struct Foo do pub a: int end</td></tr>
<tr><td class="td-syntax">match x { 1 => ... }</td><td class="td-desc">Składnia Rust — H# używa do...end</td><td class="td-note">match x do 1 => ... end</td></tr>
<tr><td class="td-syntax">for i in 0..10 { }</td><td class="td-desc">Nawiasy klamrowe zamiast do...end</td><td class="td-note">for i in 0..10 do...end</td></tr>
<tr><td class="td-syntax">recur bez fn</td><td class="td-desc">recur poza ciałem funkcji</td><td class="td-note">Umieść recur wewnątrz fn def</td></tr>
</table>

<h3>Błędy typów</h3>
<table class="ref-table">
<tr><th>Błąd</th><th>Opis</th></tr>
<tr><td class="td-syntax">type mismatch: expected int, found string</td><td class="td-desc">Próba użycia stringa tam gdzie int</td></tr>
<tr><td class="td-syntax">undefined variable \`x\`</td><td class="td-desc">Zmienna nie zadeklarowana w scope</td></tr>
<tr><td class="td-syntax">cannot assign to immutable variable \`x\`</td><td class="td-desc">Próba zapisu do let (niemutt) — użyj let mut</td></tr>
<tr><td class="td-syntax">undefined function \`foo\`</td><td class="td-desc">Funkcja nie zadeklarowana (sprawdź importy)</td></tr>
<tr><td class="td-syntax">return type mismatch in \`foo\`</td><td class="td-desc">Zwracany typ nie zgadza się z deklaracją</td></tr>
</table>
</div>
`;
