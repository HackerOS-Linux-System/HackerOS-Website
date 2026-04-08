window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['async'] = `
<div class="section" id="spawn">
<div class="sec-header"><span class="sec-num">20</span><h2>Biblioteka standardowa — std</h2></div>
<p>H# posiada bogatą bibliotekę std. Import: <code>use "std -> moduł" from "alias"</code>. Wszystkie moduły wbudowane w binarkę.</p>

<h3>std -> io</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_io.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> io"</span> <span class="t-kw">from</span> <span class="t-str">"io"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-comment">;; Odczyt linii ze stdin</span>
    <span class="t-kw">let</span> input: string = io::read_line(<span class="t-str">"Podaj cel (IP/host): "</span>)
    write(<span class="t-str">"Cel: "</span> + input)

    <span class="t-comment">;; Wbudowane bez importu</span>
    write(<span class="t-str">"output z nową linią"</span>)
    to_string(<span class="t-num">42</span>)
    len(<span class="t-str">"hello"</span>)               <span class="t-comment">;; = 5</span>
    parse_int(<span class="t-str">"42"</span>)           <span class="t-comment">;; string → int?</span>
    assert(<span class="t-kw">true</span>, <span class="t-str">"msg"</span>)     <span class="t-comment">;; guard clause</span>
    panic(<span class="t-str">"nieoczekiwany błąd"</span>)
    exit(<span class="t-num">0</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std -> crypto</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_crypto.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> crypto -> hex"</span>   <span class="t-kw">from</span> <span class="t-str">"hex"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> crypto -> hash"</span>  <span class="t-kw">from</span> <span class="t-str">"hash"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sec"</span>            <span class="t-kw">from</span> <span class="t-str">"sec"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-comment">;; Hex encode/decode</span>
    <span class="t-kw">let</span> raw: string = <span class="t-str">"deadbeef"</span>
    <span class="t-kw">let</span> decoded: bytes = hex::decode(raw)
    <span class="t-kw">let</span> encoded: string = hex::encode(decoded)

    <span class="t-comment">;; Hash FNV-1a</span>
    <span class="t-kw">let</span> h: u64 = hash::fnv1a(<span class="t-str">"hello"</span>)
    write(<span class="t-str">"hash: "</span> + to_string(h))

    <span class="t-comment">;; sec — cybersec utils</span>
    <span class="t-kw">let</span> xored: string = sec::xor_hex(<span class="t-str">"4865"</span>, <span class="t-str">"AABB"</span>)
    <span class="t-kw">let</span> rot: string   = sec::rot13(<span class="t-str">"Hello"</span>)
    <span class="t-kw">let</span> open: bool    = sec::scan_port(<span class="t-str">"127.0.0.1"</span>, <span class="t-num">80</span>, <span class="t-num">200</span>)
    write(<span class="t-str">"ROT13: "</span> + rot)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std -> json / yaml / toml_fmt</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_json.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> json"</span>     <span class="t-kw">from</span> <span class="t-str">"json"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> yaml"</span>     <span class="t-kw">from</span> <span class="t-str">"yaml"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> raw: string = <span class="t-str">"{\"host\":\"192.168.1.1\",\"port\":443}"</span>
    <span class="t-kw">let</span> doc = json::parse(raw)
    write(<span class="t-str">"host: "</span> + json::get_str(doc, <span class="t-str">"host"</span>))
    write(<span class="t-str">"port: "</span> + to_string(json::get_int(doc, <span class="t-str">"port"</span>)))

    <span class="t-kw">let</span> out: string = json::stringify(doc)
    write(out)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std -> http</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_http.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> http"</span> <span class="t-kw">from</span> <span class="t-str">"http"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> resp: string = http::get(<span class="t-str">"https://example.com/api"</span>)
    write(resp)

    <span class="t-kw">let</span> body: string = <span class="t-str">"{\"key\":\"value\"}"</span>
    <span class="t-kw">let</span> r: string = http::post(<span class="t-str">"https://api.example.com"</span>, body)
    write(r)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std -> gtk — GTK4</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_gtk.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> gtk"</span> <span class="t-kw">from</span> <span class="t-str">"gtk"</span>

<span class="t-kw">fn</span> <span class="t-func">on_click</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"kliknięto!"</span>)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> app = gtk::App.new(<span class="t-str">"Moja Apka"</span>, <span class="t-num">640</span>, <span class="t-num">480</span>)
    app.run(|| <span class="t-kw">is</span>
        gtk::label(<span class="t-str">"H# GTK4"</span>)
        gtk::button(<span class="t-str">"Kliknij"</span>, <span class="t-str">"on_click"</span>)
        gtk::entry(<span class="t-str">"IP target..."</span>)
    <span class="t-kw">end</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Pełna tabela modułów std</h3>
<table class="ref-table">
<tr><th>Moduł</th><th>Import</th><th>Opis</th></tr>
<tr><td class="td-syntax">io</td><td class="td-note">std -> io</td><td class="td-desc">read_line, write, file I/O</td></tr>
<tr><td class="td-syntax">crypto -> hex</td><td class="td-note">std -> crypto -> hex</td><td class="td-desc">encode/decode hex</td></tr>
<tr><td class="td-syntax">crypto -> hash</td><td class="td-note">std -> crypto -> hash</td><td class="td-desc">FNV-1a hash</td></tr>
<tr><td class="td-syntax">sec</td><td class="td-note">std -> sec</td><td class="td-desc">xor_hex, rot13, scan_port, caesar</td></tr>
<tr><td class="td-syntax">net -> tcp</td><td class="td-note">std -> net -> tcp</td><td class="td-desc">TcpStream, connect</td></tr>
<tr><td class="td-syntax">net -> udp</td><td class="td-note">std -> net -> udp</td><td class="td-desc">UDP socket, bind</td></tr>
<tr><td class="td-syntax">http</td><td class="td-note">std -> http</td><td class="td-desc">GET, POST (no deps)</td></tr>
<tr><td class="td-syntax">json</td><td class="td-note">std -> json</td><td class="td-desc">parse, stringify, get_str/int</td></tr>
<tr><td class="td-syntax">yaml</td><td class="td-note">std -> yaml</td><td class="td-desc">parse, stringify (minimal)</td></tr>
<tr><td class="td-syntax">toml_fmt</td><td class="td-note">std -> toml_fmt</td><td class="td-desc">parse TOML</td></tr>
<tr><td class="td-syntax">math</td><td class="td-note">std -> math</td><td class="td-desc">sin, cos, PI, sqrt, abs, pow</td></tr>
<tr><td class="td-syntax">strings</td><td class="td-note">std -> strings</td><td class="td-desc">trim, split, join, pad, contains</td></tr>
<tr><td class="td-syntax">path</td><td class="td-note">std -> path</td><td class="td-desc">join, parent, filename, exists</td></tr>
<tr><td class="td-syntax">fs</td><td class="td-note">std -> fs</td><td class="td-desc">read, write, exists, mkdir</td></tr>
<tr><td class="td-syntax">os</td><td class="td-note">std -> os</td><td class="td-desc">platform, hostname, username</td></tr>
<tr><td class="td-syntax">env</td><td class="td-note">std -> env</td><td class="td-desc">get, set, args, cwd</td></tr>
<tr><td class="td-syntax">time</td><td class="td-note">std -> time</td><td class="td-desc">now_unix(), sleep_ms()</td></tr>
<tr><td class="td-syntax">process</td><td class="td-note">std -> process</td><td class="td-desc">run, spawn, exit_code</td></tr>
<tr><td class="td-syntax">collections</td><td class="td-note">std -> collections</td><td class="td-desc">HashMap, HashSet, VecDeque</td></tr>
<tr><td class="td-syntax">encoding -> base64</td><td class="td-note">std -> encoding -> base64</td><td class="td-desc">encode/decode</td></tr>
<tr><td class="td-syntax">encoding -> url</td><td class="td-note">std -> encoding -> url</td><td class="td-desc">percent-encode/decode</td></tr>
<tr><td class="td-syntax">regex</td><td class="td-note">std -> regex</td><td class="td-desc">is_match(pattern, text)</td></tr>
<tr><td class="td-syntax">gtk</td><td class="td-note">std -> gtk</td><td class="td-desc">GTK4 GUI (HackerOS)</td></tr>
</table>
</div>
`;
