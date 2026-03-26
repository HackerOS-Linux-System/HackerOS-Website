window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['async'] = `
<!-- ─ SPAWN / AWAIT ──────────────────────────────────────────────────────── -->
<div class="section" id="spawn">
<div class="sec-header"><span class="sec-num">16</span><h2>Spawn / Await</h2><span class="sec-badge">v2</span></div>
<p>Asynchroniczne zadania. <code>spawn</code> uruchamia zadanie w tle i zwraca handle. <code>await</code> czeka na wynik. Umożliwia równoległe wykonanie wielu operacji i zbieranie wyników.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">spawn komenda</span></td><td class="td-desc">Uruchom asynchronicznie, nie czekaj — fire and forget</td></tr>
<tr><td><span class="td-syntax">$h = spawn komenda</span></td><td class="td-desc">Uruchom i zapisz handle do zmiennej — można later <code>await</code></td></tr>
<tr><td><span class="td-syntax">await komenda</span></td><td class="td-desc">Uruchom synchronicznie i czekaj na zakończenie</td></tr>
<tr><td><span class="td-syntax">$x = await komenda</span></td><td class="td-desc">Uruchom, czekaj i zapisz wynik do zmiennej</td></tr>
<tr><td><span class="td-syntax">$x = await $handle</span></td><td class="td-desc">Czekaj na wcześniej odpalony spawn — zbierz wynik</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">async.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Spawn fire-and-forget ────────────────────────</span>
<span class="t-kw">spawn</span> <span class="t-prefix">.</span><span class="t-func">wyslij_powiadomienie</span> <span class="t-str">"Deploy zakończony"</span>
<span class="t-kw">spawn</span> <span class="t-prefix">.</span><span class="t-func">zrob_backup</span>

<span class="t-comment">! ── Spawn równoległy z handle + await ────────────</span>
<span class="t-var">$h1</span> = spawn <span class="t-prefix">.</span><span class="t-func">buduj_frontend</span>
<span class="t-var">$h2</span> = spawn <span class="t-prefix">.</span><span class="t-func">buduj_backend</span>
<span class="t-var">$h3</span> = spawn <span class="t-prefix">.</span><span class="t-func">buduj_docs</span>
<span class="t-var">$h4</span> = spawn <span class="t-prefix">.</span><span class="t-func">uruchom_testy</span>

<span class="t-comment">! ── Zbierz wyniki wszystkich (równolegle!) ────────</span>
<span class="t-var">$fe</span>   = await <span class="t-var">$h1</span>
<span class="t-var">$be</span>   = await <span class="t-var">$h2</span>
<span class="t-var">$docs</span> = await <span class="t-var">$h3</span>
<span class="t-var">$test</span> = await <span class="t-var">$h4</span>
<span class="t-kw">log</span> <span class="t-str">"fe=$fe be=$be docs=$docs test=$test"</span>

<span class="t-comment">! ── Await bezpośrednio (sekwencyjne) ─────────────</span>
<span class="t-var">$dane</span>  = await <span class="t-prefix">.</span><span class="t-func">http.get</span> <span class="t-str">"$API/users"</span>
<span class="t-var">$users</span> = await <span class="t-prefix">.</span><span class="t-func">json.parse</span> <span class="t-var">$dane</span>
<span class="t-kw">log</span> <span class="t-str">"Załadowano: $(echo $users | jq length) userów"</span>

<span class="t-comment">! ── Równoległe testy w funkcji ───────────────────</span>
<span class="t-kw2">:</span><span class="t-func">testy_rownolegle</span> def
<span class="t-var">$unit</span>  = spawn <span class="t-prefix">.</span><span class="t-func">testy_jednostkowe</span>
<span class="t-var">$integ</span> = spawn <span class="t-prefix">.</span><span class="t-func">testy_integracyjne</span>
<span class="t-var">$e2e</span>   = spawn <span class="t-prefix">.</span><span class="t-func">testy_e2e</span>
<span class="t-var">$perf</span>  = spawn <span class="t-prefix">.</span><span class="t-func">testy_wydajnosci</span>

<span class="t-var">$ru</span> = await <span class="t-var">$unit</span>
<span class="t-var">$ri</span> = await <span class="t-var">$integ</span>
<span class="t-var">$re</span> = await <span class="t-var">$e2e</span>
<span class="t-var">$rp</span> = await <span class="t-var">$perf</span>

<span class="t-kw">assert</span> <span class="t-str">"$ru" = "0"</span> <span class="t-str">"Testy jednostkowe nieudane"</span>
<span class="t-kw">assert</span> <span class="t-str">"$ri" = "0"</span> <span class="t-str">"Testy integracyjne nieudane"</span>
<span class="t-kw">log</span> <span class="t-str">"Wszystkie testy OK"</span>
done

<span class="t-comment">! ── Background vs spawn ──────────────────────────</span>
<span class="t-kw2">&amp;</span> <span class="t-prefix">.</span><span class="t-func">monitoruj_metryki</span>   <span class="t-comment">! brak synchronizacji</span>
<span class="t-var">$mon</span> = spawn <span class="t-prefix">.</span><span class="t-func">monitoruj</span> <span class="t-comment">! można await $mon</span></pre></div></div>
</div>
<div class="callout c-info"><div class="ci">ℹ</div><div class="cb"><strong>Spawn vs &amp;:</strong> <code>spawn</code> zwraca handle który można <code>await</code>-ować i synchronizować. <code>&amp;</code> uruchamia w tle bez możliwości czekania na wynik — fire and forget.</div></div>
</div>
`;
