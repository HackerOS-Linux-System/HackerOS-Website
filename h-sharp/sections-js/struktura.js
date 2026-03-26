window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['struktura'] = `
<div class="section" id="struktura">
<div class="sec-header"><span class="sec-num">02</span><h2>Struktura pliku</h2></div>
<p>Konwencja organizacji kodu. PLSA weryfikuje kolejność sekcji i raportuje odchylenia.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">szablon.hl</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>
<div class="code-inner"><pre><span class="t-comment">! ── 1. Metadata i stałe ──────────────────────────</span>
<span class="t-var">@PROGRAM</span>=<span class="t-str">"moj-skrypt"</span>
<span class="t-var">@WERSJA</span>=<span class="t-str">"1.0.0"</span>
<span class="t-var">@AUTOR</span>=<span class="t-str">"HackerOS"</span>
<span class="t-const">%</span>MAX_RETRY=<span class="t-str">"3"</span>
<span class="t-const">%</span>TIMEOUT=<span class="t-str">"30"</span>

<span class="t-comment">! ── 2. Biblioteki ────────────────────────────────</span>
<span class="t-lib">#&lt;core/http:1.3&gt;</span>
<span class="t-lib">#&lt;core/json:1.0&gt;</span>
<span class="t-lib">#&lt;bytes/sqlite3&gt;</span>

<span class="t-comment">! ── 3. Zależności systemowe ──────────────────────</span>
<span class="t-kw2">//</span> curl jq git docker

<span class="t-comment">! ── 4. Typy: enum, struct, interface, ADT ────────</span>
<span class="t-op">==</span> Status [ok, error, pending]
<span class="t-kw">struct</span> Config [host: str, port: int, debug: bool]
<span class="t-op">==</span>interface Serializable [to_json, from_json]

<span class="t-comment">! ── 5. Klasy ─────────────────────────────────────</span>
<span class="t-kw2">;;</span><span class="t-func">Logger</span> def
<span class="t-kw2">:</span><span class="t-func">info</span> def <span class="t-kw">log</span> <span class="t-str">"[INFO] $1"</span> done
done

<span class="t-comment">! ── 6. Funkcje ───────────────────────────────────</span>
<span class="t-kw2">:</span><span class="t-func">inicjalizuj</span> def
<span class="t-kw">log</span> <span class="t-str">"Start: $PROGRAM v$WERSJA"</span>
done

<span class="t-comment">! ── 7. Logika główna ─────────────────────────────</span>
<span class="t-prefix">.</span><span class="t-func">inicjalizuj</span>
<span class="t-kw">end</span> 0</pre></div></div>
</div>
<div class="callout c-tip"><div class="ci">💡</div><div class="cb"><strong>Konwencja:</strong> Zachowaj kolejność sekcji. PLSA lepiej analizuje kod w standardowej strukturze. Jedna klasa = jeden plik dla dużych projektów.</div></div>
</div>
`;
