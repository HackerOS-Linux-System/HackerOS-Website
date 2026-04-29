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
