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

<div class="section" id="mem-modes">
<div class="sec-header"><span class="sec-num">24</span><h2>@ Adnotacje trybu pamięci <span class="nav-new">v0.7</span></h2></div>
<p>Adnotacja <code>@tryb</code> przed <code>fn</code> zmienia sposób zarządzania pamięcią <strong>tylko dla tej jednej funkcji</strong> — reszta programu może swobodnie mieszać różne tryby. Brak <code>@</code> w ogóle to dokładnie to samo co <code>@default</code>. W przeciwieństwie do bloków <code>unsafe is...end</code> (poprzednia sekcja), które są zagnieżdżane wewnątrz funkcji, adnotacja <code>@</code> dotyczy całego ciała funkcji na raz.</p>

<h3>@: tryb — dyrektywa całego pliku <span class="nav-new">nowość</span></h3>
<p>Pisanie <code>@tryb</code> nad każdą pojedynczą funkcją robi się uciążliwe, gdy cały plik ma być np. <code>@safety</code>. Pierwsza linijka pliku może zamiast tego zawierać <code>@: tryb</code> (zauważ dwukropek — odróżnia to od adnotacji pojedynczej funkcji) — ustawia domyślny tryb dla <strong>każdej</strong> funkcji w tym pliku, która nie ma własnej adnotacji <code>@tryb</code>.</p>

<div class="code-block">
<div class="code-header"><span class="code-filename">safe_module.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">@:</span> safety

<span class="t-comment">;; Ta funkcja jest teraz automatycznie @safety, mimo że nie ma</span>
<span class="t-comment">;; własnej adnotacji — dziedziczy tryb z dyrektywy powyżej.</span>
<span class="t-kw">fn</span> <span class="t-fn">parse_line</span>(line: <span class="t-type">string</span>) -> <span class="t-type">string</span> <span class="t-kw">is</span>
    <span class="t-kw">let</span> owner: <span class="t-type">string</span> = line
    return owner
<span class="t-kw">end</span>

<span class="t-comment">;; Własna adnotacja funkcji zawsze wygrywa z dyrektywą pliku.</span>
<span class="t-kw">@arena</span>
<span class="t-kw">fn</span> <span class="t-fn">build_report</span>() -> <span class="t-type">string</span> <span class="t-kw">is</span>
    return <span class="t-str">"..."</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<p>Kolejność ważności (od najsilniejszej): własna adnotacja <code>@tryb</code> na funkcji &gt; dyrektywa <code>@: tryb</code> w pierwszej linijce pliku &gt; flaga <code>--mem-mode tryb</code> przekazana do <code>hsharp compile</code>/<code>build</code> (np. przez <code>mem-mode</code> w <code>bytes.hk</code> — patrz sekcja Instalacja &amp; narzędzia) &gt; <code>@default</code>, jeśli nic innego nie ustawiono. Działa identycznie w <code>hsharp build</code> (LLVM) i <code>hsharp run</code> (interpreter), oraz dla plików dociąganych przez <code>use</code> — każdy plik stosuje własną dyrektywę <code>@:</code>, nie tylko plik wejściowy.</p>

<div class="callout c-info"><div class="ci">ℹ</div><div class="cb"><strong>Backend:</strong> te cztery adnotacje działają w pełni tylko przy kompilacji przez <code>hsharp build</code> (LLVM). Interpreter (<code>hsharp run</code>) wykonuje <code>@safety</code>/<code>@arena</code> tak samo jak <code>@default</code> (drukując jednorazową notatkę na stderr, żeby ta różnica nie była cicha), a wywołanie builtina specyficznego dla <code>@arc</code>/<code>@pointers</code> (np. <code>arc_alloc</code>) w interpreterze kończy się jasnym błędem zamiast cichego <code>nil</code>.</div></div>

<h3>Wszystkie tryby @</h3>
<table class="ref-table">
<tr><th>Adnotacja</th><th>Status</th><th>Opis</th></tr>
<tr><td class="td-syntax">@default</td><td class="td-note">stabilny</td><td class="td-desc">Domyślny — zwykła alokacja na stercie, bez dodatkowych sprawdzeń. Dokładnie to co dostajesz bez żadnego <code>@</code>.</td></tr>
<tr><td class="td-syntax">@safety</td><td class="td-note" style="color:var(--c-amber)">basic v2</td><td class="td-desc">Ostrzega (nigdy nie blokuje kompilacji) o użyciu zmiennej string/array po tym jak <code>let y = x</code> ją przeniosło. Analiza rekurencyjnie wchodzi w if/while/match/for/do/unsafe i łączy gałęzie — zmienna liczy się jako "na pewno przeniesiona" tylko jeśli przeniesiona na każdej gałęzi.</td></tr>
<tr><td class="td-syntax">@arc</td><td class="td-note" style="color:var(--c-amber)">basic v2</td><td class="td-desc"><code>arc_alloc(n)</code> alokuje realny blok z atomowym licznikiem referencji. Zwykłe <code>let x = arc_alloc(n)</code> / <code>let y = x</code> na najwyższym poziomie funkcji są automatycznie retain/release'owane. <code>arc_retain</code>/<code>arc_release</code>/<code>arc_count</code> dalej dostępne ręcznie.</td></tr>
<tr><td class="td-syntax">@arena</td><td class="td-note" style="color:var(--c-green)">kompletny</td><td class="td-desc">Wszystko co ta funkcja alokuje pochodzi z jednej areny bump-allocatora, zwalnianej za jednym razem na każdej ścieżce wyjścia (włącznie z każdym <code>return</code>). Jedyny tryb w pełni ukończony end-to-end — dobry wzór referencyjny dla pozostałych.</td></tr>
<tr><td class="td-syntax">@pointers</td><td class="td-note" style="color:var(--c-amber)">basic v3</td><td class="td-desc">Surowy, niesprawdzany dostęp do pamięci: <code>ptr_read_*</code>/<code>ptr_write_*</code> dla i8/i16/i32/i64/f32/f64/ptr, <code>ptr_add</code>/<code>ptr_is_null</code>, plus <code>ptr_alloc_size</code> (rozmiar alokacji arc_alloc), <code>ptr_field_offset</code> (przesunięcie pola struktury liczone w compile-time), <code>ptr_copy</code>/<code>ptr_compare</code> (memcpy/memcmp). Zero bounds-checkingu — celowo, ten sam model zaufania co surowe wskaźniki w C.</td></tr>
</table>

<div class="code-block">
<div class="code-header"><span class="code-filename">mem_modes.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; ── @arena — bump-alloc, wszystko zwolnione naraz ────────────────</span>
<span class="t-kw">@arena</span>
<span class="t-kw">fn</span> <span class="t-fn">build_report</span>(rows: <span class="t-type">int</span>) -> <span class="t-type">string</span> <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> report: <span class="t-type">string</span> = <span class="t-str">"Report:\n"</span>
    <span class="t-kw">let mut</span> i: <span class="t-type">int</span> = <span class="t-num">0</span>
    <span class="t-kw">while</span> i < rows <span class="t-kw">is</span>
        report = report + <span class="t-str">"  row "</span> + to_string(i) + <span class="t-str">"\n"</span>
        i += <span class="t-num">1</span>
    <span class="t-kw">end</span>
    return report
<span class="t-kw">end</span> <span class="t-comment">;; cała arena zwolniona tutaj, na każdej ścieżce wyjścia</span>

<span class="t-comment">;; ── @arc — ręczny atomowy refcounting ────────────────────────────</span>
<span class="t-kw">@arc</span>
<span class="t-kw">fn</span> <span class="t-fn">shared_counter</span>(start: <span class="t-type">int</span>) -> <span class="t-type">int</span> <span class="t-kw">is</span>
    <span class="t-kw">let</span> counter = arc_alloc(<span class="t-num">8</span>)      <span class="t-comment">;; count = 1</span>
    ptr_write_i64(counter, <span class="t-num">0</span>, start)
    <span class="t-kw">let</span> alias = counter               <span class="t-comment">;; auto-retain — count = 2</span>
    return ptr_read_i64(alias, <span class="t-num">0</span>) + <span class="t-num">1</span>
    <span class="t-comment">;; counter i alias auto-release'owane tutaj</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── @pointers — surowy dostęp, każda szerokość ───────────────────</span>
<span class="t-kw">@pointers</span>
<span class="t-kw">fn</span> <span class="t-fn">pack_two_i32</span>(a: <span class="t-type">int</span>, b: <span class="t-type">int</span>) -> <span class="t-type">string</span> <span class="t-kw">is</span>
    <span class="t-kw">let</span> buf = arc_alloc(<span class="t-num">8</span>)
    ptr_write_i32(buf, <span class="t-num">0</span>, a)
    ptr_write_i32(buf, <span class="t-num">4</span>, b)
    <span class="t-kw">let</span> packed: <span class="t-type">string</span> = to_string(ptr_read_i32(buf, <span class="t-num">0</span>)) + <span class="t-str">","</span> + to_string(ptr_read_i32(buf, <span class="t-num">4</span>))
    arc_release(buf)
    return packed
<span class="t-kw">end</span>

<span class="t-comment">;; ── @pointers basic v3 — alloc_size / field_offset / copy / compare ─</span>
<span class="t-kw">struct</span> Header <span class="t-kw">is</span>
    <span class="t-kw">pub</span> magic:   <span class="t-type">int</span>
    <span class="t-kw">pub</span> version: <span class="t-type">int</span>
<span class="t-kw">end</span>

<span class="t-kw">@pointers</span>
<span class="t-kw">fn</span> <span class="t-fn">duplicate_buffer</span>(src: <span class="t-type">any</span>) -> <span class="t-type">any</span> <span class="t-kw">is</span>
    <span class="t-comment">;; ptr_alloc_size tylko dla wskaźników z arc_alloc — czyta nagłówek</span>
    <span class="t-comment">;; refcountu, który hsh_rc_alloc zapisał tuż przed src.</span>
    <span class="t-kw">let</span> n: <span class="t-type">int</span> = ptr_alloc_size(src)
    <span class="t-kw">let</span> dst = arc_alloc(n)
    ptr_copy(dst, src, n)     <span class="t-comment">;; memcpy/memmove semantics</span>
    return dst
<span class="t-kw">end</span>

<span class="t-kw">@pointers</span>
<span class="t-kw">fn</span> <span class="t-fn">buffers_equal</span>(a: <span class="t-type">any</span>, b: <span class="t-type">any</span>, n: <span class="t-type">int</span>) -> <span class="t-type">bool</span> <span class="t-kw">is</span>
    return ptr_compare(a, b, n) == <span class="t-num">0</span>   <span class="t-comment">;; memcmp semantics</span>
<span class="t-kw">end</span>

<span class="t-kw">@pointers</span>
<span class="t-kw">fn</span> <span class="t-fn">read_version</span>(buf: <span class="t-type">any</span>) -> <span class="t-type">int</span> <span class="t-kw">is</span>
    <span class="t-comment">;; przesunięcie pola liczone raz, w compile-time — nie trzeba już</span>
    <span class="t-comment">;; ręcznie liczyć bajtów jak w poprzednich wersjach @pointers.</span>
    <span class="t-kw">let</span> offset: <span class="t-type">int</span> = ptr_field_offset(Header, <span class="t-str">"version"</span>)
    return ptr_read_i32(buf, offset)
<span class="t-kw">end</span>

<span class="t-comment">;; ── @safety — ostrzeżenie move-after-use ──────────────────────────</span>
<span class="t-kw">@safety</span>
<span class="t-kw">fn</span> <span class="t-fn">describe</span>(name: <span class="t-type">string</span>) -> <span class="t-type">string</span> <span class="t-kw">is</span>
    <span class="t-kw">let</span> owner: <span class="t-type">string</span> = name     <span class="t-comment">;; przenosi name do owner</span>
    return <span class="t-str">"owner: "</span> + owner       <span class="t-comment">;; OK — czyta owner, nie name</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<div class="callout c-warn"><div class="ci">⚠</div><div class="cb"><strong>Granice:</strong> <code>ptr_*</code> i <code>arc_*</code> są dostępne tylko wewnątrz funkcji z odpowiednią adnotacją (<code>@pointers</code> / <code>@arc</code>) albo wewnątrz bloku <code>unsafe is...end</code> — typechecker to teraz realnie egzekwuje (błąd kompilacji, nie tylko dokumentacja). <code>@safety</code> nigdy nie blokuje kompilacji — to zawsze tylko ostrzeżenie.</div></div>
</div>

<div class="section" id="extern">
<div class="sec-header"><span class="sec-num">25</span><h2>extern — FFI z C / C++ / Rust / Python</h2></div>
<p>Blok <code>extern</code> deklaruje funkcje z innego języka, żeby H# mógł je bezpośrednio wywołać. Kompilator generuje odpowiednie prototypy/trampoliny w zależności od <code>lang</code> i linkuje z podaną biblioteką.</p>

<div class="code-block">
<div class="code-header"><span class="code-filename">składnia</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">extern</span> [static|dynamic] [lang, <span class="t-str">"nazwa_biblioteki"</span>] <span class="t-kw">is</span>
    <span class="t-kw">fn</span> nazwa_funkcji(param: <span class="t-type">typ</span>, ...) -> <span class="t-type">TypZwracany</span>
    ...
<span class="t-kw">end</span></pre></div></div>
</div>

<table class="ref-table">
<tr><th>Część</th><th>Wartości</th><th>Domyślnie</th><th>Opis</th></tr>
<tr><td class="td-syntax">static / dynamic</td><td class="td-desc">static, dynamic</td><td class="td-note">static</td><td class="td-desc">Linkowanie statyczne (.a / wbudowane w binarkę) vs dynamiczne (.so, rozwiązywane w runtime).</td></tr>
<tr><td class="td-syntax">lang</td><td class="td-desc">c, c++/cpp, rust, python/py</td><td class="td-note">c</td><td class="td-desc">C i C++ dzielą tę samą składnię prototypu (C++ jest kompatybilny wstecz z linkowaniem C). Rust generuje sygnaturę <code>extern "C"</code>. Python przechodzi przez trampolinę <code>hsh_py_call</code> — wszystko po drugiej stronie mostu to stringi.</td></tr>
<tr><td class="td-syntax">"biblioteka"</td><td class="td-desc">nazwa .so/.dll lub nazwa modułu Python</td><td class="td-note">—</td><td class="td-desc">Pomijalne dla funkcji już widocznych linkerowi (np. libc).</td></tr>
<tr><td class="td-syntax">..</td><td class="td-desc">ostatni parametr</td><td class="td-note">—</td><td class="td-desc">Oznacza funkcję wariadyczną (np. <code>printf</code>-style).</td></tr>
</table>

<div class="code-block">
<div class="code-header"><span class="code-filename">ffi_examples.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; ── 1. libc, bez podanej biblioteki (już zlinkowana) ─────────────</span>
<span class="t-kw">extern</span> static [c] <span class="t-kw">is</span>
    <span class="t-kw">fn</span> malloc(size: <span class="t-type">int</span>) -> <span class="t-type">int</span>
    <span class="t-kw">fn</span> free(ptr: <span class="t-type">int</span>)
    <span class="t-kw">fn</span> strlen(s: <span class="t-type">string</span>) -> <span class="t-type">int</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 2. dynamiczna biblioteka .so ──────────────────────────────────</span>
<span class="t-kw">extern</span> dynamic [c, <span class="t-str">"libmylib.so"</span>] <span class="t-kw">is</span>
    <span class="t-kw">fn</span> mylib_init() -> <span class="t-type">int</span>
    <span class="t-kw">fn</span> mylib_process(data: <span class="t-type">bytes</span>, len: <span class="t-type">int</span>) -> <span class="t-type">int</span>
<span class="t-kw">end</span>

<span class="t-comment">;; ── 3. Python — trampolina, wszystko jako string ─────────────────</span>
<span class="t-kw">extern</span> [python, <span class="t-str">"numpy"</span>] <span class="t-kw">is</span>
    <span class="t-kw">fn</span> array(values: <span class="t-type">string</span>) -> <span class="t-type">string</span>
    <span class="t-kw">fn</span> mean(arr: <span class="t-type">string</span>) -> <span class="t-type">string</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> n: <span class="t-type">int</span> = strlen(<span class="t-str">"hello"</span>)
    write(<span class="t-str">"strlen: "</span> + to_string(n))

    <span class="t-kw">let</span> avg = mean(array(<span class="t-str">"[1, 2, 3, 4, 5]"</span>))
    write(<span class="t-str">"numpy mean: "</span> + avg)
<span class="t-kw">end</span></pre></div></div>
</div>
<div class="callout c-danger"><div class="ci">⚠</div><div class="cb"><strong>Uwaga:</strong> H# ufa deklarowanym sygnaturom bez weryfikacji wobec nagłówków biblioteki — literówka w typie parametru to niezdefiniowane zachowanie w runtime, nie błąd kompilacji. Sprawdź sygnatury z dokumentacją biblioteki (<code>man 3 strlen</code>, nagłówek .h, itp.) przed użyciem.</div></div>
</div>

<div class="section" id="attributes">
<div class="sec-header"><span class="sec-num">26</span><h2>Atrybuty <span class="nav-new">#[...]</span></h2></div>
<p>Atrybuty w stylu <code>#[nazwa]</code> poprzedzają <code>fn</code> lub <code>struct</code> i włączają zachowanie sprawdzane przez typechecker albo generowane automatycznie.</p>
<table class="ref-table">
<tr><th>Atrybut</th><th>Cel</th><th>Opis</th></tr>
<tr><td class="td-syntax">#[test]</td><td class="td-desc">fn</td><td class="td-desc">Rejestruje funkcję jako test uruchamiany przez <code>h# test</code> (zobacz sekcję Testy).</td></tr>
<tr><td class="td-syntax">#[inline] / #[always_inline]</td><td class="td-desc">fn</td><td class="td-desc">Podpowiedź dla codegenu, żeby wstawić ciało funkcji w miejscu wywołania zamiast generować osobne wywołanie.</td></tr>
<tr><td class="td-syntax">#[deprecated(note="...")]</td><td class="td-desc">fn</td><td class="td-desc">Typechecker ostrzega przy każdym wywołaniu takiej funkcji, dołączając podaną notatkę.</td></tr>
<tr><td class="td-syntax">#[must_use]</td><td class="td-desc">fn</td><td class="td-desc">Typechecker ostrzega, jeśli zwracana wartość zostanie zignorowana (wywołanie jako samodzielny statement).</td></tr>
<tr><td class="td-syntax">#[derive(...)]</td><td class="td-desc">struct</td><td class="td-desc">Generuje metody automatycznie. Wspierane: <code>Debug</code> (metoda <code>debug()</code> → string), <code>Clone</code> (<code>clone()</code>), <code>PartialEq</code> / <code>Eq</code> (<code>eq()</code>, porównanie pole-po-polu), <code>Default</code> (<code>default()</code>).</td></tr>
</table>

<div class="code-block">
<div class="code-header"><span class="code-filename">attributes.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">#[derive(Debug, Clone, PartialEq, Default)]</span>
<span class="t-kw">struct</span> Point <span class="t-kw">is</span>
    <span class="t-kw">pub</span> x: <span class="t-type">int</span>
    <span class="t-kw">pub</span> y: <span class="t-type">int</span>
<span class="t-kw">end</span>

<span class="t-kw">#[deprecated(note="use Point::origin() instead")]</span>
<span class="t-kw">fn</span> <span class="t-fn">zero_point</span>() -> Point <span class="t-kw">is</span>
    return Point { x: <span class="t-num">0</span>, y: <span class="t-num">0</span> }
<span class="t-kw">end</span>

<span class="t-kw">#[must_use]</span>
<span class="t-kw">fn</span> <span class="t-fn">compute</span>(a: <span class="t-type">int</span>, b: <span class="t-type">int</span>) -> <span class="t-type">int</span> = a * b + <span class="t-num">1</span>

<span class="t-kw">fn</span> <span class="t-fn">main</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> p1 = Point { x: <span class="t-num">1</span>, y: <span class="t-num">2</span> }
    <span class="t-kw">let</span> p2 = p1.clone()
    write(<span class="t-str">"equal: "</span> + to_string(p1.eq(p2)))
    write(p1.debug())
<span class="t-kw">end</span></pre></div></div>
</div>
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
