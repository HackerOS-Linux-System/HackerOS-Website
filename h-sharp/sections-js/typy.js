window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['typy'] = `
<div class="section" id="enum">
<div class="sec-header"><span class="sec-num">14</span><h2>Enum</h2></div>
<p>Wyliczenia z opcjonalnymi polami. Blok: <code>enum Nazwa is...end</code>. Używane z <code>match</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">enum.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Prosta enum</span>
<span class="t-kw">enum</span> Status <span class="t-kw">is</span>
    Running
    Stopped
    Error
    Pending
<span class="t-kw">end</span>

<span class="t-comment">;; Enum z danymi</span>
<span class="t-kw">enum</span> ScanResult <span class="t-kw">is</span>
    Open
    Closed
    Filtered(string)
    Error(int, string)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">handle</span>(r: ScanResult) <span class="t-kw">is</span>
    <span class="t-kw">match</span> r <span class="t-kw">is</span>
        Open           => write(<span class="t-str">"otwarty"</span>)
        Closed         => write(<span class="t-str">"zamknięty"</span>)
        Filtered(msg)  => write(<span class="t-str">"filtr: "</span> + msg)
        Error(c, m)    => write(<span class="t-str">"błąd "</span> + to_string(c) + <span class="t-str">": "</span> + m)
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> s = Status::Running
    <span class="t-kw">match</span> s <span class="t-kw">is</span>
        Running => write(<span class="t-str">"✓ Działa"</span>)
        Stopped => write(<span class="t-str">"✗ Stop"</span>)
        Error   => write(<span class="t-str">"! Błąd"</span>)
        Pending => write(<span class="t-str">"... Czeka"</span>)
    <span class="t-kw">end</span>
    handle(ScanResult::Filtered(<span class="t-str">"firewall"</span>))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="typy-prim">
<div class="sec-header"><span class="sec-num">15</span><h2>Typy wbudowane i operatory</h2></div>
<table class="ref-table">
<tr><th>Typ</th><th>Opis</th><th>Rozmiar</th><th>Literał</th></tr>
<tr><td class="td-syntax">int</td><td class="td-desc">Całkowity (alias i64)</td><td class="td-note">64-bit</td><td class="td-note">42, -7, 1_000</td></tr>
<tr><td class="td-syntax">uint</td><td class="td-desc">Bez znaku (alias u64)</td><td class="td-note">64-bit</td><td class="td-note">255, 0xFF</td></tr>
<tr><td class="td-syntax">i8..i128 / u8..u128</td><td class="td-desc">Precyzyjne typy całkowite</td><td class="td-note">8-128 bit</td><td class="td-note">42i8, 0xFFu8</td></tr>
<tr><td class="td-syntax">f32, f64</td><td class="td-desc">Zmiennoprzecinkowe</td><td class="td-note">32/64 bit</td><td class="td-note">3.14, 2.71f32</td></tr>
<tr><td class="td-syntax">bool</td><td class="td-desc">Logiczny</td><td class="td-note">1 bit</td><td class="td-note">true, false</td></tr>
<tr><td class="td-syntax">string</td><td class="td-desc">UTF-8 tekst</td><td class="td-note">heap</td><td class="td-note">"tekst"</td></tr>
<tr><td class="td-syntax">bytes</td><td class="td-desc">Surowe bajty</td><td class="td-note">heap</td><td class="td-note">[0xDE, 0xAD]</td></tr>
<tr><td class="td-syntax">void</td><td class="td-desc">Brak wartości</td><td class="td-note">—</td><td class="td-note">—</td></tr>
<tr><td class="td-syntax">[T]</td><td class="td-desc">Tablica jednorodna</td><td class="td-note">heap</td><td class="td-note">[1, 2, 3]</td></tr>
<tr><td class="td-syntax">(T, U)</td><td class="td-desc">Tuple</td><td class="td-note">stack</td><td class="td-note">("a", 1)</td></tr>
<tr><td class="td-syntax">T?</td><td class="td-desc">Optional (nil-able)</td><td class="td-note">—</td><td class="td-note">nil lub wartość</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">typy.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Rzutowanie</span>
<span class="t-kw">let</span> n: int  = <span class="t-num">42</span>
<span class="t-kw">let</span> f: f64  = n <span class="t-kw">as</span> f64
<span class="t-kw">let</span> b: u8   = n <span class="t-kw">as</span> u8
<span class="t-kw">let</span> s: string = to_string(n)

<span class="t-comment">;; Optional</span>
<span class="t-kw">fn</span> <span class="t-func">find</span>(id: int) -> string? <span class="t-kw">is</span>
    <span class="t-kw">if</span> id <= <span class="t-num">0</span> <span class="t-kw">is</span> return <span class="t-kw">nil</span> <span class="t-kw">end</span>
    return <span class="t-str">"user_"</span> + to_string(id)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> u: string? = find(<span class="t-num">5</span>)
    <span class="t-kw">if</span> u != <span class="t-kw">nil</span> <span class="t-kw">is</span>
        write(<span class="t-str">"Znaleziono: "</span> + u)
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(<span class="t-str">"Brak"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
