window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['sterowanie'] = `
<!-- ─ IF / ELSIF / ELSE ──────────────────────────────────────────────────── -->
<div class="section" id="if">
<div class="sec-header"><span class="sec-num">07</span><h2>If / Elsif / Else</h2></div>
<p>Warunki w H# używają słów kluczowych <code>if</code>, <code>elsif</code>, <code>else</code> z ciałem <code>do...end</code> lub opcjonalnym <code>then do...end</code>. Warunek to dowolne wyrażenie bool.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">if cond do...end</span></td><td class="td-desc">Podstawowy warunek</td></tr>
<tr><td><span class="td-syntax">elsif cond do...end</span></td><td class="td-desc">Dodatkowa gałąź (analogicznie <code>elif</code> w Python)</td></tr>
<tr><td><span class="td-syntax">else do...end</span></td><td class="td-desc">Gałąź domyślna</td></tr>
<tr><td><span class="td-syntax">if cond then do...end</span></td><td class="td-desc">Wariant z opcjonalnym <code>then</code> przed <code>do</code></td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">warunki.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span></div>
<div class="code-inner"><pre><span class="t-kw">let</span> cpu: int = <span class="t-num">75</span>
<span class="t-kw">let</span> port: int = <span class="t-num">8080</span>

<span class="t-comment"># ── Podstawowy if ─────────────────────────────────</span>
<span class="t-kw">if</span> cpu > <span class="t-num">90</span> <span class="t-kw">do</span>
println(<span class="t-str">"KRYTYCZNE! CPU="</span> + to_string(cpu) + <span class="t-str">"%"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── Łańcuch if / elsif / else ─────────────────────</span>
<span class="t-kw">if</span> cpu > <span class="t-num">90</span> <span class="t-kw">do</span>
println(<span class="t-str">"KRYTYCZNY"</span>)
<span class="t-kw">elsif</span> cpu > <span class="t-num">70</span> <span class="t-kw">do</span>
println(<span class="t-str">"Wysoki CPU"</span>)
<span class="t-kw">elsif</span> cpu > <span class="t-num">50</span> <span class="t-kw">do</span>
println(<span class="t-str">"Umiarkowany"</span>)
<span class="t-kw">else</span> <span class="t-kw">do</span>
println(<span class="t-str">"CPU OK"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── Operatory logiczne ────────────────────────────</span>
<span class="t-kw">if</span> port >= <span class="t-num">1</span> && port <= <span class="t-num">65535</span> <span class="t-kw">do</span>
println(<span class="t-str">"Port prawidłowy: "</span> + to_string(port))
<span class="t-kw">end</span>

<span class="t-comment"># ── Negacja ───────────────────────────────────────</span>
<span class="t-kw">let</span> ssl: bool = <span class="t-kw">true</span>
<span class="t-kw">if</span> !ssl <span class="t-kw">do</span>
println(<span class="t-str">"Ostrzeżenie: brak SSL!"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ MATCH ──────────────────────────────────────────────────────────────── -->
<div class="section" id="match">
<div class="sec-header"><span class="sec-num">08</span><h2>Match — pattern matching</h2></div>
<p>Pattern matching — elegancka alternatywa dla łańcuchów if/elsif. Obsługuje literały, zmienne, wildcard <code>_</code> i guardy <code>if</code>. Ciało: <code>match expr do ... end</code>. Ramiona: <code>wzorzec => expr</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">match.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Match: kody HTTP ──────────────────────────────</span>
<span class="t-kw">let</span> kod: int = <span class="t-num">404</span>
<span class="t-kw">match</span> kod <span class="t-kw">do</span>
<span class="t-num">200</span> => println(<span class="t-str">"OK"</span>)
<span class="t-num">201</span> => println(<span class="t-str">"Created"</span>)
<span class="t-num">400</span> => println(<span class="t-str">"Bad Request"</span>)
<span class="t-num">401</span> => println(<span class="t-str">"Unauthorized"</span>)
<span class="t-num">403</span> => println(<span class="t-str">"Forbidden"</span>)
<span class="t-num">404</span> => println(<span class="t-str">"Not Found"</span>)
<span class="t-num">500</span> => println(<span class="t-str">"Server Error"</span>)
_   => println(<span class="t-str">"Nieznany kod: "</span> + to_string(kod))
<span class="t-kw">end</span>

<span class="t-comment"># ── Match ze stringiem ─────────────────────────────</span>
<span class="t-kw">let</span> env: string = <span class="t-str">"production"</span>
<span class="t-kw">match</span> env <span class="t-kw">do</span>
<span class="t-str">"production"</span>  => println(<span class="t-str">"Środowisko: PROD"</span>)
<span class="t-str">"staging"</span>     => println(<span class="t-str">"Środowisko: STAGING"</span>)
<span class="t-str">"development"</span> => println(<span class="t-str">"Środowisko: DEV"</span>)
_             => println(<span class="t-str">"Nieznane środowisko"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── Match z blokiem wieloliniowym ─────────────────</span>
<span class="t-kw">let</span> port: int = <span class="t-num">22</span>
<span class="t-kw">fn</span> <span class="t-func">get_service</span>(port: int) -> string <span class="t-kw">do</span>
<span class="t-kw">match</span> port <span class="t-kw">do</span>
<span class="t-num">21</span>   => <span class="t-str">"FTP"</span>
<span class="t-num">22</span>   => <span class="t-str">"SSH"</span>
<span class="t-num">80</span>   => <span class="t-str">"HTTP"</span>
<span class="t-num">443</span>  => <span class="t-str">"HTTPS"</span>
<span class="t-num">3306</span> => <span class="t-str">"MySQL"</span>
<span class="t-num">5432</span> => <span class="t-str">"PostgreSQL"</span>
_    => <span class="t-str">"Unknown"</span>
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ WHILE ───────────────────────────────────────────────────────────────── -->
<div class="section" id="while">
<div class="sec-header"><span class="sec-num">09</span><h2>While</h2></div>
<p>Pętla warunkowa. Składnia: <code>while warunek do...end</code>. Obsługuje <code>break</code> i <code>continue</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">while.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Klasyczna pętla licząca ───────────────────────</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> i: int = <span class="t-num">0</span>
<span class="t-kw">while</span> i < <span class="t-num">10</span> <span class="t-kw">do</span>
println(to_string(i))
i += <span class="t-num">1</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Z break ───────────────────────────────────────</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> running: bool = <span class="t-kw">true</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> attempts: int = <span class="t-num">0</span>
<span class="t-kw">while</span> running <span class="t-kw">do</span>
attempts += <span class="t-num">1</span>
<span class="t-kw">if</span> attempts >= <span class="t-num">5</span> <span class="t-kw">do</span>
break
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Nieskończona pętla monitoringu ────────────────</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> alive: bool = <span class="t-kw">true</span>
<span class="t-kw">while</span> alive <span class="t-kw">do</span>
println(<span class="t-str">"monitoruję..."</span>)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ FOR ────────────────────────────────────────────────────────────────── -->
<div class="section" id="for">
<div class="sec-header"><span class="sec-num">10</span><h2>For — pętle i zakresy</h2></div>
<p>Iteracja po zakresach i tablicach. H# obsługuje <code>for var in start..end</code> (wyłączny), <code>start..=end</code> (włączny) oraz <code>for var in array</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">for.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Zakres wyłączny 0..N ──────────────────────────</span>
<span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">0</span>..<span class="t-num">10</span> <span class="t-kw">do</span>
println(to_string(i))  <span class="t-comment"># 0..9</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Zakres włączny 1..=N ──────────────────────────</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> suma: int = <span class="t-num">0</span>
<span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-num">1</span>..=<span class="t-num">5</span> <span class="t-kw">do</span>
suma += i  <span class="t-comment"># 1+2+3+4+5 = 15</span>
<span class="t-kw">end</span>
println(<span class="t-str">"Suma 1..5 = "</span> + to_string(suma))

<span class="t-comment"># ── Iteracja po tablicy ───────────────────────────</span>
<span class="t-kw">let</span> porty: [int] = [<span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>, <span class="t-num">8080</span>]
<span class="t-kw">for</span> port <span class="t-kw">in</span> porty <span class="t-kw">do</span>
println(<span class="t-str">"Port: "</span> + to_string(port))
<span class="t-kw">end</span>

<span class="t-comment"># ── Iteracja po stringu (znaki) ───────────────────</span>
<span class="t-kw">let</span> s: string = <span class="t-str">"hello"</span>
<span class="t-kw">for</span> ch <span class="t-kw">in</span> s <span class="t-kw">do</span>
print(ch)
<span class="t-kw">end</span>

<span class="t-comment"># ── Scan portów 1-1024 ────────────────────────────</span>
<span class="t-kw">for</span> port <span class="t-kw">in</span> <span class="t-num">1</span>..=<span class="t-num">1024</span> <span class="t-kw">do</span>
<span class="t-comment"># skanuj port...</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
