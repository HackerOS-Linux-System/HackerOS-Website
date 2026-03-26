window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['typy'] = `
<!-- ─ ENUM ──────────────────────────────────────────────────────────────── -->
<div class="section" id="enum">
<div class="sec-header"><span class="sec-num">17</span><h2>Enum</h2></div>
<p>Wyliczenia — zbiór nazwanych stałych. Składnia: <code>== NazwaEnum [w1, w2, ...]</code>. PLSA weryfikuje użycie poprawnych wartości enum w warunkach i match.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">enum.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Definicje enum ───────────────────────────────</span>
<span class="t-op">==</span> Status     [running, stopped, error, pending, unknown]
<span class="t-op">==</span> LogLevel   [debug, info, warn, error, fatal]
<span class="t-op">==</span> HttpMethod [GET, POST, PUT, PATCH, DELETE, HEAD]
<span class="t-op">==</span> DbDriver   [postgres, mysql, sqlite, mongodb, redis]
<span class="t-op">==</span> Srodowisko [production, staging, testing, development]
<span class="t-op">==</span> OsType     [linux, darwin, windows, freebsd]

<span class="t-comment">! ── Użycie z match ───────────────────────────────</span>
<span class="t-kw">match</span> <span class="t-var">$status</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"running"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"✓ Serwis działa"</span>
<span class="t-str">"stopped"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">uruchom_serwis</span>
<span class="t-str">"error"</span>    <span class="t-prefix">&gt;</span> <span class="t-prefix">.</span><span class="t-func">raportuj_blad</span>
<span class="t-str">"pending"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"⏳ Oczekuję..."</span>
_          <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"? Nieznany: $status"</span>

<span class="t-comment">! ── Enum w funkcji loggera ───────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">log_msg</span> [str str -> null] def
<span class="t-kw">match</span> <span class="t-var">$1</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"debug"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"[DBG] $2"</span>
<span class="t-str">"info"</span>   <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"[INF] $2"</span>
<span class="t-str">"warn"</span>   <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"[WRN] $2"</span> &gt;&amp;2
<span class="t-str">"error"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"[ERR] $2"</span> &gt;&amp;2
<span class="t-str">"fatal"</span>  <span class="t-prefix">&gt;</span> <span class="t-prefix">&gt;</span> echo <span class="t-str">"[FAT] $2"</span> &gt;&amp;2; <span class="t-kw">end</span> 1
done</pre></div></div>
</div>
</div>

<!-- ─ STRUCT ─────────────────────────────────────────────────────────────── -->
<div class="section" id="struct">
<div class="sec-header"><span class="sec-num">18</span><h2>Struct / ADT</h2><span class="sec-badge">v2: typy algebraiczne</span></div>
<p>Struktury to nazwane zestawy pól z typami. ADT (<code>==type</code>) to wariantowe typy algebraiczne — każdy wariant może mieć własne pola.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">struct Nazwa [pole: typ, ...]</span></td><td class="td-desc">Prosta struktura z polami. PLSA sprawdza typy.</td></tr>
<tr><td><span class="td-syntax">==type Nazwa [Wariant1 [p: t], Wariant2, ...]</span></td><td class="td-desc">Typ algebraiczny (ADT) — warianty z opcjonalnymi polami</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">typy.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── Struct ───────────────────────────────────────</span>
<span class="t-kw">struct</span> Config   [host: str, port: int, debug: bool, timeout: int]
<span class="t-kw">struct</span> User     [id: int, name: str, email: str, role: str]
<span class="t-kw">struct</span> Response [code: int, body: str, ok: bool]
<span class="t-kw">struct</span> Metryka  [name: str, value: float, ts: int]

<span class="t-comment">! ── Tworzenie przez mapę ──────────────────────────</span>
<span class="t-var">$cfg</span>  = {host: <span class="t-str">"db.prod"</span>, port: <span class="t-str">"5432"</span>, debug: <span class="t-str">"false"</span>, timeout: <span class="t-str">"30"</span>}
<span class="t-var">$user</span> = {id: <span class="t-str">"1"</span>, name: <span class="t-str">"Anna"</span>, email: <span class="t-str">"anna@x.com"</span>, role: <span class="t-str">"admin"</span>}

<span class="t-comment">! ── Dostęp do pól ────────────────────────────────</span>
<span class="t-var">$host</span>=<span class="t-str">"$(cfg.host)"</span>
<span class="t-kw">log</span> <span class="t-str">"Łączę z $host:$(cfg.port)"</span>

<span class="t-comment">! ── ADT — typy algebraiczne (v2) ─────────────────</span>
<span class="t-op">==</span>type Wynik [
    Ok   [value: str],
Err  [code: int, msg: str],
None
]

<span class="t-op">==</span>type Ksztalt [
    Kolo      [promien: float],
Prostokat [szerokosc: float, wysokosc: float],
Punkt
]

<span class="t-op">==</span>type WsMsg [
    Tekst   [dane: str],
Binarny [bajty: str],
Ping, Pong,
Zamknij [kod: int, powod: str]
]

<span class="t-comment">! ── ADT z match ──────────────────────────────────</span>
<span class="t-kw">match</span> <span class="t-var">$wynik</span> <span class="t-prefix">|&gt;</span>
<span class="t-str">"Ok"</span>   <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Sukces: $(wynik.value)"</span>
<span class="t-str">"Err"</span>  <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Błąd $(wynik.code): $(wynik.msg)"</span>
<span class="t-str">"None"</span> <span class="t-prefix">&gt;</span> <span class="t-kw">log</span> <span class="t-str">"Brak wartości"</span></pre></div></div>
</div>
</div>
`;
