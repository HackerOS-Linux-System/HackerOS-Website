window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['modules'] = `
<div class="section" id="modules">
<div class="sec-header"><span class="sec-num">23</span><h2>Moduły <span class="nav-new">v0.6</span></h2></div>
<p>H# obsługuje moduły inline (<code>mod ... is ... end</code>) oraz ładowanie plików zewnętrznych przez <code>use</code>. Moduły tworzą własną przestrzeń nazw dostępną przez <code>nazwamod::funkcja</code>.</p>

<h3>Moduł inline</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">src/main.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Moduł zdefiniowany inline w tym samym pliku</span>
<span class="t-kw">mod</span> math_utils <span class="t-kw">is</span>
    <span class="t-kw">pub fn</span> <span class="t-fn">gcd</span>(a: int, b: int) -> int <span class="t-kw">is</span>
        <span class="t-kw">if</span> b == <span class="t-num">0</span> <span class="t-kw">is</span> return a <span class="t-kw">end</span>
        return gcd(b, a % b)
    <span class="t-kw">end</span>

    <span class="t-kw">pub fn</span> <span class="t-fn">lcm</span>(a: int, b: int) -> int = a / gcd(a, b) * b

    <span class="t-kw">pub fn</span> <span class="t-fn">is_prime</span>(n: int) -> bool <span class="t-kw">is</span>
        <span class="t-kw">if</span> n < <span class="t-num">2</span> <span class="t-kw">is</span> return <span class="t-kw">false</span> <span class="t-kw">end</span>
        <span class="t-kw">let mut</span> i: int = <span class="t-num">2</span>
        <span class="t-kw">while</span> i * i <= n <span class="t-kw">is</span>
            <span class="t-kw">if</span> n % i == <span class="t-num">0</span> <span class="t-kw">is</span> return <span class="t-kw">false</span> <span class="t-kw">end</span>
            i += <span class="t-num">1</span>
        <span class="t-kw">end</span>
        return <span class="t-kw">true</span>
    <span class="t-kw">end</span>

    <span class="t-comment">;; Prywatna — niedostępna z zewnątrz</span>
    <span class="t-kw">fn</span> <span class="t-fn">internal_sqrt</span>(n: f64) -> f64 = n  <span class="t-comment">;; uproszczone</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    write(to_string(math_utils::gcd(<span class="t-num">48</span>, <span class="t-num">18</span>)))   <span class="t-comment">;; 6</span>
    write(to_string(math_utils::lcm(<span class="t-num">4</span>, <span class="t-num">6</span>)))    <span class="t-comment">;; 12</span>
    write(to_string(math_utils::is_prime(<span class="t-num">17</span>))) <span class="t-comment">;; true</span>
    <span class="t-comment">;; math_utils::internal_sqrt — błąd: niedostępna</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Import zewnętrznego pliku</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">src/main.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Import z biblioteki standardowej</span>
<span class="t-kw">use</span> <span class="t-str">"std -> json"</span>        <span class="t-kw">from</span> <span class="t-str">"json"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> collections"</span> <span class="t-kw">from</span> <span class="t-str">"col"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> crypto"</span>      <span class="t-kw">from</span> <span class="t-str">"crypto"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> net_http"</span>    <span class="t-kw">from</span> <span class="t-str">"http"</span>

<span class="t-comment">;; Import lokalnego pliku (src/utils.h#)</span>
<span class="t-kw">use</span> <span class="t-str">"local -> utils"</span>     <span class="t-kw">from</span> <span class="t-str">"utils"</span>

<span class="t-comment">;; Import z GitHub (bytes add github.com/user/repo)</span>
<span class="t-kw">use</span> <span class="t-str">"github.com/user/mylib"</span> <span class="t-kw">from</span> <span class="t-str">"mylib"</span>

<span class="t-comment">;; Python interop (bytes python numpy)</span>
<span class="t-kw">use</span> <span class="t-str">"python -> numpy"</span>       <span class="t-kw">from</span> <span class="t-str">"np"</span>
<span class="t-kw">use</span> <span class="t-str">"python -> cryptography"</span> <span class="t-kw">from</span> <span class="t-str">"pycrypto"</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> raw = <span class="t-str">"{{\"name\":\"H#\",\"version\":\"0.6\"}}"</span>
    <span class="t-kw">let</span> obj = json::parse(raw)
    write(json::get_str(obj, <span class="t-str">"name"</span>))    <span class="t-comment">;; H#</span>

    <span class="t-kw">let mut</span> map = col::HashMap::new()
    map.insert(<span class="t-str">"lang"</span>, <span class="t-str">"H#"</span>)

    <span class="t-kw">let</span> hash = crypto::sha256(<span class="t-str">"hackeros"</span>)
    write(hash[<span class="t-num">0</span>..<span class="t-num">16</span>])
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Widoczność — pub</h3>
<table class="ref-table">
<tr><th>Słowo kluczowe</th><th>Zasięg</th></tr>
<tr><td class="td-syntax">fn foo()</td><td class="td-desc">Prywatna — dostępna tylko w tym samym pliku / module</td></tr>
<tr><td class="td-syntax">pub fn foo()</td><td class="td-desc">Publiczna — eksportowana, dostępna po imporcie</td></tr>
<tr><td class="td-syntax">pub struct Foo</td><td class="td-desc">Struct publiczny — widoczny z zewnątrz</td></tr>
<tr><td class="td-syntax">pub x: int</td><td class="td-desc">Pole struct publiczne — dostępne przez dot access</td></tr>
</table>

<div class="code-block">
<div class="code-header"><span class="code-filename">src/utils.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Publiczne API modułu</span>
<span class="t-kw">pub fn</span> <span class="t-fn">format_bytes</span>(n: int) -> string <span class="t-kw">is</span>
    <span class="t-kw">if</span> n < <span class="t-num">1024</span> <span class="t-kw">is</span>        return to_string(n) + <span class="t-str">" B"</span>  <span class="t-kw">end</span>
    <span class="t-kw">if</span> n < <span class="t-num">1048576</span> <span class="t-kw">is</span>    return to_string(n / <span class="t-num">1024</span>) + <span class="t-str">" KB"</span> <span class="t-kw">end</span>
    return to_string(n / <span class="t-num">1048576</span>) + <span class="t-str">" MB"</span>
<span class="t-kw">end</span>

<span class="t-kw">pub fn</span> <span class="t-fn">clamp</span>(v: int, lo: int, hi: int) -> int <span class="t-kw">is</span>
    <span class="t-kw">if</span> v < lo <span class="t-kw">is</span> return lo <span class="t-kw">end</span>
    <span class="t-kw">if</span> v > hi <span class="t-kw">is</span> return hi <span class="t-kw">end</span>
    return v
<span class="t-kw">end</span>

<span class="t-kw">pub</span> struct Config <span class="t-kw">is</span>
    <span class="t-kw">pub</span> debug:   bool
    <span class="t-kw">pub</span> timeout: int
    <span class="t-kw">pub</span> host:    string
<span class="t-kw">end</span>

<span class="t-comment">;; Prywatna — nieeksportowana</span>
<span class="t-kw">fn</span> <span class="t-fn">internal</span>(x: int) -> int = x * <span class="t-num">2</span></pre></div></div>
</div>

<h3>Struktura projektu z modułami</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">struktura</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>myapp/
  bytes.toml
  src/
    main.h#           <span class="t-comment">;; use "local -> utils" from "utils"</span>
    utils.h#          <span class="t-comment">;; moduł utils</span>
    crypto.h#         <span class="t-comment">;; moduł crypto</span>
    net.h#            <span class="t-comment">;; moduł sieciowy</span>
  tests/
    utils_test.h#
    crypto_test.h#</pre></div></div>
</div>
</div>
`;
