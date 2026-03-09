window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['gramatyka'] = `
<!-- ─ GRAMATYKA PEG ──────────────────────────────────────────────────────── -->
<div class="section" id="gramatyka">
<div class="sec-header"><span class="sec-num">29</span><h2>Gramatyka PEG (grammar.pest)</h2></div>
<p>Hacker Lang używa <strong>dwuetapowego parsera</strong>: najpierw <em>pre-pest</em> w Rust (specjalne konstrukcje wymagające stanu między liniami), potem <em>pest PEG</em> dla reszty. Poniżej kluczowe reguły gramatyki.</p>

<h3>Prymitywy leksykalne</h3>
<table class="ref-table">
<tr><th>Reguła</th><th>Wzorzec</th><th>Przykład</th></tr>
<tr><td class="td-syntax">ident</td><td class="td-desc"><code>(alpha|_)(alnum|_|-)*</code></td><td class="td-note">my_func, deploy-app, config</td></tr>
<tr><td class="td-syntax">number</td><td class="td-desc"><code>digit+</code></td><td class="td-note">42, 1024, 0</td></tr>
<tr><td class="td-syntax">float_lit</td><td class="td-desc"><code>digit+ . digit+</code></td><td class="td-note">3.14, 0.5, 100.0</td></tr>
<tr><td class="td-syntax">str_lit</td><td class="td-desc"><code>"..."</code> — bez interpolacji</td><td class="td-note">"hello world"</td></tr>
<tr><td class="td-syntax">str_interp</td><td class="td-desc"><code>"..."</code> z <code>$var</code> i <code>$(expr)</code></td><td class="td-note">"$HOST:$PORT $(2+2)"</td></tr>
<tr><td class="td-syntax">bool_lit</td><td class="td-desc"><code>true | false</code></td><td class="td-note">true</td></tr>
<tr><td class="td-syntax">null_lit</td><td class="td-desc"><code>null</code></td><td class="td-note">null</td></tr>
<tr><td class="td-syntax">version</td><td class="td-desc"><code>digit+(\\.digit+)*</code></td><td class="td-note">1.3, 2.0.1</td></tr>
<tr><td class="td-syntax">arena_size</td><td class="td-desc"><code>digit+(b|kb|mb|gb)?</code></td><td class="td-note">512kb, 1mb, 256</td></tr>
</table>

<h3>Referencja biblioteki (lib_ref)</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">grammar.pest — lib_ref</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>lib_type = @{ "vira" | "virus" | "bytes" | "core" }
lib_ref  =  { "<" ~ lib_type ~ "/" ~ lib_name ~ (":" ~ version)? ~ ">" }

<span class="t-comment">// Przykłady:</span>
#&lt;core/http:1.3&gt;     → LibType::Core,  name="http",    version=Some("1.3")
#&lt;bytes/sqlite3&gt;    → LibType::Bytes, name="sqlite3", version=None
#&lt;vira/my-pkg:0.9&gt;  → LibType::Vira,  name="my-pkg",  version=Some("0.9")
#&lt;virus/internal&gt;   → LibType::Virus, name="internal",version=None</pre></div></div>
</div>

<h3>Wyrażenia (expr)</h3>
<table class="ref-table">
<tr><th>Reguła</th><th>Składnia</th><th>Przykłady</th></tr>
<tr><td class="td-syntax">atom</td><td class="td-desc">Pojedyncza wartość: float, int, str_interp, str_lit, bool, null, list_lit, map_lit, lambda_lit, access_expr, $var, (expr)</td><td class="td-note">42, "tekst", $x, $cfg.host, [1,2], {k:"v"}</td></tr>
<tr><td class="td-syntax">bin_op</td><td class="td-desc">Operator binarny między atomami</td><td class="td-note">+ - * / % == != >= <= > < && ||</td></tr>
<tr><td class="td-syntax">expr</td><td class="td-desc"><code>atom (WHITESPACE+ bin_op WHITESPACE+ atom)*</code></td><td class="td-note">$a + $b * 3, $x == "ok" && $y > 0</td></tr>
<tr><td class="td-syntax">access_expr</td><td class="td-desc"><code>$ident.(digit|ident)</code></td><td class="td-note">$lista.0, $user.name, $cfg.host</td></tr>
<tr><td class="td-syntax">interp_expr</td><td class="td-desc"><code>$( wyrażenie )</code> w stringu</td><td class="td-note">"Suma: $($a + $b)"</td></tr>
<tr><td class="td-syntax">interp_var</td><td class="td-desc"><code>$ident</code> w stringu</td><td class="td-note">"Host: $HOST:$PORT"</td></tr>
</table>

<h3>Kolekcje i destrukturyzacja</h3>
<table class="ref-table">
<tr><th>Reguła</th><th>Składnia</th><th>Przykład</th></tr>
<tr><td class="td-syntax">list_lit</td><td class="td-desc"><code>[expr, expr, ...]</code></td><td class="td-note">["a", $b, 42, true]</td></tr>
<tr><td class="td-syntax">map_lit</td><td class="td-desc"><code>{ident: expr, ...}</code></td><td class="td-note">{host: "prod", port: "443"}</td></tr>
<tr><td class="td-syntax">collection_mut</td><td class="td-desc"><code>$var.(push|pop|set|del|get) args?</code></td><td class="td-note">$l.push "val", $m.set "k" "v", $l.pop</td></tr>
<tr><td class="td-syntax">destruct_list</td><td class="td-desc"><code>[head | tail] = rest</code></td><td class="td-note">[first | remaining] = $lista</td></tr>
<tr><td class="td-syntax">destruct_map</td><td class="td-desc"><code>{f1, f2, ...} = rest</code></td><td class="td-note">{name, email, role} = $user</td></tr>
</table>

<h3>Lambdy</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">grammar.pest — lambda_lit</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>lambda_param  = @{ "$" ~ ident }
lambda_params = { lambda_param ~ ("," ~ lambda_param)* }
lambda_body   = @{ (!("}" | "->") ~ ANY)+ }
lambda_lit    = { "{" ~ lambda_params ~ "->" ~ lambda_body ~ "}" }

<span class="t-comment">// Inline lambda (jednolinijkowa):</span>
{ $x -> $x * 2 }
{ $a, $b -> $a + $b }

<span class="t-comment">// Przypisanie (pre-pest):</span>
$f = { $x -> $x * 2 }

<span class="t-comment">// Wieloliniowa (stan Rust — brak zamykającego } w tej samej linii):</span>
$proc = {
    $dane ->
    .waliduj $dane
    .przetworz
}</pre></div></div>
</div>

<h3>Sygnatury typów i generics</h3>
<table class="ref-table">
<tr><th>Reguła</th><th>Składnia</th><th>Przykład</th></tr>
<tr><td class="td-syntax">prim_type</td><td class="td-desc"><code>int|float|str|bool|list|map|null</code></td><td class="td-note">int, str, map</td></tr>
<tr><td class="td-syntax">typed_sig</td><td class="td-desc"><code>[type type -> type]</code></td><td class="td-note">[int str -> bool]</td></tr>
<tr><td class="td-syntax">generic_constraint</td><td class="td-desc"><code>T impl InterfaceName</code></td><td class="td-note">T impl Serializable</td></tr>
<tr><td class="td-syntax">generic_sig</td><td class="td-desc"><code>[T impl I type -> type]</code></td><td class="td-note">[T impl Loggable -> str]</td></tr>
<tr><td class="td-syntax">arena_def</td><td class="td-desc"><code>:: ident [arena_size] def</code></td><td class="td-note">:: cache [512kb] def</td></tr>
</table>

<h3>Pre-pest — obsługiwane wyłącznie przez stan Rust</h3>
<p>Te konstrukcje kolidują z regułami pest lub wymagają akumulacji stanu między liniami — dlatego są parsowane w Rust <em>przed</em> wywołaniem gramatyki PEG:</p>
<table class="ref-table">
<tr><th>Konstrukcja</th><th>Powód izolacji</th></tr>
<tr><td class="td-syntax">==interface / ==type</td><td class="td-desc">Prefiks <code>==</code> koliduje z <code>enum_stmt</code> w pest</td></tr>
<tr><td class="td-syntax">;;Klasa impl Interfejs def</td><td class="td-desc">Prefiks <code>;;</code> + <code>impl</code> koliduje z <code>class_def</code></td></tr>
<tr><td class="td-syntax">Wieloliniowe mapy / listy</td><td class="td-desc">Wymagają stanu <code>MapBlockState / ListBlockState</code> między liniami</td></tr>
<tr><td class="td-syntax">Wieloliniowe lambdy</td><td class="td-desc">Brak zamykającego <code>}</code> w tej samej linii — <code>LambdaBlockState</code></td></tr>
<tr><td class="td-syntax">do...done blok</td><td class="td-desc">Akumulacja węzłów ciała w <code>do_buf</code></td></tr>
<tr><td class="td-syntax">==test [...] blok</td><td class="td-desc">Akumulacja asertów w <code>test_buf</code></td></tr>
<tr><td class="td-syntax">$h = spawn / $x = await</td><td class="td-desc">Rozróżnienie od zwykłego <code>AssignLocal</code> po słowie kluczowym w wartości</td></tr>
<tr><td class="td-syntax">$f = { $x -> }</td><td class="td-desc">Rozróżnienie lambdy od <code>AssignExpr</code> z mapą</td></tr>
<tr><td class="td-syntax">expr ?! "msg"</td><td class="td-desc">Operator <code>?!</code> — brak reguły w pest dla tej pozycji</td></tr>
<tr><td class="td-syntax">%KEY = val</td><td class="td-desc">Prefiks <code>%</code> poza zakresem pest percent_stmt gdy brak białych znaków</td></tr>
<tr><td class="td-syntax">k = spawn / await</td><td class="td-desc">Przypisanie asyncu — sprawdzane przed ogólnym is_assignment</td></tr>
</table>
</div>

<!-- ─ BŁĘDY SKŁADNI ──────────────────────────────────────────────────────── -->
<div class="section" id="bledy">
<div class="sec-header"><span class="sec-num">30</span><h2>Błędy składni i diagnostyka</h2></div>
<p>PLSA generuje czytelne komunikaty błędów przez <strong>miette</strong> z kontekstem źródłowym, numerem linii, wskazaniem kolumny i wskazówką. Maksymalnie 20 błędów naraz, potem skrót. Na końcu raportu — sekcja unikatowych wskazówek.</p>

<h3>Trzy typy błędów PLSA</h3>
<table class="ref-table">
<tr><th>Typ</th><th>Kod diagnostyczny</th><th>Opis i pola</th></tr>
<tr><td class="td-syntax">SyntaxError</td><td class="td-note">hl::syntax_error</td><td class="td-desc">Linia nierozpoznana przez pest ani pre-pest. Zawiera <code>line_num</code>, <code>span</code> (offset+len) i <code>advice</code> (wskazówka). URL: docs.html</td></tr>
<tr><td class="td-syntax">StructureError</td><td class="td-note">hl::structure_error</td><td class="td-desc">Błąd struktury — np. <code>]</code> bez otwartego <code>[</code>. Pole <code>message</code> z opisem.</td></tr>
<tr><td class="td-syntax">IoError</td><td class="td-note">hl::io_error</td><td class="td-desc">Nie można otworzyć pliku. Pola <code>path</code> i <code>message</code> z błędem systemu.</td></tr>
</table>

<h3>Najczęstsze błędy i poprawki</h3>
<table class="ref-table">
<tr><th>Błędna linia</th><th>Przyczyna</th><th>Poprawka</th></tr>
<tr><td class="td-syntax">echo "abc"</td><td class="td-desc">Komenda bez prefiksu — PLSA sugeruje prefix</td><td class="td-note">> echo "abc"</td></tr>
<tr><td class="td-syntax">git commit -m "x"</td><td class="td-desc">Tak samo — brak prefiksu komendy systemowej</td><td class="td-note">> git commit -m "x"</td></tr>
<tr><td class="td-syntax">$var = val</td><td class="td-desc">Przypisanie zaczyna się od $, a powinno od klucza</td><td class="td-note">var = val lub $var=val (bez spacji)</td></tr>
<tr><td class="td-syntax">==interface bez ]</td><td class="td-desc">Interfejs jednolinijkowy wymaga zamkniętego ]</td><td class="td-note">==interface I [m1, m2]</td></tr>
<tr><td class="td-syntax">==type bez wariantów</td><td class="td-desc">ADT musi mieć co najmniej jeden wariant</td><td class="td-note">==type T [Wariant]</td></tr>
<tr><td class="td-syntax">recur poza :f def</td><td class="td-desc">recur poza ciałem funkcji — niezdefiniowane</td><td class="td-note">Umieść recur wewnątrz :f def...done</td></tr>
<tr><td class="td-syntax">done bez def</td><td class="td-desc">done bez otwartego bloku :f def lub ;;K def</td><td class="td-note">Sprawdź czy każde def ma done</td></tr>
<tr><td class="td-syntax">] bez [</td><td class="td-desc">Nieoczekiwany koniec raw block lub listy</td><td class="td-note">Usuń niepasujący ] lub dodaj [</td></tr>
<tr><td class="td-syntax">:: f def</td><td class="td-desc">Arena allocator bez rozmiaru w nawiasach</td><td class="td-note">:: f [512kb] def</td></tr>
<tr><td class="td-syntax">;;K impl I</td><td class="td-desc">Brakuje def na końcu impl</td><td class="td-note">;;K impl I def</td></tr>
<tr><td class="td-syntax">{ $x $x*2 }</td><td class="td-desc">Lambda bez strzałki -></td><td class="td-note">{ $x -> $x * 2 }</td></tr>
<tr><td class="td-syntax">spawn</td><td class="td-desc">spawn bez argumentu — co uruchomić?</td><td class="td-note">spawn .funkcja args</td></tr>
<tr><td class="td-syntax">match $x</td><td class="td-desc">match bez |> lub > na końcu</td><td class="td-note">match $x |></td></tr>
</table>

<h3>Wskazówki automatyczne (suggest)</h3>
<p>PLSA rozpoznaje popularne komendy systemowe i gdy brakuje prefiksu, generuje konkretną wskazówkę:</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — przykładowy błąd PLSA</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>✗ 1 błąd składni w deploy.hl

× Błąd składni w linii 15
╭─[deploy.hl:15:1]
15 │ curl -sf https://api.example.com
· ^^^^ tutaj
╰─
help: Brakuje prefiksu komendy — użyj: > curl -sf https://api.example.com

━━━ Wskazówki ━━━━━━━━━━━━━━━━━━━━━━━━━
→ Brakuje prefiksu komendy — użyj: > curl -sf https://api.example.com</pre></div></div>
</div>
<div class="callout c-tip"><div class="ci">💡</div><div class="cb"><strong>Linki diagnostyczne:</strong> Każdy <code>SyntaxError</code> zawiera URL do tej dokumentacji: <code>https://hackeros-linux-system.github.io/HackerOS-Website/hacker-lang/docs.html</code> — widoczny w raportach miette.</div></div>
</div>

<!-- ─ TYPY I OPERATORY ────────────────────────────────────────────────────── -->
<div class="section" id="typy-prim">
<div class="sec-header"><span class="sec-num">31</span><h2>Typy wbudowane i operatory</h2></div>

<h3>Typy prymitywne (prim_type)</h3>
<table class="ref-table">
<tr><th>Typ</th><th>Opis</th><th>Przykład sygnatury</th><th>Literał</th></tr>
<tr><td class="td-syntax">int</td><td class="td-desc">Liczba całkowita</td><td class="td-note">:f [int -> int] def</td><td class="td-note">42, 0, 1024</td></tr>
<tr><td class="td-syntax">float</td><td class="td-desc">Zmiennoprzecinkowa</td><td class="td-note">:f [float float -> float] def</td><td class="td-note">3.14, 0.5</td></tr>
<tr><td class="td-syntax">str</td><td class="td-desc">Ciąg znaków</td><td class="td-note">:f [str -> str] def</td><td class="td-note">"tekst", "$VAR"</td></tr>
<tr><td class="td-syntax">bool</td><td class="td-desc">Wartość logiczna</td><td class="td-note">:f [int -> bool] def</td><td class="td-note">true, false</td></tr>
<tr><td class="td-syntax">list</td><td class="td-desc">Lista wartości</td><td class="td-note">:f [list -> int] def</td><td class="td-note">["a", "b", $c]</td></tr>
<tr><td class="td-syntax">map</td><td class="td-desc">Mapa klucz-wartość</td><td class="td-note">:f [str -> map] def</td><td class="td-note">{k: "v", n: $x}</td></tr>
<tr><td class="td-syntax">null</td><td class="td-desc">Brak wartości (void/unit)</td><td class="td-note">:f [str -> null] def</td><td class="td-note">null</td></tr>
</table>

<h3>Sygnatury w praktyce</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">sygnatury.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! ── Proste sygnatury ─────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">dodaj</span>        [int int -> int]   def
<span class="t-kw2">:</span><span class="t-func">formatuj</span>     [str str -> str]   def
<span class="t-kw2">:</span><span class="t-func">czy_aktywny</span>  [map -> bool]      def
<span class="t-kw2">:</span><span class="t-func">pobierz</span>      [str -> map]       def
<span class="t-kw2">:</span><span class="t-func">wyslij_log</span>   [str -> null]      def

<span class="t-comment">! ── Wiele parametrów ─────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">http_post</span>    [str str str -> map]  def
<span class="t-kw2">:</span><span class="t-func">db_query</span>     [str map -> list]     def

<span class="t-comment">! ── Generics z constraints ───────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">serializuj</span>   [T impl Serializable -> str] def
<span class="t-kw2">:</span><span class="t-func">loguj</span>        [T impl Loggable -> null]    def
<span class="t-kw2">:</span><span class="t-func">porownaj</span>     [T impl Comparable T -> bool] def

<span class="t-comment">! ── Arena allocator ──────────────────────────────</span>
<span class="t-kw2">::</span><span class="t-func">przetworz</span>   [1mb] def    <span class="t-comment">! sig = "[arena:1mb]" w AST</span>
<span class="t-kw2">::</span><span class="t-func">cache_init</span>  [512kb] def
<span class="t-kw2">::</span><span class="t-func">buf</span>         [64mb] def</pre></div></div>
</div>

<h3>Operatory binarne (bin_op)</h3>
<div class="grid2">
<table class="ref-table">
<tr><th>Op</th><th>Znaczenie</th><th>Przykład</th></tr>
<tr><td class="td-syntax">+</td><td class="td-desc">Dodawanie</td><td class="td-note">$a + $b</td></tr>
<tr><td class="td-syntax">-</td><td class="td-desc">Odejmowanie</td><td class="td-note">$x - 1</td></tr>
<tr><td class="td-syntax">*</td><td class="td-desc">Mnożenie</td><td class="td-note">$n * $m</td></tr>
<tr><td class="td-syntax">/</td><td class="td-desc">Dzielenie</td><td class="td-note">$total / $count</td></tr>
<tr><td class="td-syntax">%</td><td class="td-desc">Reszta (modulo)</td><td class="td-note">$i % 2</td></tr>
<tr><td class="td-syntax">==</td><td class="td-desc">Równość</td><td class="td-note">$x == "ok"</td></tr>
<tr><td class="td-syntax">!=</td><td class="td-desc">Nierówność</td><td class="td-note">$x != null</td></tr>
</table>
<table class="ref-table">
<tr><th>Op</th><th>Znaczenie</th><th>Przykład</th></tr>
<tr><td class="td-syntax">>=</td><td class="td-desc">Większe lub równe</td><td class="td-note">$n >= 0</td></tr>
<tr><td class="td-syntax"><=</td><td class="td-desc">Mniejsze lub równe</td><td class="td-note">$x <= 100</td></tr>
<tr><td class="td-syntax">></td><td class="td-desc">Większe <em>(tylko w expr!)</em></td><td class="td-note">$a > $b</td></tr>
<tr><td class="td-syntax"><</td><td class="td-desc">Mniejsze</td><td class="td-note">$i < $len</td></tr>
<tr><td class="td-syntax">&&</td><td class="td-desc">Koniunkcja logiczna</td><td class="td-note">$a && $b</td></tr>
<tr><td class="td-syntax">||</td><td class="td-desc">Alternatywa logiczna</td><td class="td-note">$x || $default</td></tr>
</table>
</div>
<div class="callout c-warn"><div class="ci">⚠</div><div class="cb"><strong>Uwaga na &gt; w różnych kontekstach:</strong> Jako prefiks linii <code>&gt; cmd</code> — komenda z podstawianiem. Jako operator w wyrażeniu <code>$x = $a &gt; $b</code> — porównanie. Parser rozróżnia kontekst na podstawie pozycji w linii.</div></div>

<h3>Operatory specjalne (v2)</h3>
<table class="ref-table">
<tr><th>Operator</th><th>Składnia</th><th>Opis</th></tr>
<tr><td class="td-syntax">?!</td><td class="td-note">expr ?! "msg"</td><td class="td-desc">Result unwrap — jeśli wyrażenie jest null/błąd, panikuje z podaną wiadomością. Jak Rust <code>.unwrap_or_else()</code>.</td></tr>
<tr><td class="td-syntax">|></td><td class="td-note">.a |> .b |> .c</td><td class="td-desc">Pipe forward — wynik lewej strony jest argumentem prawej. Jednolinijkowy łańcuch.</td></tr>
<tr><td class="td-syntax">| .krok</td><td class="td-note">| .krok args</td><td class="td-desc">Krok wieloliniowego potoku wewnątrz bloku <code>do...done</code>.</td></tr>
<tr><td class="td-syntax">$()</td><td class="td-note">"Wynik: $(expr)"</td><td class="td-desc">Interpolacja wyrażenia wewnątrz stringa. Ewaluowane w runtime.</td></tr>
</table>
</div>
`;
