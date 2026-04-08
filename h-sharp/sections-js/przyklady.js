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
<tr><td class="td-syntax">use "vira -> pkg" from "p"</td><td class="td-desc">Vira registry</td></tr>
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
<tr><td class="td-syntax">vira build</td><td class="td-desc">Projekt Cranelift</td></tr>
<tr><td class="td-syntax">vira build --release</td><td class="td-desc">LLVM O3+AVX2</td></tr>
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
`;
