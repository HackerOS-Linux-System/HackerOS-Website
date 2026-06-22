window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['przyklady'] = `
<div class="section" id="ex1">
<div class="sec-header"><span class="sec-num">EX-1</span><h2>Hello World</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">hello.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; H# Hello World — uruchom: hsharp build hello.h#</span>

<span class="t-kw">fn</span> <span class="t-func">greet</span>(name: string) -> string <span class="t-kw">is</span>
    return <span class="t-str">"Hello, "</span> + name + <span class="t-str">"!"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(greet(<span class="t-str">"H#"</span>))
    write(greet(<span class="t-str">"HackerOS"</span>))

    <span class="t-kw">let</span> <span class="t-kw2">mut</span> sum: int = <span class="t-num">0</span>
    <span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">1</span>..=<span class="t-num">5</span> <span class="t-kw">is</span>
        sum += i
    <span class="t-kw">end</span>
    write(<span class="t-str">"Sum 1..5 = "</span> + to_string(sum))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex2">
<div class="sec-header"><span class="sec-num">EX-2</span><h2>Port Scanner</h2><span class="sec-badge">struct · match · for · unsafe arena</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">port_scanner.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; H# Port Scanner — cybersec narzędzie</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sec"</span>        <span class="t-kw">from</span> <span class="t-str">"sec"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> net -> tcp"</span> <span class="t-kw">from</span> <span class="t-str">"tcp"</span>

<span class="t-kw">fn</span> <span class="t-func">classify_port</span>(port: int) -> string <span class="t-kw">is</span>
    <span class="t-kw">match</span> port <span class="t-kw">is</span>
        <span class="t-num">22</span>   => <span class="t-str">"SSH"</span>
        <span class="t-num">80</span>   => <span class="t-str">"HTTP"</span>
        <span class="t-num">443</span>  => <span class="t-str">"HTTPS"</span>
        <span class="t-num">445</span>  => <span class="t-str">"SMB"</span>
        <span class="t-num">3306</span> => <span class="t-str">"MySQL"</span>
        <span class="t-num">5432</span> => <span class="t-str">"PostgreSQL"</span>
        <span class="t-num">6379</span> => <span class="t-str">"Redis"</span>
        _    => <span class="t-str">"Unknown"</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">scan_range</span>(host: string, start: int, end_p: int) <span class="t-kw">is</span>
    write(<span class="t-str">"Scanning "</span> + host + <span class="t-str">" ports "</span> + to_string(start) + <span class="t-str">".."</span> + to_string(end_p))
    <span class="t-kw">let</span> <span class="t-kw2">mut</span> found: int = <span class="t-num">0</span>

    <span class="t-kw">for</span> port <span class="t-kw">in</span> start..=end_p <span class="t-kw">is</span>
        <span class="t-comment">;; sec::scan_port(host, port, 200) w pełnej implementacji</span>
        <span class="t-kw">let</span> open: bool = port == <span class="t-num">22</span> || port == <span class="t-num">80</span> || port == <span class="t-num">443</span>
        <span class="t-kw">if</span> open <span class="t-kw">is</span>
            found += <span class="t-num">1</span>
            write(<span class="t-str">"[OPEN] "</span> + to_string(port) + <span class="t-str">"/tcp ("</span> + classify_port(port) + <span class="t-str">")"</span>)
        <span class="t-kw">end</span>
    <span class="t-kw">end</span>
    write(<span class="t-str">"Znaleziono: "</span> + to_string(found) + <span class="t-str">" portów"</span>)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"H# Port Scanner v0.1"</span>)
    <span class="t-kw">unsafe</span> arena(<span class="t-num">65536</span>) <span class="t-kw">is</span>
        scan_range(<span class="t-str">"192.168.1.1"</span>, <span class="t-num">1</span>, <span class="t-num">1024</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex3">
<div class="sec-header"><span class="sec-num">EX-3</span><h2>XOR Cipher</h2><span class="sec-badge">bytes · crypto · encoding</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">xor_cipher.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; H# XOR Cipher</span>
<span class="t-kw">use</span> <span class="t-str">"std -> crypto -> hex"</span>        <span class="t-kw">from</span> <span class="t-str">"hex"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> encoding -> base64"</span>   <span class="t-kw">from</span> <span class="t-str">"b64"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sec"</span>                  <span class="t-kw">from</span> <span class="t-str">"sec"</span>

<span class="t-kw">fn</span> <span class="t-func">xor_encrypt</span>(data: string, key: string) -> string <span class="t-kw">is</span>
    return sec::xor_hex(data, key)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"H# XOR Cipher"</span>)
    write(<span class="t-str">"══════════════"</span>)

    <span class="t-kw">let</span> plaintext: string = <span class="t-str">"48656C6C6F"</span>   <span class="t-comment">;; "Hello" hex</span>
    <span class="t-kw">let</span> key:       string = <span class="t-str">"AABBCCDDEE"</span>

    write(<span class="t-str">"Plaintext:  "</span> + plaintext)
    write(<span class="t-str">"Key:        "</span> + key)

    <span class="t-kw">let</span> cipher: string = xor_encrypt(plaintext, key)
    write(<span class="t-str">"Ciphertext: "</span> + cipher)

    <span class="t-kw">let</span> decoded: string = xor_encrypt(cipher, key)
    write(<span class="t-str">"Decrypted:  "</span> + decoded)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex4">
<div class="sec-header"><span class="sec-num">EX-4</span><h2>Struct + Trait + Enum</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">network_adt.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; H# Network ADT — typy danych sieciowych</span>

<span class="t-kw">enum</span> PortStatus <span class="t-kw">is</span>
    Open
    Closed
    Filtered(string)
    Error(int, string)
<span class="t-kw">end</span>

<span class="t-kw">struct</span> Packet <span class="t-kw">is</span>
    <span class="t-kw">pub</span> src:     string
    <span class="t-kw">pub</span> dst:     string
    <span class="t-kw">pub</span> port:    u16
    <span class="t-kw">pub</span> payload: bytes
<span class="t-kw">end</span>

<span class="t-kw">trait</span> Analyzer <span class="t-kw">is</span>
    <span class="t-kw">fn</span> <span class="t-func">analyze</span>(self, pkt: Packet) -> PortStatus
    <span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string
<span class="t-kw">end</span>

<span class="t-kw">struct</span> TcpAnalyzer <span class="t-kw">is</span>
    <span class="t-kw">pub</span> timeout_ms: int
<span class="t-kw">end</span>

<span class="t-kw">impl</span> TcpAnalyzer: Analyzer <span class="t-kw">is</span>
    <span class="t-kw">fn</span> <span class="t-func">analyze</span>(self, pkt: Packet) -> PortStatus <span class="t-kw">is</span>
        <span class="t-kw">if</span> pkt.port == <span class="t-num">0</span> <span class="t-kw">is</span>
            return PortStatus::Error(<span class="t-num">1</span>, <span class="t-str">"port 0 niedozwolony"</span>)
        <span class="t-kw">end</span>
        return PortStatus::Open
    <span class="t-kw">end</span>
    <span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string = <span class="t-str">"TCP Analyzer"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> a   = TcpAnalyzer { timeout_ms: <span class="t-num">5000</span> }
    <span class="t-kw">let</span> pkt = Packet { src: <span class="t-str">"10.0.0.1"</span>, dst: <span class="t-str">"192.168.1.1"</span>, port: <span class="t-num">443</span>, payload: [] }

    <span class="t-kw">match</span> a.analyze(pkt) <span class="t-kw">is</span>
        Open         => write(<span class="t-str">"OTWARTY"</span>)
        Closed       => write(<span class="t-str">"zamknięty"</span>)
        Filtered(m)  => write(<span class="t-str">"filtr: "</span> + m)
        Error(c, m)  => write(<span class="t-str">"błąd "</span> + to_string(c) + <span class="t-str">": "</span> + m)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex5">
<div class="sec-header"><span class="sec-num">EX-5</span><h2>GUI App — GTK4</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">gui_app.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; H# GTK4 App — HackerOS desktop narzędzie</span>
<span class="t-kw">use</span> <span class="t-str">"std -> gtk"</span>  <span class="t-kw">from</span> <span class="t-str">"gtk"</span>

<span class="t-kw">fn</span> <span class="t-func">on_scan</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"Skanowanie..."</span>)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> app = gtk::App.new(<span class="t-str">"H# Network Tool"</span>, <span class="t-num">640</span>, <span class="t-num">480</span>)
    app.run(|| <span class="t-kw">is</span>
        gtk::label(<span class="t-str">"H# CyberSec Tool"</span>)
        gtk::entry(<span class="t-str">"Target IP..."</span>)
        gtk::button(<span class="t-str">"Skanuj"</span>, <span class="t-str">"on_scan"</span>)
    <span class="t-kw">end</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex6">
<div class="sec-header"><span class="sec-num">EX-6</span><h2>Python Interop (bytes PM)</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">python_interop.h#  (bytes run)</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; H# + Python interop — tylko bytes PM</span>
<span class="t-comment">;; bytes.toml: [python] packages = ["numpy","cryptography"]</span>
<span class="t-kw">use</span> <span class="t-str">"python -> numpy"</span>        <span class="t-kw">from</span> <span class="t-str">"np"</span>
<span class="t-kw">use</span> <span class="t-str">"python -> cryptography"</span>  <span class="t-kw">from</span> <span class="t-str">"crypto"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(<span class="t-str">"H# + Python interop"</span>)

    <span class="t-comment">;; Wywołaj numpy przez H# FFI</span>
    <span class="t-kw">let</span> result: string = np_call(<span class="t-str">"mean"</span>, <span class="t-str">"[1,2,3,4,5]"</span>)
    write(<span class="t-str">"numpy mean: "</span> + result)

    <span class="t-comment">;; Python venv jest w ~/.hackeros/H#/libs/session-PID/pyenv/</span>
    write(<span class="t-str">"Pakiety Python instalowane do RAM (tmpfs)"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="cheatsheet">
<div class="sec-header"><span class="sec-num">★</span><h2>Cheat Sheet — H# 0.1</h2></div>
<div class="grid2">
<div>
<h3>Podstawy</h3>
<table class="ref-table">
<tr><td class="td-syntax">;; komentarz</td><td class="td-desc">Liniowy</td></tr>
<tr><td class="td-syntax">/// doc</td><td class="td-desc">Dokumentacyjny</td></tr>
<tr><td class="td-syntax">let x: int = 42</td><td class="td-desc">Niemutowalna</td></tr>
<tr><td class="td-syntax">let mut x = 0</td><td class="td-desc">Mutowalna</td></tr>
<tr><td class="td-syntax">write("tekst")</td><td class="td-desc">Wypisz z \\n</td></tr>
<tr><td class="td-syntax">to_string(n)</td><td class="td-desc">int/bool → string</td></tr>
</table>
<h3>Importy</h3>
<table class="ref-table">
<tr><td class="td-syntax">use "std -> io" from "io"</td><td class="td-desc">Std lib</td></tr>
<tr><td class="td-syntax">use "github.com/user/pkg" from "p"</td><td class="td-desc">bytes registry / GitHub</td></tr>
<tr><td class="td-syntax">use "bytes -> pkg" from "p"</td><td class="td-desc">Bytes repo</td></tr>
<tr><td class="td-syntax">use "python -> np" from "np"</td><td class="td-desc">Python interop</td></tr>
<tr><td class="td-syntax">use "github.com/u/r" from "r"</td><td class="td-desc">Git repo</td></tr>
</table>
<h3>Bloki</h3>
<table class="ref-table">
<tr><td class="td-syntax">fn f() is...end</td><td class="td-desc">Funkcja</td></tr>
<tr><td class="td-syntax">struct S is...end</td><td class="td-desc">Struktura</td></tr>
<tr><td class="td-syntax">impl S is...end</td><td class="td-desc">Metody</td></tr>
<tr><td class="td-syntax">trait T is...end</td><td class="td-desc">Trait</td></tr>
<tr><td class="td-syntax">enum E is...end</td><td class="td-desc">Wyliczenie</td></tr>
<tr><td class="td-syntax">if c is...end</td><td class="td-desc">Warunek</td></tr>
<tr><td class="td-syntax">match x is...end</td><td class="td-desc">Pattern match</td></tr>
<tr><td class="td-syntax">for i in r is...end</td><td class="td-desc">Pętla for</td></tr>
<tr><td class="td-syntax">while c is...end</td><td class="td-desc">Pętla while</td></tr>
</table>
</div>
<div>
<h3>Unsafe</h3>
<table class="ref-table">
<tr><td class="td-syntax">unsafe is...end</td><td class="td-desc">Blok unsafe</td></tr>
<tr><td class="td-syntax">unsafe arena is...end</td><td class="td-desc">Arena 1MB</td></tr>
<tr><td class="td-syntax">unsafe arena(N) is...end</td><td class="td-desc">Arena N bajtów</td></tr>
<tr><td class="td-syntax">unsafe manual is...end</td><td class="td-desc">malloc/free</td></tr>
</table>
<h3>Narzędzia</h3>
<table class="ref-table">
<tr><td class="td-syntax">hsharp preview f.h#</td><td class="td-desc">Interpreter</td></tr>
<tr><td class="td-syntax">hsharp build f.h#</td><td class="td-desc">Cranelift compile</td></tr>
<tr><td class="td-syntax">hsharp check f.h#</td><td class="td-desc">Syntax + types</td></tr>
<tr><td class="td-syntax">bytes run</td><td class="td-desc">JIT w RAM</td></tr>
<tr><td class="td-syntax">h# compile --release</td><td class="td-desc">LLVM O3+AVX2</td></tr>
<tr><td class="td-syntax">bytes run</td><td class="td-desc">JIT w RAM</td></tr>
<tr><td class="td-syntax">bytes python numpy</td><td class="td-desc">Python pkg</td></tr>
</table>
<h3>Std</h3>
<table class="ref-table">
<tr><td class="td-syntax">use "std -> io"</td><td class="td-desc">write, keyboard</td></tr>
<tr><td class="td-syntax">use "std -> json"</td><td class="td-desc">parse, stringify</td></tr>
<tr><td class="td-syntax">use "std -> sec"</td><td class="td-desc">xor, scan_port, hex</td></tr>
<tr><td class="td-syntax">use "std -> math"</td><td class="td-desc">sin, cos, PI, sqrt</td></tr>
<tr><td class="td-syntax">use "std -> gtk"</td><td class="td-desc">GTK4 GUI</td></tr>
<tr><td class="td-syntax">use "std -> http"</td><td class="td-desc">GET, POST</td></tr>
<tr><td class="td-syntax">use "std -> fs"</td><td class="td-desc">read, write, exists</td></tr>
<tr><td class="td-syntax">use "std -> os"</td><td class="td-desc">platform, hostname</td></tr>
<tr><td class="td-syntax">use "std -> env"</td><td class="td-desc">get, set, args</td></tr>
</table>
</div>
</div>
</div>

<div class="divider"></div>
</div>
</div>
</div>

<div class="section" id="examples-extra">
<div class="sec-header"><span class="sec-num">21b</span><h2>Więcej przykładów</h2></div>

<h3>JSON API Client</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">json_api.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> net_http"</span> <span class="t-kw">from</span> <span class="t-str">"http"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> json"</span>     <span class="t-kw">from</span> <span class="t-str">"json"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> fmt"</span>      <span class="t-kw">from</span> <span class="t-str">"fmt"</span>

struct User <span class="t-kw">is</span>
    <span class="t-kw">pub</span> id:    int
    <span class="t-kw">pub</span> name:  string
    <span class="t-kw">pub</span> email: string
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">fetch_user</span>(id: int) -> User? <span class="t-kw">is</span>
    <span class="t-kw">let</span> url  = <span class="t-str">"https://api.example.com/users/{id}"</span>
    <span class="t-kw">let</span> resp = http::get(url)
    <span class="t-kw">if</span> resp.status != <span class="t-num">200</span> <span class="t-kw">is</span> return nil <span class="t-kw">end</span>
    <span class="t-kw">let</span> obj = json::parse(resp.body)<span class="t-op">?</span>
    return User {
        id:    json::get_int(obj, <span class="t-str">"id"</span>),
        name:  json::get_str(obj, <span class="t-str">"name"</span>),
        email: json::get_str(obj, <span class="t-str">"email"</span>)
    }
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> user = fetch_user(<span class="t-num">1</span>)
    <span class="t-kw">if</span> user == nil <span class="t-kw">is</span>
        write(fmt::red(<span class="t-str">"User not found"</span>))
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(fmt::bold(<span class="t-str">"User #{user.id}: {user.name}"</span>))
        write(<span class="t-str">"Email: {user.email}"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>XOR Cipher + Hex</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">xor_cipher.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> sec"</span> <span class="t-kw">from</span> <span class="t-str">"sec"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> hex"</span> <span class="t-kw">from</span> <span class="t-str">"hex"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> cli"</span> <span class="t-kw">from</span> <span class="t-str">"cli"</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> plain  = cli::prompt(<span class="t-str">"Message: "</span>)
    <span class="t-kw">let</span> key    = cli::prompt(<span class="t-str">"Key:     "</span>)

    <span class="t-kw">let</span> enc    = sec::xor(plain, key)
    <span class="t-kw">let</span> enc_hex = hex::encode(enc)
    write(<span class="t-str">"Encrypted (hex): {enc_hex}"</span>)

    <span class="t-kw">let</span> dec    = sec::xor(enc, key)
    write(<span class="t-str">"Decrypted:       {dec}"</span>)

    <span class="t-comment">;; Verify roundtrip</span>
    <span class="t-kw">if</span> dec == plain <span class="t-kw">is</span>
        write(<span class="t-str">"✓ Roundtrip OK"</span>)
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(<span class="t-str">"✗ Roundtrip FAILED"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Async HTTP Scraper</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">scraper.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> net_http"</span> <span class="t-kw">from</span> <span class="t-str">"http"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> async_"</span>   <span class="t-kw">from</span> <span class="t-str">"async"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> regex"</span>    <span class="t-kw">from</span> <span class="t-str">"re"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> fmt"</span>      <span class="t-kw">from</span> <span class="t-str">"fmt"</span>

async <span class="t-kw">fn</span> <span class="t-fn">fetch_title</span>(url: string) -> string <span class="t-kw">is</span>
    <span class="t-kw">let</span> resp = http::get(url)
    <span class="t-kw">if</span> resp.status != <span class="t-num">200</span> <span class="t-kw">is</span>
        return <span class="t-str">"[{resp.status}] {url}"</span>
    <span class="t-kw">end</span>
    <span class="t-kw">let</span> title = re::find(resp.body, <span class="t-str">"&lt;title&gt;([^&lt;]+)&lt;/title&gt;"</span>)
    <span class="t-kw">if</span> title == <span class="t-str">""</span> <span class="t-kw">is</span> return <span class="t-str">"(no title)"</span> <span class="t-kw">end</span>
    return title
<span class="t-kw">end</span>

async <span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> urls = [
        <span class="t-str">"https://hackeros.dev"</span>,
        <span class="t-str">"https://example.com"</span>,
        <span class="t-str">"https://httpbin.org"</span>
    ]

    <span class="t-kw">let mut</span> tasks: [any] = []
    <span class="t-kw">for</span> url <span class="t-kw">in</span> urls <span class="t-kw">is</span>
        tasks.push(async::spawn(|| -> string <span class="t-kw">is</span>
            return await fetch_title(url)
        <span class="t-kw">end</span>))
    <span class="t-kw">end</span>

    <span class="t-kw">let mut</span> i: int = <span class="t-num">0</span>
    <span class="t-kw">for</span> task <span class="t-kw">in</span> tasks <span class="t-kw">is</span>
        <span class="t-kw">let</span> title = await task
        write(fmt::green(<span class="t-str">"[{i}]"</span>) + <span class="t-str">" {urls[i]}"</span>)
        write(<span class="t-str">"     Title: {title}"</span>)
        i += <span class="t-num">1</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Iterator pipeline — przetwarzanie danych</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">pipeline.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> iter"</span> <span class="t-kw">from</span> <span class="t-str">"iter"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sort"</span> <span class="t-kw">from</span> <span class="t-str">"sort"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> fmt"</span>  <span class="t-kw">from</span> <span class="t-str">"fmt"</span>

struct Student <span class="t-kw">is</span>
    <span class="t-kw">pub</span> name:  string
    <span class="t-kw">pub</span> score: int
    <span class="t-kw">pub</span> grade: string
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">letter_grade</span>(score: int) -> string <span class="t-kw">is</span>
    <span class="t-kw">if</span> score >= <span class="t-num">90</span> <span class="t-kw">is</span> return <span class="t-str">"A"</span> <span class="t-kw">end</span>
    <span class="t-kw">if</span> score >= <span class="t-num">80</span> <span class="t-kw">is</span> return <span class="t-str">"B"</span> <span class="t-kw">end</span>
    <span class="t-kw">if</span> score >= <span class="t-num">70</span> <span class="t-kw">is</span> return <span class="t-str">"C"</span> <span class="t-kw">end</span>
    return <span class="t-str">"F"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> scores = [<span class="t-num">88</span>, <span class="t-num">92</span>, <span class="t-num">74</span>, <span class="t-num">65</span>, <span class="t-num">95</span>, <span class="t-num">83</span>, <span class="t-num">71</span>, <span class="t-num">50</span>]

    <span class="t-comment">;; Pipeline: filtruj zdanych → oblicz oceny → stats</span>
    <span class="t-kw">let</span> passing = iter::filter(scores, |s: int| -> bool <span class="t-kw">is</span> s >= <span class="t-num">60</span> <span class="t-kw">end</span>)
    <span class="t-kw">let</span> total   = iter::reduce(passing, <span class="t-num">0</span>, |a: int, x: int| -> int <span class="t-kw">is</span> a + x <span class="t-kw">end</span>)
    <span class="t-kw">let</span> avg     = total / passing.len()
    <span class="t-kw">let</span> highest = sort::max_int(scores)

    write(fmt::bold(<span class="t-str">"=== Wyniki ==="</span>))
    write(<span class="t-str">"Zdanych:  {passing.len()}/{scores.len()}"</span>)
    write(<span class="t-str">"Średnia:  {avg}"</span>)
    write(<span class="t-str">"Najwyższy: {highest} ({letter_grade(highest)})"</span>)

    write(<span class="t-str">""</span>)
    write(fmt::bold(<span class="t-str">"Rozkład ocen:"</span>))
    <span class="t-kw">for</span> s <span class="t-kw">in</span> scores <span class="t-kw">is</span>
        <span class="t-kw">let</span> g    = letter_grade(s)
        <span class="t-kw">let</span> bar  = iter::repeat(<span class="t-str">"█"</span>, s / <span class="t-num">10</span>)
        <span class="t-kw">let</span> line = iter::join(bar, <span class="t-str">""</span>)
        write(<span class="t-str">"{s} [{g}] {line}"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>TCP Port Scanner</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">port_scanner.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> net_tcp"</span> <span class="t-kw">from</span> <span class="t-str">"tcp"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> async_"</span>  <span class="t-kw">from</span> <span class="t-str">"async"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> fmt"</span>     <span class="t-kw">from</span> <span class="t-str">"fmt"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> time"</span>    <span class="t-kw">from</span> <span class="t-str">"t"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> cli"</span>     <span class="t-kw">from</span> <span class="t-str">"cli"</span>

<span class="t-kw">let</span> COMMON_PORTS: [int] = [
    <span class="t-num">21</span>, <span class="t-num">22</span>, <span class="t-num">23</span>, <span class="t-num">25</span>, <span class="t-num">53</span>, <span class="t-num">80</span>, <span class="t-num">110</span>, <span class="t-num">143</span>,
    <span class="t-num">443</span>, <span class="t-num">445</span>, <span class="t-num">3306</span>, <span class="t-num">5432</span>, <span class="t-num">6379</span>, <span class="t-num">8080</span>, <span class="t-num">8443</span>
]

<span class="t-kw">let</span> PORT_NAMES: any = {
    <span class="t-num">21</span>: <span class="t-str">"FTP"</span>, <span class="t-num">22</span>: <span class="t-str">"SSH"</span>, <span class="t-num">23</span>: <span class="t-str">"Telnet"</span>,
    <span class="t-num">25</span>: <span class="t-str">"SMTP"</span>, <span class="t-num">80</span>: <span class="t-str">"HTTP"</span>, <span class="t-num">443</span>: <span class="t-str">"HTTPS"</span>,
    <span class="t-num">3306</span>: <span class="t-str">"MySQL"</span>, <span class="t-num">5432</span>: <span class="t-str">"PostgreSQL"</span>,
    <span class="t-num">6379</span>: <span class="t-str">"Redis"</span>, <span class="t-num">8080</span>: <span class="t-str">"HTTP-Alt"</span>
}

async <span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> target = cli::prompt(<span class="t-str">"Target host: "</span>)
    write(fmt::bold(<span class="t-str">"Scanning {target}..."</span>))
    write(fmt::dim(<span class="t-str">"─────────────────────────"</span>))

    <span class="t-kw">let</span> start  = t::now_unix()
    <span class="t-kw">let mut</span> found: int = <span class="t-num">0</span>

    <span class="t-kw">for</span> port <span class="t-kw">in</span> COMMON_PORTS <span class="t-kw">is</span>
        <span class="t-kw">let</span> open = await tcp::is_open_async(target, port, <span class="t-num">500</span>)
        <span class="t-kw">if</span> open <span class="t-kw">is</span>
            <span class="t-kw">let</span> svc = PORT_NAMES[port]
            write(fmt::green(<span class="t-str">" OPEN"</span>) + <span class="t-str">" {port}/tcp  {svc}"</span>)
            found += <span class="t-num">1</span>
        <span class="t-kw">end</span>
    <span class="t-kw">end</span>

    <span class="t-kw">let</span> elapsed = t::now_unix() - start
    write(fmt::dim(<span class="t-str">"─────────────────────────"</span>))
    write(<span class="t-str">"Found {found} open port(s) in {elapsed}ms"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>SHA-256 File Hasher</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">hasher.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> fs"</span>     <span class="t-kw">from</span> <span class="t-str">"fs"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> crypto"</span> <span class="t-kw">from</span> <span class="t-str">"crypto"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> env"</span>    <span class="t-kw">from</span> <span class="t-str">"env"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> fmt"</span>    <span class="t-kw">from</span> <span class="t-str">"fmt"</span>

<span class="t-kw">fn</span> <span class="t-fn">hash_file</span>(path: string) -> string? <span class="t-kw">is</span>
    <span class="t-kw">if</span> !fs::exists(path) <span class="t-kw">is</span>
        return nil
    <span class="t-kw">end</span>
    <span class="t-kw">let</span> data = fs::read_bytes(path)
    return crypto::sha256_bytes(data)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> args = env::args()
    <span class="t-kw">if</span> args.len() < <span class="t-num">2</span> <span class="t-kw">is</span>
        write(fmt::red(<span class="t-str">"Usage: hasher &lt;file&gt; [file2 ...]"</span>))
        return
    <span class="t-kw">end</span>

    <span class="t-kw">for</span> path <span class="t-kw">in</span> args[<span class="t-num">1</span>..] <span class="t-kw">is</span>
        <span class="t-kw">let</span> hash = hash_file(path)
        <span class="t-kw">if</span> hash == nil <span class="t-kw">is</span>
            write(fmt::red(<span class="t-str">"NOT FOUND: {path}"</span>))
        <span class="t-kw">else</span> <span class="t-kw">is</span>
            write(<span class="t-str">"{hash}  {path}"</span>)
        <span class="t-kw">end</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
