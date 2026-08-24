const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.sidebar a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.sidebar a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => observer.observe(s));

// ─── Copy-to-clipboard for code blocks ───────────────────────────────────────
document.querySelectorAll('.code-block').forEach(block => {
  const header = block.querySelector('.code-header');
  if (!header) return;

  const btn = document.createElement('button');
  btn.textContent = 'KOPIUJ';
  btn.style.cssText = `
    margin-left: auto; background: rgba(168,85,247,0.12);
    border: 1px solid rgba(168,85,247,0.25); color: #c084fc;
    font-family: 'Space Mono', monospace; font-size: 9px;
    letter-spacing: 2px; padding: 3px 10px; border-radius: 2px;
    cursor: pointer; text-transform: uppercase; transition: all 0.15s;
  `;

  btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(168,85,247,0.22)'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(168,85,247,0.12)'; });

  btn.addEventListener('click', () => {
    const pre = block.querySelector('pre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(() => {
      btn.textContent = 'SKOPIOWANO';
      btn.style.color = '#34d399';
      btn.style.borderColor = 'rgba(52,211,153,0.3)';
      setTimeout(() => {
        btn.textContent = 'KOPIUJ';
        btn.style.color = '#c084fc';
        btn.style.borderColor = 'rgba(168,85,247,0.25)';
      }, 1800);
    });
  });

  header.appendChild(btn);
});

// ─── Playground (WASM) ────────────────────────────────────────────────────
//
// Pobiera hl-playground.wasm + hl-playground.js (glue wygenerowane przez
// wasm-bindgen) z release'a na GitHubie i uruchamia PRAWDZIWY interpreter
// Hacker Lang bezpośrednio w przeglądarce — patrz komentarz w Cargo.toml
// source-code/playground i .github/workflows/build.yml w repo źródłowym.
//
// UWAGA dot. adresu: sam .wasm NIE WYSTARCZY do uruchomienia — wasm-bindgen
// generuje obok niego plik .js (glue: marshalling stringów, zarządzanie
// pamięcią, definicje eksportowanych funkcji), bez którego wywołanie
// czegokolwiek z JS jest niemożliwe. Zakładamy więc, że hl-playground.js
// leży W TYM SAMYM release, pod tą samą nazwą bazową — dokładnie tak, jak
// produkuje je `hl build.hl playground` i workflow build.yml (oba pliki
// razem, jedna nazwa bazowa). Jeśli release zawiera tylko .wasm, playground
// się nie uruchomi — dorzuć tam też .js.
(() => {
  const WASM_URL = 'https://github.com/HackerOS-Linux-System/Hacker-Lang/releases/download/gen-2/hl-playground.wasm';
  const JS_URL   = WASM_URL.replace(/\.wasm$/, '.js');

  const statusEl = document.getElementById('pg-status');
  const runBtn   = document.getElementById('pg-run');
  const editorEl = document.getElementById('pg-editor');
  const outputEl = document.getElementById('pg-output');

  // Sekcja #playground nie istnieje na tej stronie -> nic do zrobienia.
  if (!statusEl || !runBtn || !editorEl || !outputEl) return;

  function setStatus(text, cls) {
    statusEl.textContent = text;
    statusEl.className = 'playground-status' + (cls ? ' ' + cls : '');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  let run_hl = null;

  async function loadPlayground() {
    try {
      setStatus('pobieram WASM…');

      // GitHub Releases serwuje binaria jako application/octet-stream, nie
      // application/wasm — WebAssembly.instantiateStreaming bywa z tego
      // powodu kapryśne w części przeglądarek, więc pobieramy bajty ręcznie
      // zamiast polegać na strumieniowaniu wewnątrz init().
      const wasmResp = await fetch(WASM_URL);
      if (!wasmResp.ok) throw new Error(`nie mogę pobrać .wasm (HTTP ${wasmResp.status})`);
      const wasmBytes = await wasmResp.arrayBuffer();

      setStatus('inicjalizuję…');
      const mod = await import(/* webpackIgnore: true */ JS_URL);
      await mod.default(wasmBytes);
      run_hl = mod.run_hl;

      setStatus('gotowe', 'status-ready');
      runBtn.disabled = false;
    } catch (err) {
      console.error('[hl playground] błąd ładowania:', err);
      setStatus('błąd ładowania', 'status-error');
      outputEl.innerHTML =
        `<span class="out-error">Nie udało się załadować playgroundu: ${escapeHtml(err.message || String(err))}</span>` +
        `<span class="out-exit">Sprawdź w konsoli przeglądarki (F12) — zwykle to brak CORS albo brak hl-playground.js obok .wasm w release'u.</span>`;
    }
  }

  runBtn.addEventListener('click', () => {
    if (!run_hl) return;
    runBtn.disabled = true;
    outputEl.textContent = '';
    try {
      const result = run_hl(editorEl.value);
      let html = result.output ? escapeHtml(result.output) : '';
      if (!result.ok) {
        html += (html ? '\n' : '') + `<span class="out-error">${escapeHtml(result.error)}</span>`;
      }
      html += `<span class="out-exit">exit code: ${result.exit_code}</span>`;
      outputEl.innerHTML = html;
    } catch (err) {
      outputEl.innerHTML = `<span class="out-error">Błąd wewnętrzny: ${escapeHtml(err.message || String(err))}</span>`;
    } finally {
      runBtn.disabled = false;
    }
  });

  loadPlayground();
})();
