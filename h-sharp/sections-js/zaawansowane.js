window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['zaawansowane'] = `
<!-- ─ UNSAFE + ARENA ─────────────────────────────────────────────────────── -->
<div class="section" id="unsafe">
<div class="sec-header"><span class="sec-num">16</span><h2>Unsafe &amp; Arena Allocator</h2></div>
<p>Bloki <code>unsafe</code> pozwalają na niskopoziomowe operacje poza systemem bezpieczeństwa pamięci. <code>unsafe arena(N)</code> daje arena allocator — wszystkie alokacje wewnątrz bloku pochodzą z puli N bajtów i są zwalniane en-bloc po wyjściu z bloku.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">unsafe do...end</span></td><td class="td-desc">Blok bez arena — niskopoziomowe operacje</td></tr>
<tr><td><span class="td-syntax">unsafe arena do...end</span></td><td class="td-desc">Blok z arena allocatorem (domyślny rozmiar 1MB)</td></tr>
<tr><td><span class="td-syntax">unsafe arena(65536) do...end</span></td><td class="td-desc">Arena o konkretnym rozmiarze w bajtach</td></tr>
<tr><td><span class="td-syntax">fn unsafe nazwa() do...end</span></td><td class="td-desc">Funkcja oznaczona jako unsafe</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">unsafe.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Arena na domyślnym rozmiarze ─────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">process_buffer</span>() <span class="t-kw">do</span>
<span class="t-kw">unsafe</span> arena <span class="t-kw">do</span>
<span class="t-comment"># alokacje tu z puli 1MB</span>
<span class="t-kw">let</span> buf: bytes = [<span class="t-num">0</span>, <span class="t-num">1</span>, <span class="t-num">2</span>, <span class="t-num">3</span>]
println(buf.to_hex())
<span class="t-kw">end</span>
<span class="t-comment"># buf automatycznie zwolniony — cała arena razem</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Arena z konkretnym rozmiarem (64KB) ──────────</span>
<span class="t-kw">fn</span> <span class="t-func">analyze_packet</span>(data: bytes) <span class="t-kw">do</span>
<span class="t-kw">unsafe</span> arena(<span class="t-num">65536</span>) <span class="t-kw">do</span>
<span class="t-kw">let</span> raw: bytes = data
println(<span class="t-str">"Dane: "</span> + raw.to_hex())
<span class="t-comment"># przetwarzaj pakiet...</span>
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Unsafe bez areny ──────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">raw_op</span>() <span class="t-kw">do</span>
<span class="t-kw">unsafe</span> <span class="t-kw">do</span>
<span class="t-comment"># niskopoziomowe operacje bez sprawdzania granic</span>
<span class="t-kw">let</span> ptr_val: u64 = <span class="t-num">0xDEADBEEF</span>
println(<span class="t-str">"Raw: "</span> + to_string(ptr_val))
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
<div class="callout c-danger"><div class="ci">⚠</div><div class="cb"><strong>Uwaga:</strong> Bloki <code>unsafe</code> wyłączają sprawdzanie bezpieczeństwa pamięci kompilatora. Używaj tylko gdy wiesz co robisz — np. przy FFI z bibliotekami C lub przy krytycznej optymalizacji wydajności.</div></div>
</div>

<!-- ─ OPTIONAL / PROPAGACJA BŁĘDÓW ─────────────────────────────────────── -->
<div class="section" id="optional">
<div class="sec-header"><span class="sec-num">17</span><h2>Optional &amp; propagacja błędów</h2></div>
<p>H# używa <code>T?</code> dla typów opcjonalnych i operatora <code>?</code> do propagacji nil w górę callstack. Podobnie jak <code>?</code> w Rust dla <code>Option</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">optional.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Funkcja zwracająca optional ───────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">find_user</span>(id: int) -> string? <span class="t-kw">do</span>
<span class="t-kw">if</span> id <= <span class="t-num">0</span> <span class="t-kw">do</span>
return <span class="t-kw">nil</span>
<span class="t-kw">end</span>
return <span class="t-str">"user_"</span> + to_string(id)
<span class="t-kw">end</span>

<span class="t-comment"># ── parse_int zwraca int? ─────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">safe_parse</span>(s: string) -> int? <span class="t-kw">do</span>
return parse_int(s)   <span class="t-comment"># nil jeśli nie da się sparsować</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Sprawdzanie nil ───────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-kw">let</span> user: string? = find_user(<span class="t-num">5</span>)
<span class="t-kw">if</span> user != <span class="t-kw">nil</span> <span class="t-kw">do</span>
println(<span class="t-str">"Znaleziono: "</span> + user)
<span class="t-kw">else</span> <span class="t-kw">do</span>
println(<span class="t-str">"Nie znaleziono"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── Operator ? — propagacja nil w górę ──────────</span>
<span class="t-kw">let</span> n: int? = parse_int(<span class="t-str">"42"</span>)
<span class="t-kw">let</span> val: int = n?   <span class="t-comment"># jeśli nil — funkcja zwraca nil</span>
println(to_string(val))

<span class="t-comment"># ── Łańcuch z ? ──────────────────────────────────</span>
<span class="t-kw">let</span> u = find_user(<span class="t-num">10</span>)?  <span class="t-comment"># propaguj nil dalej</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ GENERICS ────────────────────────────────────────────────────────────── -->
<div class="section" id="generics">
<div class="sec-header"><span class="sec-num">18</span><h2>Generics</h2></div>
<p>Typy i funkcje generyczne — parametryzowane typem T. Składnia: <code>struct Nazwa&lt;T&gt;</code>, <code>fn nazwa&lt;T&gt;</code>. Dostępne standardowe kontenery generyczne: <code>Vec&lt;T&gt;</code>, <code>Map&lt;K,V&gt;</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">generics.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Generyczna struct ─────────────────────────────</span>
<span class="t-kw">struct</span> Pair&lt;A, B&gt; <span class="t-kw">do</span>
<span class="t-kw">pub</span> first: A
<span class="t-kw">pub</span> second: B
<span class="t-kw">end</span>

<span class="t-comment"># ── Generyczna funkcja ────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">first</span>&lt;T&gt;(arr: [T]) -> T? <span class="t-kw">do</span>
<span class="t-kw">if</span> len(arr) == <span class="t-num">0</span> <span class="t-kw">do</span>
return <span class="t-kw">nil</span>
<span class="t-kw">end</span>
return arr[<span class="t-num">0</span>]
<span class="t-kw">end</span>

<span class="t-comment"># ── Typy generyczne std ───────────────────────────</span>
<span class="t-comment"># Vec&lt;T&gt; — dynamiczna tablica</span>
<span class="t-kw">let</span> v: Vec&lt;int&gt; = Vec::new()

<span class="t-comment"># Map&lt;K,V&gt; — mapa klucz-wartość</span>
<span class="t-kw">let</span> m: Map&lt;string, int&gt; = Map::new()

<span class="t-comment"># ── Użycie Pair ─────────────────────────────────</span>
<span class="t-kw">let</span> addr: Pair&lt;string, int&gt; = Pair {
    first: <span class="t-str">"192.168.1.1"</span>,
    second: <span class="t-num">8080</span>
}
println(addr.first + <span class="t-str">":"</span> + to_string(addr.second))</pre></div></div>
</div>
</div>

<!-- ─ CLOSURES ────────────────────────────────────────────────────────────── -->
<div class="section" id="closures">
<div class="sec-header"><span class="sec-num">19</span><h2>Closures (domknięcia)</h2></div>
<p>Funkcje anonimowe. Składnia: <code>|params| -> typ do...end</code> lub skrótowo <code>|params| wyrażenie</code>. Domykają zmienne z otaczającego zakresu.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">closures.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Prosta closure ────────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-kw">let</span> podwoj = |x: int| -> int <span class="t-kw">do</span>
return x * <span class="t-num">2</span>
<span class="t-kw">end</span>

println(to_string(podwoj(<span class="t-num">21</span>)))  <span class="t-comment"># 42</span>

<span class="t-comment"># ── Domknięcie zmiennej zewnętrznej ──────────────</span>
<span class="t-kw">let</span> mnoznik: int = <span class="t-num">3</span>
<span class="t-kw">let</span> trojkrotnosc = |x: int| -> int <span class="t-kw">do</span>
return x * mnoznik  <span class="t-comment"># domknięcie mnoznik</span>
<span class="t-kw">end</span>
println(to_string(trojkrotnosc(<span class="t-num">7</span>)))  <span class="t-comment"># 21</span>

<span class="t-comment"># ── Przekazywanie jako argument ───────────────────</span>
<span class="t-kw">let</span> porty: [int] = [<span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>]
<span class="t-kw">for</span> p <span class="t-kw">in</span> porty <span class="t-kw">do</span>
println(to_string(podwoj(p)))
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
