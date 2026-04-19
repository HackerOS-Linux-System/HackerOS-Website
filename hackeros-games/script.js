'use strict';

// ── Navigation ────────────────────────────────────────────────────────────────

const sections   = document.querySelectorAll('.doc-section');
const navLinks   = document.querySelectorAll('.nav-link');
const breadcrumb = document.getElementById('breadcrumb');
const sidebar    = document.getElementById('sidebar');
const menuBtn    = document.getElementById('menu-btn');

function activateSection(id) {
    // Hide all sections
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    // Show target section
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Update nav
    const activeLink = document.querySelector(`[data-section="${id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        breadcrumb.textContent = activeLink.textContent.trim();
    }

    // Scroll content to top
    document.querySelector('.doc-body').scrollTo(0, 0);
}

// Handle nav link clicks
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const section = link.dataset.section;
        activateSection(section);
        history.pushState(null, '', `#${section}`);

        // Close sidebar on mobile
        if (window.innerWidth <= 900) {
            sidebar.classList.remove('open');
        }
    });
});

// Handle hash on load
function loadFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        activateSection(hash);
    } else {
        activateSection('overview');
    }
}

window.addEventListener('hashchange', loadFromHash);
loadFromHash();

// ── Mobile menu ───────────────────────────────────────────────────────────────

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', e => {
    if (window.innerWidth <= 900 &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn) {
        sidebar.classList.remove('open');
        }
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

const sectionIds = Array.from(sections).map(s => s.id);

document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const current = sectionIds.findIndex(id =>
    document.getElementById(id).classList.contains('active')
    );

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = sectionIds[(current + 1) % sectionIds.length];
        activateSection(next);
        history.pushState(null, '', `#${next}`);
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = sectionIds[(current - 1 + sectionIds.length) % sectionIds.length];
        activateSection(prev);
        history.pushState(null, '', `#${prev}`);
    }
});

// ── Copy code blocks ──────────────────────────────────────────────────────────

document.querySelectorAll('.code-block').forEach(block => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative';

    const btn = document.createElement('button');
    btn.textContent = 'COPY';
    btn.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: 1px solid #18253a;
    color: #4a5e78;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 3px 8px;
    cursor: pointer;
    transition: all 0.15s;
    `;

    btn.addEventListener('mouseenter', () => {
        btn.style.color = '#00e855';
        btn.style.borderColor = '#00e855';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.color = '#4a5e78';
        btn.style.borderColor = '#18253a';
    });

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent.trim()).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'COPIED!';
            btn.style.color = '#00e855';
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.color = '#4a5e78';
            }, 1800);
        }).catch(() => {
            btn.textContent = 'ERR';
            setTimeout(() => { btn.textContent = 'COPY'; }, 1500);
        });
    });

    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    wrapper.appendChild(btn);
});

// ── Search ────────────────────────────────────────────────────────────────────

// Simple keyboard shortcut to focus a section by typing its name
let searchBuf = '';
let searchTimer = null;

document.addEventListener('keypress', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === '/') {
        e.preventDefault();
        // Could open a modal — for now just highlight first nav link
        navLinks[0] && navLinks[0].focus();
        return;
    }
});

// ── Active link highlight on scroll (single-page feel) ───────────────────────

// Since we use JS section switching (not scroll), the nav is always in sync.
// Nothing extra needed.

// ── Ambient star animation on logo dot ───────────────────────────────────────

const dot = document.querySelector('.logo-dot');
let dotHue = 120;

setInterval(() => {
    dotHue = (dotHue + 1) % 360;
    // Keep it in green range (100-160)
    const h = 100 + (dotHue % 60);
    dot.style.background = `hsl(${h}, 100%, 55%)`;
    dot.style.boxShadow  = `0 0 8px hsl(${h}, 100%, 55%)`;
}, 80);

// ── Console easter egg ────────────────────────────────────────────────────────

console.log('%cHACKEROS GAMES DOCS', 'color:#00e855;font-family:monospace;font-size:18px;font-weight:bold');
console.log('%cv0.7.0 // TAURI 2 + REACT 18 + RUST', 'color:#4a5e78;font-family:monospace;font-size:11px');
console.log('%cSECURE CONNECTION ESTABLISHED', 'color:#2a90ff;font-family:monospace;font-size:10px');
