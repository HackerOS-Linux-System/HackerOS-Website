// Dane slajdów (wszystkie narzędzia + 3 nowe tryby + 4 nowe z zadania)
const slidesData = [
    { title: "HPM", desc: "HackerOS Package Manager – repozytorium społecznościowe dla HackerOS. Każdy użytkownik może tworzyć, udostępniać i instalować pakiety, budując otwarty, dynamiczny ekosystem." },
{ title: "HackerOS Containers", desc: "Autorski system kontenerów zaprojektowany z myślą o lekkiej izolacji, wysokiej wydajności i łatwym zarządzaniu środowiskami aplikacji. W pełni zintegrowany z jądrem HackerOS." },
{ title: "lpm", desc: "Legendary Package Manager – nowoczesny następca APT. Łączy prostotę klasycznych menedżerów z zaawansowanym rozwiązywaniem zależności, wsparciem dla wielu źródeł i błyskawiczną instalacją." },
{ title: "hammer", desc: "Narzędzie do atomowej instalacji oraz aktualizacji pakietów. Wykorzystywane wyłącznie w edycji Atomic HackerOS – gwarantuje nieuszkadzalne aktualizacje i możliwość przywracania poprzednich stanów systemu." },
{ title: "hacker", desc: "hacker – serce systemu. Zaawansowane narzędzie do monitorowania, zarządzania procesami i konfiguracją w czasie rzeczywistym. Stanowi fundament interakcji z jądrem oraz usprawnia diagnostykę." },
{ title: "hbuild", desc: "Własna, autorska alternatywa dla Meson, CMake, Make oraz Ninja. Upraszcza proces kompilacji oprogramowania dzięki deklaratywnym skryptom, inteligentnemu cache'owaniu i modułowej architekturze." },
{ title: "ULB", desc: "Universal Live Builder – elitarne narzędzie do budowania obrazów ISO HackerOS. Umożliwia tworzenie w pełni konfigurowalnych, przenośnych środowisk live oraz obrazów do wdrożeń masowych." },
{ title: ".hk", desc: "Format plików .hk używany do konfiguracji systemu oraz aplikacji. Zapewnia czytelną, hierarchiczną składnię, natywne wsparcie w narzędziach HackerOS oraz możliwość rozszerzeń poprzez wbudowane schematy." },
{ title: "hsh", desc: "hsh – nowoczesna powłoka systemowa, zaawansowana alternatywa dla ZSH i Bash. Oferuje rozszerzone możliwości skryptowe, lepszą autokompletację, wbudowane wsparcie dla kontenerów i natywne integracje z .hk." },
{ title: "HexAI", desc: "HexAI – Zintegrowany asystent AI dla HackerOS, wymagający wydajnego komputera. Oferuje lokalne wnioskowanie, analizę kodu źródłowego, generowanie skryptów oraz inteligentne wsparcie administracji z zachowaniem pełnej prywatności." },
{ title: "GhostFS", desc: "GhostFS – Zaawansowany system plików dla HackerOS, dostępny w dwóch edycjach: Cybersecurity (szyfrowanie, ukrywanie śladów, steganografia) oraz Normal (szybkość, niezawodność i pełna zgodność z aplikacjami). Idealny do zarządzania danymi." },
{ title: "HackerDeck", desc: "HackerDeck – nakładka środowiskowa dla Waydroid, pozwalająca uruchamiać aplikacje Android w HackerOS z pełną integracją, optymalizacją wydajności i dedykowanymi ustawieniami dla graczy oraz programistów." },
{ title: "hedit", desc: "hedit – edytor tekstu inspirowany klasycznym nano, w pełni zintegrowany z HackerOS. Łączy prostotę obsługi z zaawansowanymi funkcjami, takimi jak podświetlanie składni, obsługa makr oraz bezpośrednia edycja plików systemowych w trybie tekstowym." },
{ title: "ngt", desc: "ngt – narzędzie do zarządzania plikami inspirowane Midnight Commanderem (MC). Oferuje dwupanelowy interfejs, szybką nawigację, zaawansowane operacje na plikach (kopiowanie, przenoszenie, uprawnienia) oraz wbudowany podgląd plików i archiwów – niezbędne w codziennej pracy administratora." },
// === TRZY WCZEŚNIEJSZE TRYBY ===
{ title: "Penetration Mode", desc: "Sesja z własnymi narzędziami do testów penetracyjnych. Jest to aplikacja wbudowana w HackerOS Cybersecurity Edition, która uruchamia dedykowane środowisko z frameworkami (Metasploit, Nmap, Burp Suite, własne skrypty) – idealna dla etycznych hackerów i zespołów Red Team." },
{ title: "Cybersecurity Mode", desc: "Narzędzie zarówno do defensywy, jak i ofensywy. Działa w lekkim kontenerze, używane i wbudowane w HackerOS Cybersecurity Edition jako aplikacja oraz jako sesja. Łączy monitoring zagrożeń, IDS/IPS, skanowanie podatności oraz taktyki adversary emulation – wszystko w izolowanym środowisku." },
{ title: "Hacker Term", desc: "Terminal dla dystrybucji Linuxa HackerOS. Nowoczesna powłoka z zaawansowaną autokompletacją, wieloma oknami, natywnym wsparciem dla kontenerów HackerOS, skryptami .hk i integracją z narzędziami pentesterskimi. Zapewnia pełną kontrolę nad systemem i środowiskiem deweloperskim." },
// === NOWE 4 SŁAJDY (zgodnie z zadaniem) ===
{ title: "HackerOS Nix Manager", desc: "Nakładka dla Nix – zarządzanie pakietami i środowiskami w HackerOS z wykorzystaniem Nix. Umożliwia deklaratywną konfigurację systemu, odtwarzalne środowiska deweloperskie oraz integrację z ekosystemem Nixpkgs." },
{ title: "Hacker Mode", desc: "Sesja do gier inspirowana GameHub / Steam GamePadUI. Uruchamia specjalne środowisko zoptymalizowane dla kontrolerów, dużego ekranu i łatwego dostępu do bibliotek gier. Idealne do Steam, emulatorów i natywnych tytułów." },
{ title: "Isolator", desc: "Nakładka dla podmana z własną listą pakietów. Określa, w którym kontenerze każdy pakiet ma być instalowany. Dzięki temu łatwo zarządzasz aplikacjami w izolowanych środowiskach, zapewniając separację i bezpieczeństwo." },
{ title: "HackerOS Steam", desc: "Uruchom Steam w kontenerze Arch Linux. Dzięki izolacji i pełnej kompatybilności z bibliotekami Steam, możesz grać w swoje ulubione tytuły na HackerOS, zachowując czystość systemu głównego." }
];

const slidesTrack = document.getElementById('slidesTrack');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');

let currentIndex = 0;
let autoPlayInterval = null;
let isHovering = false;

// Renderowanie slajdów
function renderSlides() {
    slidesTrack.innerHTML = '';
    slidesData.forEach((slide) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        const titleElem = document.createElement('h3');
        titleElem.textContent = slide.title;
        slideDiv.appendChild(titleElem);
        const descElem = document.createElement('p');
        descElem.textContent = slide.desc;
        slideDiv.appendChild(descElem);
        slidesTrack.appendChild(slideDiv);
    });
    updateSliderPosition();
}

function updateSliderPosition() {
    if (!slidesTrack) return;
    const offset = -currentIndex * 100;
    slidesTrack.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slidesData.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    if (index < 0) index = slidesData.length - 1;
    if (index >= slidesData.length) index = 0;
    currentIndex = index;
    updateSliderPosition();
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    if (isHovering) return;
    autoPlayInterval = setInterval(() => {
        if (!isHovering) nextSlide();
    }, 20000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    if (!isHovering) startAutoPlay();
}

function bindHoverEvents() {
    const container = document.querySelector('.slider-container');
    if (!container) return;
    container.addEventListener('mouseenter', () => {
        isHovering = true;
        stopAutoPlay();
    });
    container.addEventListener('mouseleave', () => {
        isHovering = false;
        startAutoPlay();
    });
}

function bindControls() {
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
}

function bindKeyboard() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); e.preventDefault(); }
    });
}

// Obsługa dropdownu języków programowania
function initLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    const btn = document.getElementById('langDropdownBtn');
    if (!dropdown || !btn) return;

    const toggleDropdown = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    };
    btn.addEventListener('click', toggleDropdown);

    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('open');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
}

function initSlider() {
    renderSlides();
    buildDots();
    bindControls();
    bindHoverEvents();
    bindKeyboard();
    isHovering = false;
    startAutoPlay();
    initLangDropdown();
}

window.addEventListener('resize', () => updateSliderPosition());
document.addEventListener('DOMContentLoaded', initSlider);
