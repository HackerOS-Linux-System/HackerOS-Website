import init, { run_with_limit } from './hsharp_playground.js';

// Pinned to the current H# release. Bump the version segment in this URL
// whenever a new hsharp-playground.wasm is published — see this repo's
// H-Sharp submodule / release notes for the current version number.
const WASM_URL = 'https://github.com/HackerOS-Linux-System/H-Sharp/releases/download/v0.8/hsharp-playground.wasm';

const MAX_STEPS = 200000;

let ready = init(WASM_URL).catch(function (err) {
    postMessage({ __init_error: String(err && err.message ? err.message : err) });
});

self.onmessage = async function (ev) {
    await ready;
    const source = ev.data && ev.data.source ? ev.data.source : '';
    try {
        const json = run_with_limit(source, MAX_STEPS);
        postMessage({ result: json });
    } catch (err) {
        // A genuine Rust panic makes it here as a thrown JS exception
        // (everything else — parse/type/runtime errors — comes back as
        // normal `RunResult` JSON with `ok: false`, per lib.rs).
        postMessage({ __panic: String(err && err.message ? err.message : err) });
    }
};
