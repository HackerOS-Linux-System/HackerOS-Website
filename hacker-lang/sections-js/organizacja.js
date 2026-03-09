window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['organizacja'] = `
<!-- ─ FUNKCJE ──────────────────────────────────────────────────────────── -->
<div class="section" id="funkcje">
<div class="sec-header"><span class="sec-num">12</span><h2>Funkcje</h2><span class="sec-badge">v2: typy · generics · arena · recur</span></div>
<p>Funkcje definiuje się przez <code>:nazwa def ... done</code>. Argumenty dostępne jako <code>$1</code>, <code>$2</code>... Wywołanie: <code>.nazwa [args]</code>. Sygnatura typów opcjonalna.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">:nazwa def</span></td><td class="td-desc">Prosta funkcja bez sygnatury typów</td></tr>
<tr><td><span class="td-syntax">:nazwa [int str -&gt; bool] def</span></td><td class="td-desc">Funkcja z sygnaturą typów (v2) — sprawdzana przez PLSA</td></tr>
<tr><td><span class="td-syntax">:nazwa [T impl I -&gt; str] def</span></td><td class="td-desc">Funkcja z generic constraint (v2)</td></tr>
<tr><td><span class="td-syntax">::nazwa [512kb] def</span></td><td class="td-desc">Funkcja z arena allocatorem (v2)</td></tr>
<tr><td><span class="td-syntax">done</span></td><td class="td-desc">Koniec definicji funkcji</td></tr>
<tr><td><span class="td-syntax">.nazwa arg1 arg2</span></td><td class="td-desc">Wywołanie z argumentami</td></tr>
<tr><td><span class="td-syntax">recur args</span></td><td class="td-desc">Rekurencja ogonowa (v2) — wywołuje bieżącą funkcję, optymalizowana przez VM</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">funkcje.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Prosta funkcja ──────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">powitaj</span> def
<span class="t-var">$imie</span>=<span class="t-str">"$(1:-Świat)"</span>
<span class="t-prefix">&gt;</span> echo <span class="t-str">"Witaj, $imie!"</span>
done

<span class="t-comment">! ── Z sygnaturą typów (v2) ───────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">sumuj</span> [int int -> int] def
<span class="t-var">$wynik</span> = <span class="t-var">$1</span> + <span class="t-var">$2</span>
<span class="t-kw">out</span> <span class="t-var">$wynik</span>
done

<span class="t-comment">! ── Generic z constraint (v2) ────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">serializuj</span> [T impl Serializable -> str] def
<span class="t-var">$json</span> = await <span class="t-prefix">.</span><span class="t-func">T.to_json</span>
<span class="t-kw">out</span> <span class="t-var">$json</span>
done

<span class="t-comment">! ── Rekurencja ogonowa z recur (v2) ──────────────</span>
<span class="t-kw2">:</span><span class="t-func">silnia</span> [int int -> int] def
<span class="t-op">?</span> <span class="t-str">"$1" -le "1"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">out</span> <span class="t-var">$2</span>
<span class="t-var">$n</span> = <span class="t-var">$1</span> - <span class="t-num">1</span>
<span class="t-var">$acc</span> = <span class="t-var">$1</span> * <span class="t-var">$2</span>
<span class="t-kw">recur</span> <span class="t-var">$n</span> <span class="t-var">$acc</span>
done

<span class="t-comment">! ── Fibonacci z recur ────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">fib</span> [int int int -> int] def
<span class="t-op">?</span> <span class="t-str">"$1" -le "0"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">out</span> <span class="t-var">$2</span>
<span class="t-var">$nxt</span> = <span class="t-var">$2</span> + <span class="t-var">$3</span>
<span class="t-kw">recur</span> <span class="t-str">"$($1 - 1)"</span> <span class="t-var">$3</span> <span class="t-var">$nxt</span>
done

<span class="t-comment">! ── Arena allocator :: (v2) ──────────────────────</span>
<span class="t-kw2">::</span><span class="t-func">przetworz_duzy</span> [1mb] def
<span class="t-var">$dane</span>=<span class="t-str">"$(cat $1)"</span>
<span class="t-prefix">&gt;</span> echo <span class="t-str">"$dane"</span> <span class="t-prefix">|&gt;</span> jq '.[] | .name'
done

<span class="t-comment">! ── Wywołania ────────────────────────────────────</span>
<span class="t-prefix">.</span><span class="t-func">powitaj</span> Anna
<span class="t-var">$s</span> = await <span class="t-prefix">.</span><span class="t-func">sumuj</span> 42 58
<span class="t-kw">log</span> <span class="t-str">"42+58 = $s"</span>
<span class="t-var">$f</span> = await <span class="t-prefix">.</span><span class="t-func">silnia</span> 10 1
<span class="t-kw">log</span> <span class="t-str">"10! = $f"</span>
<span class="t-var">$fib10</span> = await <span class="t-prefix">.</span><span class="t-func">fib</span> 10 0 1
<span class="t-kw">log</span> <span class="t-str">"fib(10) = $fib10"</span></pre></div></div>
</div>
</div>

<!-- ─ KLASY ─────────────────────────────────────────────────────────────── -->
<div class="section" id="klasy">
<div class="sec-header"><span class="sec-num">13</span><h2>Klasy</h2><span class="sec-badge">v2: impl interface</span></div>
<p>Klasy grupują metody. Składnia: <code>;;NazwaKlasy def ... done</code>. Implementacja interfejsu: <code>;;Klasa impl Interfejs def</code>. Wywołanie metody: <code>.Klasa.metoda args</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">klasy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Interfejsy (v2) ──────────────────────────────</span>
<span class="t-op">==</span>interface Serializable [to_json, from_json]
<span class="t-op">==</span>interface Loggable     [log_info, log_error, log_debug]
<span class="t-op">==</span>interface Cacheable    [cache_get, cache_set, cache_del]

<span class="t-comment">! ── Klasa implementująca interfejs ───────────────</span>
<span class="t-kw2">;;</span><span class="t-func">Config</span> impl Serializable def
<span class="t-kw2">:</span><span class="t-func">to_json</span> [-> str] def
<span class="t-var">$j</span>=<span class="t-str">"$(jq -n --arg h "$HOST" --arg p "$PORT" '{host:$h,port:$p}')"</span>
<span class="t-kw">out</span> <span class="t-var">$j</span>
done
<span class="t-kw2">:</span><span class="t-func">from_json</span> [str -> null] def
<span class="t-var">$HOST</span>=<span class="t-str">"$(echo $1 | jq -r '.host')"</span>
<span class="t-var">$PORT</span>=<span class="t-str">"$(echo $1 | jq -r '.port')"</span>
<span class="t-kw">log</span> <span class="t-str">"Załadowano: $HOST:$PORT"</span>
done
done

<span class="t-comment">! ── Klasa Logger z wieloma metodami ──────────────</span>
<span class="t-kw2">;;</span><span class="t-func">Logger</span> impl Loggable def
<span class="t-kw2">:</span><span class="t-func">log_info</span> def
<span class="t-prefix">&gt;</span> echo <span class="t-str">"[INFO  $(date +%H:%M:%S)] $1"</span>
done
<span class="t-kw2">:</span><span class="t-func">log_error</span> def
<span class="t-prefix">&gt;</span> echo <span class="t-str">"[ERROR $(date +%H:%M:%S)] $1"</span> &gt;&amp;2
done
<span class="t-kw2">:</span><span class="t-func">log_debug</span> def
<span class="t-op">?</span> <span class="t-str">"$DEBUG" = "true"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"[DEBUG] $1"</span>
done
done

<span class="t-comment">! ── Wywołania metod ──────────────────────────────</span>
<span class="t-prefix">.</span><span class="t-func">Config.from_json</span> <span class="t-str">'{"host":"prod","port":"443"}'</span>
<span class="t-var">$json</span> = await <span class="t-prefix">.</span><span class="t-func">Config.to_json</span>
<span class="t-kw">log</span> <span class="t-str">"Konfiguracja: $json"</span>
<span class="t-prefix">.</span><span class="t-func">Logger.log_info</span> <span class="t-str">"Aplikacja uruchomiona"</span>
<span class="t-prefix">.</span><span class="t-func">Logger.log_error</span> <span class="t-str">"Połączenie nieudane"</span>
<span class="t-prefix">.</span><span class="t-func">Logger.log_debug</span> <span class="t-str">"Szczegóły: $json"</span></pre></div></div>
</div>
</div>

<!-- ─ TRY / CATCH / ASSERT / DEFER ─────────────────────────────────────── -->
<div class="section" id="try">
<div class="sec-header"><span class="sec-num">14</span><h2>Try / Catch / Assert / Defer</h2><span class="sec-badge">v2</span></div>
<p>Obsługa błędów i walidacja. Trzy mechanizmy: <code>try/catch</code> dla wyjątków, <code>assert</code> dla walidacji w miejscu, <code>?!</code> jako result-unwrap. <code>defer</code> gwarantuje sprzątanie.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">try cmd catch handler</span></td><td class="td-desc">Wykonaj <code>cmd</code>; jeśli błąd — wykonaj <code>handler</code> (komenda lub funkcja)</td></tr>
<tr><td><span class="td-syntax">assert cond "msg"</span></td><td class="td-desc">Przerwij z komunikatem jeśli warunek fałszywy. Działa jak guard clause.</td></tr>
<tr><td><span class="td-syntax">assert cond</span></td><td class="td-desc">Assert bez komunikatu — VM generuje domyślny opis</td></tr>
<tr><td><span class="td-syntax">expr ?! "msg"</span></td><td class="td-desc">Result unwrap (v2) — przerwij z <code>msg</code> jeśli wynik jest błędem</td></tr>
<tr><td><span class="td-syntax">defer expr</span></td><td class="td-desc">Wykonaj <code>expr</code> przy wyjściu ze scope (sukces lub błąd)</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">bledy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Try / Catch ──────────────────────────────────</span>
<span class="t-kw">try</span> curl -sf https://api.example.com/health <span class="t-kw">catch</span> <span class="t-prefix">.</span><span class="t-func">handle_offline</span>
<span class="t-kw">try</span> <span class="t-prefix">.</span><span class="t-func">polacz_z_db</span> <span class="t-kw">catch</span> <span class="t-kw">log</span> <span class="t-str">"DB niedostępna, tryb offline"</span>
<span class="t-kw">try</span> <span class="t-prefix">.</span><span class="t-func">zapisz_dane</span> <span class="t-str">"$payload"</span> <span class="t-kw">catch</span> <span class="t-prefix">.</span><span class="t-func">rollback</span>
<span class="t-kw">try</span> <span class="t-prefix">&gt;</span> git pull origin main <span class="t-kw">catch</span> <span class="t-kw">log</span> <span class="t-str">"Git pull nieudany"</span>

<span class="t-comment">! ── Assert — walidacja w miejscu ─────────────────</span>
<span class="t-kw">assert</span> <span class="t-str">"$HOST" != ""</span>                        <span class="t-str">"HOST nie może być pusty"</span>
<span class="t-kw">assert</span> <span class="t-str">"$PORT" -ge "1" -a "$PORT" -le "65535"</span> <span class="t-str">"Nieprawidłowy port: $PORT"</span>
<span class="t-kw">assert</span> <span class="t-str">-f "$CONFIG_FILE"</span>                     <span class="t-str">"Brak config: $CONFIG_FILE"</span>
<span class="t-kw">assert</span> <span class="t-str">-x "$(which git)"</span>                     <span class="t-str">"git nie jest zainstalowany"</span>
<span class="t-kw">assert</span> <span class="t-str">-d "/var/log"</span>

<span class="t-comment">! ── Result unwrap ?! (v2) ────────────────────────</span>
<span class="t-var">$dane</span>=<span class="t-str">"$(curl -sf $URL)"</span>      ?! <span class="t-str">"Nie można pobrać: $URL"</span>
<span class="t-var">$json</span>=<span class="t-str">"$(cat config.json)"</span>   ?! <span class="t-str">"Brak pliku config.json"</span>
<span class="t-var">$port</span>=<span class="t-str">"$(cat .port)"</span>         ?! <span class="t-str">"Nie można odczytać portu"</span>
<span class="t-var">$token</span>=<span class="t-str">"$(cat /run/secrets/token)"</span> ?! <span class="t-str">"Brak tokenu uwierzytelnienia"</span>

<span class="t-comment">! ── Defer — sprzątanie przy wyjściu ze scope ─────</span>
<span class="t-kw2">:</span><span class="t-func">otwórz_i_przetworz</span> def
<span class="t-var">$fd</span>=<span class="t-str">"$(open_file $1)"</span>       ?! <span class="t-str">"Nie można otworzyć: $1"</span>
<span class="t-kw">defer</span> <span class="t-prefix">.</span><span class="t-func">zamknij_fd</span> <span class="t-var">$fd</span>
<span class="t-comment">! ↑ zamknij_fd wykona się ZAWSZE przy wyjściu</span>

<span class="t-kw">lock</span> <span class="t-var">$zasob</span> = <span class="t-str">"$1"</span>
<span class="t-kw">defer</span> <span class="t-kw">unlock</span> <span class="t-var">$zasob</span>

<span class="t-prefix">&gt;</span> read_all <span class="t-var">$fd</span>
<span class="t-prefix">.</span><span class="t-func">przetworz</span>
done</pre></div></div>
</div>
</div>

<!-- ─ PIPE / DO ──────────────────────────────────────────────────────────── -->
<div class="section" id="pipe">
<div class="sec-header"><span class="sec-num">15</span><h2>Pipe Chain / Do Block</h2><span class="sec-badge">v2</span></div>
<p>Łańcuchy wywołań. Dwa tryby: jednoliniowy <code>.a |&gt; .b |&gt; .c</code> i wieloliniowy przez blok <code>do...done</code> z krokami <code>| .krok</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">pipe-do.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Pipe jednoliniowy ────────────────────────────</span>
<span class="t-prefix">.</span><span class="t-func">pobierz_dane</span> <span class="t-prefix">|&gt;</span> <span class="t-prefix">.</span><span class="t-func">parsuj_json</span> <span class="t-prefix">|&gt;</span> <span class="t-prefix">.</span><span class="t-func">filtruj_aktywne</span>
<span class="t-prefix">.</span><span class="t-func">http.get</span> <span class="t-str">"$API_URL"</span> <span class="t-prefix">|&gt;</span> <span class="t-prefix">.</span><span class="t-func">json.parse</span> <span class="t-prefix">|&gt;</span> <span class="t-prefix">.</span><span class="t-func">zapisz_do_db</span>

<span class="t-comment">! ── Pipe komend systemowych ──────────────────────</span>
<span class="t-prefix">&gt;</span> cat /var/log/nginx/access.log <span class="t-prefix">|&gt;</span> grep <span class="t-str">"404"</span> <span class="t-prefix">|&gt;</span> wc -l
<span class="t-prefix">&gt;</span> ps aux <span class="t-prefix">|&gt;</span> awk <span class="t-str">'{print $2,$11}'</span> <span class="t-prefix">|&gt;</span> sort <span class="t-prefix">|&gt;</span> head -20

<span class="t-comment">! ── Do block = wieloliniowy pipe (v2) ────────────</span>
<span class="t-var">$wynik</span> = do
| <span class="t-prefix">.</span><span class="t-func">pobierz_logi</span> <span class="t-str">"$SERWER"</span>
| <span class="t-prefix">.</span><span class="t-func">filtruj_bledy</span>
| <span class="t-prefix">.</span><span class="t-func">grupuj_po_kodzie</span>
| <span class="t-prefix">.</span><span class="t-func">sortuj_malejaco</span>
| <span class="t-prefix">.</span><span class="t-func">formatuj_raport</span>
done

<span class="t-comment">! ── Do block jako pipeline deploymentu ───────────</span>
<span class="t-var">$deploy</span> = do
| <span class="t-prefix">.</span><span class="t-func">buduj_obraz</span>
| <span class="t-prefix">.</span><span class="t-func">testy_integracyjne</span>
| <span class="t-prefix">.</span><span class="t-func">wypchnij_do_rejestru</span>
| <span class="t-prefix">.</span><span class="t-func">zaktualizuj_k8s</span>
| <span class="t-prefix">.</span><span class="t-func">powiadom_zespol</span>
done

<span class="t-comment">! ── Pipe z lambdą (v2) ───────────────────────────</span>
<span class="t-var">$transformuj</span> = { <span class="t-var">$x</span> -> <span class="t-str">"$(echo $x | tr '[:lower:]' '[:upper:]')"</span> }
<span class="t-prefix">.</span><span class="t-func">pobierz_nazwy</span> <span class="t-prefix">|&gt;</span> <span class="t-prefix">.</span><span class="t-func">mapa</span> <span class="t-var">$transformuj</span> <span class="t-prefix">|&gt;</span> <span class="t-prefix">.</span><span class="t-func">zapisz</span></pre></div></div>
</div>
<div class="callout c-info"><div class="ci">ℹ</div><div class="cb"><strong>Do block vs pipe:</strong> <code>do...done</code> to wieloliniowa wersja potoku z krokami <code>| .krok</code>. Wynik całego bloku jest przypisywany do zmiennej. Idealne dla złożonych pipeline'ów CI/CD.</div></div>
</div>
`;
