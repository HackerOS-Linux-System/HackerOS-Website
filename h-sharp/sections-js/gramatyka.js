window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['gramatyka'] = `
<div class="section" id="gramatyka">
<div class="sec-header"><span class="sec-num">29</span><h2>Gramatyka H# 0.1</h2></div>
<p>H# używa <strong>parsera Pratt</strong> dla wyrażeń i <strong>rekurencyjnego descent</strong> dla deklaracji. Bloki otwiera <code>is</code>, zamyka <code>end</code>.</p>

<h3>Tokeny</h3>
<table class="ref-table">
<tr><th>Token</th><th>Wzorzec</th><th>Przykład</th></tr>
<tr><td class="td-syntax">ident</td><td class="td-desc"><code>(alpha|_)(alnum|_)*</code></td><td class="td-note">main, my_func</td></tr>
<tr><td class="td-syntax">integer</td><td class="td-desc"><code>digit+ | 0x[hex]+ | 0b[01]+</code></td><td class="td-note">42, 0xFF, 0b1010, 1_000</td></tr>
<tr><td class="td-syntax">float</td><td class="td-desc"><code>digit+.digit+([eE][+-]?digit+)?</code></td><td class="td-note">3.14, 2.5e10</td></tr>
<tr><td class="td-syntax">string</td><td class="td-desc"><code>"..." z \n \t \\ \"</code></td><td class="td-note">"hello\n"</td></tr>
<tr><td class="td-syntax">comment</td><td class="td-desc"><code>;; .*</code> do końca linii</td><td class="td-note">;; komentarz</td></tr>
<tr><td class="td-syntax">doc_comment</td><td class="td-desc"><code>/// .*</code></td><td class="td-note">/// doc</td></tr>
<tr><td class="td-syntax">block_comment</td><td class="td-desc"><code>// ... \\</code></td><td class="td-note">// blok \\</td></tr>
</table>

<h3>Słowa kluczowe H# 0.1</h3>
<div class="grid3">
<div class="card"><div class="card-title">Bloki</div><div class="card-body"><code>is</code> <code>end</code> <code>fn</code> <code>struct</code> <code>enum</code> <code>impl</code> <code>trait</code></div></div>
<div class="card"><div class="card-title">Sterowanie</div><div class="card-body"><code>if</code> <code>elsif</code> <code>else</code> <code>match</code> <code>while</code> <code>for</code> <code>in</code> <code>return</code> <code>break</code> <code>continue</code></div></div>
<div class="card"><div class="card-title">Pozostałe</div><div class="card-body"><code>let</code> <code>mut</code> <code>pub</code> <code>use</code> <code>from</code> <code>as</code> <code>unsafe</code> <code>arena</code> <code>manual</code> <code>nil</code> <code>true</code> <code>false</code></div></div>
</div>

<h3>Priorytety operatorów</h3>
<table class="ref-table">
<tr><th>Poziom</th><th>Operatory</th><th>Łączność</th></tr>
<tr><td class="td-note">1 (najniższy)</td><td class="td-syntax">= += -= *= /=</td><td class="td-desc">prawa</td></tr>
<tr><td class="td-note">2</td><td class="td-syntax">||</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">3</td><td class="td-syntax">&amp;&amp;</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">4-6</td><td class="td-syntax">| ^ &amp;</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">7</td><td class="td-syntax">== !=</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">8</td><td class="td-syntax">&lt; &gt; &lt;= &gt;=</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">9</td><td class="td-syntax">&lt;&lt; &gt;&gt;</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">10</td><td class="td-syntax">+ -</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">11</td><td class="td-syntax">* / %</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">12</td><td class="td-syntax">as</td><td class="td-desc">lewa</td></tr>
<tr><td class="td-note">13 (najwyższy)</td><td class="td-syntax">. [] () ?</td><td class="td-desc">lewa</td></tr>
</table>

<h3>Najczęstsze błędy składni</h3>
<table class="ref-table">
<tr><th>Błąd</th><th>Poprawka</th></tr>
<tr><td class="td-syntax">fn foo() do...end</td><td class="td-desc">fn foo() <strong>is</strong>...end</td></tr>
<tr><td class="td-syntax">import "std:io"</td><td class="td-desc">use "std -> io" from "io"</td></tr>
<tr><td class="td-syntax">println("x")</td><td class="td-desc"><strong>write</strong>("x")</td></tr>
<tr><td class="td-syntax"># komentarz</td><td class="td-desc"><strong>;;</strong> komentarz</td></tr>
<tr><td class="td-syntax">struct S { ... }</td><td class="td-desc">struct S <strong>is</strong> ... <strong>end</strong></td></tr>
<tr><td class="td-syntax">match x { ... }</td><td class="td-desc">match x <strong>is</strong> ... <strong>end</strong></td></tr>
</table>
</div>

<div class="section" id="bledy">
<div class="sec-header"><span class="sec-num">30</span><h2>Błędy — diagnostyka Elm-like</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>-- SYNTAX ERROR (src/main.h#) -------
--> src/main.h#:4:5

3 | fn main() is
4 |     println("hello")
          ^^^^^^^
5 | end

Error: unexpected token \`println\`

Hint: write \`write\` instead of \`println\`</pre></div></div>
</div>
</div>
`;
