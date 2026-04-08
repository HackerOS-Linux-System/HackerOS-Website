window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['podstawy'] = `
<div class="section" id="komentarze">
<div class="sec-header"><span class="sec-num">03</span><h2>Komentarze</h2></div>
<p>H# 0.1 używa <code>;;</code> jako komentarza liniowego, <code>///</code> jako dokumentacyjnego, i <code>// ... \\</code> jako blokowego.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Typ</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">;; tekst</span></td><td><span class="pill p-cyan">liniowy</span></td><td class="td-desc">Komentarz do końca linii</td></tr>
<tr><td><span class="td-syntax">/// tekst</span></td><td><span class="pill p-purple">dokumentacyjny</span></td><td class="td-desc">Generowany do doc</td></tr>
<tr><td><span class="td-syntax">// ... \\</span></td><td><span class="pill p-amber">blokowy</span></td><td class="td-desc">Wieloliniowy blok komentarza</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">komentarze.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Komentarz liniowy</span>

<span class="t-comment">/// Dokumentacja funkcji main — pojawi się w docs</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> x: int = <span class="t-num">42</span>  <span class="t-comment">;; inline komentarz</span>
    write(to_string(x))

    <span class="t-comment">// blok komentarza
    to jest zignorowane przez kompilator
    \\</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="zmienne">
<div class="sec-header"><span class="sec-num">04</span><h2>Zmienne i typy podstawowe</h2></div>
<p>H# jest <strong>statycznie typowany</strong>. Deklaracja: <code>let</code> (niemutowalna) lub <code>let mut</code> (mutowalna). Typy można pominąć gdy kompilator je wywnioskuje.</p>
<div class="grid3">
<div class="card"><div class="card-title">let</div><div class="card-body">Niemutowalna. Domyślna. Bezpieczna — brak przypadkowych modyfikacji.</div></div>
<div class="card"><div class="card-title">let mut</div><div class="card-body">Mutowalna. Wymagana dla liczników, akumulatorów, zmiennych w pętlach.</div></div>
<div class="card"><div class="card-title">Typy</div><div class="card-body"><code>int</code>, <code>uint</code>, <code>i8..i128</code>, <code>u8..u128</code>, <code>f32</code>, <code>f64</code>, <code>bool</code>, <code>string</code>, <code>bytes</code></div></div>
</div>
<div class="code-block">
<div class="code-header"><span class="code-filename">zmienne.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Niemutowalne</span>
<span class="t-kw">let</span> x: int    = <span class="t-num">42</span>
<span class="t-kw">let</span> s: string = <span class="t-str">"hacker"</span>
<span class="t-kw">let</span> r: f64    = <span class="t-num">3.14</span>
<span class="t-kw">let</span> b: bool   = <span class="t-kw">true</span>

<span class="t-comment">;; Mutowalne</span>
<span class="t-kw">let</span> <span class="t-kw2">mut</span> licznik: int = <span class="t-num">0</span>
<span class="t-kw">let</span> <span class="t-kw2">mut</span> wynik: string = <span class="t-str">""</span>

<span class="t-comment">;; Wnioskowanie typów</span>
<span class="t-kw">let</span> a = <span class="t-num">10</span>          <span class="t-comment">;; int</span>
<span class="t-kw">let</span> c = <span class="t-str">"tekst"</span>     <span class="t-comment">;; string</span>

<span class="t-comment">;; Typy całkowite</span>
<span class="t-kw">let</span> port: u16 = <span class="t-num">8080</span>
<span class="t-kw">let</span> bajt: u8  = <span class="t-num">0xFF</span>

<span class="t-comment">;; Bytes — surowe dane binarne</span>
<span class="t-kw">let</span> data: bytes = [<span class="t-num">0xDE</span>, <span class="t-num">0xAD</span>, <span class="t-num">0xBE</span>, <span class="t-num">0xEF</span>]

<span class="t-comment">;; Separatory liczbowe i hex/binary</span>
<span class="t-kw">let</span> big: int = <span class="t-num">1_000_000</span>
<span class="t-kw">let</span> h: int   = <span class="t-num">0xFF</span>
<span class="t-kw">let</span> bin: int = <span class="t-num">0b1010</span>

<span class="t-comment">;; Tablica i tuple</span>
<span class="t-kw">let</span> porty: [int]        = [<span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>]
<span class="t-kw">let</span> addr: (string, int) = (<span class="t-str">"localhost"</span>, <span class="t-num">8080</span>)

<span class="t-comment">;; Optional</span>
<span class="t-kw">let</span> opt: int? = <span class="t-kw">nil</span></pre></div></div>
</div>
</div>

<div class="section" id="importy">
<div class="sec-header"><span class="sec-num">05</span><h2>System importów — use/from</h2></div>
<p>H# 0.1 używa składni <code>use "ścieżka" from "alias"</code>. Strzałka <code>-></code> rozdziela moduły.</p>
<table class="ref-table">
<tr><th>Schemat</th><th>Opis</th><th>Przykład</th></tr>
<tr><td class="td-syntax">std -> mod -> sub</td><td class="td-desc">Biblioteka standardowa</td><td class="td-note">use "std -> io" from "io"</td></tr>
<tr><td class="td-syntax">vira -> pkg</td><td class="td-desc">Ekosystem Vira</td><td class="td-note">use "vira -> scanner/1.2" from "sc"</td></tr>
<tr><td class="td-syntax">bytes -> pkg</td><td class="td-desc">Bytes Repository</td><td class="td-note">use "bytes -> exploit" from "ex"</td></tr>
<tr><td class="td-syntax">python -> pkg</td><td class="td-desc">Python interop (bytes PM)</td><td class="td-note">use "python -> numpy" from "np"</td></tr>
<tr><td class="td-syntax">github.com/u/r</td><td class="td-desc">Git repo bezpośrednio</td><td class="td-note">use "github.com/user/lib" from "lib"</td></tr>
<tr><td class="td-syntax">file -> path</td><td class="td-desc">Lokalny plik</td><td class="td-note">use "file -> utils.h#" from "u"</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">importy.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Standardowa biblioteka</span>
<span class="t-kw">use</span> <span class="t-str">"std -> io"</span>             <span class="t-kw">from</span> <span class="t-str">"io"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> net -> tcp"</span>     <span class="t-kw">from</span> <span class="t-str">"tcp"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> crypto -> hex"</span>  <span class="t-kw">from</span> <span class="t-str">"hex"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> json"</span>           <span class="t-kw">from</span> <span class="t-str">"json"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> math"</span>           <span class="t-kw">from</span> <span class="t-str">"math"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> gtk"</span>            <span class="t-kw">from</span> <span class="t-str">"gtk"</span>

<span class="t-comment">;; Vira registry (projekt kompilowany)</span>
<span class="t-kw">use</span> <span class="t-str">"vira -> scanner/1.2"</span>  <span class="t-kw">from</span> <span class="t-str">"scanner"</span>

<span class="t-comment">;; Bytes Repository (JIT/interpreter)</span>
<span class="t-kw">use</span> <span class="t-str">"bytes -> exploit-db"</span>  <span class="t-kw">from</span> <span class="t-str">"edb"</span>

<span class="t-comment">;; Python interop (tylko bytes PM)</span>
<span class="t-kw">use</span> <span class="t-str">"python -> numpy"</span>       <span class="t-kw">from</span> <span class="t-str">"np"</span>
<span class="t-kw">use</span> <span class="t-str">"python -> numpy/1.26"</span>  <span class="t-kw">from</span> <span class="t-str">"np"</span>  <span class="t-comment">;; pinned version</span>

<span class="t-comment">;; Git repo bezpośrednio (jak Go)</span>
<span class="t-kw">use</span> <span class="t-str">"github.com/user/mylib"</span> <span class="t-kw">from</span> <span class="t-str">"mylib"</span>

<span class="t-comment">;; Lokalny plik</span>
<span class="t-kw">use</span> <span class="t-str">"file -> utils.h#"</span>     <span class="t-kw">from</span> <span class="t-str">"utils"</span></pre></div></div>
</div>
</div>

<div class="section" id="output">
<div class="sec-header"><span class="sec-num">06</span><h2>Wyjście — write() i builtiny</h2></div>
<p>Funkcja <code>write()</code> to główny sposób wypisywania w H# 0.1 (zastępuje Python <code>print</code>). Dostępna bez importów.</p>
<table class="ref-table">
<tr><th>Funkcja</th><th>Opis</th></tr>
<tr><td class="td-syntax">write(s: string)</td><td class="td-desc">Wypisuje string z nową linią</td></tr>
<tr><td class="td-syntax">to_string(v: any) -> string</td><td class="td-desc">Konwertuje wartość na string</td></tr>
<tr><td class="td-syntax">len(c) -> int</td><td class="td-desc">Długość stringa, tablicy lub bytes</td></tr>
<tr><td class="td-syntax">panic(msg: string)</td><td class="td-desc">Zatrzymuje program z błędem</td></tr>
<tr><td class="td-syntax">assert(cond: bool, msg: string)</td><td class="td-desc">Guard clause</td></tr>
<tr><td class="td-syntax">exit(code: int)</td><td class="td-desc">Wychodzi z kodem</td></tr>
<tr><td class="td-syntax">parse_int(s: string) -> int?</td><td class="td-desc">Parsuje string → int (optional)</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">output.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"Hello from H#!"</span>)

    <span class="t-kw">let</span> port: int = <span class="t-num">8080</span>
    write(<span class="t-str">"Port: "</span> + to_string(port))

    <span class="t-kw">let</span> n: int = <span class="t-num">10</span>
    assert(n > <span class="t-num">0</span>, <span class="t-str">"n musi być dodatnie"</span>)

    exit(<span class="t-num">0</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
