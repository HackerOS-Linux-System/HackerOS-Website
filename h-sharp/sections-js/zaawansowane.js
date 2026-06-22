window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['zaawansowane'] = `
<div class="section" id="unsafe">
<div class="sec-header"><span class="sec-num">16</span><h2>Unsafe &amp; Arena Allocator</h2></div>
<p>Bloki <code>unsafe is...end</code> wyłączają borrow checker i sprawdzanie granic. Mają pięć trybów, każdy z inną semantyką zarządzania pamięcią.</p>

<h3>Wszystkie tryby unsafe</h3>
<table class="ref-table">
<tr><th>Składnia</th><th>Tryb</th><th>Opis</th></tr>
<tr><td class="td-syntax">unsafe is...end</td><td class="td-note">plain</td><td class="td-desc">Brak areny. Niskopoziomowe operacje na wskaźnikach, surowe adresy, bezpośredni dostęp do pamięci. Brak automatycznego zwalniania.</td></tr>
<tr><td class="td-syntax">unsafe arena is...end</td><td class="td-note">arena general</td><td class="td-desc">Domyślna arena 1 MB. Wszystkie alokacje wewnątrz bloku wychodzą z tej puli i są zwalniane en-bloc po wyjściu z bloku.</td></tr>
<tr><td class="td-syntax">unsafe arena(N) is...end</td><td class="td-note">arena fixed</td><td class="td-desc">Arena o rozmiarze dokładnie N bajtów. Próba przekroczenia → panic. Idealna gdy znasz górną granicę (np. maksymalny pakiet sieciowy).</td></tr>
<tr><td class="td-syntax">unsafe pool(N) is...end</td><td class="td-note">arena pool</td><td class="td-desc">Pool allocator — N bajtów dzielonych na równe chunki. Szybkie alokacje stałego rozmiaru (np. tysiące małych struct naraz).</td></tr>
<tr><td class="td-syntax">unsafe page is...end</td><td class="td-note">arena page</td><td class="td-desc">Alokator stronnicowy (page-aligned). Każda alokacja zaokrąglona do 4096 B. Używane przy mmap / DMA / interfejsach kernela.</td></tr>
<tr><td class="td-syntax">unsafe ring(N) is...end</td><td class="td-note">arena ring</td><td class="td-desc">Ring buffer N bajtów. Gdy pełny — nadpisuje najstarsze dane. Używane w network capture, logowaniu, strumieniach audio.</td></tr>
<tr><td class="td-syntax">unsafe manual is...end</td><td class="td-note">manual modern</td><td class="td-desc">Ręczne malloc/free przez mem::alloc / mem::free_ptr. Styl nowoczesny — funkcje z std -> mem.</td></tr>
<tr><td class="td-syntax">unsafe classic is...end</td><td class="td-note">manual classic</td><td class="td-desc">Ręczne malloc/free via FFI extern C. Styl C — bezpośrednie wywołanie libc malloc.</td></tr>
</table>

<div class="code-block">
<div class="code-header"><span class="code-filename">unsafe_modes.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> mem"</span> <span class="t-kw">from</span> <span class="t-str">"mem"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> hex"</span> <span class="t-kw">from</span> <span class="t-str">"hex"</span>

<span class="t-comment">;; ── 1. plain unsafe — surowe wskaźniki ───────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-fn">raw_ptr_ops</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> <span class="t-kw">is</span>
        <span class="t-kw">let</span> addr: u64 = <span class="t-num">0xDEADBEEF</span>
        write(<span class="t-str">"raw: 0x"</span> + hex::encode(to_string(addr)))
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 2. arena(N) — pula N bajtów, en-bloc free ────────────────────</span>
<span class="t-kw">fn</span> <span class="t-fn">process_packet</span>(data: bytes) <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> arena(<span class="t-num">65536</span>) <span class="t-kw">is</span>
        <span class="t-kw">let</span> buf: string = hex::encode(data)
        write(<span class="t-str">"Packet: "</span> + buf)
    <span class="t-kw">end</span>
    <span class="t-comment">;; buf automatycznie zwolniony po wyjściu z bloku</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 3. pool — równe chunki, tysiące alokacji ─────────────────────</span>
<span class="t-kw">fn</span> <span class="t-fn">batch_alloc</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> pool(<span class="t-num">1048576</span>) <span class="t-kw">is</span>
        <span class="t-kw">let mut</span> i: int = <span class="t-num">0</span>
        <span class="t-kw">while</span> i < <span class="t-num">10000</span> <span class="t-kw">is</span>
            <span class="t-kw">let</span> chunk: string = to_string(i)
            i += <span class="t-num">1</span>
        <span class="t-kw">end</span>
        write(<span class="t-str">"Allocated 10000 pool chunks"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 4. page — wyrównanie do 4096 B (DMA / mmap) ─────────────────</span>
<span class="t-kw">fn</span> <span class="t-fn">dma_buffer</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> page <span class="t-kw">is</span>
        <span class="t-kw">let</span> dma: bytes = [<span class="t-num">0</span>; <span class="t-num">4096</span>]   <span class="t-comment">;; page-aligned</span>
        write(<span class="t-str">"DMA buf @ page boundary, len="</span> + to_string(dma.len()))
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 5. ring(N) — nadpisuje najstarsze gdy pełny ──────────────────</span>
<span class="t-kw">fn</span> <span class="t-fn">capture_stream</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> ring(<span class="t-num">8192</span>) <span class="t-kw">is</span>
        <span class="t-kw">let mut</span> seq: int = <span class="t-num">0</span>
        <span class="t-kw">while</span> seq < <span class="t-num">1000</span> <span class="t-kw">is</span>
            <span class="t-kw">let</span> frame: string = <span class="t-str">"frame_"</span> + to_string(seq)
            seq += <span class="t-num">1</span>
        <span class="t-kw">end</span>
        write(<span class="t-str">"Captured 1000 frames in 8KB ring"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 6. manual modern — mem::alloc / mem::free_ptr ───────────────</span>
<span class="t-kw">fn</span> <span class="t-fn">manual_modern</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> manual <span class="t-kw">is</span>
        <span class="t-kw">let</span> ptr: int = mem::alloc(<span class="t-num">1024</span>)
        write(<span class="t-str">"allocated 1024 B at 0x"</span> + hex::encode(to_string(ptr)))
        mem::free_ptr(ptr)
        write(<span class="t-str">"freed"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 7. classic — libc malloc / free via FFI ──────────────────────</span>
<span class="t-kw">extern</span> static [c] <span class="t-kw">is</span>
    <span class="t-kw">fn</span> malloc(size: int) -> int
    <span class="t-kw">fn</span> free(ptr: int)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">manual_classic</span>() <span class="t-kw">is</span>
    <span class="t-kw">unsafe</span> classic <span class="t-kw">is</span>
        <span class="t-kw">let</span> ptr: int = malloc(<span class="t-num">256</span>)
        write(<span class="t-str">"libc malloc: 0x"</span> + hex::encode(to_string(ptr)))
        free(ptr)
    <span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    raw_ptr_ops()
    process_packet([<span class="t-num">0xDE</span>, <span class="t-num">0xAD</span>, <span class="t-num">0xBE</span>, <span class="t-num">0xEF</span>])
    batch_alloc()
    dma_buffer()
    capture_stream()
    manual_modern()
    manual_classic()
<span class="t-kw">end</span></pre></div></div>
</div>
<div class="callout c-danger"><div class="ci">⚠</div><div class="cb"><strong>Uwaga:</strong> Bloki <code>unsafe</code> wyłączają borrow checker, sprawdzanie granic i ownership. Używaj tylko przy FFI z C/kernela lub przy krytycznej optymalizacji. Nigdy nie mieszaj arena i manual w jednym bloku.</div></div>
</div>

<div class="section" id="optional">
<div class="sec-header"><span class="sec-num">17</span><h2>Optional &amp; propagacja nil</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">optional.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-fn">find_user</span>(id: int) -> string? <span class="t-kw">is</span>
    <span class="t-kw">if</span> id <= <span class="t-num">0</span> <span class="t-kw">is</span>
        return <span class="t-kw">nil</span>
    <span class="t-kw">end</span>
    return <span class="t-str">"user_"</span> + to_string(id)
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
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

<span class="t-comment">;; Generyczna funkcja z constraintem</span>
<span class="t-kw">fn</span> <span class="t-fn">first</span>&lt;T&gt;(arr: [T]) -> T? <span class="t-kw">is</span>
    <span class="t-kw">if</span> arr.len() == <span class="t-num">0</span> <span class="t-kw">is</span> return <span class="t-kw">nil</span> <span class="t-kw">end</span>
    return arr[<span class="t-num">0</span>]
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">max_val</span>&lt;T&gt;(a: T, b: T) -> T <span class="t-kw">is</span>
    <span class="t-kw">if</span> a > b <span class="t-kw">is</span> return a <span class="t-kw">end</span>
    return b
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">swap</span>&lt;T&gt;(a: T, b: T) -> (T, T) = (b, a)

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> addr: Pair&lt;string, int&gt; = Pair {
        first:  <span class="t-str">"192.168.1.1"</span>,
        second: <span class="t-num">8080</span>
    }
    write(addr.first + <span class="t-str">":"</span> + to_string(addr.second))
    write(to_string(max_val(<span class="t-num">3</span>, <span class="t-num">7</span>)))   <span class="t-comment">;; 7</span>
    <span class="t-kw">let</span> (b, a) = swap(<span class="t-num">1</span>, <span class="t-num">2</span>)
    write(to_string(a) + <span class="t-str">" "</span> + to_string(b))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="closures">
<div class="sec-header"><span class="sec-num">19</span><h2>Closures</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">closures.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
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

    <span class="t-comment">;; Higher-order functions</span>
    <span class="t-kw">let</span> square = |x: int| -> int <span class="t-kw">is</span> x * x <span class="t-kw">end</span>
    <span class="t-kw">let</span> nums   = [<span class="t-num">1</span>, <span class="t-num">2</span>, <span class="t-num">3</span>, <span class="t-num">4</span>, <span class="t-num">5</span>]
    <span class="t-kw">for</span> n <span class="t-kw">in</span> nums <span class="t-kw">is</span>
        write(to_string(square(n)))
    <span class="t-kw">end</span>

    <span class="t-comment">;; Closure zwrócona z funkcji</span>
    <span class="t-kw">let</span> add10 = make_adder(<span class="t-num">10</span>)
    write(to_string(add10(<span class="t-num">5</span>)))   <span class="t-comment">;; 15</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">make_adder</span>(n: int) -> <span class="t-kw">fn</span>(int) -> int <span class="t-kw">is</span>
    return |x: int| -> int <span class="t-kw">is</span> x + n <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="string-interp">
<div class="sec-header"><span class="sec-num">20</span><h2>String Interpolation <span class="nav-new">v0.6</span></h2></div>
<p>Stringi mogą zawierać wyrażenia H# w klamrach <code>{...}</code>. Tokenizowane w lexerze do <code>InterpPart</code>, ewaluowane w interpreterze i kodegenie LLVM.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">interpolacja.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> name = <span class="t-str">"HackerOS"</span>
    <span class="t-kw">let</span> ver: <span class="t-type">int</span> = <span class="t-num">6</span>
    write(<span class="t-str">"Witaj w {name}! H# v0.{ver}"</span>)
    <span class="t-comment">;; → "Witaj w HackerOS! H# v0.6"</span>

    <span class="t-comment">;; Wyrażenia arytmetyczne</span>
    <span class="t-kw">let</span> a = <span class="t-num">10</span>
    <span class="t-kw">let</span> b = <span class="t-num">5</span>
    write(<span class="t-str">"{a} + {b} = {a + b}"</span>)     <span class="t-comment">;; "10 + 5 = 15"</span>
    write(<span class="t-str">"{a} * {b} = {a * b}"</span>)     <span class="t-comment">;; "10 * 5 = 50"</span>

    <span class="t-comment">;; Wywołania metod w interpolacji</span>
    <span class="t-kw">let</span> arr = [<span class="t-num">1</span>, <span class="t-num">2</span>, <span class="t-num">3</span>]
    write(<span class="t-str">"Len: {arr.len()}, First: {arr[0]}"</span>)

    <span class="t-comment">;; Zagnieżdżone wywołania</span>
    <span class="t-kw">let</span> s = <span class="t-str">"hello"</span>
    write(<span class="t-str">"Upper: {s.to_upper()}, Len: {s.len()}"</span>)

    <span class="t-comment">;; Escape klamry</span>
    write(<span class="t-str">"Literal: {{klucz: wartość}}"</span>)
    <span class="t-comment">;; → "Literal: {klucz: wartość}"</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<div class="section" id="try-op">
<div class="sec-header"><span class="sec-num">21</span><h2>Operator ? <span class="nav-new">v0.6</span></h2></div>
<p>Operator <code>?</code> propaguje nil z funkcji — jeśli wyrażenie jest nil, funkcja natychmiast zwraca nil. Analogia do <code>?</code> z Rust.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">try_op.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> fs"</span>   <span class="t-kw">from</span> <span class="t-str">"fs"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> json"</span> <span class="t-kw">from</span> <span class="t-str">"json"</span>

<span class="t-comment">;; Bez ? — ręczna obsługa nil</span>
<span class="t-kw">fn</span> <span class="t-fn">load_verbose</span>(path: string) -> any? <span class="t-kw">is</span>
    <span class="t-kw">let</span> content = fs::read(path)
    <span class="t-kw">if</span> content == nil <span class="t-kw">is</span> return nil <span class="t-kw">end</span>
    <span class="t-kw">let</span> obj = json::parse(content)
    <span class="t-kw">if</span> obj == nil <span class="t-kw">is</span> return nil <span class="t-kw">end</span>
    return obj
<span class="t-kw">end</span>

<span class="t-comment">;; Z ? — identyczna semantyka, zwięzła</span>
<span class="t-kw">fn</span> <span class="t-fn">load_config</span>(path: string) -> any? <span class="t-kw">is</span>
    <span class="t-kw">let</span> content = fs::read(path)<span class="t-op">?</span>
    <span class="t-kw">let</span> obj     = json::parse(content)<span class="t-op">?</span>
    return obj
<span class="t-kw">end</span>

<span class="t-comment">;; Łańcuch ? przez wiele warstw</span>
<span class="t-kw">fn</span> <span class="t-fn">get_port</span>(cfg_path: string) -> int? <span class="t-kw">is</span>
    <span class="t-kw">let</span> cfg     = load_config(cfg_path)<span class="t-op">?</span>
    <span class="t-kw">let</span> server  = json::get_obj(cfg, <span class="t-str">"server"</span>)<span class="t-op">?</span>
    <span class="t-kw">let</span> port    = json::get_int(server, <span class="t-str">"port"</span>)<span class="t-op">?</span>
    return port
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> port = get_port(<span class="t-str">"config.json"</span>)
    <span class="t-kw">if</span> port == nil <span class="t-kw">is</span>
        write(<span class="t-str">"Config missing or invalid"</span>)
    <span class="t-kw">else</span> <span class="t-kw">is</span>
        write(<span class="t-str">"Server port: {port}"</span>)
    <span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
