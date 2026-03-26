window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['przyklady'] = `
<!-- ─ EX1: Hello World ──────────────────────────────────────────────────── -->
<div class="section" id="ex1">
<div class="sec-header"><span class="sec-num">EX-1</span><h2>Hello World</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">hello.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span></div>
<div class="code-inner"><pre><span class="t-comment">! Klasyczne hello world z funkcją i stałą</span>
<span class="t-var">@PROGRAM</span>=<span class="t-str">"hello"</span>
<span class="t-const">%</span>WERSJA=<span class="t-str">"1.0.0"</span>

<span class="t-kw2">:</span><span class="t-func">powitaj</span> [str -> null] def
<span class="t-var">$imie</span>=<span class="t-str">"$(1:-Świat)"</span>
<span class="t-kw">log</span> <span class="t-str">"Witaj, $imie! ($PROGRAM v$WERSJA)"</span>
<span class="t-prefix">&gt;</span> echo <span class="t-str">"Czas: $(date +%H:%M:%S)"</span>
done

<span class="t-prefix">.</span><span class="t-func">powitaj</span> HackerOS
<span class="t-kw">end</span> 0</pre></div></div>
</div>
</div>

<!-- ─ EX2: REST API ──────────────────────────────────────────────────────── -->
<div class="section" id="ex2">
<div class="sec-header"><span class="sec-num">EX-2</span><h2>Klient REST API</h2><span class="sec-badge">http · json · assert · ?!</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">api-client.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span><span>49</span><span>50</span></div>
<div class="code-inner"><pre><span class="t-var">@PROGRAM</span>=<span class="t-str">"api-client"</span>
<span class="t-const">%</span>BASE_URL=<span class="t-str">"https://api.github.com"</span>
<span class="t-const">%</span>TIMEOUT=<span class="t-str">"10"</span>

<span class="t-lib">#&lt;core/http:1.3&gt;</span>
<span class="t-lib">#&lt;core/json:1.0&gt;</span>
<span class="t-kw2">//</span> curl jq

<span class="t-kw">struct</span> Repo [id: int, name: str, stars: int, lang: str]

<span class="t-comment">! ── Pobranie i parsowanie repozytorium ───────────</span>
<span class="t-kw2">:</span><span class="t-func">pobierz_repo</span> [str -> map] def
<span class="t-var">$user</span>=<span class="t-str">"$1"</span>
<span class="t-kw">assert</span> <span class="t-str">"$user" != ""</span> <span class="t-str">"Nazwa użytkownika wymagana"</span>

<span class="t-var">$url</span>=<span class="t-str">"$BASE_URL/users/$user/repos?per_page=5"</span>
<span class="t-var">$resp</span>=<span class="t-str">"$(curl -sf --max-time $TIMEOUT $url)"</span>
<span class="t-var">$resp</span> ?! <span class="t-str">"Nie można pobrać danych dla: $user"</span>

<span class="t-var">$count</span>=<span class="t-str">"$(echo $resp | jq length)"</span>
<span class="t-kw">log</span> <span class="t-str">"Pobrano $count repozytoriów dla: $user"</span>
<span class="t-kw">out</span> <span class="t-var">$resp</span>
done

<span class="t-comment">! ── Analiza repo: top gwiazdki ────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">top_repo</span> [str -> null] def
<span class="t-var">$repos</span> = await <span class="t-prefix">.</span><span class="t-func">pobierz_repo</span> <span class="t-var">$1</span>
<span class="t-var">$top</span>=<span class="t-str">"$(echo $repos | jq -r 'max_by(.stargazers_count) | .name')"</span>
<span class="t-var">$stars</span>=<span class="t-str">"$(echo $repos | jq -r 'max_by(.stargazers_count) | .stargazers_count')"</span>
<span class="t-kw">log</span> <span class="t-str">"★ Top repo: $top ($stars gwiazdek)"</span>
done

<span class="t-comment">! ── Równoległe pobranie kilku userów ─────────────</span>
<span class="t-var">$h1</span> = spawn <span class="t-prefix">.</span><span class="t-func">top_repo</span> <span class="t-str">"torvalds"</span>
<span class="t-var">$h2</span> = spawn <span class="t-prefix">.</span><span class="t-func">top_repo</span> <span class="t-str">"antirez"</span>
<span class="t-var">$h3</span> = spawn <span class="t-prefix">.</span><span class="t-func">top_repo</span> <span class="t-str">"gvanrossum"</span>

<span class="t-kw">log</span> <span class="t-str">"Pobieranie równoległe..."</span>
<span class="t-var">$r1</span> = await <span class="t-var">$h1</span>
<span class="t-var">$r2</span> = await <span class="t-var">$h2</span>
<span class="t-var">$r3</span> = await <span class="t-var">$h3</span>
<span class="t-kw">log</span> <span class="t-str">"Gotowe: $r1 $r2 $r3"</span>
<span class="t-kw">end</span> 0</pre></div></div>
</div>
</div>

<!-- ─ EX3: Deploy Pipeline ──────────────────────────────────────────────── -->
<div class="section" id="ex3">
<div class="sec-header"><span class="sec-num">EX-3</span><h2>Pipeline CI/CD</h2><span class="sec-badge">spawn · do-block · match · struct · lock</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">deploy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span><span>49</span><span>50</span><span>51</span><span>52</span><span>53</span><span>54</span><span>55</span><span>56</span><span>57</span><span>58</span><span>59</span><span>60</span></div>
<div class="code-inner"><pre><span class="t-var">@PROGRAM</span>=<span class="t-str">"deploy-pipeline"</span>
<span class="t-var">@ENV</span>=<span class="t-str">"production"</span>
<span class="t-const">%</span>REGISTRY=<span class="t-str">"registry.example.com"</span>
<span class="t-const">%</span>NAMESPACE=<span class="t-str">"app-prod"</span>

<span class="t-lib">#&lt;core/http:1.3&gt;</span>
<span class="t-kw2">//</span> docker kubectl git

<span class="t-kw">struct</span> DeployInfo [image: str, tag: str, env: str, author: str]
<span class="t-op">==</span> DeployStatus [queued, building, testing, deploying, done, failed]

<span class="t-comment">! ── Budowanie obrazu Docker ───────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">buduj</span> [str str -> str] def
<span class="t-var">$image</span>=<span class="t-str">"$1"</span>
<span class="t-var">$tag</span>=<span class="t-str">"$2"</span>
<span class="t-kw">log</span> <span class="t-str">"🔨 Buduję: $image:$tag"</span>
<span class="t-prefix">&gt;</span> docker build -t <span class="t-str">"$REGISTRY/$image:$tag"</span> .
<span class="t-var">$ret</span>=<span class="t-str">"$?"</span>
<span class="t-kw">assert</span> <span class="t-str">"$ret" = "0"</span> <span class="t-str">"Build nieudany: $image:$tag"</span>
<span class="t-kw">out</span> <span class="t-str">"$REGISTRY/$image:$tag"</span>
done

<span class="t-comment">! ── Testy równoległe ─────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">testy</span> def
<span class="t-var">$unit</span> = spawn <span class="t-prefix">&gt;</span> docker run --rm app ./run-unit-tests.sh
<span class="t-var">$int</span>  = spawn <span class="t-prefix">&gt;</span> docker run --rm app ./run-integration.sh
<span class="t-var">$e2e</span>  = spawn <span class="t-prefix">&gt;</span> docker run --rm app ./run-e2e.sh
<span class="t-kw">log</span> <span class="t-str">"⚙ Testy równoległe..."</span>
<span class="t-var">$u</span> = await <span class="t-var">$unit</span>
<span class="t-var">$i</span> = await <span class="t-var">$int</span>
<span class="t-var">$e</span> = await <span class="t-var">$e2e</span>
<span class="t-kw">assert</span> <span class="t-str">"$u" = "0"</span> <span class="t-str">"Testy jednostkowe NIE PRZESZŁY"</span>
<span class="t-kw">assert</span> <span class="t-str">"$i" = "0"</span> <span class="t-str">"Testy integracyjne NIE PRZESZŁY"</span>
<span class="t-kw">assert</span> <span class="t-str">"$e" = "0"</span> <span class="t-str">"Testy E2E NIE PRZESZŁY"</span>
<span class="t-kw">log</span> <span class="t-str">"✓ Wszystkie testy OK"</span>
done

<span class="t-comment">! ── Deploy do K8s ────────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">deploy_k8s</span> [str -> null] def
<span class="t-var">$obraz</span>=<span class="t-str">"$1"</span>
<span class="t-kw">lock</span> <span class="t-var">$k8s_cluster</span> = <span class="t-str">"$NAMESPACE"</span>
<span class="t-kw">defer</span> <span class="t-kw">unlock</span> <span class="t-var">$k8s_cluster</span>
<span class="t-prefix">&gt;</span> kubectl set image deployment/app app=<span class="t-var">$obraz</span> -n <span class="t-var">$NAMESPACE</span>
<span class="t-prefix">&gt;</span> kubectl rollout status deployment/app -n <span class="t-var">$NAMESPACE</span>
<span class="t-kw">log</span> <span class="t-str">"✓ Deploy: $obraz → $NAMESPACE"</span>
done

<span class="t-comment">! ── Główny pipeline (do-block) ───────────────────</span>
<span class="t-var">$tag</span>=<span class="t-str">"$(git rev-parse --short HEAD)"</span>
<span class="t-var">$status</span> = do
| <span class="t-prefix">.</span><span class="t-func">buduj</span> <span class="t-str">"myapp"</span> <span class="t-var">$tag</span>
| <span class="t-prefix">.</span><span class="t-func">testy</span>
| <span class="t-prefix">.</span><span class="t-func">deploy_k8s</span>
done

<span class="t-kw">match</span> <span class="t-var">$status</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"0"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"🚀 Deploy OK: $tag"</span>
_    <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"✗ Deploy FAILED: $tag"</span>
<span class="t-kw">end</span> <span class="t-var">$status</span></pre></div></div>
</div>
</div>

<!-- ─ EX4: ADT + WebSocket ──────────────────────────────────────────────── -->
<div class="section" id="ex4">
<div class="sec-header"><span class="sec-num">EX-4</span><h2>WebSocket z ADT</h2><span class="sec-badge">==type · ==interface · impl · match · async</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">websocket.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span></div>
<div class="code-inner"><pre><span class="t-var">@PROGRAM</span>=<span class="t-str">"ws-server"</span>
<span class="t-const">%</span>WS_PORT=<span class="t-str">"8765"</span>

<span class="t-lib">#&lt;core/http:1.3&gt;</span>
<span class="t-lib">#&lt;core/json:1.0&gt;</span>

<span class="t-comment">! ── ADT: typy wiadomości WebSocket ───────────────</span>
<span class="t-op">==</span>type WsMsg [
    Tekst   [payload: str],
Binarny [dane: str, dlugosc: int],
Ping,
Pong,
Zamknij [kod: int, powod: str]
]

<span class="t-comment">! ── Interfejs handlera ───────────────────────────</span>
<span class="t-op">==</span>interface WsHandler [on_open, on_msg, on_close, on_error]

<span class="t-comment">! ── Implementacja handlera ────────────────────────</span>
<span class="t-kw2">;;</span><span class="t-func">ChatHandler</span> impl WsHandler def
<span class="t-kw2">:</span><span class="t-func">on_open</span> def
<span class="t-kw">log</span> <span class="t-str">"🔌 Połączono: $1"</span>
done
<span class="t-kw2">:</span><span class="t-func">on_msg</span> def
<span class="t-var">$msg</span>=<span class="t-str">"$1"</span>
<span class="t-kw">match</span> <span class="t-var">$msg.type</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"Tekst"</span>   <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">handle_text</span> <span class="t-str">"$(msg.payload)"</span>
<span class="t-str">"Ping"</span>    <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">ws.send</span> <span class="t-str">"Pong"</span>
<span class="t-str">"Zamknij"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">zamknij</span> <span class="t-str">"$(msg.kod)"</span>
_         <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"? Nieznany typ: $(msg.type)"</span>
done
<span class="t-kw2">:</span><span class="t-func">on_close</span> def
<span class="t-kw">log</span> <span class="t-str">"🔴 Rozłączono: $1"</span>
done
<span class="t-kw2">:</span><span class="t-func">on_error</span> def
<span class="t-kw">log</span> <span class="t-str">"✗ Błąd WS: $1"</span>
done
done

<span class="t-comment">! ── Uruchomienie serwera ─────────────────────────</span>
<span class="t-kw">assert</span> <span class="t-str">-x "$(which websocat)"</span> <span class="t-str">"websocat nie jest zainstalowany"</span>
<span class="t-var">$srv</span> = spawn <span class="t-prefix">.</span><span class="t-func">ws.listen</span> <span class="t-var">$WS_PORT</span> ChatHandler
<span class="t-kw">log</span> <span class="t-str">"WebSocket nasłuchuje na :$WS_PORT"</span>
<span class="t-var">$code</span> = await <span class="t-var">$srv</span>
<span class="t-kw">end</span> <span class="t-var">$code</span></pre></div></div>
</div>
</div>

<!-- ─ EX5: Monitor systemu ──────────────────────────────────────────────── -->
<div class="section" id="ex5">
<div class="sec-header"><span class="sec-num">EX-5</span><h2>Monitor systemu</h2><span class="sec-badge">struct · while · destrukt · generics</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">monitor.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span></div>
<div class="code-inner"><pre><span class="t-var">@PROGRAM</span>=<span class="t-str">"sysmon"</span>
<span class="t-const">%</span>INTERVAL=<span class="t-str">"5"</span>
<span class="t-const">%</span>CPU_THRESH=<span class="t-str">"80"</span>
<span class="t-const">%</span>MEM_THRESH=<span class="t-str">"85"</span>
<span class="t-const">%</span>DISK_THRESH=<span class="t-str">"90"</span>

<span class="t-lib">#&lt;core/http:1.3&gt;</span>
<span class="t-kw2">//</span> vmstat free df awk sed

<span class="t-kw">struct</span> Metryki [cpu: float, mem: float, disk: float, ts: int]
<span class="t-op">==</span> AlertLevel [ok, warn, critical]
<span class="t-op">==</span>interface Alertable [wyslij_alert, wyslij_raport]

<span class="t-comment">! ── Zbieranie metryk ─────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">zbierz_metryki</span> [-> map] def
<span class="t-var">$cpu</span>=<span class="t-str">"$(vmstat 1 2 | tail -1 | awk '{print 100-$15}')"</span>
<span class="t-var">$mem</span>=<span class="t-str">"$(free | grep Mem | awk '{printf "%.0f", $3/$2*100}')"</span>
<span class="t-var">$dsk</span>=<span class="t-str">"$(df / | tail -1 | awk '{print $5}' | tr -d %)"</span>
<span class="t-var">$ts</span>=<span class="t-str">"$(date +%s)"</span>
<span class="t-kw">out</span> {cpu: <span class="t-str">"$cpu"</span>, mem: <span class="t-str">"$mem"</span>, disk: <span class="t-str">"$dsk"</span>, ts: <span class="t-str">"$ts"</span>}
done

<span class="t-comment">! ── Analiza i alerty ──────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">analizuj</span> [map -> null] def
{cpu, mem, disk} = <span class="t-var">$1</span>
<span class="t-op">?</span>  <span class="t-str">"$cpu" -ge "$CPU_THRESH"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">alert</span> <span class="t-str">"critical"</span> <span class="t-str">"CPU: $cpu%"</span>
<span class="t-op">?</span>  <span class="t-str">"$mem" -ge "$MEM_THRESH"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">alert</span> <span class="t-str">"critical"</span> <span class="t-str">"MEM: $mem%"</span>
<span class="t-op">?</span>  <span class="t-str">"$disk" -ge "$DISK_THRESH"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">alert</span> <span class="t-str">"critical"</span> <span class="t-str">"DISK: $disk%"</span>
<span class="t-kw">log</span> <span class="t-str">"📊 CPU=$cpu% MEM=$mem% DISK=$disk%"</span>
done

<span class="t-comment">! ── Alert przez Slack/HTTP ────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">alert</span> [str str -> null] def
<span class="t-var">$level</span>=<span class="t-str">"$1"</span>
<span class="t-var">$msg</span>=<span class="t-str">"$2"</span>
<span class="t-kw">log</span> <span class="t-str">"⚠ ALERT[$level]: $msg"</span>
<span class="t-var">$payload</span>=<span class="t-str">'{"text":"['"$level"'] '"$msg"'"}'</span>
<span class="t-var">$h</span> = spawn <span class="t-prefix">.</span><span class="t-func">http.post</span> <span class="t-str">"$SLACK_WEBHOOK"</span> <span class="t-var">$payload</span>
done

<span class="t-comment">! ── Główna pętla monitoringu ──────────────────────</span>
<span class="t-kw">log</span> <span class="t-str">"🚀 Sysmon uruchomiony (interval=\${INTERVAL}s)"</span>
<span class="t-var">$RUNNING</span>=<span class="t-str">"true"</span>
<span class="t-kw">while</span> <span class="t-str">"$RUNNING" = "true"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">analizuj</span> <span class="t-str">"$(await .zbierz_metryki)"</span>
<span class="t-kw">while</span> <span class="t-str">"$RUNNING" = "true"</span> <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> sleep <span class="t-var">$INTERVAL</span></pre></div></div>
</div>
</div>

<!-- ─ EX6: Funkcjonalny procesor danych ─────────────────────────────────── -->
<div class="section" id="ex6">
<div class="sec-header"><span class="sec-num">EX-6</span><h2>Procesor danych (styl funkcyjny)</h2><span class="sec-badge">lambda · destruct · recur · arena · pipe</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">procesor.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span></div>
<div class="code-inner"><pre><span class="t-var">@PROGRAM</span>=<span class="t-str">"procesor"</span>
<span class="t-lib">#&lt;core/json:1.0&gt;</span>
<span class="t-lib">#&lt;core/fs:1.0&gt;</span>

<span class="t-comment">! ── Lambdy przetwarzające ─────────────────────────</span>
<span class="t-var">$parsuj</span>      = { <span class="t-var">$s</span> -> <span class="t-str">"$(echo $s | jq .)"</span> }
<span class="t-var">$filtruj</span>     = { <span class="t-var">$j</span> -> <span class="t-str">"$(echo $j | jq '[.[] | select(.active == true)]')"</span> }
<span class="t-var">$mapuj_nazwy</span> = { <span class="t-var">$j</span> -> <span class="t-str">"$(echo $j | jq '[.[] | .name]')"</span> }
<span class="t-var">$sortuj</span>      = { <span class="t-var">$j</span> -> <span class="t-str">"$(echo $j | jq 'sort')"</span> }
<span class="t-var">$upper_all</span>   = { <span class="t-var">$j</span> -> <span class="t-str">"$(echo $j | jq '[.[] | ascii_upcase]')"</span> }

<span class="t-comment">! ── Rekurencyjne przetwarzanie listy ─────────────</span>
<span class="t-kw2">:</span><span class="t-func">przetworz_liste</span> [list -> null] def
<span class="t-op">?</span> <span class="t-str">"$#" -eq "0"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">out</span>
[glowa | ogon] = <span class="t-var">$@</span>
{name, email, role} = <span class="t-var">$glowa</span>
<span class="t-kw">log</span> <span class="t-str">"→ $name ($role) $email"</span>
<span class="t-kw">recur</span> <span class="t-var">$ogon</span>
done

<span class="t-comment">! ── Arena allocator dla dużych plików ────────────</span>
<span class="t-kw2">::</span><span class="t-func">przetworz_duzy_plik</span> [256mb] def
<span class="t-var">$sciezka</span>=<span class="t-str">"$1"</span>
<span class="t-kw">assert</span> <span class="t-str">-f "$sciezka"</span> <span class="t-str">"Plik nie istnieje"</span>
<span class="t-var">$dane</span>=<span class="t-str">"$(cat $sciezka)"</span> ?! <span class="t-str">"Nie można odczytać pliku"</span>
<span class="t-kw">out</span> <span class="t-var">$dane</span>
done

<span class="t-comment">! ── Pipeline przetwarzania danych ─────────────────</span>
<span class="t-kw2">:</span><span class="t-func">pipeline</span> [str -> list] def
<span class="t-var">$plik</span>=<span class="t-str">"$1"</span>
<span class="t-var">$wynik</span> = do
| <span class="t-prefix">.</span><span class="t-func">przetworz_duzy_plik</span> <span class="t-var">$plik</span>
| <span class="t-prefix">.</span><span class="t-func">parsuj</span>
| <span class="t-prefix">.</span><span class="t-func">filtruj</span>
| <span class="t-prefix">.</span><span class="t-func">mapuj_nazwy</span>
| <span class="t-prefix">.</span><span class="t-func">sortuj</span>
| <span class="t-prefix">.</span><span class="t-func">upper_all</span>
done
<span class="t-kw">out</span> <span class="t-var">$wynik</span>
done

<span class="t-comment">! ── Uruchomienie ─────────────────────────────────</span>
<span class="t-var">$dane</span> = await <span class="t-prefix">.</span><span class="t-func">pipeline</span> <span class="t-str">"users.json"</span>
[pierwszy | _] = <span class="t-var">$dane</span>
<span class="t-kw">log</span> <span class="t-str">"Pierwszy po sortowaniu: $pierwszy"</span>
<span class="t-prefix">.</span><span class="t-func">przetworz_liste</span> <span class="t-var">$dane</span>
<span class="t-kw">end</span> 0</pre></div></div>
</div>
</div>

<!-- ─ CHEAT SHEET ────────────────────────────────────────────────────────── -->
<div class="section" id="cheatsheet">
<div class="sec-header"><span class="sec-num">★</span><h2>Cheat Sheet</h2></div>
<div class="grid2">
<div>
<h3>Zmienne i stałe</h3>
<table class="ref-table">
<tr><td class="td-syntax">@NAZWA=val</td><td class="td-desc">Globalna (env export)</td></tr>
<tr><td class="td-syntax">$nazwa=val</td><td class="td-desc">Lokalna</td></tr>
<tr><td class="td-syntax">%STALA=val</td><td class="td-desc">Stała (v2) — niemodyfikowalna</td></tr>
<tr><td class="td-syntax">$x = $a + $b</td><td class="td-desc">Wyrażenie arytmetyczne (v2)</td></tr>
<tr><td class="td-syntax">"Wynik: $($a+5)"</td><td class="td-desc">Interpolacja wyrażenia (v2)</td></tr>
<tr><td class="td-syntax">$var.pole</td><td class="td-desc">Dostęp do pola (v2)</td></tr>
</table>
<h3>Komendy</h3>
<table class="ref-table">
<tr><td class="td-syntax">&gt; cmd</td><td class="td-desc">Z podstawianiem zmiennych</td></tr>
<tr><td class="td-syntax">&gt;&gt; cmd</td><td class="td-desc">Bez podstawiania</td></tr>
<tr><td class="td-syntax">&gt;&gt;&gt; cmd</td><td class="td-desc">Izolowana (własne env)</td></tr>
<tr><td class="td-syntax">^ cmd</td><td class="td-desc">Sudo — PLSA flaguje jako unsafe</td></tr>
<tr><td class="td-syntax">&amp; cmd</td><td class="td-desc">Background (fire and forget)</td></tr>
</table>
<h3>Przepływ</h3>
<table class="ref-table">
<tr><td class="td-syntax">? c &gt; cmd</td><td class="td-desc">If</td></tr>
<tr><td class="td-syntax">?? c &gt; cmd</td><td class="td-desc">Elif</td></tr>
<tr><td class="td-syntax">?: &gt; cmd</td><td class="td-desc">Else</td></tr>
<tr><td class="td-syntax">match $x |&gt;</td><td class="td-desc">Match header (v2)</td></tr>
<tr><td class="td-syntax">val &gt; cmd</td><td class="td-desc">Match arm (v2)</td></tr>
<tr><td class="td-syntax">_ &gt; cmd</td><td class="td-desc">Match wildcard (v2)</td></tr>
<tr><td class="td-syntax">= N &gt; cmd</td><td class="td-desc">Pętla N razy</td></tr>
<tr><td class="td-syntax">while c &gt; cmd</td><td class="td-desc">While</td></tr>
<tr><td class="td-syntax">for v in l &gt; cmd</td><td class="td-desc">For each</td></tr>
</table>
</div>
<div>
<h3>Funkcje i klasy</h3>
<table class="ref-table">
<tr><td class="td-syntax">:f def...done</td><td class="td-desc">Definicja funkcji</td></tr>
<tr><td class="td-syntax">:f [int -&gt; str] def</td><td class="td-desc">Z sygnaturą typów (v2)</td></tr>
<tr><td class="td-syntax">:f [T impl I -&gt; s] def</td><td class="td-desc">Z generic constraint (v2)</td></tr>
<tr><td class="td-syntax">::f [512kb] def</td><td class="td-desc">Arena allocator (v2)</td></tr>
<tr><td class="td-syntax">recur args</td><td class="td-desc">Tail recursion (v2)</td></tr>
<tr><td class="td-syntax">;;Klasa def</td><td class="td-desc">Definicja klasy</td></tr>
<tr><td class="td-syntax">;;K impl I def</td><td class="td-desc">Klasa implementuje interfejs (v2)</td></tr>
<tr><td class="td-syntax">.funkcja arg</td><td class="td-desc">Wywołanie</td></tr>
<tr><td class="td-syntax">out $val</td><td class="td-desc">Return z wartością</td></tr>
<tr><td class="td-syntax">defer .f</td><td class="td-desc">Sprzątanie przy wyjściu (v2)</td></tr>
</table>
<h3>Typy (v2)</h3>
<table class="ref-table">
<tr><td class="td-syntax">== E [a,b,c]</td><td class="td-desc">Enum</td></tr>
<tr><td class="td-syntax">struct S [f: t]</td><td class="td-desc">Struct</td></tr>
<tr><td class="td-syntax">==type T [V[f:t],W]</td><td class="td-desc">ADT (v2)</td></tr>
<tr><td class="td-syntax">==interface I [m1,m2]</td><td class="td-desc">Interfejs (v2)</td></tr>
<tr><td class="td-syntax">{ $x -&gt; expr }</td><td class="td-desc">Lambda (v2)</td></tr>
<tr><td class="td-syntax">[h | t] = $l</td><td class="td-desc">Destruct lista (v2)</td></tr>
<tr><td class="td-syntax">{a, b} = $m</td><td class="td-desc">Destruct mapa (v2)</td></tr>
<tr><td class="td-syntax">expr ?! "msg"</td><td class="td-desc">Result unwrap (v2)</td></tr>
<tr><td class="td-syntax">$l.push / .set</td><td class="td-desc">Mutacja kolekcji (v2)</td></tr>
</table>
<h3>Async / Biblioteki</h3>
<table class="ref-table">
<tr><td class="td-syntax">spawn cmd</td><td class="td-desc">Async fire-and-forget</td></tr>
<tr><td class="td-syntax">$h = spawn cmd</td><td class="td-desc">Async z handle</td></tr>
<tr><td class="td-syntax">$x = await $h</td><td class="td-desc">Zbierz wynik</td></tr>
<tr><td class="td-syntax">#&lt;core/http:1.3&gt;</td><td class="td-desc">Biblioteka core</td></tr>
<tr><td class="td-syntax">#&lt;bytes/lib&gt;</td><td class="td-desc">Biblioteka natywna</td></tr>
<tr><td class="td-syntax">&lt;&lt; "f.hl" in ns</td><td class="td-desc">Import z namespace</td></tr>
<tr><td class="td-syntax">// narzędzia</td><td class="td-desc">SysDep</td></tr>
<tr><td class="td-syntax">\\ plugin args</td><td class="td-desc">Plugin</td></tr>
<tr><td class="td-syntax">-- lib.so</td><td class="td-desc">Extern</td></tr>
<tr><td class="td-syntax">==test "opis" [...]</td><td class="td-desc">Test jednostkowy (v2)</td></tr>
</table>
</div>
</div>
</div>
`;
