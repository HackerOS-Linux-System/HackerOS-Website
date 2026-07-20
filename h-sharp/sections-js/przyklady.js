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
<span class="t-comment">;; bytes.hk: [python] -> packages = numpy,cryptography</span>
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

<div class="section" id="ex7">
<div class="sec-header"><span class="sec-num">EX-7</span><h2>Odczyt configu JSON</h2><span class="sec-badge">fs · json · Optional</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">config_reader.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> fs"</span>   <span class="t-kw">from</span> <span class="t-str">"fs"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> json"</span> <span class="t-kw">from</span> <span class="t-str">"json"</span>

<span class="t-kw">fn</span> <span class="t-func">read_port</span>(path: string) -> int? <span class="t-kw">is</span>
    <span class="t-kw">let</span> raw: string? = fs::read_to_string(path)?
    <span class="t-kw">let</span> parsed: any?  = json::parse(raw)?
    <span class="t-kw">return</span> parsed[<span class="t-str">"server"</span>][<span class="t-str">"port"</span>]?
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> port = read_port(<span class="t-str">"config.json"</span>)
    <span class="t-kw">if</span> port == nil <span class="t-kw">is</span>
        write(<span class="t-str">"nie udało się wczytać portu"</span>)
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(<span class="t-str">"port: "</span> + to_string(port))
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex8">
<div class="sec-header"><span class="sec-num">EX-8</span><h2>Fibonacci z memoizacją</h2><span class="sec-badge">HashMap · rekurencja</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">fib_memo.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> collections"</span> <span class="t-kw">from</span> <span class="t-str">"col"</span>

<span class="t-kw">fn</span> <span class="t-func">fib</span>(n: int, cache: col::HashMap&lt;int, int&gt;) -> int <span class="t-kw">is</span>
    <span class="t-kw">if</span> n &lt;= <span class="t-num">1</span> <span class="t-kw">is</span> <span class="t-kw">return</span> n <span class="t-kw">end</span>
    <span class="t-kw">let</span> hit: int? = cache.get(n)
    <span class="t-kw">if</span> hit != nil <span class="t-kw">is</span> <span class="t-kw">return</span> hit <span class="t-kw">end</span>

    <span class="t-kw">let</span> result: int = fib(n - <span class="t-num">1</span>, cache) + fib(n - <span class="t-num">2</span>, cache)
    cache.insert(n, result)
    <span class="t-kw">return</span> result
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> cache: col::HashMap&lt;int, int&gt; = col::HashMap::new()
    <span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">0</span>..=<span class="t-num">30</span> <span class="t-kw">is</span>
        write(<span class="t-str">"fib("</span> + to_string(i) + <span class="t-str">") = "</span> + to_string(fib(i, cache)))
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex9">
<div class="sec-header"><span class="sec-num">EX-9</span><h2>Prosty klient HTTP</h2><span class="sec-badge">http · async</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">http_get.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> http"</span> <span class="t-kw">from</span> <span class="t-str">"http"</span>

<span class="t-kw">async fn</span> <span class="t-func">fetch_status</span>(url: string) -> int <span class="t-kw">is</span>
    <span class="t-kw">let</span> resp = <span class="t-kw">await</span> http::get(url)
    <span class="t-kw">return</span> resp.status
<span class="t-kw">end</span>

<span class="t-kw">async fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> urls: [string] = [<span class="t-str">"https://example.com"</span>, <span class="t-str">"https://hackeros.dev"</span>]
    <span class="t-kw">for</span> u <span class="t-kw">in</span> urls <span class="t-kw">is</span>
        <span class="t-kw">let</span> code: int = <span class="t-kw">await</span> fetch_status(u)
        write(u + <span class="t-str">" -> "</span> + to_string(code))
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex10">
<div class="sec-header"><span class="sec-num">EX-10</span><h2>Producer / Consumer</h2><span class="sec-badge">async · task</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">producer_consumer.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">async fn</span> <span class="t-func">produce</span>(n: int) -> [int] <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> items: [int] = []
    <span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">0</span>..n <span class="t-kw">is</span>
        items = array_push(items, i * i)
    <span class="t-kw">end</span>
    <span class="t-kw">return</span> items
<span class="t-kw">end</span>

<span class="t-kw">async fn</span> <span class="t-func">consume</span>(items: [int]) -> int <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> total: int = <span class="t-num">0</span>
    <span class="t-kw">for</span> it <span class="t-kw">in</span> items <span class="t-kw">is</span> total += it <span class="t-kw">end</span>
    <span class="t-kw">return</span> total
<span class="t-kw">end</span>

<span class="t-kw">async fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> items = <span class="t-kw">await</span> produce(<span class="t-num">10</span>)
    <span class="t-kw">let</span> total = <span class="t-kw">await</span> consume(items)
    write(<span class="t-str">"suma kwadratów: "</span> + to_string(total))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex11">
<div class="sec-header"><span class="sec-num">EX-11</span><h2>Binary Search</h2><span class="sec-badge">algorytmy · tablice</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">binary_search.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">binary_search</span>(arr: [int], target: int) -> int <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> lo: int = <span class="t-num">0</span>
    <span class="t-kw">let mut</span> hi: int = array_len(arr) - <span class="t-num">1</span>
    <span class="t-kw">while</span> lo &lt;= hi <span class="t-kw">is</span>
        <span class="t-kw">let</span> mid: int = (lo + hi) / <span class="t-num">2</span>
        <span class="t-kw">if</span> arr[mid] == target <span class="t-kw">is</span> <span class="t-kw">return</span> mid
        <span class="t-kw">elsif</span> arr[mid] &lt; target <span class="t-kw">is</span> lo = mid + <span class="t-num">1</span>
        <span class="t-kw">else</span> <span class="t-kw">is</span> hi = mid - <span class="t-num">1</span>
        <span class="t-kw">end</span>
    <span class="t-kw">end</span>
    <span class="t-kw">return</span> -<span class="t-num">1</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> sorted: [int] = [<span class="t-num">1</span>, <span class="t-num">3</span>, <span class="t-num">5</span>, <span class="t-num">7</span>, <span class="t-num">9</span>, <span class="t-num">11</span>, <span class="t-num">13</span>]
    write(<span class="t-str">"index(7) = "</span> + to_string(binary_search(sorted, <span class="t-num">7</span>)))
    write(<span class="t-str">"index(4) = "</span> + to_string(binary_search(sorted, <span class="t-num">4</span>)))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex12">
<div class="sec-header"><span class="sec-num">EX-12</span><h2>Parser argumentów CLI</h2><span class="sec-badge">env · string</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">arg_parser.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> env"</span> <span class="t-kw">from</span> <span class="t-str">"env"</span>

<span class="t-kw">struct</span> Flags <span class="t-kw">is</span>
    <span class="t-kw">pub</span> verbose: bool
    <span class="t-kw">pub</span> output:  string
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">parse_flags</span>(args: [string]) -> Flags <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> f: Flags = Flags { verbose: false, output: <span class="t-str">"a.out"</span> }
    <span class="t-kw">let mut</span> i: int = <span class="t-num">1</span>
    <span class="t-kw">while</span> i &lt; array_len(args) <span class="t-kw">is</span>
        <span class="t-kw">if</span> args[i] == <span class="t-str">"-v"</span> <span class="t-kw">is</span> f.verbose = true
        <span class="t-kw">elsif</span> args[i] == <span class="t-str">"-o"</span> && i + <span class="t-num">1</span> &lt; array_len(args) <span class="t-kw">is</span>
            i += <span class="t-num">1</span>
            f.output = args[i]
        <span class="t-kw">end</span>
        i += <span class="t-num">1</span>
    <span class="t-kw">end</span>
    <span class="t-kw">return</span> f
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> flags = parse_flags(env::args())
    write(<span class="t-str">"verbose="</span> + to_string(flags.verbose) + <span class="t-str">" output="</span> + flags.output)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex13">
<div class="sec-header"><span class="sec-num">EX-13</span><h2>Key-Value Store z zapisem</h2><span class="sec-badge">fs · HashMap · json</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">kv_store.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> fs"</span>         <span class="t-kw">from</span> <span class="t-str">"fs"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> collections"</span> <span class="t-kw">from</span> <span class="t-str">"col"</span>

<span class="t-kw">fn</span> <span class="t-func">save</span>(store: col::HashMap&lt;string, string&gt;, path: string) <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> lines: string = <span class="t-str">""</span>
    <span class="t-kw">for</span> key <span class="t-kw">in</span> store.keys() <span class="t-kw">is</span>
        lines = lines + key + <span class="t-str">"="</span> + store.get(key) + <span class="t-str">"\n"</span>
    <span class="t-kw">end</span>
    fs::write_string(path, lines)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> store: col::HashMap&lt;string, string&gt; = col::HashMap::new()
    store.insert(<span class="t-str">"host"</span>, <span class="t-str">"127.0.0.1"</span>)
    store.insert(<span class="t-str">"port"</span>, <span class="t-str">"8080"</span>)
    save(store, <span class="t-str">"store.db"</span>)
    write(<span class="t-str">"zapisano "</span> + to_string(store.len()) + <span class="t-str">" kluczy"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex14">
<div class="sec-header"><span class="sec-num">EX-14</span><h2>Operacje na macierzach</h2><span class="sec-badge">tablice 2D</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">matrix.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">mat_mul</span>(a: [[int]], b: [[int]]) -> [[int]] <span class="t-kw">is</span>
    <span class="t-kw">let</span> n: int = array_len(a)
    <span class="t-kw">let</span> m: int = array_len(b[<span class="t-num">0</span>])
    <span class="t-kw">let</span> k: int = array_len(b)
    <span class="t-kw">let mut</span> result: [[int]] = []
    <span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">0</span>..n <span class="t-kw">is</span>
        <span class="t-kw">let mut</span> row: [int] = []
        <span class="t-kw">for</span> j <span class="t-kw">in</span> <span class="t-num">0</span>..m <span class="t-kw">is</span>
            <span class="t-kw">let mut</span> sum: int = <span class="t-num">0</span>
            <span class="t-kw">for</span> x <span class="t-kw">in</span> <span class="t-num">0</span>..k <span class="t-kw">is</span> sum += a[i][x] * b[x][j] <span class="t-kw">end</span>
            row = array_push(row, sum)
        <span class="t-kw">end</span>
        result = array_push(result, row)
    <span class="t-kw">end</span>
    <span class="t-kw">return</span> result
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> a: [[int]] = [[<span class="t-num">1</span>, <span class="t-num">2</span>], [<span class="t-num">3</span>, <span class="t-num">4</span>]]
    <span class="t-kw">let</span> b: [[int]] = [[<span class="t-num">5</span>, <span class="t-num">6</span>], [<span class="t-num">7</span>, <span class="t-num">8</span>]]
    <span class="t-kw">let</span> c = mat_mul(a, b)
    write(<span class="t-str">"c[0][0] = "</span> + to_string(c[<span class="t-num">0</span>][<span class="t-num">0</span>]))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex15">
<div class="sec-header"><span class="sec-num">EX-15</span><h2>Parser logów (regex)</h2><span class="sec-badge">regex · fs</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">log_parser.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> regex"</span> <span class="t-kw">from</span> <span class="t-str">"re"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> fs"</span>    <span class="t-kw">from</span> <span class="t-str">"fs"</span>

<span class="t-kw">fn</span> <span class="t-func">count_errors</span>(path: string) -> int <span class="t-kw">is</span>
    <span class="t-kw">let</span> content: string = fs::read_to_string(path) ?? <span class="t-str">""</span>
    <span class="t-kw">let</span> pattern = re::compile(<span class="t-str">"ERROR \\[(\\d+)\\]"</span>)
    <span class="t-kw">let</span> matches = pattern.find_all(content)
    <span class="t-kw">return</span> array_len(matches)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> n: int = count_errors(<span class="t-str">"server.log"</span>)
    write(to_string(n) + <span class="t-str">" błędów znalezionych w logu"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex16">
<div class="sec-header"><span class="sec-num">EX-16</span><h2>Maszyna stanów</h2><span class="sec-badge">enum · match</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">state_machine.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">enum</span> Light <span class="t-kw">is</span> Red, Yellow, Green <span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">next</span>(l: Light) -> Light <span class="t-kw">is</span>
    <span class="t-kw">match</span> l <span class="t-kw">is</span>
        Light::Red    => Light::Green
        Light::Green  => Light::Yellow
        Light::Yellow => Light::Red
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">name</span>(l: Light) -> string <span class="t-kw">is</span>
    <span class="t-kw">match</span> l <span class="t-kw">is</span>
        Light::Red    => <span class="t-str">"czerwone"</span>
        Light::Yellow => <span class="t-str">"żółte"</span>
        Light::Green  => <span class="t-str">"zielone"</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> l: Light = Light::Red
    <span class="t-kw">for</span> _ <span class="t-kw">in</span> <span class="t-num">0</span>..<span class="t-num">5</span> <span class="t-kw">is</span>
        write(name(l))
        l = next(l)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex17">
<div class="sec-header"><span class="sec-num">EX-17</span><h2>Result-podobna obsługa błędów</h2><span class="sec-badge">enum · pattern matching</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">result_enum.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">enum</span> DivResult <span class="t-kw">is</span>
    Ok(int)
    Err(string)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">safe_div</span>(a: int, b: int) -> DivResult <span class="t-kw">is</span>
    <span class="t-kw">if</span> b == <span class="t-num">0</span> <span class="t-kw">is</span>
        <span class="t-kw">return</span> DivResult::Err(<span class="t-str">"division by zero"</span>)
    <span class="t-kw">end</span>
    <span class="t-kw">return</span> DivResult::Ok(a / b)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">for</span> pair <span class="t-kw">in</span> [[<span class="t-num">10</span>, <span class="t-num">2</span>], [<span class="t-num">5</span>, <span class="t-num">0</span>]] <span class="t-kw">is</span>
        <span class="t-kw">match</span> safe_div(pair[<span class="t-num">0</span>], pair[<span class="t-num">1</span>]) <span class="t-kw">is</span>
            DivResult::Ok(v)  => write(<span class="t-str">"wynik: "</span> + to_string(v))
            DivResult::Err(m) => write(<span class="t-str">"błąd: "</span> + m)
        <span class="t-kw">end</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex18">
<div class="sec-header"><span class="sec-num">EX-18</span><h2>Kolejka zadań (async)</h2><span class="sec-badge">async · closures</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">task_queue.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">struct</span> Task <span class="t-kw">is</span>
    <span class="t-kw">pub</span> name:     string
    <span class="t-kw">pub</span> priority: int
<span class="t-kw">end</span>

<span class="t-kw">async fn</span> <span class="t-func">run_task</span>(t: Task) -> string <span class="t-kw">is</span>
    write(<span class="t-str">"uruchamiam: "</span> + t.name)
    <span class="t-kw">return</span> t.name + <span class="t-str">" done"</span>
<span class="t-kw">end</span>

<span class="t-kw">async fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> tasks: [Task] = [
        Task { name: <span class="t-str">"build"</span>,  priority: <span class="t-num">1</span> },
        Task { name: <span class="t-str">"test"</span>,   priority: <span class="t-num">2</span> },
        Task { name: <span class="t-str">"deploy"</span>, priority: <span class="t-num">3</span> },
    ]
    <span class="t-kw">for</span> t <span class="t-kw">in</span> tasks <span class="t-kw">is</span>
        <span class="t-kw">let</span> result = <span class="t-kw">await</span> run_task(t)
        write(result)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex19">
<div class="sec-header"><span class="sec-num">EX-19</span><h2>Silnik szablonów</h2><span class="sec-badge">@arena · string</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">template_engine.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Renderowanie robi mnóstwo tymczasowych stringów — @arena zwalnia</span>
<span class="t-comment">;; je wszystkie naraz przy wyjściu zamiast po jednym za każdym razem.</span>
<span class="t-kw">@arena</span>
<span class="t-kw">fn</span> <span class="t-func">render</span>(template: string, name: string, count: int) -> string <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> out: string = string_replace(template, <span class="t-str">"{{name}}"</span>, name)
    out = string_replace(out, <span class="t-str">"{{count}}"</span>, to_string(count))
    <span class="t-kw">return</span> out
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> tpl: string = <span class="t-str">"Cześć {{name}}, masz {{count}} nowych wiadomości."</span>
    write(render(tpl, <span class="t-str">"Michał"</span>, <span class="t-num">7</span>))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="ex20">
<div class="sec-header"><span class="sec-num">EX-20</span><h2>Parser binarnego nagłówka</h2><span class="sec-badge">@pointers · struct</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">binary_header.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">struct</span> Header <span class="t-kw">is</span>
    <span class="t-kw">pub</span> magic:   int
    <span class="t-kw">pub</span> version: int
<span class="t-kw">end</span>

<span class="t-comment">;; ptr_field_offset liczy przesunięcie pola za Ciebie — bez ręcznego</span>
<span class="t-comment">;; liczenia bajtów jak w poprzednich wersjach @pointers.</span>
<span class="t-kw">@pointers</span>
<span class="t-kw">fn</span> <span class="t-func">read_header</span>(buf: any) -> bool <span class="t-kw">is</span>
    <span class="t-kw">let</span> magic_off: int   = ptr_field_offset(Header, <span class="t-str">"magic"</span>)
    <span class="t-kw">let</span> version_off: int = ptr_field_offset(Header, <span class="t-str">"version"</span>)
    <span class="t-kw">let</span> magic: int   = ptr_read_i32(buf, magic_off)
    <span class="t-kw">let</span> version: int = ptr_read_i32(buf, version_off)
    <span class="t-kw">return</span> magic == <span class="t-num">0x48534821</span> && version &gt;= <span class="t-num">1</span>
<span class="t-kw">end</span>

<span class="t-kw">@arc</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> buf = arc_alloc(<span class="t-num">8</span>)
    ptr_write_i32(buf, <span class="t-num">0</span>, <span class="t-num">0x48534821</span>)
    ptr_write_i32(buf, <span class="t-num">4</span>, <span class="t-num">2</span>)
    write(<span class="t-str">"valid header: "</span> + to_string(read_header(buf)))
    arc_release(buf)
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
<tr><td class="td-syntax">hsharp build f.h#</td><td class="td-desc">LLVM O3+AVX2</td></tr>
<tr><td class="td-syntax">hsharp check f.h#</td><td class="td-desc">Syntax + types</td></tr>
<tr><td class="td-syntax">bytes build</td><td class="td-desc">Build z bytes.hk (LLVM)</td></tr>
<tr><td class="td-syntax">bytes run</td><td class="td-desc">Build + uruchom</td></tr>
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

<h3>Generyczny stos + trait bound</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">generic_stack.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Generyczna struktura + funkcja z ograniczeniem T: Debug, żeby móc</span>
<span class="t-comment">;; wypisać zawartość niezależnie od typu elementów.</span>
<span class="t-kw">trait</span> Debug <span class="t-kw">is</span>
    <span class="t-kw">fn</span> debug(<span class="t-kw">self</span>) -> <span class="t-type">string</span>
<span class="t-kw">end</span>

<span class="t-kw">struct</span> Stack&lt;T&gt; <span class="t-kw">is</span>
    <span class="t-kw">pub</span> items: [T]
<span class="t-kw">end</span>

<span class="t-kw">impl</span>&lt;T&gt; Stack&lt;T&gt; <span class="t-kw">is</span>
    <span class="t-kw">fn</span> <span class="t-fn">new</span>() -> Stack&lt;T&gt; <span class="t-kw">is</span>
        return Stack { items: [] }
    <span class="t-kw">end</span>
    <span class="t-kw">fn</span> <span class="t-fn">push</span>(<span class="t-kw">mut self</span>, item: T) <span class="t-kw">is</span>
        <span class="t-kw">self</span>.items = array_push(<span class="t-kw">self</span>.items, item)
    <span class="t-kw">end</span>
    <span class="t-kw">fn</span> <span class="t-fn">pop</span>(<span class="t-kw">mut self</span>) -> T? <span class="t-kw">is</span>
        <span class="t-kw">if</span> <span class="t-kw">self</span>.items.len() == <span class="t-num">0</span> <span class="t-kw">is</span> return nil <span class="t-kw">end</span>
        <span class="t-kw">let</span> last = <span class="t-kw">self</span>.items[<span class="t-kw">self</span>.items.len() - <span class="t-num">1</span>]
        <span class="t-kw">self</span>.items = array_remove(<span class="t-kw">self</span>.items, <span class="t-kw">self</span>.items.len() - <span class="t-num">1</span>)
        return last
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">dump</span>&lt;T: Debug&gt;(stack: Stack&lt;T&gt;) <span class="t-kw">is</span>
    <span class="t-kw">for</span> item <span class="t-kw">in</span> stack.items <span class="t-kw">is</span>
        write(<span class="t-str">"  - "</span> + item.debug())
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">#[derive(Debug)]</span>
<span class="t-kw">struct</span> Job <span class="t-kw">is</span>
    <span class="t-kw">pub</span> name: <span class="t-type">string</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> jobs: Stack&lt;Job&gt; = Stack::new()
    jobs.push(Job { name: <span class="t-str">"build"</span> })
    jobs.push(Job { name: <span class="t-str">"test"</span> })
    jobs.push(Job { name: <span class="t-str">"deploy"</span> })

    dump(jobs)
    write(<span class="t-str">"---"</span>)
    <span class="t-kw">let</span> next = jobs.pop()
    <span class="t-kw">if</span> next != nil <span class="t-kw">is</span>
        write(<span class="t-str">"next up: "</span> + next.debug())
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Optional &amp; łańcuchowanie <code>?</code> — wczytywanie configu</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">config_chain.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> fs"</span>   <span class="t-kw">from</span> <span class="t-str">"fs"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> json"</span> <span class="t-kw">from</span> <span class="t-str">"json"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> env"</span>  <span class="t-kw">from</span> <span class="t-str">"env"</span>

<span class="t-comment">;; Każde ? przerywa całą funkcję i zwraca nil w miejscu wywołania,</span>
<span class="t-comment">;; jeśli krok po lewej dał nil — nie trzeba ręcznie sprawdzać każdego</span>
<span class="t-comment">;; kroku osobno.</span>
<span class="t-kw">fn</span> <span class="t-fn">read_port</span>(path: <span class="t-type">string</span>) -> <span class="t-type">int</span>? <span class="t-kw">is</span>
    <span class="t-kw">let</span> raw: <span class="t-type">string</span>? = fs::read_to_string(path)?
    <span class="t-kw">let</span> parsed: any? = json::parse(raw)?
    <span class="t-kw">let</span> port: <span class="t-type">int</span>? = parsed[<span class="t-str">"server"</span>][<span class="t-str">"port"</span>]?
    return port
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> path = env::args()[<span class="t-num">1</span>]
    <span class="t-kw">let</span> port = read_port(path)
    <span class="t-kw">if</span> port == nil <span class="t-kw">is</span>
        write(<span class="t-str">"could not read a valid port from "</span> + path)
        return
    <span class="t-kw">end</span>
    write(<span class="t-str">"server port: {port}"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>@arena + @arc razem — pula buforów</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">buffer_pool.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; parse_chunk robi dużo tymczasowych alokacji (string, array) które</span>
<span class="t-comment">;; są potrzebne tylko wewnątrz tej jednej funkcji — @arena zwalnia je</span>
<span class="t-comment">;; wszystkie naraz na wyjściu. shared z kolei musi przeżyć dłużej niż</span>
<span class="t-comment">;; jedno wywołanie, więc jest ręcznie zarządzany przez @arc.</span>
<span class="t-kw">@arena</span>
<span class="t-kw">fn</span> <span class="t-fn">parse_chunk</span>(raw: <span class="t-type">string</span>) -> <span class="t-type">int</span> <span class="t-kw">is</span>
    <span class="t-kw">let</span> parts: [<span class="t-type">string</span>] = string_split(raw, <span class="t-str">","</span>)
    <span class="t-kw">let mut</span> total: <span class="t-type">int</span> = <span class="t-num">0</span>
    <span class="t-kw">for</span> p <span class="t-kw">in</span> parts <span class="t-kw">is</span>
        total = total + string_to_int(string_trim(p))
    <span class="t-kw">end</span>
    return total
<span class="t-kw">end</span>

<span class="t-kw">@arc</span>
<span class="t-kw">fn</span> <span class="t-fn">shared_running_total</span>(existing: <span class="t-type">int</span>, delta: <span class="t-type">int</span>) -> <span class="t-type">int</span> <span class="t-kw">is</span>
    <span class="t-kw">let</span> buf = arc_alloc(<span class="t-num">8</span>)
    ptr_write_i64(buf, <span class="t-num">0</span>, existing + delta)
    <span class="t-kw">let</span> result: <span class="t-type">int</span> = ptr_read_i64(buf, <span class="t-num">0</span>)
    arc_release(buf)
    return result
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> chunks: [<span class="t-type">string</span>] = [<span class="t-str">"1, 2, 3"</span>, <span class="t-str">"10, 20"</span>, <span class="t-str">"100"</span>]
    <span class="t-kw">let mut</span> running: <span class="t-type">int</span> = <span class="t-num">0</span>
    <span class="t-kw">for</span> chunk <span class="t-kw">in</span> chunks <span class="t-kw">is</span>
        running = shared_running_total(running, parse_chunk(chunk))
    <span class="t-kw">end</span>
    write(<span class="t-str">"total: {running}"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
