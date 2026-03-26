window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['sterowanie'] = `
<!-- ─ IF / ELIF / ELSE ──────────────────────────────────────────────────── -->
<div class="section" id="if">
<div class="sec-header"><span class="sec-num">07</span><h2>If / Elif / Else</h2></div>
<p>Warunki jednoliniowe. Warunek to dowolne wyrażenie bash: test, <code>[ ]</code>, porównania stringów, testy pliku (<code>-f</code>, <code>-d</code>).</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Prefiks</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">? warunek &gt; cmd</span></td><td><code>?</code></td><td class="td-desc">If — wykonaj <code>cmd</code> gdy warunek prawdziwy</td></tr>
<tr><td><span class="td-syntax">? warunek |&gt; cmd</span></td><td><code>?</code></td><td class="td-desc">If z pipe — wynik poprzedniej komendy podany jako stdin</td></tr>
<tr><td><span class="td-syntax">?? warunek &gt; cmd</span></td><td><code>??</code></td><td class="td-desc">Elif — dodatkowa gałąź</td></tr>
<tr><td><span class="td-syntax">?: &gt; cmd</span></td><td><code>?:</code></td><td class="td-desc">Else — gałąź domyślna gdy żaden if/elif nie trafił</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">warunki.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span></div>
<div class="code-inner"><pre><span class="t-var">$cpu</span>=<span class="t-str">"75"</span>
<span class="t-var">$os</span>=<span class="t-str">"linux"</span>
<span class="t-var">$plik</span>=<span class="t-str">"/etc/config"</span>

<span class="t-comment">! ── Prosta gałąź ─────────────────────────────────</span>
<span class="t-op">?</span> <span class="t-str">"$os" = "linux"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"System: Linux"</span>

<span class="t-comment">! ── Łańcuch if / elif / else ─────────────────────</span>
<span class="t-op">?</span>  <span class="t-str">"$cpu" -gt "90"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"KRYTYCZNY! CPU=$cpu%"</span>
<span class="t-op">??</span> <span class="t-str">"$cpu" -gt "70"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Wysoki CPU=$cpu%"</span>
<span class="t-op">??</span> <span class="t-str">"$cpu" -gt "50"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Umiarkowany CPU=$cpu%"</span>
<span class="t-op">?:</span>               <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"CPU OK"</span>

<span class="t-comment">! ── Testy pliku ──────────────────────────────────</span>
<span class="t-op">?</span>  <span class="t-str">-f "$plik"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Plik istnieje"</span>
<span class="t-op">??</span> <span class="t-str">-d "$plik"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"To jest katalog"</span>
<span class="t-op">?:</span>           <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Nie znaleziono: $plik"</span>

<span class="t-comment">! ── If z wywołaniem funkcji ──────────────────────</span>
<span class="t-op">?</span> <span class="t-str">"$DEBUG" = "true"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">tryb_debug</span>
<span class="t-op">?</span> <span class="t-str">"$ENV" = "prod"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">zaladuj_prod_config</span>

<span class="t-comment">! ── If z pipe ────────────────────────────────────</span>
<span class="t-op">?</span> <span class="t-str">-z "$(systemctl is-active nginx)"</span> <span class="t-prefix">|&gt;</span> systemctl start nginx

<span class="t-comment">! ── If z sudo ────────────────────────────────────</span>
<span class="t-op">?</span> <span class="t-str">"$NEEDS_RESTART" = "true"</span> <span class="t-prefix">&gt;</span> <span class="t-op">^</span><span class="t-prefix">&gt;</span> systemctl restart app</pre></div></div>
</div>
</div>

<!-- ─ MATCH ──────────────────────────────────────────────────────────────── -->
<div class="section" id="match">
<div class="sec-header"><span class="sec-num">08</span><h2>Match / Case</h2><span class="sec-badge">v2</span></div>
<p>Pattern matching — elegancka alternatywa dla łańcuchów if/elif. Obsługuje wartości literalne, zmienne i wildcard <code>_</code>. Nagłówek: <code>match $x |&gt;</code> lub <code>match $x &gt;</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">match.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Match: kody HTTP ─────────────────────────────</span>
<span class="t-var">$kod</span>=<span class="t-str">"404"</span>
<span class="t-kw">match</span> <span class="t-var">$kod</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"200"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"✓ OK"</span>
<span class="t-str">"201"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"✓ Created"</span>
<span class="t-str">"204"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"✓ No Content"</span>
<span class="t-str">"400"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">handle_bad_request</span>
<span class="t-str">"401"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">handle_unauthorized</span>
<span class="t-str">"403"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">handle_forbidden</span>
<span class="t-str">"404"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"✗ Not Found"</span>
<span class="t-str">"429"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">handle_rate_limit</span>
<span class="t-str">"500"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">handle_server_error</span>
_      <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"? Nieznany kod: $kod"</span>

<span class="t-comment">! ── Match: środowisko → akcja ─────────────────────</span>
<span class="t-kw">match</span> <span class="t-var">$ENV</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"production"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> systemctl reload nginx
<span class="t-str">"staging"</span>     <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Staging — pominięto reload"</span>
<span class="t-str">"development"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">dev_setup</span>
_             <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Nieznane środowisko: $ENV"</span>

<span class="t-comment">! ── Match z sygnałami Unix ────────────────────────</span>
<span class="t-kw">match</span> <span class="t-var">$sygnal</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"SIGTERM"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">graceful_shutdown</span>
<span class="t-str">"SIGKILL"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">force_kill</span>
<span class="t-str">"SIGHUP"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">reload_config</span>
<span class="t-str">"SIGUSR1"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">dump_stats</span>
_         <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Sygnał: $sygnal"</span></pre></div></div>
</div>
</div>

<!-- ─ PĘTLA N RAZY ──────────────────────────────────────────────────────── -->
<div class="section" id="loop">
<div class="sec-header"><span class="sec-num">09</span><h2>Pętla N razy</h2></div>
<p>Wykonaj komendę dokładnie N razy. Składnia: <code>= N prefix komenda</code>. Prefiks może być <code>&gt;</code>, <code>|&gt;</code> lub <code>&lt;|</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">loop-n.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! ── Prosta pętla N razy ──────────────────────────</span>
<span class="t-op">=</span> <span class="t-num">5</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"Próba połączenia..."</span>
<span class="t-op">=</span> <span class="t-num">3</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">ping_serwer</span>
<span class="t-op">=</span> <span class="t-num">10</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">zbierz_metryki</span>

<span class="t-comment">! ── Z pipe ───────────────────────────────────────</span>
<span class="t-op">=</span> <span class="t-num">5</span> <span class="t-prefix">|&gt;</span> curl -s https://api.example.com/health</pre></div></div>
</div>
</div>

<!-- ─ WHILE ───────────────────────────────────────────────────────────────── -->
<div class="section" id="while">
<div class="sec-header"><span class="sec-num">10</span><h2>While</h2></div>
<p>Pętla warunkowa — wykonuje komendę dopóki warunek jest prawdziwy. Składnia: <code>while warunek &gt; cmd</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">while.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-var">$i</span>=<span class="t-str">"0"</span>
<span class="t-var">$max</span>=<span class="t-str">"10"</span>

<span class="t-comment">! ── Klasyczna pętla licząca ──────────────────────</span>
<span class="t-kw">while</span> <span class="t-str">"$i" -lt "$max"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"Iteracja $i"</span>

<span class="t-comment">! ── Czekaj na serwis ─────────────────────────────</span>
<span class="t-kw">while</span> <span class="t-str">! systemctl is-active --quiet redis</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> sleep 2
<span class="t-kw">log</span> <span class="t-str">"Redis gotowy"</span>

<span class="t-comment">! ── Czekaj na port ───────────────────────────────</span>
<span class="t-kw">while</span> <span class="t-str">! nc -z localhost 5432</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> sleep 1
<span class="t-kw">log</span> <span class="t-str">"PostgreSQL gotowy"</span>

<span class="t-comment">! ── Pętla monitorująca ───────────────────────────</span>
<span class="t-kw">while</span> <span class="t-str">"$RUNNING" = "true"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">sprawdz_zdrowie</span></pre></div></div>
</div>
</div>

<!-- ─ FOR ────────────────────────────────────────────────────────────────── -->
<div class="section" id="for">
<div class="sec-header"><span class="sec-num">11</span><h2>For</h2></div>
<p>Iteracja po liście wartości. Składnia: <code>for zmienna in lista &gt; komenda</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">for.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Iteracja po liście ───────────────────────────</span>
<span class="t-kw">for</span> serwis <span class="t-kw">in</span> nginx redis postgres grafana <span class="t-prefix">&gt;</span> systemctl status <span class="t-var">$serwis</span>

<span class="t-comment">! ── Iteracja po środowiskach ─────────────────────</span>
<span class="t-kw">for</span> env <span class="t-kw">in</span> dev staging prod <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">deploy</span> <span class="t-var">$env</span>

<span class="t-comment">! ── Iteracja po plikach ──────────────────────────</span>
<span class="t-kw">for</span> plik <span class="t-kw">in</span> <span class="t-str">"$(ls /var/log/*.log)"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">analizuj_log</span> <span class="t-var">$plik</span>

<span class="t-comment">! ── Iteracja po portach ──────────────────────────</span>
<span class="t-kw">for</span> port <span class="t-kw">in</span> 80 443 8080 8443 <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> nc -z localhost <span class="t-var">$port</span> &amp;&amp; echo <span class="t-str">"✓ $port"</span>

<span class="t-comment">! ── Iteracja po hostach z pliku ──────────────────</span>
<span class="t-kw">for</span> host <span class="t-kw">in</span> <span class="t-str">"$(cat hosts.txt)"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">sprawdz_host</span> <span class="t-var">$host</span>

<span class="t-comment">! ── Zakres bash ──────────────────────────────────</span>
<span class="t-kw">for</span> i <span class="t-kw">in</span> <span class="t-str">"{1..10}"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"Krok $i"</span>

<span class="t-comment">! ── For z wywołaniem funkcji i zmienną ───────────</span>
<span class="t-kw">for</span> item <span class="t-kw">in</span> <span class="t-var">$lista</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">przetworz</span> <span class="t-var">$item</span></pre></div></div>
</div>
</div>
`;
