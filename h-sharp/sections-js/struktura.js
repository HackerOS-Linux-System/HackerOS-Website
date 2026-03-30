window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['struktura'] = `
<div class="section" id="struktura">
<div class="sec-header"><span class="sec-num">02</span><h2>Struktura pliku i projektu</h2></div>
<p>Konwencja organizacji pliku H# i projektu. Kompilator przetwarza wszystkie pliki <code>.h#</code> w katalogu projektu.</p>

<h3>Struktura katalogu projektu</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">struktura projektu</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>moj-projekt/
├── h#.json           ← manifest projektu + zależności
├── bytes.lock        ← lockfile (autogenerowany)
├── .gitignore
├── src/
│   ├── main.h#       ← główny plik (musi zawierać fn main())
│   ├── lib.h#        ← biblioteka pomocnicza
│   └── utils.h#      ← narzędzia
└── build/
├── moj-projekt   ← skompilowana binarka (też w root)
└── packages/     ← pobrane biblioteki z bytes</pre></div></div>
</div>

<h3>Struktura pliku .h#</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">szablon.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── 1. Dyrektywy kompilacji (opcjonalne) ─────────</span>
<span class="t-comment"># ~ "dynamic:openssl"     # dynamiczne linkowanie</span>
<span class="t-comment"># ~~ "fast:all"           # szybka kompilacja</span>

<span class="t-comment"># ── 2. Importy ────────────────────────────────────</span>
<span class="t-kw">import</span> <span class="t-str">"std:io::keyboard"</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::hex"</span>
<span class="t-kw">import</span> <span class="t-str">"bytes:scanner/1.2"</span>
<span class="t-kw">import</span> <span class="t-str">"file:lib.h#"</span>

<span class="t-comment"># ── 3. Typy: struct, enum, trait ─────────────────</span>
<span class="t-kw">struct</span> Config <span class="t-kw">do</span>
<span class="t-kw">pub</span> host: string
<span class="t-kw">pub</span> port: int
<span class="t-kw">end</span>

<span class="t-kw">enum</span> Status <span class="t-kw">do</span>
Ok
Error(string)
<span class="t-kw">end</span>

<span class="t-comment"># ── 4. Implementacje / funkcje pomocnicze ─────────</span>
<span class="t-kw">fn</span> <span class="t-func">init</span>() <span class="t-kw">do</span>
println(<span class="t-str">"Start!"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── 5. Punkt wejścia ──────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
init()
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>h#.json — manifest projektu</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">h#.json</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre>{
    <span class="t-str">"name"</span>: <span class="t-str">"moj-projekt"</span>,
    <span class="t-str">"version"</span>: <span class="t-str">"0.1.0"</span>,
    <span class="t-str">"template"</span>: <span class="t-str">"cybersec"</span>,
    <span class="t-str">"dependencies"</span>: {
        <span class="t-str">"scanner"</span>: <span class="t-str">"1.2"</span>,
        <span class="t-str">"exploit-db"</span>: <span class="t-str">"0.9"</span>
    }
}</pre></div></div>
</div>

<div class="callout c-tip"><div class="ci">💡</div><div class="cb"><strong>Fn main():</strong> Każdy wykonywalny projekt musi mieć funkcję <code>fn main()</code>. Biblioteki (<code>--template lib</code>) jej nie potrzebują — eksportują tylko <code>pub fn</code>.</div></div>
</div>
`;
