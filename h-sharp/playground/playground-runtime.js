(function () {
    'use strict';

    var WALL_CLOCK_TIMEOUT_MS = 5000;
    var worker = null;
    var timeoutHandle = null;

    function freshWorker() {
        if (worker) { try { worker.terminate(); } catch (e) {} }
        worker = new Worker('playground/worker.js', { type: 'module' });
        return worker;
    }

    function setStatus(el, text, cls) {
        el.textContent = text;
        el.className = 'pg-status' + (cls ? ' ' + cls : '');
    }

    function renderResult(outEl, statusEl, data) {
        clearTimeout(timeoutHandle);
        outEl.textContent = '';

        if (data.__init_error) {
            setStatus(statusEl, 'Nie udało się załadować WASM: ' + data.__init_error, 'pg-status-err');
            return;
        }
        if (data.__panic) {
            setStatus(statusEl, 'Wewnętrzny błąd interpretera (panic): ' + data.__panic, 'pg-status-err');
            return;
        }

        var r;
        try { r = JSON.parse(data.result); }
        catch (e) { setStatus(statusEl, 'Nieoczekiwana odpowiedź workera.', 'pg-status-err'); return; }

        var lines = [];
        if (r.parse_errors && r.parse_errors.length) {
            r.parse_errors.forEach(function (d) { lines.push(d.message); });
        }
        if (r.type_errors && r.type_errors.length) {
            r.type_errors.forEach(function (d) { lines.push(d.message); });
        }
        if (r.stdout) lines.push(r.stdout.replace(/\n$/, ''));
        if (r.runtime_error) lines.push(r.runtime_error);

        outEl.textContent = lines.join('\n') || '(brak wyjścia)';
        setStatus(statusEl, r.ok ? 'OK' : 'Błąd', r.ok ? 'pg-status-ok' : 'pg-status-err');
    }

    function run(sourceEl, outEl, statusEl, runBtn) {
        var w = freshWorker();
        setStatus(statusEl, 'Uruchamianie…', '');
        outEl.textContent = '';
        runBtn.disabled = true;

        var done = false;
        w.onmessage = function (ev) {
            done = true;
            runBtn.disabled = false;
            renderResult(outEl, statusEl, ev.data);
        };
        w.onerror = function (ev) {
            done = true;
            runBtn.disabled = false;
            clearTimeout(timeoutHandle);
            setStatus(statusEl, 'Błąd workera: ' + (ev.message || 'nieznany'), 'pg-status-err');
        };

        timeoutHandle = setTimeout(function () {
            if (done) return;
            w.terminate();
            worker = null;
            runBtn.disabled = false;
            setStatus(statusEl, 'Przekroczono limit czasu (' + (WALL_CLOCK_TIMEOUT_MS / 1000) + 's) — program przerwany.', 'pg-status-err');
        }, WALL_CLOCK_TIMEOUT_MS);

        w.postMessage({ source: sourceEl.value });
    }

    function initPlayground() {
        var root = document.getElementById('pg-root');
        if (!root) return; // section not injected (yet, or at all) — nothing to wire up
        var sourceEl = document.getElementById('pg-source');
        var outEl = document.getElementById('pg-output');
        var statusEl = document.getElementById('pg-status');
        var runBtn = document.getElementById('pg-run');
        if (!sourceEl || !outEl || !statusEl || !runBtn) return;

        runBtn.addEventListener('click', function () {
            run(sourceEl, outEl, statusEl, runBtn);
        });
        sourceEl.addEventListener('keydown', function (ev) {
            if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') {
                ev.preventDefault();
                run(sourceEl, outEl, statusEl, runBtn);
            }
        });
    }

    // The playground section's HTML is injected asynchronously by
    // script.js's injectSections() — wait for that instead of
    // DOMContentLoaded, since #pg-root won't exist yet at that point.
    var tries = 0;
    (function waitForSection() {
        if (document.getElementById('pg-root')) { initPlayground(); return; }
        if (++tries > 100) return; // ~5s — give up quietly, section may not be on this page
        setTimeout(waitForSection, 50);
    })();
})();
