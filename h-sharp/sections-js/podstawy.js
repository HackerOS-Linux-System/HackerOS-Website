window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['podstawy'] = `
<!-- ─ KOMENTARZE ─────────────────────────────────────────────────────────── -->
<div class="section" id="komentarze">
<div class="sec-header"><span class="sec-num">03</span><h2>Komentarze</h2></div>
<p>Dwa rodzaje komentarzy: liniowe i blokowe. Pomijane przez interpreter i kompilator, widoczne przez PLSA przy indeksowaniu dokumentacji.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Typ</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">! tekst</span></td><td><span class="pill p-cyan">liniowy</span></td><td class="td-desc">Cała linia ignorowana. Musi zaczynać się od <code>!</code> po trim(). <strong>Nie można komentować inline.</strong></td></tr>
<tr><td><span class="td-syntax">!!</span></td><td><span class="pill p-purple">blokowy</span></td><td class="td-desc">Przełącza tryb komentarza blokowego — wszystko między dwoma <code>!!</code> jest ignorowane (włącznie z kodem).</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">komentarze.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span></div>
<div class="code-inner"><pre><span class="t-comment">! Komentarz liniowy — cała linia jest ignorowana</span>
<span class="t-var">@AUTOR</span>=<span class="t-str">"Jan"</span>

<span class="t-comment">!!</span>
<span class="t-comment">Blok komentarza — wszystkie linie między !! ignorowane.</span>
<span class="t-comment">Możesz pisać cokolwiek: notatki, TODO, stary kod.</span>
<span class="t-comment">log "ta linia NIE wykona się"</span>
<span class="t-comment">@ZMIENNA = "też zignorowane"</span>
<span class="t-comment">!!</span>

<span class="t-comment">! HL nie ma komentarzy inline — poniżej jest błąd składni:</span>
<span class="t-comment">! log "abc" ! to nie jest komentarz ← BŁĄD</span></pre></div></div>
</div>
<div class="callout c-warn"><div class="ci">⚠</div><div class="cb"><strong>Uwaga:</strong> <code>!</code> musi być pierwszym znakiem linii (po ewentualnych białych znakach). Nie ma komentarzy wewnątrz linii z kodem.</div></div>
</div>

<!-- ─ ZMIENNE ────────────────────────────────────────────────────────────── -->
<div class="section" id="zmienne">
<div class="sec-header"><span class="sec-num">04</span><h2>Zmienne i stałe</h2><span class="sec-badge">v2: % stałe · wyrażenia · interpolacja</span></div>
<p>Trzy kategorie zmiennych z różnym zakresem i semantyką. Wszystkie wartości są stringami (jak bash), ale PLSA rozumie typy z sygnatur.</p>
<div class="grid3">
<div class="card">
<div class="card-title">@ — Globalna (env)</div>
<div class="card-body">Eksportowana do środowiska. Dostępna w całym programie i subshellach. Konwencja: <code>WIELKIE_LITERY</code>. Prefiks <code>@</code> w definicji, <code>$NAZWA</code> w użyciu.</div>
</div>
<div class="card">
<div class="card-title">$ — Lokalna</div>
<div class="card-body">Dostępna w bieżącym zakresie. Nie eksportowana. Używana do obliczeń, spawn/await, pętli i argumentów funkcji. Prefiks <code>$</code> zarówno w definicji jak i użyciu.</div>
</div>
<div class="card">
<div class="card-title">% — Stała <span class="pill p-red" style="font-size:9px">v2</span></div>
<div class="card-body">Ustawiana raz. VM ostrzega przy próbie nadpisania. Idealna dla konfiguracji niezmiennej przez cały czas życia programu (timeouty, limity, ścieżki).</div>
</div>
</div>
<div class="code-block">
<div class="code-header"><span class="code-filename">zmienne.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Globalne (eksportowane do env) ──────────────</span>
<span class="t-var">@HOST</span>=<span class="t-str">"localhost"</span>
<span class="t-var">@PORT</span>=<span class="t-str">"8080"</span>
<span class="t-var">@DEBUG</span>=<span class="t-str">"false"</span>
<span class="t-var">@DEPLOY_ENV</span>=<span class="t-str">"production"</span>

<span class="t-comment">! ── Lokalne (zakres bieżący) ─────────────────────</span>
<span class="t-var">$nazwa</span>=<span class="t-str">"serwer-01"</span>
<span class="t-var">$wersja</span>=<span class="t-str">"2.1.0"</span>
<span class="t-var">$aktywny</span>=<span class="t-str">"true"</span>

<span class="t-comment">! ── Stałe % (v2) — nie można nadpisać ───────────</span>
<span class="t-const">%</span>MAX_CONN=<span class="t-str">"100"</span>
<span class="t-const">%</span>TIMEOUT_MS=<span class="t-str">"5000"</span>
<span class="t-const">%</span>API_BASE=<span class="t-str">"https://api.example.com/v2"</span>
<span class="t-const">%</span>LOG_DIR=<span class="t-str">"/var/log/hackeros"</span>

<span class="t-comment">! ── Wyrażenia arytmetyczne / logiczne (v2) ───────</span>
<span class="t-var">$suma</span> = <span class="t-num">10</span> + <span class="t-num">20</span> * <span class="t-num">3</span>
<span class="t-var">$ratio</span> = <span class="t-var">$hits</span> / <span class="t-var">$total</span>
<span class="t-var">$aktywny</span> = <span class="t-var">$port</span> &gt; <span class="t-num">1024</span> &amp;&amp; <span class="t-var">$port</span> &lt;= <span class="t-num">65535</span>
<span class="t-var">$reszta</span> = <span class="t-var">$n</span> % <span class="t-num">2</span>

<span class="t-comment">! ── Interpolacja stringów (v2) ───────────────────</span>
<span class="t-var">$info</span>=<span class="t-str">"Serwer: $(HOST):$(PORT)"</span>
<span class="t-var">$wynik</span>=<span class="t-str">"Suma: $($suma + 5)"</span>
<span class="t-var">$raport</span>=<span class="t-str">"Debug=$DEBUG v=$wersja"</span>
<span class="t-var">$czas</span>=<span class="t-str">"Czas: $(date +%H:%M:%S)"</span>
<span class="t-kw">log</span> <span class="t-str">"$info — $raport"</span></pre></div></div>
</div>

<h3>Dostęp do pól i kolekcje wieloliniowe</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">kolekcje.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Listy ────────────────────────────────────────</span>
<span class="t-var">$lista</span> = [<span class="t-str">"a"</span>, <span class="t-str">"b"</span>, <span class="t-str">"c"</span>]
<span class="t-var">$pierwszy</span>=<span class="t-str">"$(lista.0)"</span>
<span class="t-var">$drugi</span>=<span class="t-str">"$(lista.1)"</span>

<span class="t-comment">! ── Mapy ─────────────────────────────────────────</span>
<span class="t-var">$cfg</span> = {host: <span class="t-str">"prod"</span>, port: <span class="t-str">"443"</span>, ssl: <span class="t-str">"true"</span>}
<span class="t-var">$host</span>=<span class="t-str">"$(cfg.host)"</span>
<span class="t-var">$port</span>=<span class="t-str">"$(cfg.port)"</span>

<span class="t-comment">! ── Mutacje kolekcji (v2) ────────────────────────</span>
<span class="t-var">$serwisy</span> = [<span class="t-str">"nginx"</span>, <span class="t-str">"redis"</span>]
<span class="t-var">$serwisy</span>.<span class="t-func">push</span> <span class="t-str">"postgres"</span>
<span class="t-var">$serwisy</span>.<span class="t-func">pop</span>
<span class="t-var">$mapa</span>.<span class="t-func">set</span> <span class="t-str">"klucz"</span> <span class="t-str">"wartość"</span>
<span class="t-var">$mapa</span>.<span class="t-func">del</span> <span class="t-str">"stary"</span>
<span class="t-var">$mapa</span>.<span class="t-func">get</span> <span class="t-str">"klucz"</span>

<span class="t-comment">! ── Wieloliniowe (multiline) ──────────────────────</span>
<span class="t-var">$hosty</span> = [
    prod-01.example.com,
prod-02.example.com,
prod-03.example.com
]

<span class="t-var">$konfiguracja</span> = {
    host: <span class="t-str">"prod.example.com"</span>,
    port: <span class="t-str">"443"</span>,
    ssl: <span class="t-str">"true"</span>,
    timeout: <span class="t-str">"30"</span>
}</pre></div></div>
</div>
</div>

<!-- ─ KOMENDY ─────────────────────────────────────────────────────────────── -->
<div class="section" id="komendy">
<div class="sec-header"><span class="sec-num">05</span><h2>Komendy</h2></div>
<p>Hacker Lang rozróżnia cztery tryby uruchamiania komend systemowych przez prefiksy. Prefiksy są wymagane — brak prefiksu = wywołanie funkcji lub błąd składni.</p>
<table class="ref-table">
<tr><th>Prefix</th><th>Nazwa</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">&gt; cmd</span></td><td><span class="pill p-cyan">raw_sub</span></td><td class="td-desc">Uruchamia komendę z podstawianiem zmiennych (<code>$VAR</code>). <strong>Najczęściej używany tryb.</strong></td></tr>
<tr><td><span class="td-syntax">&gt;&gt; cmd</span></td><td><span class="pill p-purple">raw_no_sub</span></td><td class="td-desc">Uruchamia komendę <em>bez</em> podstawiania. Zmienne traktowane literalnie — przydatne dla wzorców grep/awk.</td></tr>
<tr><td><span class="td-syntax">&gt;&gt;&gt; cmd</span></td><td><span class="pill p-orange">isolated</span></td><td class="td-desc">Izolowana komenda — własne środowisko, bez dostępu do zmiennych rodzica.</td></tr>
<tr><td><span class="td-syntax">^ cmd</span></td><td><span class="pill p-red">sudo</span></td><td class="td-desc">Prefiks sudo — PLSA flaguje jako potencjalnie niebezpieczny. Łączy się z innymi prefiksami.</td></tr>
<tr><td><span class="td-syntax">&amp; cmd</span></td><td><span class="pill p-green">background</span></td><td class="td-desc">Uruchamia w tle bez synchronizacji. Brak handle — użyj <code>spawn</code> jeśli chcesz await.</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">komendy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span></div>
<div class="code-inner"><pre><span class="t-var">@ENV</span>=<span class="t-str">"production"</span>
<span class="t-var">$plik</span>=<span class="t-str">"dane.txt"</span>
<span class="t-var">$PATTERN</span>=<span class="t-str">"error"</span>

<span class="t-comment">! ── Z podstawianiem (najczęstszy) ───────────────</span>
<span class="t-prefix">&gt;</span> echo <span class="t-str">"Środowisko: $ENV"</span>
<span class="t-prefix">&gt;</span> cat <span class="t-var">$plik</span>
<span class="t-prefix">&gt;</span> systemctl status nginx

<span class="t-comment">! ── Bez podstawiania ─────────────────────────────</span>
<span class="t-prefix">&gt;&gt;</span> grep -r '$PATTERN' /etc/
<span class="t-prefix">&gt;&gt;</span> awk '{print $1, $NF}' /var/log/syslog

<span class="t-comment">! ── Izolowana (własne env) ───────────────────────</span>
<span class="t-prefix">&gt;&gt;&gt;</span> env -i PATH=/usr/bin make clean

<span class="t-comment">! ── Sudo z prefiksem komendowym ──────────────────</span>
<span class="t-op">^</span><span class="t-prefix">&gt;</span> systemctl restart nginx
<span class="t-op">^</span><span class="t-prefix">&gt;</span> apt-get install -y curl

<span class="t-comment">! ── Background (fire and forget) ─────────────────</span>
<span class="t-kw2">&amp;</span> <span class="t-prefix">&gt;</span> tail -f /var/log/app.log
<span class="t-kw2">&amp;</span> <span class="t-prefix">.</span><span class="t-func">monitoruj_metryki</span>

<span class="t-comment">! ── Pipe inline ──────────────────────────────────</span>
<span class="t-prefix">&gt;</span> cat /etc/passwd <span class="t-prefix">|&gt;</span> grep root <span class="t-prefix">|&gt;</span> cut -d: -f1</pre></div></div>
</div>
</div>

<!-- ─ LOG / OUT ────────────────────────────────────────────────────────────── -->
<div class="section" id="log">
<div class="sec-header"><span class="sec-num">06</span><h2>Log / Out</h2></div>
<p><code>log</code> wypisuje wiadomość z timestamp do stdout. <code>out</code> zwraca wartość z funkcji (odpowiednik <code>return</code>). <code>end</code> kończy program z kodem wyjścia.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">log "tekst"</span></td><td class="td-desc">Wypisz string do logu. Obsługuje interpolację <code>$VAR</code> i <code>$(expr)</code>.</td></tr>
<tr><td><span class="td-syntax">out $zmienna</span></td><td class="td-desc">Zwróć wartość z funkcji — wychwytywana przez <code>$x = await .func</code>.</td></tr>
<tr><td><span class="td-syntax">out</span></td><td class="td-desc">Early return bez wartości (void). Zatrzymuje wykonanie funkcji.</td></tr>
<tr><td><span class="td-syntax">end 0</span></td><td class="td-desc">Zakończ program z kodem 0 (sukces). <code>end 1</code> — błąd.</td></tr>
<tr><td><span class="td-syntax">end</span></td><td class="td-desc">Zakończ z domyślnym kodem 0.</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">log-out.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span></div>
<div class="code-inner"><pre><span class="t-var">$host</span>=<span class="t-str">"db.prod"</span>
<span class="t-var">$port</span>=<span class="t-str">"5432"</span>

<span class="t-comment">! ── Log z interpolacją ──────────────────────────</span>
<span class="t-kw">log</span> <span class="t-str">"Połączono z $host:$port"</span>
<span class="t-kw">log</span> <span class="t-str">"Czas: $(date +%H:%M:%S)"</span>
<span class="t-kw">log</span> <span class="t-str">"Suma: $($a + $b)"</span>

<span class="t-comment">! ── Funkcja zwracająca przez out ─────────────────</span>
<span class="t-kw2">:</span><span class="t-func">oblicz_checksum</span> def
<span class="t-var">$plik</span>=<span class="t-str">"$1"</span>
<span class="t-kw">assert</span> <span class="t-str">-f "$plik"</span> <span class="t-str">"Plik nie istnieje: $plik"</span>
<span class="t-var">$hash</span>=<span class="t-str">"$(sha256sum $plik | cut -d' ' -f1)"</span>
<span class="t-kw">out</span> <span class="t-var">$hash</span>
done

<span class="t-var">$sum</span> = await .<span class="t-func">oblicz_checksum</span> /etc/passwd
<span class="t-kw">log</span> <span class="t-str">"SHA256: $sum"</span>

<span class="t-comment">! ── Early return — out bez wartości ──────────────</span>
<span class="t-kw2">:</span><span class="t-func">waliduj</span> def
<span class="t-op">?</span> <span class="t-str">"$1" = ""</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Pusty argument"</span>
<span class="t-op">?</span> <span class="t-str">"$1" = ""</span> <span class="t-prefix">&gt;</span> <span class="t-kw">out</span>
<span class="t-kw">log</span> <span class="t-str">"Walidacja OK: $1"</span>
done

<span class="t-comment">! ── Zakończenie programu ─────────────────────────</span>
<span class="t-kw">end</span> 0</pre></div></div>
</div>
</div>
`;
