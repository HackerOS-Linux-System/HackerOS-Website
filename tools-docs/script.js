function applyLang(lang) {
    if (!window.HACKEROS_TRANS_TOOLS) return;
    const t = window.HACKEROS_TRANS_TOOLS[lang] || window.HACKEROS_TRANS_TOOLS.pl;
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
    const h2 = document.getElementById('section-h2');
    if (h2) h2.textContent = t.sectionH2;
    const fc = document.getElementById('footer-copy');
    if (fc) fc.textContent = t.footerCopy;
    document.querySelectorAll('.nav-list a[data-key]').forEach(a => {
        const key = a.dataset.key;
        if (t.navItems && t.navItems[key]) a.textContent = t.navItems[key];
    });
    const dropLabel = document.getElementById('lang-drop-label');
    if (dropLabel && t.langDropBtn) dropLabel.textContent = t.langDropBtn;
    const hsharpLink = document.getElementById('lang-drop-hsharp');
    if (hsharpLink && t.langDropLinks) hsharpLink.textContent = t.langDropLinks.hsharp;
    const hlLink = document.getElementById('lang-drop-hackerlang');
    if (hlLink && t.langDropLinks) hlLink.textContent = t.langDropLinks.hackerLang;
    slidesData = t.slides || [];
    currentIndex = 0;
    renderSlides();
    buildDots();
}
window.__hackeros_applyLang = applyLang;

let slidesData = [], currentIndex = 0, autoPlayInterval = null, isHovering = false;
const slidesTrack = document.getElementById('slidesTrack');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');

function renderSlides() {
    if (!slidesTrack) return;
    slidesTrack.innerHTML = '';
    slidesData.forEach(s => {
        const div = document.createElement('div'); div.className = 'slide';
        const h3 = document.createElement('h3'); h3.textContent = s.title;
        const p = document.createElement('p'); p.textContent = s.desc;
        div.appendChild(h3); div.appendChild(p); slidesTrack.appendChild(div);
    });
    updateSliderPosition();
}
function updateSliderPosition() {
    if (!slidesTrack) return;
    slidesTrack.style.transform = `translateX(${-currentIndex * 100}%)`;
    updateDots();
}
function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}
function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slidesData.forEach((_, i) => {
        const d = document.createElement('div'); d.classList.add('dot');
        if (i === currentIndex) d.classList.add('active');
        d.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); });
        dotsContainer.appendChild(d);
    });
}
function goToSlide(i) {
    if (i < 0) i = slidesData.length - 1;
    if (i >= slidesData.length) i = 0;
    currentIndex = i; updateSliderPosition();
}
function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }
function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    if (isHovering) return;
    autoPlayInterval = setInterval(() => { if (!isHovering) nextSlide(); }, 20000);
}
function stopAutoPlay() { if (autoPlayInterval) { clearInterval(autoPlayInterval); autoPlayInterval = null; } }
function resetAutoPlay() { stopAutoPlay(); if (!isHovering) startAutoPlay(); }
function bindHoverEvents() {
    const c = document.querySelector('.slider-container'); if (!c) return;
    c.addEventListener('mouseenter', () => { isHovering = true; stopAutoPlay(); });
    c.addEventListener('mouseleave', () => { isHovering = false; startAutoPlay(); });
}
function bindControls() {
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
}
function bindKeyboard() {
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); e.preventDefault(); }
    });
}
function initLangDropdown() {
    const dd = document.getElementById('langDropdown');
    const btn = document.getElementById('langDropdownBtn');
    if (!dd || !btn) return;
    btn.addEventListener('click', e => { e.stopPropagation(); dd.classList.toggle('open'); });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) dd.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dd.classList.remove('open'); });
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = window.HackerLang ? window.HackerLang.getLang() : 'pl';
    applyLang(lang);
    bindControls(); bindHoverEvents(); bindKeyboard();
    isHovering = false; startAutoPlay(); initLangDropdown();
});
window.addEventListener('resize', () => updateSliderPosition());
