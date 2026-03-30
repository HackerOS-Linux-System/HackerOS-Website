window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['organizacja'] = `
<!-- ─ FUNKCJE ──────────────────────────────────────────────────────────── -->
<div class="section" id="funkcje">
<div class="sec-header"><span class="sec-num">11</span><h2>Funkcje</h2></div>
<p>Funkcje definiuje się przez <code>fn nazwa(params) -> typ do...end</code>. Widoczność: <code>pub fn</code> — publiczna. Skrótowa forma jednolinijkowa: <code>fn nazwa(params) -> typ = wyrażenie</code>.</p>
<table class="ref-table">
<tr><th>Składnia</th><th>Opis</th></tr>
<tr><td><span class="td-syntax">fn nazwa() do...end</span></td><td class="td-desc">Prosta funkcja bez parametrów i zwracanej wartości</td></tr>
<tr><td><span class="td-syntax">fn nazwa(a: int, b: int) -> int do...end</span></td><td class="td-desc">Z parametrami i typem zwracanym</td></tr>
<tr><td><span class="td-syntax">pub fn nazwa() -> string do...end</span></td><td class="td-desc">Funkcja publiczna — eksportowana z modułu</td></tr>
<tr><td><span class="td-syntax">fn nazwa(n: int) -> int = n * n</span></td><td class="td-desc">Jednolinijkowa — skrót dla prostych wyrażeń</td></tr>
<tr><td><span class="td-syntax">fn unsafe nazwa() do...end</span></td><td class="td-desc">Niebezpieczna funkcja — wymagane <code>unsafe</code> przy wywołaniu</td></tr>
</table>
<div class="code-block">
<div class="code-header"><span class="code-filename">funkcje.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Prosta funkcja ────────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">powitaj</span>() <span class="t-kw">do</span>
println(<span class="t-str">"Witaj w H#!"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── Z parametrami i typem zwracanym ──────────────</span>
<span class="t-kw">fn</span> <span class="t-func">dodaj</span>(a: int, b: int) -> int <span class="t-kw">do</span>
return a + b
<span class="t-kw">end</span>

<span class="t-comment"># ── Jednolinijkowa skrótowa forma ─────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">kwadrat</span>(n: int) -> int = n * n
<span class="t-kw">fn</span> <span class="t-func">powitanie</span>(name: string) -> string = <span class="t-str">"Cześć, "</span> + name + <span class="t-str">"!"</span>

<span class="t-comment"># ── Rekurencja ─────────────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">silnia</span>(n: int) -> int <span class="t-kw">do</span>
<span class="t-kw">if</span> n <= <span class="t-num">1</span> <span class="t-kw">do</span>
return <span class="t-num">1</span>
<span class="t-kw">end</span>
return n * silnia(n - <span class="t-num">1</span>)
<span class="t-kw">end</span>

<span class="t-comment"># ── Publiczna (eksportowana) ─────────────────────</span>
<span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">xor_bytes</span>(data: bytes, key: bytes) -> bytes <span class="t-kw">do</span>
<span class="t-comment"># implementacja...</span>
return data
<span class="t-kw">end</span>

<span class="t-comment"># ── Parametry niemutowalne i mutowalne ───────────</span>
<span class="t-kw">fn</span> <span class="t-func">process</span>(<span class="t-kw">mut</span> buf: bytes, size: int) -> bytes <span class="t-kw">do</span>
return buf
<span class="t-kw">end</span>

<span class="t-comment"># ── Wywołania funkcji ─────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
powitaj()
<span class="t-kw">let</span> wynik: int = dodaj(<span class="t-num">40</span>, <span class="t-num">2</span>)
println(<span class="t-str">"40+2 = "</span> + to_string(wynik))
println(<span class="t-str">"5! = "</span> + to_string(silnia(<span class="t-num">5</span>)))
println(<span class="t-str">"7^2 = "</span> + to_string(kwadrat(<span class="t-num">7</span>)))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ STRUCTS ─────────────────────────────────────────────────────────────── -->
<div class="section" id="struktury">
<div class="sec-header"><span class="sec-num">12</span><h2>Structs &amp; Impl</h2></div>
<p>Struktury grupują pola. Implementacje (<code>impl</code>) dodają metody. Dostęp do pola: <code>self.pole</code>. Konstruktor: literał <code>NazwaStruct { pole: wartość }</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">structs.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Definicja struct ──────────────────────────────</span>
<span class="t-kw">struct</span> Packet <span class="t-kw">do</span>
<span class="t-kw">pub</span> src_ip: string
<span class="t-kw">pub</span> dst_ip: string
<span class="t-kw">pub</span> port: int
<span class="t-kw">pub</span> data: bytes
<span class="t-kw">end</span>

<span class="t-comment"># ── Implementacja metod ───────────────────────────</span>
<span class="t-kw">impl</span> Packet <span class="t-kw">do</span>
<span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">new</span>(src: string, dst: string, port: int) -> Packet <span class="t-kw">do</span>
return Packet {
    src_ip: src,
    dst_ip: dst,
    port: port,
    data: []
}
<span class="t-kw">end</span>

<span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">summary</span>(self) -> string <span class="t-kw">do</span>
return self.src_ip + <span class="t-str">" -> "</span> + self.dst_ip + <span class="t-str">":"</span> + to_string(self.port)
<span class="t-kw">end</span>

<span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">data_hex</span>(self) -> string <span class="t-kw">do</span>
return self.data.to_hex()
<span class="t-kw">end</span>

<span class="t-kw">pub</span> <span class="t-kw">fn</span> <span class="t-func">is_encrypted</span>(self) -> bool <span class="t-kw">do</span>
return self.port == <span class="t-num">443</span> || self.port == <span class="t-num">8443</span>
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Użycie ─────────────────────────────────────────</span>
<span class="t-kw">let</span> pkt = Packet.new(<span class="t-str">"10.0.0.1"</span>, <span class="t-str">"192.168.1.1"</span>, <span class="t-num">443</span>)
println(pkt.summary())
println(<span class="t-str">"Encrypted: "</span> + to_string(pkt.is_encrypted()))</pre></div></div>
</div>
</div>

<!-- ─ TRAITS ─────────────────────────────────────────────────────────────── -->
<div class="section" id="traits">
<div class="sec-header"><span class="sec-num">13</span><h2>Traits</h2></div>
<p>Traits definiują interfejsy — zestaw metod które typ musi implementować. Mogą mieć domyślne implementacje. Impl z traitem: <code>impl Typ: Trait do...end</code>.</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">traits.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span></div>
<div class="code-inner"><pre><span class="t-comment"># ── Definicja trait ───────────────────────────────</span>
<span class="t-kw">trait</span> Scanner <span class="t-kw">do</span>
<span class="t-kw">fn</span> <span class="t-func">scan</span>(self, target: string) -> bool
<span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string
<span class="t-comment"># Domyślna implementacja:</span>
<span class="t-kw">fn</span> <span class="t-func">description</span>(self) -> string <span class="t-kw">do</span>
return <span class="t-str">"Scanner: "</span> + self.name()
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Struct ────────────────────────────────────────</span>
<span class="t-kw">struct</span> TcpScanner <span class="t-kw">do</span>
<span class="t-kw">pub</span> timeout: int
<span class="t-kw">end</span>

<span class="t-comment"># ── Implementacja trait ───────────────────────────</span>
<span class="t-kw">impl</span> TcpScanner: Scanner <span class="t-kw">do</span>
<span class="t-kw">fn</span> <span class="t-func">scan</span>(self, target: string) -> bool <span class="t-kw">do</span>
<span class="t-comment"># logika skanowania TCP...</span>
return <span class="t-kw">true</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string = <span class="t-str">"TCP Scanner"</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Użycie ─────────────────────────────────────────</span>
<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-kw">let</span> scanner = TcpScanner { timeout: <span class="t-num">5000</span> }
println(scanner.name())
println(scanner.description())
<span class="t-kw">let</span> open: bool = scanner.scan(<span class="t-str">"192.168.1.1"</span>)
println(<span class="t-str">"Open: "</span> + to_string(open))
<span class="t-kw">end</span></pre></div></div>
</div>
</div>
`;
