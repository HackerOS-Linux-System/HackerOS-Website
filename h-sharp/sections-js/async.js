window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['async'] = `
<!-- ─ STD LIBRARY ────────────────────────────────────────────────────────── -->
<div class="section" id="spawn">
<div class="sec-header"><span class="sec-num">20</span><h2>Biblioteka standardowa — std</h2></div>
<p>H# posiada bogatą bibliotekę std skupioną na zastosowaniach cybersec. Importuj moduły przez <code>import "std:modul::podmodul"</code>. Wszystkie wbudowane w binarkę.</p>

<h3>std:io — wejście/wyjście</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_io.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span></div>
<div class="code-inner"><pre><span class="t-kw">import</span> <span class="t-str">"std:io::keyboard"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-comment"># Odczyt linii ze stdin</span>
<span class="t-kw">let</span> input: string = keyboard::read_line(<span class="t-str">"Podaj cel (IP/host): "</span>)
println(<span class="t-str">"Cel: "</span> + input)

<span class="t-comment"># Wbudowane bez importu:</span>
println(<span class="t-str">"standardowy output"</span>)    <span class="t-comment"># z nową linią</span>
print(<span class="t-str">"bez nowej linii"</span>)        <span class="t-comment"># bez \n</span>
to_string(<span class="t-num">42</span>)                  <span class="t-comment"># konwersja na string</span>
len(<span class="t-str">"hello"</span>)                    <span class="t-comment"># długość = 5</span>
parse_int(<span class="t-str">"42"</span>)               <span class="t-comment"># string → int?</span>
assert(<span class="t-kw">true</span>, <span class="t-str">"msg"</span>)          <span class="t-comment"># guard clause</span>
panic(<span class="t-str">"nieoczekiwany błąd"</span>)   <span class="t-comment"># zatrzymaj z błędem</span>
exit(<span class="t-num">0</span>)                        <span class="t-comment"># kod wyjścia</span>
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std:crypto — kryptografia</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_crypto.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="line-nums"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span></div>
<div class="code-inner"><pre><span class="t-kw">import</span> <span class="t-str">"std:crypto::hex"</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::hash"</span>
<span class="t-kw">import</span> <span class="t-str">"std:crypto::bytes"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-comment"># Hex encode/decode</span>
<span class="t-kw">let</span> raw: bytes = [<span class="t-num">0xDE</span>, <span class="t-num">0xAD</span>, <span class="t-num">0xBE</span>, <span class="t-num">0xEF</span>]
<span class="t-kw">let</span> encoded: string = hex::encode(raw)    <span class="t-comment"># "deadbeef"</span>
<span class="t-kw">let</span> decoded: bytes = hex::decode(encoded)  <span class="t-comment"># z powrotem</span>

<span class="t-comment"># Prosty hash (FNV-1a)</span>
<span class="t-kw">let</span> h: u64 = hash::simple_hash(raw)
println(<span class="t-str">"Hash: "</span> + to_string(h))

<span class="t-comment"># XOR bytes</span>
<span class="t-kw">let</span> data: bytes = [<span class="t-num">0x41</span>, <span class="t-num">0x42</span>, <span class="t-num">0x43</span>]
<span class="t-kw">let</span> key: bytes = [<span class="t-num">0xAA</span>]
<span class="t-kw">let</span> xored: bytes = crypto_bytes::xor(data, key)
println(<span class="t-str">"XOR: "</span> + xored.to_hex())

<span class="t-comment"># ROT13</span>
<span class="t-kw">let</span> rot: string = crypto_bytes::rot13(<span class="t-str">"Hello"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std:encoding — kodowanie</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_encoding.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">import</span> <span class="t-str">"std:encoding::base64"</span>
<span class="t-kw">import</span> <span class="t-str">"std:encoding::url"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-comment"># Base64</span>
<span class="t-kw">let</span> data: bytes = [<span class="t-num">72</span>, <span class="t-num">101</span>, <span class="t-num">108</span>, <span class="t-num">108</span>, <span class="t-num">111</span>]
<span class="t-kw">let</span> b64: string = base64::encode(data)   <span class="t-comment"># "SGVsbG8="</span>
println(<span class="t-str">"Base64: "</span> + b64)

<span class="t-comment"># URL encoding</span>
<span class="t-kw">let</span> plain: string = <span class="t-str">"hello world &amp; more"</span>
<span class="t-kw">let</span> encoded: string = url::encode(plain)
println(<span class="t-str">"URL: "</span> + encoded)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std:io::net — sieć TCP/UDP</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_net.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">import</span> <span class="t-str">"std:io::net"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-comment"># Sprawdź czy port otwarty (TCP connect)</span>
<span class="t-kw">let</span> open: bool = tcp::scan_port(<span class="t-str">"192.168.1.1"</span>, <span class="t-num">80</span>)
<span class="t-kw">if</span> open <span class="t-kw">do</span>
println(<span class="t-str">"Port 80: OTWARTY"</span>)
<span class="t-kw">end</span>

<span class="t-comment"># TCP connect</span>
<span class="t-kw">let</span> conn = tcp::connect(<span class="t-str">"127.0.0.1"</span>, <span class="t-num">8080</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>std:time i std:fs</h3>
<div class="code-block">
<div class="code-header"><span class="code-filename">std_time_fs.h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-kw">import</span> <span class="t-str">"std:time"</span>
<span class="t-kw">import</span> <span class="t-str">"std:fs"</span>

<span class="t-kw">fn</span> <span class="t-func">main</span>() <span class="t-kw">do</span>
<span class="t-comment"># Unix timestamp</span>
<span class="t-kw">let</span> ts: u64 = time::now_unix()
println(<span class="t-str">"Timestamp: "</span> + to_string(ts))

<span class="t-comment"># Sleep 100ms</span>
time::sleep_ms(<span class="t-num">100</span>)

<span class="t-comment"># Operacje na plikach</span>
<span class="t-kw">let</span> content: string = fs::read(<span class="t-str">"/etc/hostname"</span>)
println(<span class="t-str">"Hostname: "</span> + content)
fs::write(<span class="t-str">"output.txt"</span>, <span class="t-str">"wynik"</span>)
<span class="t-kw">let</span> exists: bool = fs::exists(<span class="t-str">"/etc/passwd"</span>)
<span class="t-kw">end</span></pre></div></div>
</div>

<h3>Pełna lista modułów std</h3>
<table class="ref-table">
<tr><th>Moduł</th><th>Import</th><th>Opis</th></tr>
<tr><td class="td-syntax">io::keyboard</td><td class="td-note">std:io::keyboard</td><td class="td-desc">Odczyt ze stdin</td></tr>
<tr><td class="td-syntax">io::net::tcp</td><td class="td-note">std:io::net</td><td class="td-desc">TCP connect, scan_port</td></tr>
<tr><td class="td-syntax">io::net::udp</td><td class="td-note">std:io::net</td><td class="td-desc">UDP socket, bind</td></tr>
<tr><td class="td-syntax">io::file</td><td class="td-note">std:io::file</td><td class="td-desc">Odczyt/zapis pliku</td></tr>
<tr><td class="td-syntax">crypto::hex</td><td class="td-note">std:crypto::hex</td><td class="td-desc">Hex encode/decode</td></tr>
<tr><td class="td-syntax">crypto::hash</td><td class="td-note">std:crypto::hash</td><td class="td-desc">FNV hash</td></tr>
<tr><td class="td-syntax">crypto::bytes</td><td class="td-note">std:crypto::bytes</td><td class="td-desc">XOR, ROT13</td></tr>
<tr><td class="td-syntax">encoding::base64</td><td class="td-note">std:encoding::base64</td><td class="td-desc">Base64 encode/decode</td></tr>
<tr><td class="td-syntax">encoding::url</td><td class="td-note">std:encoding::url</td><td class="td-desc">URL encode/decode</td></tr>
<tr><td class="td-syntax">time</td><td class="td-note">std:time</td><td class="td-desc">now_unix(), sleep_ms()</td></tr>
<tr><td class="td-syntax">fs</td><td class="td-note">std:fs</td><td class="td-desc">read, write, exists</td></tr>
<tr><td class="td-syntax">process</td><td class="td-note">std:process</td><td class="td-desc">Subprocess execution</td></tr>
<tr><td class="td-syntax">collections</td><td class="td-note">std:collections</td><td class="td-desc">HashMap, HashSet, VecDeque</td></tr>
<tr><td class="td-syntax">regex</td><td class="td-note">std:regex</td><td class="td-desc">is_match(pattern, text)</td></tr>
</table>
</div>
`;
