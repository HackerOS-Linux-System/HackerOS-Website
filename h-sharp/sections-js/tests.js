window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['tests'] = `
<div class="section" id="tests">
<div class="sec-header"><span class="sec-num">22</span><h2>System testów <span class="nav-new">v0.6</span></h2></div>
<p>H# ma wbudowany system testów. Funkcje oznaczone <code>#[test]</code> są wykrywane automatycznie i uruchamiane przez <code>bytes test</code>. Nie wymagają main — runner zbiera je sam.</p>

<h3>Pisanie testów</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">tests/arithmetic_test.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> test"</span> <span class="t-kw">from</span> <span class="t-str">"test"</span>

<span class="t-comment">;; Funkcja pomocnicza — dostępna w testach</span>
<span class="t-kw">fn</span> <span class="t-fn">add</span>(a: int, b: int) -> int = a + b
<span class="t-kw">fn</span> <span class="t-fn">factorial</span>(n: int) -> int <span class="t-kw">is</span>
    <span class="t-kw">if</span> n <= <span class="t-num">1</span> <span class="t-kw">is</span> return <span class="t-num">1</span> <span class="t-kw">end</span>
    return n * factorial(n - <span class="t-num">1</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_add_basic</span>() <span class="t-kw">is</span>
    test::assert_eq(add(<span class="t-num">2</span>, <span class="t-num">3</span>), <span class="t-num">5</span>)
    test::assert_eq(add(<span class="t-num">-1</span>, <span class="t-num">1</span>), <span class="t-num">0</span>)
    test::assert_eq(add(<span class="t-num">0</span>, <span class="t-num">0</span>), <span class="t-num">0</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_factorial</span>() <span class="t-kw">is</span>
    test::assert_eq(factorial(<span class="t-num">0</span>), <span class="t-num">1</span>)
    test::assert_eq(factorial(<span class="t-num">5</span>), <span class="t-num">120</span>)
    test::assert_eq(factorial(<span class="t-num">10</span>), <span class="t-num">3628800</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_float_approx</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> pi: f64 = <span class="t-num">3.14159</span>
    test::assert_approx(pi, <span class="t-num">3.14</span>, <span class="t-num">0.01</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_string_ops</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> s = <span class="t-str">"hello"</span>
    test::assert_eq(s.len(), <span class="t-num">5</span>)
    test::assert_true(s.contains(<span class="t-str">"ell"</span>))
    test::assert_true(s.starts_with(<span class="t-str">"hel"</span>))
    test::assert_eq(s.to_upper(), <span class="t-str">"HELLO"</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_interpolation</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> name = <span class="t-str">"H#"</span>
    <span class="t-kw">let</span> msg  = <span class="t-str">"Hello, {name}!"</span>
    test::assert_eq(msg, <span class="t-str">"Hello, H#!"</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_optional_nil</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> r: int? = nil
    test::assert_nil(r)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_skip_example</span>() <span class="t-kw">is</span>
    test::skip(<span class="t-str">"not implemented yet"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Uruchamianie testów</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Wszystkie testy w projekcie</span>
bytes test

<span class="t-comment">;; Konkretny katalog</span>
bytes test tests/core/

<span class="t-comment">;; Konkretny plik</span>
bytes test tests/core/arithmetic_test.h#

<span class="t-comment">;; Verbose — pokaż każdy assert</span>
bytes test --verbose

<span class="t-comment">;; Sprawdzanie składni bez uruchamiania</span>
h# check tests/</pre></div></div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-filename">output</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>  bytes test  H# Test Runner v0.6

  tests/core/arithmetic_test.h#
    ✓ test_add_basic        (0.3ms)
    ✓ test_factorial        (0.1ms)
    ✓ test_float_approx     (0.1ms)
    ✓ test_string_ops       (0.2ms)
    ✓ test_interpolation    (0.1ms)
    ✓ test_optional_nil     (0.1ms)
    ⊘ test_skip_example     (skipped: not implemented yet)

  ──────────────────────────────────────────────
  ✓ 6 passed  ⊘ 1 skipped  ✗ 0 failed   0.9ms</pre></div></div>
</div>

<h3>Wszystkie asercje</h3>
<table class="ref-table">
<tr><th>Funkcja</th><th>Opis</th></tr>
<tr><td class="td-syntax">assert_eq(actual, expected)</td><td class="td-desc">Wartości muszą być równe — drukuje obie przy niepowodzeniu</td></tr>
<tr><td class="td-syntax">assert_ne(actual, unexpected)</td><td class="td-desc">Wartości muszą być różne</td></tr>
<tr><td class="td-syntax">assert_true(cond)</td><td class="td-desc">Warunek musi być true</td></tr>
<tr><td class="td-syntax">assert_false(cond)</td><td class="td-desc">Warunek musi być false</td></tr>
<tr><td class="td-syntax">assert_nil(val)</td><td class="td-desc">Wartość musi być nil</td></tr>
<tr><td class="td-syntax">assert_not_nil(val)</td><td class="td-desc">Wartość nie może być nil</td></tr>
<tr><td class="td-syntax">assert_approx(actual, expected, delta)</td><td class="td-desc">Float w przedziale ±delta — do porównań zmiennoprzecinkowych</td></tr>
<tr><td class="td-syntax">assert_contains(s, sub)</td><td class="td-desc">String zawiera podstring</td></tr>
<tr><td class="td-syntax">assert_starts_with(s, prefix)</td><td class="td-desc">String zaczyna się od prefix</td></tr>
<tr><td class="td-syntax">assert_len(arr, n)</td><td class="td-desc">Tablica ma dokładnie n elementów</td></tr>
<tr><td class="td-syntax">fail(msg)</td><td class="td-desc">Ręczne niepowodzenie z wiadomością</td></tr>
<tr><td class="td-syntax">skip(reason)</td><td class="td-desc">Pomiń test (oznaczony ⊘, nie ✗)</td></tr>
</table>

<h3>Test z kolekcjami i std</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">tests/std_test.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">use</span> <span class="t-str">"std -> test"</span>        <span class="t-kw">from</span> <span class="t-str">"test"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> collections"</span> <span class="t-kw">from</span> <span class="t-str">"col"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> sort"</span>        <span class="t-kw">from</span> <span class="t-str">"sort"</span>
<span class="t-kw">use</span> <span class="t-str">"std -> iter"</span>        <span class="t-kw">from</span> <span class="t-str">"iter"</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_hashmap</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> map = col::HashMap::new()
    map.insert(<span class="t-str">"key"</span>, <span class="t-num">42</span>)
    map.insert(<span class="t-str">"other"</span>, <span class="t-num">99</span>)
    test::assert_eq(map.get(<span class="t-str">"key"</span>), <span class="t-num">42</span>)
    test::assert_eq(map.len(), <span class="t-num">2</span>)
    test::assert_true(map.contains_key(<span class="t-str">"key"</span>))
    test::assert_true(!map.contains_key(<span class="t-str">"missing"</span>))
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_sort_and_search</span>() <span class="t-kw">is</span>
    <span class="t-kw">let mut</span> arr = [<span class="t-num">5</span>, <span class="t-num">1</span>, <span class="t-num">8</span>, <span class="t-num">3</span>, <span class="t-num">9</span>, <span class="t-num">2</span>]
    sort::sort_ints(arr)
    test::assert_eq(arr[<span class="t-num">0</span>], <span class="t-num">1</span>)
    test::assert_eq(arr[<span class="t-num">5</span>], <span class="t-num">9</span>)
    test::assert_eq(sort::binary_search(arr, <span class="t-num">8</span>), <span class="t-num">4</span>)
    test::assert_eq(sort::binary_search(arr, <span class="t-num">99</span>), <span class="t-num">-1</span>)
<span class="t-kw">end</span>

<span class="t-attr">#[test]</span>
<span class="t-kw">fn</span> <span class="t-fn">test_iter_pipeline</span>() <span class="t-kw">is</span>
    <span class="t-kw">let</span> nums  = [<span class="t-num">1</span>, <span class="t-num">2</span>, <span class="t-num">3</span>, <span class="t-num">4</span>, <span class="t-num">5</span>, <span class="t-num">6</span>]
    <span class="t-kw">let</span> evens = iter::filter(nums, |x: int| -> bool <span class="t-kw">is</span> x % <span class="t-num">2</span> == <span class="t-num">0</span> <span class="t-kw">end</span>)
    <span class="t-kw">let</span> sq    = iter::map(evens, |x: int| -> int <span class="t-kw">is</span> x * x <span class="t-kw">end</span>)
    <span class="t-kw">let</span> sum   = iter::reduce(sq, <span class="t-num">0</span>, |a: int, x: int| -> int <span class="t-kw">is</span> a + x <span class="t-kw">end</span>)
    test::assert_eq(sum, <span class="t-num">56</span>)  <span class="t-comment">;; 4 + 16 + 36 = 56</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
