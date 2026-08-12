window.__HL_SECTIONS = window.__HL_SECTIONS || {};
window.__HL_SECTIONS['playground'] = `
<div class="section" id="playground">
<div class="sec-header"><span class="sec-num">31</span><h2>Playground <span class="sec-badge">wasm</span></h2></div>
<p>Uruchom H# bezpośrednio w przeglądarce — bez instalacji, bez terminala. Kod jest kompilowany do <strong>WebAssembly</strong> raz (z repo <a href="https://github.com/HackerOS-Linux-System/H-Sharp" target="_blank">H-Sharp</a>) i wykonywany lokalnie w Twojej przeglądarce, w osobnym wątku (Web Worker) z limitem czasu — nic nie jest wysyłane na żaden serwer.</p>

<div class="pg-wrap" id="pg-root">
  <div class="pg-panes">
    <div class="pg-pane">
      <div class="pg-pane-header">
        <span class="pg-pane-title">▸ main.h#</span>
        <button class="pg-run-btn" id="pg-run">Run ▶ (Ctrl+Enter)</button>
      </div>
      <textarea id="pg-source" spellcheck="false">fn main() is
    let name = "H#"
    write("Hello from " + name + "!")

    let n = 10
    let a = 0
    let b = 1
    let i = 0
    while i < n is
        write(to_string(a))
        let next = a + b
        a = b
        b = next
        i = i + 1
    end
end</textarea>
    </div>
    <div class="pg-pane">
      <div class="pg-pane-header">
        <span class="pg-pane-title">▸ output</span>
        <span class="pg-status" id="pg-status">gotowy</span>
      </div>
      <pre id="pg-output"></pre>
    </div>
  </div>
  <div class="pg-note">Pierwsze uruchomienie pobiera moduł WASM kompilatora (<code>hsharp-playground.wasm</code>) z <a href="https://github.com/HackerOS-Linux-System/H-Sharp/releases" target="_blank">wydań H-Sharp na GitHubie</a> — kilkaset KB, cache'owane przez przeglądarkę, więc kolejne uruchomienia (i kolejne wizyty na tej stronie) nic już nie pobierają. Program ma limit ok. 200 000 kroków interpretera oraz twardy limit czasu 5s — nieskończona pętla zostanie bezpiecznie przerwana.</div>
</div>

<h3>Jak to działa</h3>
<p>Playground używa <strong>interpretera H#</strong> (nie pełnej kompilacji LLVM) skompilowanego do WASM przez <code>wasm-pack</code> z paczki <code>hsharp-playground</code> w repozytorium H#. Ten sam kod, który widzisz tutaj, możesz uruchomić lokalnie przez:</p>
<div class="code-block">
<div class="code-header"><span class="code-filename">terminal — h#</span><button class="copy-btn">Copy</button></div>
<div class="code-body"><div class="code-inner"><pre><span class="t-comment">;; Interpreter — dokładnie to, co robi ten playground</span>
h# preview main.h#

<span class="t-comment">;; Pełna kompilacja LLVM — do prawdziwej binarki</span>
h# compile main.h#</pre></div></div>
</div>

<p>Interaktywne narzędzia w tej samej rodzinie co playground: <code>h# repl</code> (REPL linia-po-linii w terminalu) i <code>h# fmt</code> (formatter). Zobacz sekcję <a href="#install">Instalacja &amp; narzędzia</a>.</p>
</div>
`;
