window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['typy'] = `
<!-- ─ ENUM ──────────────────────────────────────────────────────────────── -->
<div class="section" id="enum">
<div class="sec-header"><span class="sec-num">14</span><h2>Enum</h2></div>
<p>Wyliczenia — typy z ograniczonym zbiorem wariantów. Warianty mogą mieć pola (tuple lub struct). Używane z <code>match</code> do exhaustive pattern matching.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">enum.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Prosta enum (unit warianty) ───────────────────</span>
<span class="t-kw">enum</span> Status <span class="t-kw">do</span>
Running
Stopped
Error
Pending
<span class="t-kw">end</span>

<span class="t-comment"># ── Enum z danymi (tuple warianty) ───────────────</span>
<span class="t-kw">enum</span> ScanResult <span class="t-kw">do</span>
Open
Closed
Filtered(string)  <span class="t-comment"># zawiera powód</span>
Error(int, string) <span class="t-comment"># kod błędu + opis</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Enum wyników operacji ─────────────────────────</span>
<span class="t-kw">enum</span> NetResult <span class="t-kw">do</span>
Success(bytes)
Timeout
Refused
UnknownHost(string)
<span class="t-kw">end</span>

<span class="t-comment"># ── Match na enum ─────────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">handle_result</span>(r: ScanResult) <span class="t-kw">do</span>
<span class="t-kw">match</span> r <span class="t-kw">do</span>
Open           => println(<span class="t-str">"Port otwarty!"</span>)
Closed         => println(<span class="t-str">"Port zamknięty"</span>)
Filtered(msg)  => println(<span class="t-str">"Filtrowany: "</span> + msg)
Error(code, m) => println(<span class="t-str">"Błąd "</span> + to_string(code) + <span class="t-str">": "</span> + m)
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Status z match ────────────────────────────────</span>
<span class="t-kw">let</span> s: Status = Status::Running
<span class="t-kw">match</span> s <span class="t-kw">do</span>
Running => println(<span class="t-str">"✓ Działa"</span>)
Stopped => println(<span class="t-str">"✗ Zatrzymany"</span>)
Error   => println(<span class="t-str">"! Błąd"</span>)
Pending => println(<span class="t-str">"... Oczekuje"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ TYPY WBUDOWANE ─────────────────────────────────────────────────────── -->
<div class="section" id="typy-prim">
<div class="sec-header"><span class="sec-num">15</span><h2>Typy wbudowane i operatory</h2></div>

<h3>Typy prymitywne</h3>
<table class="ref-table">
<tr><th>Typ</th><th>Opis</th><th>Rozmiar</th><th>Literał</th></tr>
<tr><td class="td-syntax">int</td><td class="td-desc">Liczba całkowita (alias i64)</td><td class="td-note">64-bit</td><td class="td-note">42, -7, 1_000</td></tr>
<tr><td class="td-syntax">uint</td><td class="td-desc">Bez znaku (alias u64)</td><td class="td-note">64-bit</td><td class="td-note">255, 0xFF</td></tr>
<tr><td class="td-syntax">i8, i16, i32, i64, i128</td><td class="td-desc">Całkowite ze znakiem</td><td class="td-note">8-128 bit</td><td class="td-note">42i8, -1i32</td></tr>
<tr><td class="td-syntax">u8, u16, u32, u64, u128</td><td class="td-desc">Całkowite bez znaku</td><td class="td-note">8-128 bit</td><td class="td-note">0xFFu8, 8080u16</td></tr>
<tr><td class="td-syntax">f32, f64</td><td class="td-desc">Zmiennoprzecinkowe</td><td class="td-note">32/64 bit</td><td class="td-note">3.14, 2.71f32</td></tr>
<tr><td class="td-syntax">bool</td><td class="td-desc">Wartość logiczna</td><td class="td-note">1 bit</td><td class="td-note">true, false</td></tr>
<tr><td class="td-syntax">string</td><td class="td-desc">Ciąg znaków UTF-8</td><td class="td-note">heap</td><td class="td-note">"tekst"</td></tr>
<tr><td class="td-syntax">bytes</td><td class="td-desc">Surowe bajty binarne</td><td class="td-note">heap</td><td class="td-note">[0xDE, 0xAD]</td></tr>
<tr><td class="td-syntax">void</td><td class="td-desc">Brak wartości (unit)</td><td class="td-note">—</td><td class="td-note">—</td></tr>
<tr><td class="td-syntax">any</td><td class="td-desc">Dowolny typ (dynamic)</td><td class="td-note">—</td><td class="td-note">—</td></tr>
</table>

<h3>Typy złożone</h3>
<table class="ref-table">
<tr><th>Typ</th><th>Składnia</th><th>Opis</th></tr>
<tr><td class="td-syntax">Tablica</td><td class="td-note">[T]</td><td class="td-desc">Tablica o jednorodnym typie T</td></tr>
<tr><td class="td-syntax">Tuple</td><td class="td-note">(T1, T2, ...)</td><td class="td-desc">Krotkia z różnymi typami</td></tr>
<tr><td class="td-syntax">Optional</td><td class="td-note">T?</td><td class="td-desc">Typ T lub nil — bezpieczna opcjonalność</td></tr>
<tr><td class="td-syntax">Referencja</td><td class="td-note">&amp;T / &amp;mut T</td><td class="td-desc">Niemutowalna / mutowalna referencja</td></tr>
<tr><td class="td-syntax">Generics</td><td class="td-note">Vec&lt;T&gt;, Map&lt;K,V&gt;</td><td class="td-desc">Typy generyczne z parametrami</td></tr>
</table>

<h3>Operatory binarne</h3>
<div class="grid2">
<table class="ref-table">
<tr><th>Op</th><th>Znaczenie</th><th>Przykład</th></tr>
<tr><td class="td-syntax">+</td><td class="td-desc">Dodawanie / konkatenacja string</td><td class="td-note">$a + $b, "a" + "b"</td></tr>
<tr><td class="td-syntax">-</td><td class="td-desc">Odejmowanie</td><td class="td-note">$x - 1</td></tr>
<tr><td class="td-syntax">*</td><td class="td-desc">Mnożenie</td><td class="td-note">$n * $m</td></tr>
<tr><td class="td-syntax">/</td><td class="td-desc">Dzielenie</td><td class="td-note">$a / $b</td></tr>
<tr><td class="td-syntax">%</td><td class="td-desc">Modulo (reszta)</td><td class="td-note">$i % 2</td></tr>
<tr><td class="td-syntax">==</td><td class="td-desc">Równość</td><td class="td-note">$x == 42</td></tr>
<tr><td class="td-syntax">!=</td><td class="td-desc">Nierówność</td><td class="td-note">$x != nil</td></tr>
</table>
<table class="ref-table">
<tr><th>Op</th><th>Znaczenie</th><th>Przykład</th></tr>
<tr><td class="td-syntax">&lt; &gt; &lt;= &gt;=</td><td class="td-desc">Porównania</td><td class="td-note">$a &lt; $b</td></tr>
<tr><td class="td-syntax">&amp;&amp;</td><td class="td-desc">Koniunkcja logiczna</td><td class="td-note">$a &amp;&amp; $b</td></tr>
<tr><td class="td-syntax">||</td><td class="td-desc">Alternatywa logiczna</td><td class="td-note">$x || false</td></tr>
<tr><td class="td-syntax">!</td><td class="td-desc">Negacja</td><td class="td-note">!$flag</td></tr>
<tr><td class="td-syntax">&amp; | ^ ~ &lt;&lt; &gt;&gt;</td><td class="td-desc">Bitowe</td><td class="td-note">$a &amp; 0xFF</td></tr>
<tr><td class="td-syntax">as</td><td class="td-desc">Rzutowanie typu</td><td class="td-note">$n as f64</td></tr>
<tr><td class="td-syntax">?</td><td class="td-desc">Propagacja nil/błędu</td><td class="td-note">find_user(id)?</td></tr>
</table>
</div>

<h3>Operatory przypisania złożonego</h3>
<table class="ref-table">
<tr><th>Op</th><th>Odpowiednik</th></tr>
<tr><td class="td-syntax">x += n</td><td class="td-note">x = x + n</td></tr>
<tr><td class="td-syntax">x -= n</td><td class="td-note">x = x - n</td></tr>
<tr><td class="td-syntax">x *= n</td><td class="td-note">x = x * n</td></tr>
<tr><td class="td-syntax">x /= n</td><td class="td-note">x = x / n</td></tr>
</table>

<h3>Rzutowanie typów</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">casting.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">let</span> n: int = <span class="t-num">42</span>
<span class="t-kw">let</span> f: f64 = n <span class="t-kw">as</span> f64       <span class="t-comment"># int → f64</span>
<span class="t-kw">let</span> b: u8 = n <span class="t-kw">as</span> u8         <span class="t-comment"># int → u8 (obcięcie)</span>
<span class="t-kw">let</span> i: int = f <span class="t-kw">as</span> int        <span class="t-comment"># f64 → int (obcięcie)</span>
<span class="t-kw">let</span> s: string = to_string(n)  <span class="t-comment"># int → string</span>
<span class="t-kw">let</span> pi: int = parse_int(s)    <span class="t-comment"># string → int?</span></pre></div></div>
</div>
</div>
`;
