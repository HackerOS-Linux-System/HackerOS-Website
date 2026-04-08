window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['organizacja'] = `
<div class="section" id="funkcje">
<div class="sec-header"><span class="sec-num">11</span><h2>Funkcje</h2></div>
<p>Blok funkcji: <code>fn nazwa(params) -> typ is...end</code>. Jednolinijkowa: <code>fn nazwa() -> typ = wyrażenie</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">funkcje.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Prosta funkcja</span>
<span class="t-kw">fn</span> <span class="t-func">greet</span>(name: string) -> string <span class="t-kw">is</span>
    return <span class="t-str">"Hello, "</span> + name + <span class="t-str">"!"</span>
<span class="t-kw">end</span>

<span class="t-comment">;; Jednolinijkowa</span>
<span class="t-kw">fn</span> <span class="t-func">square</span>(n: int) -> int = n * n

<span class="t-comment">;; Rekurencja</span>
<span class="t-kw">fn</span> <span class="t-func">factorial</span>(n: int) -> int <span class="t-kw">is</span>
    <span class="t-kw">if</span> n <= <span class="t-num">1</span> <span class="t-kw">is</span>
        return <span class="t-num">1</span>
    <span class="t-kw">end</span>
    return n * factorial(n - <span class="t-num">1</span>)
<span class="t-kw">end</span>

<span class="t-comment">;; Publiczna</span>
<span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">xor_bytes</span>(data: bytes, key: bytes) -> bytes <span class="t-kw">is</span>
    return data
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(greet(<span class="t-str">"H#"</span>))
    write(<span class="t-str">"5! = "</span> + to_string(factorial(<span class="t-num">5</span>)))
    write(<span class="t-str">"7^2 = "</span> + to_string(square(<span class="t-num">7</span>)))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="struktury">
<div class="sec-header"><span class="sec-num">12</span><h2>Structs &amp; Impl</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">structs.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">struct</span> Packet <span class="t-kw">is</span>
    <span class="t-kw">pub</span> src_ip:  string
    <span class="t-kw">pub</span> dst_ip:  string
    <span class="t-kw">pub</span> port:    int
    <span class="t-kw">pub</span> payload: bytes
<span class="t-kw">end</span>

<span class="t-kw">impl</span> Packet <span class="t-kw">is</span>
    <span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">new</span>(src: string, dst: string, port: int) -> Packet <span class="t-kw">is</span>
        return Packet { src_ip: src, dst_ip: dst, port: port, payload: [] }
    <span class="t-kw">end</span>

    <span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">summary</span>(self) -> string <span class="t-kw">is</span>
        return self.src_ip + <span class="t-str">" -> "</span> + self.dst_ip + <span class="t-str">":"</span> + to_string(self.port)
    <span class="t-kw">end</span>

    <span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">is_encrypted</span>(self) -> bool = self.port == <span class="t-num">443</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> pkt = Packet.new(<span class="t-str">"10.0.0.1"</span>, <span class="t-str">"192.168.1.1"</span>, <span class="t-num">443</span>)
    write(pkt.summary())
    write(<span class="t-str">"TLS: "</span> + to_string(pkt.is_encrypted()))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="traits">
<div class="sec-header"><span class="sec-num">13</span><h2>Traits</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">traits.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">trait</span> Scanner <span class="t-kw">is</span>
    <span class="t-kw">fn</span> <span class="t-func">scan</span>(self, target: string) -> bool
    <span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string
    <span class="t-kw">fn</span> <span class="t-func">desc</span>(self) -> string <span class="t-kw">is</span>
        return <span class="t-str">"Scanner: "</span> + self.name()
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">struct</span> TcpScanner <span class="t-kw">is</span>
    <span class="t-kw">pub</span> timeout: int
<span class="t-kw">end</span>

<span class="t-kw">impl</span> TcpScanner: Scanner <span class="t-kw">is</span>
    <span class="t-kw">fn</span> <span class="t-func">scan</span>(self, target: string) -> bool <span class="t-kw">is</span>
        return <span class="t-kw">true</span>
    <span class="t-kw">end</span>
    <span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string = <span class="t-str">"TCP Scanner"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> s = TcpScanner { timeout: <span class="t-num">5000</span> }
    write(s.desc())
    write(to_string(s.scan(<span class="t-str">"192.168.1.1"</span>)))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
