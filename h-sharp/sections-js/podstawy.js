window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['podstawy'] = `
<!-- ─ KOMENTARZE ─────────────────────────────────────────────────────────── -->
<div class="section" id="komentarze">
<div class="sec-header"><span class="sec-num">03</span><h2>Komentarze</h2></div>
<p>H# używa znaku <code>#</code> jako komentarza liniowego. Brak komentarzy blokowych — używaj kolejnych linii <code>#</code>.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Typ</th><th>Opis</th></tr>
<tr><td><span class="td-syntax"># tekst</span></td><td><span class="pill p-cyan">liniowy</span></td><td class="td-desc">Cała linia ignorowana. Może być na początku linii lub po kodzie (inline).</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">komentarze.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div>
<div class="code-inner"><pre><span class="t-comment"># To jest komentarz liniowy</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-kw">let</span> x: int = <span class="t-num">42</span>  <span class="t-comment"># komentarz inline po kodzie</span>

<span class="t-comment"># Blok komentarzy — używaj kilku linii:</span>
<span class="t-comment"># To jest opis algorytmu</span>
<span class="t-comment"># który robi coś ważnego</span>
println(to_string(x))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ ZMIENNE ────────────────────────────────────────────────────────────── -->
<div class="section" id="zmienne">
<div class="sec-header"><span class="sec-num">04</span><h2>Zmienne i typy podstawowe</h2></div>
<p>H# jest <strong>statycznie typowany</strong>. Zmienne deklaruje się przez <code>let</code> (niemutowalna) lub <code>let mut</code> (mutowalna). Typy są opcjonalne gdy kompilator może je wywnioskować.</p>
<div class="grid3">
<div class="card"><div class="card-title">let — niemutowalna</div><div class="card-body">Domyślna forma. Nie można nadpisać po inicjalizacji. Preferowana w większości przypadków dla bezpieczeństwa.</div></div>
<div class="card"><div class="card-title">let mut — mutowalna</div><div class="card-body">Zmienna którą można modyfikować. Wymagana dla liczników, akumulatorów, i zmiennych w pętlach.</div></div>
<div class="card"><div class="card-title">Typy prymitywne</div><div class="card-body"><code>int</code>, <code>uint</code>, <code>i8..i128</code>, <code>u8..u128</code>, <code>f32</code>, <code>f64</code>, <code>bool</code>, <code>string</code>, <code>bytes</code>, <code>void</code></div></div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-filename">zmienne.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Niemutowalne ──────────────────────────────────</span>
<span class="t-kw">let</span> x: int = <span class="t-num">42</span>
<span class="t-kw">let</span> nazwa: string = <span class="t-str">"hacker"</span>
<span class="t-kw">let</span> ratio: f64 = <span class="t-num">3.14</span>
<span class="t-kw">let</span> aktywny: bool = <span class="t-kw">true</span>

<span class="t-comment"># ── Mutowalne ─────────────────────────────────────</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> licznik: int = <span class="t-num">0</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> suma: f64 = <span class="t-num">0.0</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> wynik: string = <span class="t-str">""</span>

<span class="t-comment"># ── Wnioskowanie typów ────────────────────────────</span>
<span class="t-kw">let</span> a = <span class="t-num">10</span>          <span class="t-comment"># int</span>
<span class="t-kw">let</span> b = <span class="t-num">3.14</span>        <span class="t-comment"># f64</span>
<span class="t-kw">let</span> c = <span class="t-str">"tekst"</span>     <span class="t-comment"># string</span>
<span class="t-kw">let</span> d = <span class="t-kw">true</span>        <span class="t-comment"># bool</span>

<span class="t-comment"># ── Typy całkowite ────────────────────────────────</span>
<span class="t-kw">let</span> port: u16 = <span class="t-num">8080</span>
<span class="t-kw">let</span> bajt: u8 = <span class="t-num">0xFF</span>
<span class="t-kw">let</span> wielki: i128 = <span class="t-num">9999999999999</span>

<span class="t-comment"># ── Bytes (raw binary data) ───────────────────────</span>
<span class="t-kw">let</span> data: bytes = [<span class="t-num">0xDE</span>, <span class="t-num">0xAD</span>, <span class="t-num">0xBE</span>, <span class="t-num">0xEF</span>]
<span class="t-kw">let</span> hex: string = data.to_hex()

<span class="t-comment"># ── Hex i binary literały ────────────────────────</span>
<span class="t-kw">let</span> h: int = <span class="t-num">0xFF</span>         <span class="t-comment"># hex</span>
<span class="t-kw">let</span> bin: int = <span class="t-num">0b1010</span>    <span class="t-comment"># binary</span>
<span class="t-kw">let</span> big: int = <span class="t-num">1_000_000</span> <span class="t-comment"># separator _</span></pre></div></div>
</div>

<h3>Typy tablicowe i tuple</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">kolekcje.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div>
<div class="code-inner"><pre><span class="t-comment"># Tablica (jednolity typ)</span>
<span class="t-kw">let</span> porty: [int] = [<span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>, <span class="t-num">8080</span>]
<span class="t-kw">let</span> hosty: [string] = [<span class="t-str">"localhost"</span>, <span class="t-str">"192.168.1.1"</span>]

<span class="t-comment"># Tuple (różne typy)</span>
<span class="t-kw">let</span> addr: (string, int) = (<span class="t-str">"localhost"</span>, <span class="t-num">8080</span>)
<span class="t-kw">let</span> (host, port) = addr  <span class="t-comment"># destrukturyzacja tuple</span>

<span class="t-comment"># Optional — typ T? (może być nil)</span>
<span class="t-kw">let</span> user_id: int? = <span class="t-kw">nil</span>
<span class="t-kw">let</span> maybe: string? = <span class="t-str">"wartość"</span></pre></div></div>
</div>
</div>

<!-- ─ IMPORTY ─────────────────────────────────────────────────────────────── -->
<div class="section" id="importy">
<div class="sec-header"><span class="sec-num">05</span><h2>System importów</h2></div>
<p>H# posiada ujednolicony system importów z wyraźnymi schematami. Każdy schemat oznacza inne źródło biblioteki.</p>
<table class="ref-table">
<tr><th>Schemat</th><th>Opis</th><th>Przykład</th></tr>
<tr><td class="td-syntax">std:</td><td class="td-desc">Standardowa biblioteka H# (wbudowana)</td><td class="td-note">import "std:io::keyboard"</td></tr>
<tr><td class="td-syntax">bytes:</td><td class="td-desc">Ekosystem Bytes (pobieranie przez <code>bytes add</code>)</td><td class="td-note">import "bytes:scanner/1.2"</td></tr>
<tr><td class="td-syntax">file:</td><td class="td-desc">Lokalny plik <code>.h#</code></td><td class="td-note">import "file:lib.h#"</td></tr>
<tr><td class="td-syntax">lib:static::</td><td class="td-desc">Natywna biblioteka — linkowanie statyczne</td><td class="td-note">import "lib:static::openssl.a"</td></tr>
<tr><td class="td-syntax">lib:dynamic::</td><td class="td-desc">Natywna biblioteka — linkowanie dynamiczne</td><td class="td-note">import "lib:dynamic::libssl.so"</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">importy.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Biblioteka standardowa ────────────────────────</span>
<span class="t-kw">import</span> <span class="t-str">"std:io::keyboard"</span>
<span class="t-kw">import</span> <span class="t-str">"std:io::net"</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::hash"</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::hex"</span>
<span class="t-kw">import</span> <span class="t-str">"std:encoding::base64"</span>
<span class="t-kw">import</span> <span class="t-str">"std:encoding::url"</span>
<span class="t-kw">import</span> <span class="t-str">"std:time"</span>
<span class="t-kw">import</span> <span class="t-str">"std:fs"</span>
<span class="t-kw">import</span> <span class="t-str">"std:process"</span>

<span class="t-comment"># ── Ekosystem Bytes ───────────────────────────────</span>
<span class="t-kw">import</span> <span class="t-str">"bytes:scanner"</span>       <span class="t-comment"># najnowsza wersja</span>
<span class="t-kw">import</span> <span class="t-str">"bytes:scanner/1.2"</span>   <span class="t-comment"># konkretna wersja</span>
<span class="t-kw">import</span> <span class="t-str">"bytes:exploit-db/0.9"</span>

<span class="t-comment"># ── Lokalne pliki ─────────────────────────────────</span>
<span class="t-kw">import</span> <span class="t-str">"file:lib.h#"</span>
<span class="t-kw">import</span> <span class="t-str">"file:../utils.h#"</span>

<span class="t-comment"># ── Natywne biblioteki ────────────────────────────</span>
<span class="t-kw">import</span> <span class="t-str">"lib:static::libssl.a"</span>
<span class="t-kw">import</span> <span class="t-str">"lib:dynamic::libpcap.so"</span></pre></div></div>
</div>

<h3>Dyrektywy kompilacji</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">dyrektywy.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment"># ~ "dynamic:..." — dynamiczne linkowanie konkretnej lib</span>
~ <span class="t-str">"dynamic:openssl"</span>
~ <span class="t-str">"dynamic:libpcap"</span>

<span class="t-comment"># ~ "dynamic" — wszystkie biblioteki dynamicznie</span>
~ <span class="t-str">"dynamic"</span>

<span class="t-comment"># ~~ "fast:..." — szybsza kompilacja, większa binarka (jak Go)</span>
~~ <span class="t-str">"fast:all"</span>
~~ <span class="t-str">"fast:debug"</span></pre></div></div>
</div>
<div class="callout c-info"><div class="ci">ℹ</div><div class="cb">Dyrektywy <code>~</code> i <code>~~</code> muszą być na początku pliku przed importami. <strong>~ "dynamic"</strong> = większa binarka ale szybsza kompilacja. <strong>~~ "fast"</strong> = wyłącza LTO i optymalizacje — do developmentu.</div></div>
</div>

<!-- ─ OUTPUT ─────────────────────────────────────────────────────────────── -->
<div class="section" id="output">
<div class="sec-header"><span class="sec-num">06</span><h2>Wyjście / println / print</h2></div>
<p>H# posiada wbudowane funkcje do wypisywania — dostępne bez importów (prelude).</p>
<table class="ref-table">
<tr><th>Funkcja</th><th>Opis</th></tr>
<tr><td class="td-syntax">println(s: string)</td><td class="td-desc">Wypisuje string z nową linią na końcu</td></tr>
<tr><td class="td-syntax">print(s: string)</td><td class="td-desc">Wypisuje string bez nowej linii</td></tr>
<tr><td class="td-syntax">to_string(v: any) -> string</td><td class="td-desc">Konwertuje wartość na string</td></tr>
<tr><td class="td-syntax">len(c: any) -> int</td><td class="td-desc">Zwraca długość stringa, tablicy lub bytes</td></tr>
<tr><td class="td-syntax">panic(msg: string)</td><td class="td-desc">Kończy program z błędem i komunikatem</td></tr>
<tr><td class="td-syntax">assert(cond: bool, msg: string)</td><td class="td-desc">Przerywa z msg gdy warunek fałszywy</td></tr>
<tr><td class="td-syntax">exit(code: int)</td><td class="td-desc">Kończy program z kodem wyjścia</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">output.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span></div>
<div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
println(<span class="t-str">"Hello from H#!"</span>)

<span class="t-kw">let</span> port: int = <span class="t-num">8080</span>
println(<span class="t-str">"Port: "</span> + to_string(port))

<span class="t-kw">let</span> data: bytes = [<span class="t-num">0xDE</span>, <span class="t-num">0xAD</span>, <span class="t-num">0xBE</span>, <span class="t-num">0xEF</span>]
println(<span class="t-str">"Hex: "</span> + data.to_hex())

<span class="t-kw">let</span> n: int = <span class="t-num">10</span>
assert(n > <span class="t-num">0</span>, <span class="t-str">"n musi być dodatnie"</span>)

<span class="t-kw">let</span> port2: u16 = <span class="t-num">8080</span>
assert(port2 >= <span class="t-num">1</span> && port2 <= <span class="t-num">65535</span>, <span class="t-str">"nieprawidłowy port"</span>)

exit(<span class="t-num">0</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
