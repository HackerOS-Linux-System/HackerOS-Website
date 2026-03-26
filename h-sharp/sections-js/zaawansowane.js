window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['zaawansowane'] = `
<!-- ─ LAMBDY ────────────────────────────────────────────────────────────── -->
<div class="section" id="lambdy">
<div class="sec-header"><span class="sec-num">19</span><h2>Lambdy / Domknięcia</h2><span class="sec-badge">v2</span></div>
<p>Funkcje anonimowe. Składnia: <code>{ $param -> ciało }</code>. Obsługuje wiele parametrów i wieloliniowe ciała. Może być przypisana do zmiennej lub przekazana jako argument.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">{ $x -> wyrażenie }</span></td><td class="td-desc">Lambda inline z jednym parametrem</td></tr>
<tr><td><span class="td-syntax">{ $x, $y -> wyrażenie }</span></td><td class="td-desc">Lambda z wieloma parametrami</td></tr>
<tr><td><span class="td-syntax">$f = { $x -> ciało }</span></td><td class="td-desc">Przypisanie lambdy do zmiennej</td></tr>
<tr><td><span class="td-syntax">$f = {<br>&nbsp;&nbsp;$x -><br>&nbsp;&nbsp;ciało_wieloliniowe<br>}</span></td><td class="td-desc">Wieloliniowa lambda</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">lambdy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Proste lambdy ────────────────────────────────</span>
<span class="t-var">$podwoj</span>    = { <span class="t-var">$x</span> -> <span class="t-var">$x</span> * <span class="t-num">2</span> }
<span class="t-var">$kwadrat</span>   = { <span class="t-var">$x</span> -> <span class="t-var">$x</span> * <span class="t-var">$x</span> }
<span class="t-var">$czy_parzy</span> = { <span class="t-var">$x</span> -> <span class="t-var">$x</span> % <span class="t-num">2</span> == <span class="t-num">0</span> }
<span class="t-var">$upper</span>     = { <span class="t-var">$s</span> -> <span class="t-str">"$(echo $s | tr '[:lower:]' '[:upper:]')"</span> }
<span class="t-var">$trim</span>      = { <span class="t-var">$s</span> -> <span class="t-str">"$(echo $s | xargs)"</span> }

<span class="t-comment">! ── Lambda z wieloma parametrami ──────────────────</span>
<span class="t-var">$dodaj</span>    = { <span class="t-var">$a</span>, <span class="t-var">$b</span> -> <span class="t-var">$a</span> + <span class="t-var">$b</span> }
<span class="t-var">$max_val</span>  = { <span class="t-var">$a</span>, <span class="t-var">$b</span> -> <span class="t-var">$a</span> > <span class="t-var">$b</span> && <span class="t-var">$a</span> || <span class="t-var">$b</span> }

<span class="t-comment">! ── Wieloliniowa lambda ───────────────────────────</span>
<span class="t-var">$przetworz</span> = {
  <span class="t-var">$dane</span> ->
  <span class="t-prefix">.</span><span class="t-func">waliduj</span> <span class="t-var">$dane</span>
  <span class="t-prefix">.</span><span class="t-func">normalizuj</span>
  <span class="t-prefix">.</span><span class="t-func">zapisz</span>
}

<span class="t-comment">! ── Przekazywanie lambdy do funkcji ──────────────</span>
<span class="t-prefix">.</span><span class="t-func">lista.mapa</span> <span class="t-var">$podwoj</span>
<span class="t-prefix">.</span><span class="t-func">lista.filtruj</span> { <span class="t-var">$x</span> -> <span class="t-var">$x</span> > <span class="t-num">10</span> }
<span class="t-prefix">.</span><span class="t-func">lista.sortuj</span> { <span class="t-var">$a</span>, <span class="t-var">$b</span> -> <span class="t-var">$a</span> < <span class="t-var">$b</span> }

<span class="t-comment">! ── Lambda jako callback ──────────────────────────</span>
<span class="t-prefix">.</span><span class="t-func">http.pobierz</span> <span class="t-str">"$URL"</span> { <span class="t-var">$resp</span> -> <span class="t-prefix">.</span><span class="t-func">parsuj</span> <span class="t-var">$resp</span> }

<span class="t-comment">! ── Kompozycja funkcji przez lambdy ──────────────</span>
<span class="t-var">$pipeline</span> = { <span class="t-var">$x</span> ->
  <span class="t-var">$a</span> = await { <span class="t-var">$v</span> -> <span class="t-var">$v</span> * <span class="t-num">2</span> } <span class="t-var">$x</span>
  <span class="t-var">$b</span> = await { <span class="t-var">$v</span> -> <span class="t-var">$v</span> + <span class="t-num">10</span> } <span class="t-var">$a</span>
  <span class="t-kw">out</span> <span class="t-var">$b</span>
}

<span class="t-comment">! ── Zamknięcie: domknięcie zmiennych zewnętrznych ─</span>
<span class="t-var">$mnoznik</span>=<span class="t-str">"3"</span>
<span class="t-var">$trojkrotnosc</span> = { <span class="t-var">$x</span> -> <span class="t-var">$x</span> * <span class="t-var">$mnoznik</span> }
<span class="t-var">$wynik</span> = await <span class="t-var">$trojkrotnosc</span> <span class="t-num">7</span>
<span class="t-kw">log</span> <span class="t-str">"7 * 3 = $wynik"</span></pre></div></div>
</div>
</div>

<!-- ─ DESTRUKTURYZACJA ───────────────────────────────────────────────────── -->
<div class="section" id="destrukt">
<div class="sec-header"><span class="sec-num">20</span><h2>Destrukturyzacja</h2><span class="sec-badge">v2</span></div>
<p>Rozpakowywanie kolekcji do nazwanych zmiennych. Obsługuje dwa tryby: <em>listowa</em> <code>[head | tail]</code> i <em>mapowa</em> <code>{pole1, pole2}</code>.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">[h | t] = $lista</span></td><td class="td-desc">Listowa: <code>h</code> = pierwszy element, <code>t</code> = reszta</td></tr>
<tr><td><span class="td-syntax">{pole1, pole2} = $mapa</span></td><td class="td-desc">Mapowa: wyciąga wymienione pola jako zmienne lokalne</td></tr>
<tr><td><span class="td-syntax">{name, email} = $user</span></td><td class="td-desc">Ze struktury: tworzy <code>$name</code> i <code>$email</code></td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">destrukt.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Destrukturyzacja listy [head | tail] ─────────</span>
<span class="t-var">$lista</span> = [<span class="t-str">"a"</span>, <span class="t-str">"b"</span>, <span class="t-str">"c"</span>, <span class="t-str">"d"</span>]
[pierwszy | reszta] = <span class="t-var">$lista</span>
<span class="t-kw">log</span> <span class="t-str">"Głowa: $pierwszy"</span>    <span class="t-comment">! → "a"</span>
<span class="t-kw">log</span> <span class="t-str">"Ogon: $reszta"</span>      <span class="t-comment">! → ["b","c","d"]</span>

<span class="t-comment">! ── Destrukturyzacja mapy {pola} ─────────────────</span>
<span class="t-var">$user</span> = {name: <span class="t-str">"Anna"</span>, email: <span class="t-str">"anna@x.com"</span>, role: <span class="t-str">"admin"</span>}
{name, email, role} = <span class="t-var">$user</span>
<span class="t-kw">log</span> <span class="t-str">"Witaj $name ($role), email: $email"</span>

<span class="t-comment">! ── Ze struktury Config ──────────────────────────</span>
<span class="t-var">$cfg</span> = {host: <span class="t-str">"prod"</span>, port: <span class="t-str">"443"</span>, ssl: <span class="t-str">"true"</span>}
{host, port, ssl} = <span class="t-var">$cfg</span>
<span class="t-kw">log</span> <span class="t-str">"Łączę z $host:$port ssl=$ssl"</span>

<span class="t-comment">! ── W pętli: destrukturyzacja każdego elementu ───</span>
<span class="t-kw">for</span> user <span class="t-kw">in</span> <span class="t-var">$users</span> <span class="t-prefix">&gt;</span> {name, role} = <span class="t-var">$user</span>

<span class="t-comment">! ── Rekurencyjna obróbka listy przez [h|t] ────────</span>
<span class="t-kw2">:</span><span class="t-func">przetworz_liste</span> def
<span class="t-op">?</span> <span class="t-str">"$#" -eq "0"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">out</span>
[glowa | ogon] = <span class="t-var">$@</span>
<span class="t-prefix">.</span><span class="t-func">przetworz_element</span> <span class="t-var">$glowa</span>
<span class="t-kw">recur</span> <span class="t-var">$ogon</span>
done

<span class="t-comment">! ── Destrukturyzacja zagnieżdżona ────────────────</span>
<span class="t-var">$resp</span> = {code: <span class="t-str">"200"</span>, body: <span class="t-str">"{...}"</span>, headers: <span class="t-str">"{...}"</span>}
{code, body} = <span class="t-var">$resp</span>
<span class="t-kw">assert</span> <span class="t-str">"$code" = "200"</span> <span class="t-str">"Błąd HTTP: $code"</span>
<span class="t-prefix">.</span><span class="t-func">json.parse</span> <span class="t-var">$body</span></pre></div></div>
</div>
</div>

<!-- ─ SCOPE ──────────────────────────────────────────────────────────────── -->
<div class="section" id="scope">
<div class="sec-header"><span class="sec-num">21</span><h2>Zakres leksykalny (;;scope)</h2><span class="sec-badge">v2</span></div>
<p>Anonimowy zakres leksykalny. Zmienne zadeklarowane wewnątrz nie "wyciekają" na zewnątrz. Przydatne do izolowania tymczasowych operacji i ograniczania zasięgu blokad.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">scope.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! ── Izolacja zmiennych tymczasowych ──────────────</span>
<span class="t-kw2">;;</span>scope def
<span class="t-var">$tmp</span>=<span class="t-str">"dane tymczasowe"</span>
<span class="t-var">$buf</span>=<span class="t-str">"$(cat /tmp/work.txt)"</span>
<span class="t-prefix">.</span><span class="t-func">przetworz</span> <span class="t-var">$buf</span>
done
<span class="t-comment">! $tmp i $buf NIE istnieją tu — wyczyszczone</span>

<span class="t-comment">! ── Scope z lockiem (v2) ─────────────────────────</span>
<span class="t-kw2">;;</span>scope def
<span class="t-kw">lock</span> <span class="t-var">$zasob_db</span> = <span class="t-str">"polaczenie"</span>
<span class="t-prefix">.</span><span class="t-func">db.operacja</span>
<span class="t-kw">unlock</span> <span class="t-var">$zasob_db</span>
done
<span class="t-comment">! lock automatycznie zwolniony po done</span>

<span class="t-comment">! ── Scope jako sekcja konfiguracyjna ─────────────</span>
<span class="t-kw2">;;</span>scope def
<span class="t-var">$HOST</span>=<span class="t-str">"$(cat .env | grep HOST | cut -d= -f2)"</span>
<span class="t-var">$PORT</span>=<span class="t-str">"$(cat .env | grep PORT | cut -d= -f2)"</span>
<span class="t-kw">assert</span> <span class="t-str">"$HOST" != ""</span> <span class="t-str">"HOST nie ustawiony w .env"</span>
<span class="t-kw">assert</span> <span class="t-str">"$PORT" != ""</span> <span class="t-str">"PORT nie ustawiony w .env"</span>
<span class="t-prefix">.</span><span class="t-func">polacz</span> <span class="t-var">$HOST</span> <span class="t-var">$PORT</span>
done</pre></div></div>
</div>
</div>

<!-- ─ TESTY ──────────────────────────────────────────────────────────────── -->
<div class="section" id="testy">
<div class="sec-header"><span class="sec-num">22</span><h2>Testy jednostkowe (==test)</h2><span class="sec-badge">v2</span></div>
<p>Testy jako pierwsza klasa języka. PLSA rozumie bloki testowe i raportuje pokrycie. Składnia: <code>==test "opis" [ asserty... ]</code>. Testy są oznaczone i łatwe do izolowania podczas uruchomienia.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">testy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Testy podstawowe ─────────────────────────────</span>
<span class="t-op">==</span>test <span class="t-str">"dodawanie działa poprawnie"</span> [
  <span class="t-var">$a</span> = <span class="t-num">2</span> + <span class="t-num">3</span>
  <span class="t-kw">assert</span> <span class="t-str">"$a" = "5"</span> <span class="t-str">"2+3 powinno być 5"</span>

  <span class="t-var">$b</span> = <span class="t-num">10</span> + <span class="t-num">20</span>
  <span class="t-kw">assert</span> <span class="t-str">"$b" = "30"</span> <span class="t-str">"10+20 powinno być 30"</span>
]

<span class="t-op">==</span>test <span class="t-str">"funkcja silnia"</span> [
  <span class="t-var">$f1</span> = await <span class="t-prefix">.</span><span class="t-func">silnia</span> 1 1
  <span class="t-var">$f5</span> = await <span class="t-prefix">.</span><span class="t-func">silnia</span> 5 1
  <span class="t-kw">assert</span> <span class="t-str">"$f1" = "1"</span>   <span class="t-str">"silnia(1)=1"</span>
  <span class="t-kw">assert</span> <span class="t-str">"$f5" = "120"</span> <span class="t-str">"silnia(5)=120"</span>
]

<span class="t-op">==</span>test <span class="t-str">"walidacja konfiguracji"</span> [
  <span class="t-var">$cfg</span> = {host: <span class="t-str">"localhost"</span>, port: <span class="t-str">"8080"</span>}
  {host, port} = <span class="t-var">$cfg</span>
  <span class="t-kw">assert</span> <span class="t-str">"$host" != ""</span>              <span class="t-str">"host nie może być pusty"</span>
  <span class="t-kw">assert</span> <span class="t-str">"$port" -ge "1"</span>            <span class="t-str">"port musi być >= 1"</span>
  <span class="t-kw">assert</span> <span class="t-str">"$port" -le "65535"</span>        <span class="t-str">"port musi być <= 65535"</span>
]

<span class="t-op">==</span>test <span class="t-str">"struct User poprawna"</span> [
  <span class="t-var">$u</span> = {id: <span class="t-str">"1"</span>, name: <span class="t-str">"Test"</span>, email: <span class="t-str">"t@x.com"</span>, role: <span class="t-str">"user"</span>}
  {id, name, email} = <span class="t-var">$u</span>
  <span class="t-kw">assert</span> <span class="t-str">"$id" -gt "0"</span>               <span class="t-str">"id musi być > 0"</span>
  <span class="t-kw">assert</span> <span class="t-str">"$name" != ""</span>               <span class="t-str">"name nie może być pusty"</span>
  <span class="t-kw">assert</span> <span class="t-str">"$email" = *@*</span>              <span class="t-str">"nieprawidłowy email"</span>
]

<span class="t-op">==</span>test <span class="t-str">"połączenie z bazą danych"</span> [
  <span class="t-var">$ok</span> = await <span class="t-prefix">.</span><span class="t-func">db.ping</span>
  <span class="t-kw">assert</span> <span class="t-str">"$ok" = "true"</span> <span class="t-str">"DB musi odpowiadać"</span>

  <span class="t-var">$count</span> = await <span class="t-prefix">.</span><span class="t-func">db.count</span> <span class="t-str">"users"</span>
  <span class="t-kw">assert</span> <span class="t-str">"$count" -ge "0"</span> <span class="t-str">"count musi być >= 0"</span>
]</pre></div></div>
</div>
<div class="callout c-tip"><div class="ci">💡</div><div class="cb"><strong>Raport PLSA:</strong> Uruchom <code>hl-plsa skrypt.hl --verbose</code> aby zobaczyć listę bloków <code>==test</code> i liczbę asertów w każdym z nich. Wynik widoczny w sekcji <em>[✓] Testy jednostkowe</em> raportu.</div></div>
</div>

<!-- ─ BIBLIOTEKI ──────────────────────────────────────────────────────────── -->
<div class="section" id="biblioteki">
<div class="sec-header"><span class="sec-num">23</span><h2>Biblioteki</h2></div>
<p>Cztery typy repozytoriów. Ładowane przez <code>#&lt;typ/nazwa:wersja&gt;</code>. PLSA śledzi wszystkie załadowane biblioteki i opcjonalnie rekurencyjnie je parsuje.</p>
<table class="ref-table">
<tr><th>Typ</th><th>Ścieżka</th><th>Format</th><th>Opis</th></tr>
<tr><td><span class="pill p-cyan">core</span></td><td><span class="td-note">~/.hackeros/hacker-lang/libs/core/</span></td><td><span class="td-note">.hl</span></td><td class="td-desc">Biblioteki standardowe w HL. Parsowane przez PLSA gdy <code>--resolve-libs</code>.</td></tr>
<tr><td><span class="pill p-green">bytes</span></td><td><span class="td-note">~/.hackeros/hacker-lang/libs/bytes/</span></td><td><span class="td-note">.so</span></td><td class="td-desc">Biblioteki natywne (shared objects). Dostęp przez FFI.</td></tr>
<tr><td><span class="pill p-purple">vira</span></td><td><span class="td-note">~/.hackeros/hacker-lang/libs/.virus/</span></td><td><span class="td-note">git repo</span></td><td class="td-desc">Repozytoria git z zewnętrznymi pakietami.</td></tr>
<tr><td><span class="pill p-orange">virus</span></td><td><span class="td-note">~/.hackeros/hacker-lang/libs/.virus/</span></td><td><span class="td-note">git repo</span></td><td class="td-desc">Alias dla <code>vira</code> — ta sama ścieżka.</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">libs.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── core — biblioteki standardowe HL ─────────────</span>
<span class="t-lib">#&lt;core/http:1.3&gt;</span>
<span class="t-lib">#&lt;core/json:1.0&gt;</span>
<span class="t-lib">#&lt;core/crypto:2.1&gt;</span>
<span class="t-lib">#&lt;core/fs:1.0&gt;</span>
<span class="t-lib">#&lt;core/env:1.0&gt;</span>
<span class="t-lib">#&lt;core/time:1.2&gt;</span>
<span class="t-lib">#&lt;core/string:1.1&gt;</span>
<span class="t-lib">#&lt;core/log:2.0&gt;</span>

<span class="t-comment">! ── bytes — natywne shared objects ───────────────</span>
<span class="t-lib">#&lt;bytes/sqlite3&gt;</span>
<span class="t-lib">#&lt;bytes/openssl&gt;</span>
<span class="t-lib">#&lt;bytes/zlib&gt;</span>

<span class="t-comment">! ── vira — repozytoria git ───────────────────────</span>
<span class="t-lib">#&lt;vira/my-utils:0.9&gt;</span>
<span class="t-lib">#&lt;vira/deploy-tools:1.2&gt;</span>

<span class="t-comment">! ── virus — alias vira ───────────────────────────</span>
<span class="t-lib">#&lt;virus/internal-lib&gt;</span>

<span class="t-comment">! ── Użycie biblioteki core/http ───────────────────</span>
<span class="t-var">$resp</span> = await <span class="t-prefix">.</span><span class="t-func">http.get</span> <span class="t-str">"https://api.example.com/v2/users"</span>
<span class="t-var">$body</span> = await <span class="t-prefix">.</span><span class="t-func">http.post</span> <span class="t-str">"$API_URL/data"</span> <span class="t-str">"$payload"</span>
<span class="t-var">$j</span>    = await <span class="t-prefix">.</span><span class="t-func">json.parse</span> <span class="t-var">$resp</span>
<span class="t-var">$sig</span>  = await <span class="t-prefix">.</span><span class="t-func">crypto.hmac</span> <span class="t-str">"sha256"</span> <span class="t-var">$SECRET</span> <span class="t-var">$body</span></pre></div></div>
</div>
</div>

<!-- ─ IMPORT ───────────────────────────────────────────────────────────────── -->
<div class="section" id="import">
<div class="sec-header"><span class="sec-num">24</span><h2>Import</h2></div>
<p>Importuj lokalne pliki <code>.hl</code> do bieżącego skryptu. Opcjonalnie w przestrzeni nazw. Różni się od bibliotek — dotyczy plików projektu, nie globalnych pakietów.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">&lt;&lt; "plik.hl"</span></td><td class="td-desc">Importuj plik bez namespace — funkcje dostępne bezpośrednio</td></tr>
<tr><td><span class="td-syntax">&lt;&lt; "plik.hl" in ns</span></td><td class="td-desc">Importuj z namespace <code>ns</code> — funkcje jako <code>.ns.funkcja</code></td></tr>
<tr><td><span class="td-syntax">&lt;&lt; "../lib/utils.hl" in utils</span></td><td class="td-desc">Relatywna ścieżka z namespace</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">import.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! ── Import bezpośredni ────────────────────────────</span>
<span class="t-kw">&lt;&lt;</span> <span class="t-str">"utils.hl"</span>
<span class="t-kw">&lt;&lt;</span> <span class="t-str">"./lib/helpers.hl"</span>
<span class="t-prefix">.</span><span class="t-func">format_date</span>      <span class="t-comment">! z utils.hl</span>
<span class="t-prefix">.</span><span class="t-func">calc_hash</span> <span class="t-var">$dane</span>  <span class="t-comment">! z helpers.hl</span>

<span class="t-comment">! ── Import z namespace ───────────────────────────</span>
<span class="t-kw">&lt;&lt;</span> <span class="t-str">"db.hl"</span> in db
<span class="t-kw">&lt;&lt;</span> <span class="t-str">"auth.hl"</span> in auth
<span class="t-kw">&lt;&lt;</span> <span class="t-str">"../shared/config.hl"</span> in cfg

<span class="t-prefix">.</span><span class="t-func">db.polacz</span>      <span class="t-var">$DB_URL</span>
<span class="t-prefix">.</span><span class="t-func">auth.weryfikuj</span> <span class="t-var">$token</span>
<span class="t-prefix">.</span><span class="t-func">cfg.zaladuj</span>   <span class="t-str">"/etc/app/prod.json"</span>

<span class="t-comment">! ── Import pliku z sysdep ────────────────────────</span>
<span class="t-kw">&lt;&lt;</span> <span class="t-str">"deploy/k8s.hl"</span> in k8s
<span class="t-prefix">.</span><span class="t-func">k8s.apply</span> <span class="t-str">"manifests/"</span>
<span class="t-prefix">.</span><span class="t-func">k8s.rollout</span> <span class="t-str">"status deployment/app"</span></pre></div></div>
</div>
</div>

<!-- ─ LOCK / UNLOCK ──────────────────────────────────────────────────────── -->
<div class="section" id="lock">
<div class="sec-header"><span class="sec-num">25</span><h2>Lock / Unlock</h2></div>
<p>Mechanizm blokowania zasobów — zapobiega równoległym modyfikacjom. <code>lock</code> ustawia zasób jako używany i przypisuje wartość. <code>unlock</code> zwalnia. Kombinuj z <code>defer</code> dla niezawodności.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">lock.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Blokowanie zasobu ────────────────────────────</span>
<span class="t-kw">lock</span> <span class="t-var">$plik_konfiguracji</span> = <span class="t-str">"/etc/app/config.json"</span>
<span class="t-prefix">.</span><span class="t-func">edytuj_konfiguracje</span>
<span class="t-kw">unlock</span> <span class="t-var">$plik_konfiguracji</span>

<span class="t-comment">! ── Lock + defer = zawsze odblokowany ────────────</span>
<span class="t-kw2">:</span><span class="t-func">bezpieczna_aktualizacja</span> def
<span class="t-kw">lock</span> <span class="t-var">$baza_danych</span> = <span class="t-str">"polaczenie-glowne"</span>
<span class="t-kw">defer</span> <span class="t-kw">unlock</span> <span class="t-var">$baza_danych</span>
<span class="t-prefix">.</span><span class="t-func">db.begin_transaction</span>
<span class="t-prefix">.</span><span class="t-func">db.update</span> <span class="t-var">$dane</span>
<span class="t-prefix">.</span><span class="t-func">db.commit</span>
done

<span class="t-comment">! ── Lock wielu zasobów ───────────────────────────</span>
<span class="t-kw">lock</span> <span class="t-var">$zasob_a</span> = <span class="t-str">"dysk-produkcyjny"</span>
<span class="t-kw">lock</span> <span class="t-var">$zasob_b</span> = <span class="t-str">"siec-wewnetrzna"</span>
<span class="t-kw">defer</span> <span class="t-kw">unlock</span> <span class="t-var">$zasob_a</span>
<span class="t-kw">defer</span> <span class="t-kw">unlock</span> <span class="t-var">$zasob_b</span>
<span class="t-prefix">.</span><span class="t-func">krytyczna_operacja</span>

<span class="t-comment">! ── Lock w scope ─────────────────────────────────</span>
<span class="t-kw2">;;</span>scope def
<span class="t-kw">lock</span> <span class="t-var">$token_api</span> = <span class="t-str">"$(cat /run/secrets/api_token)"</span>
<span class="t-prefix">.</span><span class="t-func">wyslij_dane</span> <span class="t-var">$token_api</span>
<span class="t-kw">unlock</span> <span class="t-var">$token_api</span>
done</pre></div></div>
</div>
</div>

<!-- ─ SYSDEP / PLUGINY / EXTERN ──────────────────────────────────────────── -->
<div class="section" id="sysdep">
<div class="sec-header"><span class="sec-num">26</span><h2>SysDep / Pluginy / Extern</h2></div>
<p>Trzy mechanizmy rozszerzania: <strong>SysDep</strong> deklaruje wymagane narzędzia systemowe, <strong>Plugin</strong> wywołuje rozszerzenia HackerOS, <strong>Extern</strong> linkuje biblioteki natywne.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">// curl jq git</span></td><td class="td-desc">SysDep — deklaracja wymaganych narzędzi. PLSA zgłasza brak.</td></tr>
<tr><td><span class="td-syntax">\\ plugin-name [args]</span></td><td class="td-desc">Plugin — uruchamia <code>~/.hackeros/hacker-lang/plugins/plugin-name</code></td></tr>
<tr><td><span class="td-syntax">^\\ plugin-name</span></td><td class="td-desc">Plugin z sudo — flagowany przez PLSA jako <code>is_super</code></td></tr>
<tr><td><span class="td-syntax">-- lib.so</span></td><td class="td-desc">Extern dynamiczny — linkuj bibliotekę natywną</td></tr>
<tr><td><span class="td-syntax">-- static lib.a</span></td><td class="td-desc">Extern statyczny — linkuj statycznie</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">rozszerzenia.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── SysDep — wymagane narzędzia systemowe ────────</span>
<span class="t-kw2">//</span> curl jq git docker kubectl
<span class="t-kw2">//</span> openssl sha256sum tar gzip
<span class="t-kw2">//</span> psql redis-cli

<span class="t-comment">! ── Pluginy — ~/.hackeros/hacker-lang/plugins/ ───</span>
\\ docker-build <span class="t-var">$IMAGE</span>:<span class="t-var">$TAG</span>
\\ k8s-deploy --env <span class="t-var">$ENV</span> --image <span class="t-var">$IMAGE</span>
\\ notify-slack <span class="t-str">"Deploy $TAG done"</span>
\\ health-check <span class="t-var">$HOST</span> <span class="t-var">$PORT</span> --retry 3

<span class="t-comment">! ── Plugin z sudo ────────────────────────────────</span>
<span class="t-op">^</span>\\ firewall-update --allow <span class="t-var">$IP</span>
<span class="t-op">^</span>\\ system-update --full

<span class="t-comment">! ── Extern dynamiczny ────────────────────────────</span>
-- /usr/lib/libssl.so
-- /usr/local/lib/libsqlite3.so

<span class="t-comment">! ── Extern statyczny ─────────────────────────────</span>
-- static /usr/lib/libz.a
-- static ./vendor/libhackeros.a

<span class="t-comment">! ── Sprawdzenie pluginów przez PLSA ──────────────</span>
<span class="t-comment">! hl-plsa skrypt.hl --check-plugins</span>
<span class="t-comment">!   ✓ linia   5 — \\docker-build</span>
<span class="t-comment">!   ✓ linia   6 — \\k8s-deploy</span>
<span class="t-comment">!   ✗ linia   7 — \\notify-slack  ← BRAK pliku!</span></pre></div></div>
</div>
</div>

<!-- ─ RAW BLOCK ──────────────────────────────────────────────────────────── -->
<div class="section" id="raw">
<div class="sec-header"><span class="sec-num">27</span><h2>Raw Block / Moduły</h2></div>
<p><strong>Raw block</strong> — wieloliniowy blok surowego kodu bashowego, bez parsowania przez HL. <strong>Module call</strong> — wywołanie metody modułu z biblioteki (np. <code>http.get</code>, <code>json.parse</code>).</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">raw.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">! ── Raw block [ ... ] ────────────────────────────</span>
[
  #!/bin/bash
  set -euo pipefail

  if [ -z "$HOST" ]; then
    echo "HOST nie ustawiony" &gt;&amp;2
    exit 1
    fi

    for i in $(seq 1 5); do
      curl -sf "$HOST/health" && break
      sleep $((i * 2))
      done
]

<span class="t-comment">! ── Module call (moduły bibliotek) ───────────────</span>
<span class="t-var">$dane</span>  = await <span class="t-func">http.get</span> <span class="t-str">"https://api.example.com"</span>
<span class="t-var">$json</span>  = await <span class="t-func">json.parse</span> <span class="t-var">$dane</span>
<span class="t-var">$hash</span>  = await <span class="t-func">crypto.sha256</span> <span class="t-var">$body</span>
<span class="t-var">$token</span> = await <span class="t-func">auth.jwt_sign</span> <span class="t-var">$payload</span> <span class="t-var">$SECRET</span>
<span class="t-var">$ts</span>    = await <span class="t-func">time.now_unix</span>
<span class="t-var">$fmt</span>   = await <span class="t-func">string.format</span> <span class="t-str">"%.2f"</span> <span class="t-var">$liczba</span>

<span class="t-comment">! ── Pipe z modułami ──────────────────────────────</span>
<span class="t-func">http.get</span> <span class="t-str">"$API/users"</span> <span class="t-prefix">|&gt;</span> <span class="t-func">json.parse</span> <span class="t-prefix">|&gt;</span> <span class="t-func">log.info</span></pre></div></div>
</div>
</div>
`;
