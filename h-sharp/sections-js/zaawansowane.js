window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['zaawansowane'] = `
<div class="section" id="unsafe">
<div class="sec-header"><span class="sec-num">16</span><h2>Unsafe &amp; Arena Allocator</h2></div>
<p>Bloki <code>unsafe is...end</code> wyłączają sprawdzanie pamięci. <code>arena(N)</code> daje pulę N bajtów — wszystkie alokacje z bloku zwalniane en-bloc.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td class="td-syntax">unsafe is...end</td><td class="td-desc">Blok bez arena — niskopoziomowe operacje</td></tr>
<tr><td class="td-syntax">unsafe arena is...end</td><td class="td-desc">Arena 1MB (domyślnie)</td></tr>
<tr><td class="td-syntax">unsafe arena(N) is...end</td><td class="td-desc">Arena N bajtów</td></tr>
<tr><td class="td-syntax">unsafe manual is...end</td><td class="td-desc">Ręczne malloc/free</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">unsafe.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">process_packet</span>(data: bytes) <span class="t-kw">is</span>
    <span class="t-comment">;; Arena 64KB — alokacje zwalniane po wyjściu z bloku</span>
    <span class="t-kw">unsafe</span> arena(<span class="t-num">65536</span>) <span class="t-kw">is</span>
        <span class="t-kw">let</span> buf: string = <span class="t-str">"DE AD BE EF"</span>
        write(<span class="t-str">"Packet: "</span> + buf)
    <span class="t-kw">end</span>
    <span class="t-comment">;; buf automatycznie zwolniony</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">raw_ops</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> <span class="t-kw">is</span>
        <span class="t-kw">let</span> ptr_val: u64 = <span class="t-num">0xDEADBEEF</span>
        write(<span class="t-str">"raw ptr: "</span> + to_string(ptr_val))
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    process_packet([])
    raw_ops()

    <span class="t-comment">;; Dla cybersec: przetwarzanie pakietów w arena</span>
    <span class="t-kw">unsafe</span> arena(<span class="t-num">1048576</span>) <span class="t-kw">is</span>
        write(<span class="t-str">"1MB arena dla buforów sieciowych"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
<div class="callout c-danger"><div class="ci">⚠</div><div class="cb"><strong>Uwaga:</strong> Bloki <code>unsafe</code> wyłączają sprawdzanie granic i ownership. Używaj tylko przy FFI z C lub przy krytycznej optymalizacji.</div></div>
</div>

<div class="section" id="optional">
<div class="sec-header"><span class="sec-num">17</span><h2>Optional &amp; propagacja nil</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">optional.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">find_user</span>(id: int) -> string? <span class="t-kw">is</span>
    <span class="t-kw">if</span> id <= <span class="t-num">0</span> <span class="t-kw">is</span>
        return <span class="t-kw">nil</span>
    <span class="t-kw">end</span>
    return <span class="t-str">"user_"</span> + to_string(id)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-comment">;; Sprawdzenie nil</span>
    <span class="t-kw">let</span> u: string? = find_user(<span class="t-num">5</span>)
    <span class="t-kw">if</span> u != <span class="t-kw">nil</span> <span class="t-kw">is</span>
        write(<span class="t-str">"Znaleziono: "</span> + u)
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(<span class="t-str">"Brak użytkownika"</span>)
    <span class="t-kw">end</span>

    <span class="t-comment">;; Propagacja nil — operator ?</span>
    <span class="t-kw">let</span> n: int? = parse_int(<span class="t-str">"42"</span>)
    <span class="t-kw">let</span> val = n?   <span class="t-comment">;; jeśli nil — funkcja zwraca nil</span>
    write(to_string(val))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="generics">
<div class="sec-header"><span class="sec-num">18</span><h2>Generics</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">generics.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Generyczna struct</span>
<span class="t-kw">struct</span> Pair&lt;A, B&gt; <span class="t-kw">is</span>
    <span class="t-kw">pub</span> first:  A
    <span class="t-kw">pub</span> second: B
<span class="t-kw">end</span>

<span class="t-comment">;; Generyczna funkcja</span>
<span class="t-kw">fn</span> <span class="t-func">first</span>&lt;T&gt;(arr: [T]) -> T? <span class="t-kw">is</span>
    <span class="t-kw">if</span> len(arr) == <span class="t-num">0</span> <span class="t-kw">is</span> return <span class="t-kw">nil</span> <span class="t-kw">end</span>
    return arr[<span class="t-num">0</span>]
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> addr: Pair&lt;string, int&gt; = Pair {
        first:  <span class="t-str">"192.168.1.1"</span>,
        second: <span class="t-num">8080</span>
    }
    write(addr.first + <span class="t-str">":"</span> + to_string(addr.second))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="closures">
<div class="sec-header"><span class="sec-num">19</span><h2>Closures</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">closures.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">is</span>
    <span class="t-comment">;; Prosta closure</span>
    <span class="t-kw">let</span> double = |x: int| -> int <span class="t-kw">is</span>
        return x * <span class="t-num">2</span>
    <span class="t-kw">end</span>
    write(to_string(double(<span class="t-num">21</span>)))  <span class="t-comment">;; 42</span>

    <span class="t-comment">;; Domknięcie zmiennej zewnętrznej</span>
    <span class="t-kw">let</span> mult: int = <span class="t-num">3</span>
    <span class="t-kw">let</span> triple = |x: int| -> int <span class="t-kw">is</span>
        return x * mult
    <span class="t-kw">end</span>
    write(to_string(triple(<span class="t-num">7</span>)))  <span class="t-comment">;; 21</span>

    <span class="t-comment">;; Użycie w pętli</span>
    <span class="t-kw">let</span> ports: [int] = [<span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>]
    <span class="t-kw">for</span> p <span class="t-kw">in</span> ports <span class="t-kw">is</span>
        write(to_string(double(p)))
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
