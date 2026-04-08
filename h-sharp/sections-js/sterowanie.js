window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['sterowanie'] = `
<div class="section" id="if">
<div class="sec-header"><span class="sec-num">07</span><h2>If / Elsif / Else</h2></div>
<p>Warunek zapisuje się jako <code>if warunek is...end</code>. Blok zaczyna się słowem <code>is</code>, a kończy <code>end</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">if.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> port: int = <span class="t-num">443</span>

    <span class="t-kw">if</span> port == <span class="t-num">443</span> <span class="t-kw">is</span>
        write(<span class="t-str">"HTTPS"</span>)
    <span class="t-kw">elsif</span> port == <span class="t-num">80</span> <span class="t-kw">is</span>
        write(<span class="t-str">"HTTP"</span>)
    <span class="t-kw">elsif</span> port == <span class="t-num">22</span> <span class="t-kw">is</span>
        write(<span class="t-str">"SSH"</span>)
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(<span class="t-str">"Other: "</span> + to_string(port))
    <span class="t-kw">end</span>

    <span class="t-comment">;; Złożone warunki</span>
    <span class="t-kw">let</span> open: bool = <span class="t-kw">true</span>
    <span class="t-kw">if</span> open && port > <span class="t-num">0</span> <span class="t-kw">is</span>
        write(<span class="t-str">"port otwarty"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="match">
<div class="sec-header"><span class="sec-num">08</span><h2>Match — pattern matching</h2></div>
<p>Pełne pattern matching: literały, warianty enum, wildcard <code>_</code>, OR-pattern <code>a | b</code>. Blok: <code>match x is...end</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">match.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">classify</span>(port: int) -> string <span class="t-kw">is</span>
    <span class="t-kw">match</span> port <span class="t-kw">is</span>
        <span class="t-num">22</span>         => <span class="t-str">"SSH"</span>
        <span class="t-num">80</span>         => <span class="t-str">"HTTP"</span>
        <span class="t-num">443</span>        => <span class="t-str">"HTTPS"</span>
        <span class="t-num">3306</span>       => <span class="t-str">"MySQL"</span>
        <span class="t-num">5432</span>       => <span class="t-str">"PostgreSQL"</span>
        <span class="t-num">6379</span>       => <span class="t-str">"Redis"</span>
        <span class="t-num">8080</span>       => <span class="t-str">"HTTP-Alt"</span>
        _          => <span class="t-str">"Unknown"</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">enum</span> Status <span class="t-kw">is</span>
    Open
    Closed
    Filtered(string)
    Error(int, string)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">handle</span>(r: Status) <span class="t-kw">is</span>
    <span class="t-kw">match</span> r <span class="t-kw">is</span>
        Open           => write(<span class="t-str">"otwarty"</span>)
        Closed         => write(<span class="t-str">"zamknięty"</span>)
        Filtered(msg)  => write(<span class="t-str">"filtr: "</span> + msg)
        Error(c, m)    => write(<span class="t-str">"błąd "</span> + to_string(c) + <span class="t-str">": "</span> + m)
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    write(classify(<span class="t-num">443</span>))
    handle(Status::Open)
    handle(Status::Filtered(<span class="t-str">"firewall"</span>))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="while">
<div class="sec-header"><span class="sec-num">09</span><h2>While</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">while.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> <span class="t-kw2">mut</span> i: int = <span class="t-num">0</span>
    <span class="t-kw">while</span> i < <span class="t-num">10</span> <span class="t-kw">is</span>
        write(to_string(i))
        i += <span class="t-num">1</span>
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="for">
<div class="sec-header"><span class="sec-num">10</span><h2>For i zakresy</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">for.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-comment">;; Zakres wyłączny (1..10 = 1,2,..,9)</span>
    <span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">1</span>..<span class="t-num">10</span> <span class="t-kw">is</span>
        write(to_string(i))
    <span class="t-kw">end</span>

    <span class="t-comment">;; Zakres włączny (1..=5 = 1,2,3,4,5)</span>
    <span class="t-kw">let</span> <span class="t-kw2">mut</span> sum: int = <span class="t-num">0</span>
    <span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">1</span>..=<span class="t-num">100</span> <span class="t-kw">is</span>
        sum += i
    <span class="t-kw">end</span>
    write(<span class="t-str">"Sum: "</span> + to_string(sum))

    <span class="t-comment">;; Iteracja po tablicy</span>
    <span class="t-kw">let</span> ports: [int] = [<span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>, <span class="t-num">8080</span>]
    <span class="t-kw">for</span> port <span class="t-kw">in</span> ports <span class="t-kw">is</span>
        write(<span class="t-str">"Port: "</span> + to_string(port))
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
