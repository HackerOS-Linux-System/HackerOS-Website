window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['przyklady'] = `
<!-- ─ EX1: Hello World ──────────────────────────────────────────────────── -->
<div class="section" id="ex1">
<div class="sec-header"><span class="sec-num">EX-1</span><h2>Hello World</h2></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">hello.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span></div>
<div class="code-inner"><pre><span class="t-comment"># H# Hello World</span>

<span class="t-kw">fn</span> <span class="t-func">greet</span>(name: string) -> string <span class="t-kw">do</span>
return <span class="t-str">"Hello, "</span> + name + <span class="t-str">"!"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
println(greet(<span class="t-str">"H#"</span>))
println(greet(<span class="t-str">"cybersec"</span>))

<span class="t-kw">let</span> x: int = <span class="t-num">42</span>
println(<span class="t-str">"Odpowiedź: "</span> + to_string(x))
<span class="t-kw">end</span></pre></div></div>
</div>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment"># Tryb preview (interpreter)</span>
hsharp preview hello.h#

<span class="t-comment"># Kompilacja do natywnej binarki</span>
hsharp build
./hello</pre></div></div>
</div>
</div>

<!-- ─ EX2: Port Scanner ──────────────────────────────────────────────────── -->
<div class="section" id="ex2">
<div class="sec-header"><span class="sec-num">EX-2</span><h2>Port Scanner</h2><span class="sec-badge">struct · match · for · unsafe arena</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">port_scanner.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span><span>49</span><span>50</span><span>51</span><span>52</span></div>
<div class="code-inner"><pre><span class="t-comment"># H# Port Scanner — przykład cybersec</span>
<span class="t-kw">import</span> <span class="t-str">"std:io::net"</span>

<span class="t-kw">struct</span> ScanResult <span class="t-kw">do</span>
<span class="t-kw">pub</span> host: string
<span class="t-kw">pub</span> port: int
<span class="t-kw">pub</span> open: bool
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">classify_port</span>(port: int) -> string <span class="t-kw">do</span>
<span class="t-kw">match</span> port <span class="t-kw">do</span>
<span class="t-num">21</span>   => <span class="t-str">"FTP"</span>
<span class="t-num">22</span>   => <span class="t-str">"SSH"</span>
<span class="t-num">23</span>   => <span class="t-str">"Telnet"</span>
<span class="t-num">25</span>   => <span class="t-str">"SMTP"</span>
<span class="t-num">53</span>   => <span class="t-str">"DNS"</span>
<span class="t-num">80</span>   => <span class="t-str">"HTTP"</span>
<span class="t-num">443</span>  => <span class="t-str">"HTTPS"</span>
<span class="t-num">445</span>  => <span class="t-str">"SMB"</span>
<span class="t-num">3306</span> => <span class="t-str">"MySQL"</span>
<span class="t-num">5432</span> => <span class="t-str">"PostgreSQL"</span>
<span class="t-num">6379</span> => <span class="t-str">"Redis"</span>
<span class="t-num">8080</span> => <span class="t-str">"HTTP-Alt"</span>
_    => <span class="t-str">"Unknown"</span>
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">scan_range</span>(host: string, start_port: int, end_port: int) <span class="t-kw">do</span>
println(<span class="t-str">"Scanning "</span> + host + <span class="t-str">" ports "</span> + to_string(start_port) + <span class="t-str">".."</span> + to_string(end_port))
println(<span class="t-str">""</span>)
<span class="t-kw">let</span> <span class="t-kw">mut</span> open_count: int = <span class="t-num">0</span>

<span class="t-kw">for</span> port <span class="t-kw">in</span> start_port..=end_port <span class="t-kw">do</span>
<span class="t-comment"># Symulacja — w pełnej implementacji: tcp::scan_port(host, port as u16)</span>
<span class="t-kw">let</span> open: bool = port == <span class="t-num">22</span> || port == <span class="t-num">80</span> || port == <span class="t-num">443</span>
<span class="t-kw">if</span> open <span class="t-kw">do</span>
open_count += <span class="t-num">1</span>
<span class="t-kw">let</span> svc: string = classify_port(port)
println(<span class="t-str">"[OPEN] "</span> + to_string(port) + <span class="t-str">"/tcp  "</span> + svc)
<span class="t-kw">end</span>
<span class="t-kw">end</span>

println(<span class="t-str">""</span>)
println(<span class="t-str">"Scan complete. Open: "</span> + to_string(open_count))
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
println(<span class="t-str">"╔══════════════════════════╗"</span>)
println(<span class="t-str">"║  H# Port Scanner v0.1   ║"</span>)
println(<span class="t-str">"╚══════════════════════════╝"</span>)
println(<span class="t-str">""</span>)

<span class="t-comment"># Skan z użyciem unsafe arena dla buforowania</span>
<span class="t-kw">unsafe</span> arena(<span class="t-num">65536</span>) <span class="t-kw">do</span>
scan_range(<span class="t-str">"192.168.1.1"</span>, <span class="t-num">1</span>, <span class="t-num">1024</span>)
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ EX3: XOR Cipher ────────────────────────────────────────────────────── -->
<div class="section" id="ex3">
<div class="sec-header"><span class="sec-num">EX-3</span><h2>XOR Cipher + Hex encoding</h2><span class="sec-badge">bytes · crypto · encoding</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">xor_cipher.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>
<div class="code-inner"><pre><span class="t-comment"># H# XOR Cipher — manipulacja bajtami</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::hex"</span>
<span class="t-kw">import</span> <span class="t-str">"std:encoding::base64"</span>

<span class="t-kw">fn</span> <span class="t-func">xor_encrypt</span>(data: bytes, key: bytes) -> bytes <span class="t-kw">do</span>
<span class="t-comment"># std:crypto::bytes::xor w pełnej wersji</span>
return data
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">print_hex</span>(label: string, data: bytes) <span class="t-kw">do</span>
println(label + <span class="t-str">": "</span> + data.to_hex())
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
println(<span class="t-str">"H# XOR Cipher Tool"</span>)
println(<span class="t-str">"══════════════════"</span>)
println(<span class="t-str">""</span>)

<span class="t-kw">let</span> plaintext: bytes = [<span class="t-num">0x48</span>, <span class="t-num">0x65</span>, <span class="t-num">0x6C</span>, <span class="t-num">0x6C</span>, <span class="t-num">0x6F</span>] <span class="t-comment"># "Hello"</span>
<span class="t-kw">let</span> key: bytes = [<span class="t-num">0xAA</span>, <span class="t-num">0xBB</span>, <span class="t-num">0xCC</span>, <span class="t-num">0xDD</span>, <span class="t-num">0xEE</span>]

print_hex(<span class="t-str">"Plaintext "</span>, plaintext)
print_hex(<span class="t-str">"Key       "</span>, key)

<span class="t-kw">let</span> ciphertext: bytes = xor_encrypt(plaintext, key)
print_hex(<span class="t-str">"Ciphertext"</span>, ciphertext)

println(<span class="t-str">""</span>)

<span class="t-comment"># Hex decode/encode</span>
<span class="t-kw">let</span> h: string = hex::encode(plaintext)
println(<span class="t-str">"Hex: "</span> + h)

<span class="t-comment"># Base64</span>
<span class="t-kw">let</span> b64: string = base64::encode(plaintext)
println(<span class="t-str">"Base64: "</span> + b64)
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ EX4: Struct + Trait + Enum ─────────────────────────────────────────── -->
<div class="section" id="ex4">
<div class="sec-header"><span class="sec-num">EX-4</span><h2>Struct + Trait + Enum — sieciowy ADT</h2><span class="sec-badge">struct · trait · enum · impl · match</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">network_adt.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span></div>
<div class="code-inner"><pre><span class="t-comment"># H# Network ADT — typy wynikowe</span>

<span class="t-comment"># ── Enum — wynik skanowania ───────────────────────</span>
<span class="t-kw">enum</span> PortStatus <span class="t-kw">do</span>
Open
Closed
Filtered(string)
Error(int, string)
<span class="t-kw">end</span>

<span class="t-comment"># ── Struct — pakiet sieciowy ──────────────────────</span>
<span class="t-kw">struct</span> Packet <span class="t-kw">do</span>
<span class="t-kw">pub</span> src: string
<span class="t-kw">pub</span> dst: string
<span class="t-kw">pub</span> port: u16
<span class="t-kw">pub</span> payload: bytes
<span class="t-kw">end</span>

<span class="t-comment"># ── Trait — analizator pakietów ───────────────────</span>
<span class="t-kw">trait</span> Analyzer <span class="t-kw">do</span>
<span class="t-kw">fn</span> <span class="t-func">analyze</span>(self, pkt: Packet) -> PortStatus
<span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string
<span class="t-kw">fn</span> <span class="t-func">report</span>(self) -> string <span class="t-kw">do</span>
return <span class="t-str">"Analyzer: "</span> + self.name()
<span class="t-kw">end</span>
<span class="t-kw">end</span>

<span class="t-comment"># ── Struct — konkretny analizator ─────────────────</span>
<span class="t-kw">struct</span> TcpAnalyzer <span class="t-kw">do</span>
<span class="t-kw">pub</span> timeout_ms: int
<span class="t-kw">end</span>

<span class="t-kw">impl</span> TcpAnalyzer: Analyzer <span class="t-kw">do</span>
<span class="t-kw">fn</span> <span class="t-func">analyze</span>(self, pkt: Packet) -> PortStatus <span class="t-kw">do</span>
<span class="t-kw">if</span> pkt.port == <span class="t-num">0</span> <span class="t-kw">do</span>
return PortStatus::Error(<span class="t-num">1</span>, <span class="t-str">"port 0 niedozwolony"</span>)
<span class="t-kw">end</span>
return PortStatus::Open
<span class="t-kw">end</span>
<span class="t-kw">fn</span> <span class="t-func">name</span>(self) -> string = <span class="t-str">"TCP Analyzer"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-kw">let</span> analyzer = TcpAnalyzer { timeout_ms: <span class="t-num">5000</span> }
<span class="t-kw">let</span> pkt = Packet { src: <span class="t-str">"10.0.0.1"</span>, dst: <span class="t-str">"192.168.1.1"</span>, port: <span class="t-num">443</span>, payload: [] }

<span class="t-kw">let</span> result: PortStatus = analyzer.analyze(pkt)

<span class="t-kw">match</span> result <span class="t-kw">do</span>
Open           => println(<span class="t-str">"Port OTWARTY"</span>)
Closed         => println(<span class="t-str">"Port zamknięty"</span>)
Filtered(msg)  => println(<span class="t-str">"Filtrowany: "</span> + msg)
Error(code, m) => println(<span class="t-str">"Błąd "</span> + to_string(code) + <span class="t-str">": "</span> + m)
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ EX5: Factorial + Match ─────────────────────────────────────────────── -->
<div class="section" id="ex5">
<div class="sec-header"><span class="sec-num">EX-5</span><h2>Algorytmy — rekurencja i pętle</h2><span class="sec-badge">for · while · fn · rekurencja</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">algorytmy.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span></div>
<div class="code-inner"><pre><span class="t-comment"># Rekurencja — silnia</span>
<span class="t-kw">fn</span> <span class="t-func">factorial</span>(n: int) -> int <span class="t-kw">do</span>
<span class="t-kw">if</span> n <= <span class="t-num">1</span> <span class="t-kw">do</span>
return <span class="t-num">1</span>
<span class="t-kw">end</span>
return n * factorial(n - <span class="t-num">1</span>)
<span class="t-kw">end</span>

<span class="t-comment"># Fibonacci iteracyjny</span>
<span class="t-kw">fn</span> <span class="t-func">fibonacci</span>(n: int) -> int <span class="t-kw">do</span>
<span class="t-kw">if</span> n <= <span class="t-num">1</span> <span class="t-kw">do</span>
return n
<span class="t-kw">end</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> a: int = <span class="t-num">0</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> b: int = <span class="t-num">1</span>
<span class="t-kw">for</span> _ <span class="t-kw">in</span> <span class="t-num">2</span>..=n <span class="t-kw">do</span>
<span class="t-kw">let</span> tmp: int = a + b
a = b
b = tmp
<span class="t-kw">end</span>
return b
<span class="t-kw">end</span>

<span class="t-comment"># Suma zakresu</span>
<span class="t-kw">fn</span> <span class="t-func">sum_range</span>(start: int, end: int) -> int <span class="t-kw">do</span>
<span class="t-kw">let</span> <span class="t-kw">mut</span> total: int = <span class="t-num">0</span>
<span class="t-kw">for</span> i <span class="t-kw">in</span> start..=end <span class="t-kw">do</span>
total += i
<span class="t-kw">end</span>
return total
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
println(<span class="t-str">"10! = "</span> + to_string(factorial(<span class="t-num">10</span>)))
println(<span class="t-str">"fib(10) = "</span> + to_string(fibonacci(<span class="t-num">10</span>)))
println(<span class="t-str">"sum(1..5) = "</span> + to_string(sum_range(<span class="t-num">1</span>, <span class="t-num">5</span>)))

<span class="t-comment"># Tablica portów</span>
<span class="t-kw">let</span> common_ports: [int] = [<span class="t-num">21</span>, <span class="t-num">22</span>, <span class="t-num">80</span>, <span class="t-num">443</span>, <span class="t-num">3306</span>]
<span class="t-kw">let</span> <span class="t-kw">mut</span> i: int = <span class="t-num">0</span>
<span class="t-kw">while</span> i < len(common_ports) <span class="t-kw">do</span>
println(<span class="t-str">"port: "</span> + to_string(common_ports[i]))
i += <span class="t-num">1</span>
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ EX6: Pełny projekt cybersec ──────────────────────────────────────── -->
<div class="section" id="ex6">
<div class="sec-header"><span class="sec-num">EX-6</span><h2>Pełny projekt — CyberSec Tool</h2><span class="sec-badge">struct · impl · trait · enum · for · match · bytes</span></div>
<div class="code-block">
<div class="code-header"><span class="code-filename">cybersec_tool.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>32</span><span>33</span><span>34</span><span>35</span><span>36</span><span>37</span><span>38</span><span>39</span><span>40</span><span>41</span><span>42</span><span>43</span><span>44</span><span>45</span><span>46</span><span>47</span><span>48</span><span>49</span><span>50</span><span>51</span><span>52</span><span>53</span><span>54</span><span>55</span><span>56</span><span>57</span><span>58</span><span>59</span><span>60</span></div>
<div class="code-inner"><pre><span class="t-comment"># H# CyberSec Tool — pełny przykład</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::hex"</span>
<span class="t-kw">import</span> <span class="t-str">"std:io::keyboard"</span>

<span class="t-comment"># ── Typy ──────────────────────────────────────────</span>
<span class="t-kw">enum</span> ScanMode <span class="t-kw">do</span>
Quick
Full
Stealth
<span class="t-kw">end</span>

<span class="t-kw">struct</span> Target <span class="t-kw">do</span>
<span class="t-kw">pub</span> host: string
<span class="t-kw">pub</span> port_start: int
<span class="t-kw">pub</span> port_end: int
<span class="t-kw">pub</span> mode: ScanMode
<span class="t-kw">end</span>

<span class="t-kw">struct</span> Finding <span class="t-kw">do</span>
<span class="t-kw">pub</span> port: int
<span class="t-kw">pub</span> service: string
<span class="t-kw">pub</span> banner: string
<span class="t-kw">end</span>

<span class="t-comment"># ── Trait analizatora ─────────────────────────────</span>
<span class="t-kw">trait</span> Auditor <span class="t-kw">do</span>
<span class="t-kw">fn</span> <span class="t-func">audit</span>(self, target: Target) -> [Finding]
<span class="t-kw">fn</span> <span class="t-func">version</span>(self) -> string
<span class="t-kw">end</span>

<span class="t-comment"># ── Implementacja ─────────────────────────────────</span>
<span class="t-kw">struct</span> BasicAuditor <span class="t-kw">do</span>
<span class="t-kw">pub</span> timeout: int
<span class="t-kw">end</span>

<span class="t-kw">impl</span> BasicAuditor: Auditor <span class="t-kw">do</span>
<span class="t-kw">fn</span> <span class="t-func">audit</span>(self, target: Target) -> [Finding] <span class="t-kw">do</span>
<span class="t-kw">let</span> findings: [Finding] = []
<span class="t-kw">for</span> port <span class="t-kw">in</span> target.port_start..=target.port_end <span class="t-kw">do</span>
<span class="t-kw">let</span> is_open: bool = port == <span class="t-num">22</span> || port == <span class="t-num">80</span> || port == <span class="t-num">443</span>
<span class="t-kw">if</span> is_open <span class="t-kw">do</span>
println(<span class="t-str">"[FOUND] "</span> + to_string(port) + <span class="t-str">"/tcp"</span>)
<span class="t-kw">end</span>
<span class="t-kw">end</span>
return findings
<span class="t-kw">end</span>
<span class="t-kw">fn</span> <span class="t-func">version</span>(self) -> string = <span class="t-str">"BasicAuditor v0.1"</span>
<span class="t-kw">end</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
println(<span class="t-str">"H# CyberSec Tool"</span>)
println(<span class="t-str">"════════════════"</span>)

<span class="t-kw">let</span> target = Target {
    host: <span class="t-str">"192.168.1.1"</span>,
    port_start: <span class="t-num">1</span>,
    port_end: <span class="t-num">1024</span>,
    mode: ScanMode::Quick
}

<span class="t-kw">let</span> auditor = BasicAuditor { timeout: <span class="t-num">5000</span> }
println(<span class="t-str">"Using: "</span> + auditor.version())
println(<span class="t-str">"Target: "</span> + target.host)
println(<span class="t-str">""</span>)

<span class="t-kw">unsafe</span> arena(<span class="t-num">1048576</span>) <span class="t-kw">do</span>
<span class="t-kw">let</span> results = auditor.audit(target)
println(<span class="t-str">""</span>)
println(<span class="t-str">"Audit complete."</span>)
<span class="t-kw">end</span>
<span class="t-kw">end</span></pre></div></div>
</div>
</div>

<!-- ─ CHEAT SHEET ────────────────────────────────────────────────────────── -->
<div class="section" id="cheatsheet">
<div class="sec-header"><span class="sec-num">★</span><h2>Cheat Sheet</h2></div>
<div class="grid2">
<div>
<h3>Zmienne</h3>
<table class="ref-table">
<tr><td class="td-syntax">let x: int = 42</td><td class="td-desc">Niemutowalna</td></tr>
<tr><td class="td-syntax">let mut x: int = 0</td><td class="td-desc">Mutowalna</td></tr>
<tr><td class="td-syntax">let x = 42</td><td class="td-desc">Z wnioskowaniem typu</td></tr>
<tr><td class="td-syntax">let arr: [int] = [1,2,3]</td><td class="td-desc">Tablica</td></tr>
<tr><td class="td-syntax">let t: (str, int) = ("x", 1)</td><td class="td-desc">Tuple</td></tr>
<tr><td class="td-syntax">let opt: int? = nil</td><td class="td-desc">Optional</td></tr>
</table>
<h3>Importy</h3>
<table class="ref-table">
<tr><td class="td-syntax">import "std:crypto::hex"</td><td class="td-desc">Std library</td></tr>
<tr><td class="td-syntax">import "bytes:scanner/1.2"</td><td class="td-desc">Bytes package</td></tr>
<tr><td class="td-syntax">import "file:lib.h#"</td><td class="td-desc">Lokalny plik</td></tr>
<tr><td class="td-syntax">import "lib:static::ssl.a"</td><td class="td-desc">Statyczna lib</td></tr>
<tr><td class="td-syntax">~ "dynamic:openssl"</td><td class="td-desc">Dynamiczne linkowanie</td></tr>
<tr><td class="td-syntax">~~ "fast:all"</td><td class="td-desc">Szybka kompilacja</td></tr>
</table>
<h3>Sterowanie</h3>
<table class="ref-table">
<tr><td class="td-syntax">if cond do...end</td><td class="td-desc">If</td></tr>
<tr><td class="td-syntax">elsif cond do...end</td><td class="td-desc">Elsif</td></tr>
<tr><td class="td-syntax">else do...end</td><td class="td-desc">Else</td></tr>
<tr><td class="td-syntax">match x do...end</td><td class="td-desc">Pattern matching</td></tr>
<tr><td class="td-syntax">val => expr</td><td class="td-desc">Ramię match</td></tr>
<tr><td class="td-syntax">_ => expr</td><td class="td-desc">Wildcard match</td></tr>
<tr><td class="td-syntax">while cond do...end</td><td class="td-desc">While</td></tr>
<tr><td class="td-syntax">for i in 0..10 do...end</td><td class="td-desc">For range</td></tr>
<tr><td class="td-syntax">for x in arr do...end</td><td class="td-desc">For each</td></tr>
<tr><td class="td-syntax">break / continue</td><td class="td-desc">Pętla control</td></tr>
</table>
</div>
<div>
<h3>Funkcje i typy</h3>
<table class="ref-table">
<tr><td class="td-syntax">fn name() do...end</td><td class="td-desc">Funkcja</td></tr>
<tr><td class="td-syntax">fn name() -> int = expr</td><td class="td-desc">Jednolinijkowa</td></tr>
<tr><td class="td-syntax">pub fn name() do...end</td><td class="td-desc">Publiczna</td></tr>
<tr><td class="td-syntax">struct S do pub f: T end</td><td class="td-desc">Struct</td></tr>
<tr><td class="td-syntax">impl S do fn m(self) end</td><td class="td-desc">Impl metod</td></tr>
<tr><td class="td-syntax">impl S: Trait do...end</td><td class="td-desc">Impl trait</td></tr>
<tr><td class="td-syntax">trait T do fn m(self) end</td><td class="td-desc">Trait</td></tr>
<tr><td class="td-syntax">enum E do A, B(int) end</td><td class="td-desc">Enum</td></tr>
<tr><td class="td-syntax">return wartość</td><td class="td-desc">Return explicit</td></tr>
</table>
<h3>Unsafe</h3>
<table class="ref-table">
<tr><td class="td-syntax">unsafe do...end</td><td class="td-desc">Blok unsafe</td></tr>
<tr><td class="td-syntax">unsafe arena do...end</td><td class="td-desc">Arena 1MB</td></tr>
<tr><td class="td-syntax">unsafe arena(N) do...end</td><td class="td-desc">Arena N bajtów</td></tr>
<tr><td class="td-syntax">fn unsafe foo() do...end</td><td class="td-desc">Unsafe fn</td></tr>
</table>
<h3>Wbudowane funkcje</h3>
<table class="ref-table">
<tr><td class="td-syntax">println(s)</td><td class="td-desc">Print z \n</td></tr>
<tr><td class="td-syntax">print(s)</td><td class="td-desc">Print bez \n</td></tr>
<tr><td class="td-syntax">to_string(v)</td><td class="td-desc">Konwersja na string</td></tr>
<tr><td class="td-syntax">len(c)</td><td class="td-desc">Długość kolekcji</td></tr>
<tr><td class="td-syntax">parse_int(s)</td><td class="td-desc">string → int?</td></tr>
<tr><td class="td-syntax">assert(c, msg)</td><td class="td-desc">Guard clause</td></tr>
<tr><td class="td-syntax">panic(msg)</td><td class="td-desc">Fail z błędem</td></tr>
<tr><td class="td-syntax">exit(code)</td><td class="td-desc">Zakończ program</td></tr>
</table>
<h3>CLI</h3>
<table class="ref-table">
<tr><td class="td-syntax">hsharp preview file.h#</td><td class="td-desc">Interpreter</td></tr>
<tr><td class="td-syntax">hsharp build</td><td class="td-desc">Kompiluj</td></tr>
<tr><td class="td-syntax">hsharp build --target T</td><td class="td-desc">Cross-kompilacja</td></tr>
<tr><td class="td-syntax">hsharp check</td><td class="td-desc">Sprawdź typy</td></tr>
<tr><td class="td-syntax">hsharp new proj</td><td class="td-desc">Nowy projekt</td></tr>
<tr><td class="td-syntax">hsharp targets</td><td class="td-desc">Lista celów</td></tr>
<tr><td class="td-syntax">bytes add pkg/ver</td><td class="td-desc">Dodaj pakiet</td></tr>
<tr><td class="td-syntax">bytes install</td><td class="td-desc">Zainstaluj deps</td></tr>
</table>
</div>
</div>
</div>
`;
