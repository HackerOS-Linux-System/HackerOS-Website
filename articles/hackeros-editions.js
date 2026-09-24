window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["hackeros-editions"] = {
 "id": "hackeros-editions",
 "date": "2026-09-12",
 "author": "HackerOS Team",
 "readingMinutes": 5,
 "icon": "🧭",
 "tags": [
  "guide",
  "editions"
 ],
 "title": {
  "pl": "Którą edycję HackerOS wybrać? Przewodnik po edycjach i wydaniach",
  "en": "Which HackerOS edition should you pick? A guide to editions and releases"
 },
 "summary": {
  "pl": "Official, Gaming, Cybersecurity, LTS, Atomic… Krótkie porównanie wszystkich edycji i harmonogram ich wydań.",
  "en": "Official, Gaming, Cybersecurity, LTS, Atomic… A short comparison of every edition and their release schedule."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "HackerOS to nie jeden obraz systemu, tylko rodzina edycji opartych na Debianie. Ten przewodnik pomaga wybrać tę, która pasuje do Twojego sprzętu i sposobu pracy, oraz wyjaśnia, jak często ukazują się nowe wydania."
   },
   {
    "t": "h2",
    "text": "Przegląd edycji"
   },
   {
    "t": "table",
    "head": [
     "Edycja",
     "Dla kogo / co zawiera"
    ],
    "rows": [
     [
      "<strong>Official</strong>",
      "Podstawowa wersja dla użytkowników, graczy i programistów. Debian Testing, środowisko KDE Plasma."
     ],
     [
      "<strong>Hydra</strong>",
      "Kopia Official z innym wyglądem (w stylu Garuda)."
     ],
     [
      "<strong>GNOME</strong>",
      "To samo co Official, ale ze środowiskiem GNOME."
     ],
     [
      "<strong>Xfce</strong>",
      "To samo co Official, ale ze środowiskiem Xfce."
     ],
     [
      "<strong>Blue</strong>",
      "Autorskie środowisko graficzne."
     ],
     [
      "<strong>Gaming</strong>",
      "Inspirowana SteamOS/Bazzite. Steam i Gamescope w standardzie, jądro XanMod LTS."
     ],
     [
      "<strong>Cybersecurity</strong>",
      "KDE Plasma, mutowalny system na Debianie stable, narzędzia Red Team i sesja Cybersecurity Mode."
     ],
     [
      "<strong>LTS</strong>",
      "To samo co Official, ale na Debianie Stable zamiast Testing."
     ],
     [
      "<strong>Atomic</strong>",
      "System niemutowalny (ostree) z menedżerem pakietów hammer. Faza pre-release."
     ],
     [
      "<strong>NVIDIA</strong>",
      "To samo co Official, ale z preinstalowanymi sterownikami NVIDIA."
     ],
     [
      "<strong>Container</strong>",
      "Narzędzia HackerOS w kontenerze — zamiennik obrazu Distrobox lub Docker/Podman."
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Jak wybrać?"
   },
   {
    "t": "ul",
    "items": [
     "<strong>Codzienna praca i nauka:</strong> Official — najlepiej dopracowana, wydawana co miesiąc.",
     "<strong>Karta NVIDIA:</strong> NVIDIA oszczędza ręcznej instalacji sterowników.",
     "<strong>Gry:</strong> Gaming, przełączana w tryb gry poleceniem <code>gaming</code>.",
     "<strong>Stabilność ponad nowości:</strong> LTS (Debian Stable).",
     "<strong>Inny pulpit:</strong> GNOME lub Xfce; lekki sprzęt zwykle lepiej zniesie Xfce.",
     "<strong>Nie chcesz instalować systemu:</strong> Container, np. z Distroboxem."
    ]
   },
   {
    "t": "h2",
    "text": "Cykl wydawniczy"
   },
   {
    "t": "table",
    "head": [
     "Edycje",
     "Rytm wydań"
    ],
    "rows": [
     [
      "Official, Cybersecurity, NVIDIA",
      "Co miesiąc"
     ],
     [
      "GNOME, Hydra, XFCE",
      "Przy wydaniach głównych <strong>x.0</strong> oraz <strong>x.5</strong>"
     ],
     [
      "LTS",
      "Tylko wersje <strong>x.0</strong> (nowa co 9 miesięcy)"
     ],
     [
      "Gaming",
      "Wersje <strong>x.3</strong> oraz <strong>x.7</strong>"
     ],
     [
      "Atomic",
      "Wersje <strong>x.1</strong> oraz <strong>x.9</strong>"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Aktualną listę wydań znajdziesz na stronie <a href=\"releases.html\">Releases</a> — a powiadomienia o nowych wydaniach konkretnych edycji włączysz w aplikacji HackerOS."
   },
   {
    "t": "h2",
    "text": "Cybersecurity — ważne zastrzeżenie"
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Narzędzia z edycji Cybersecurity wolno stosować wyłącznie zgodnie z prawem i tylko w ramach działań autoryzowanych przez właściciela testowanego systemu. Twórcy HackerOS nie odpowiadają za sposób wykorzystania tej edycji."
   },
   {
    "t": "p",
    "html": "Edycja <strong>Cybersecurity Default</strong> (w przygotowaniu) ma być niemutowalna, oparta o ostree i hammer, z autorskim środowiskiem SDE, dedykowanym jądrem i hypervisorem Xen. Więcej o narzędziach: <a href=\"cybersecurity-tools/index.html\">dokumentacja narzędzi Cybersecurity</a>."
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "HackerOS is not a single system image but a family of Debian-based editions. This guide helps you pick the one that fits your hardware and workflow, and explains how often new releases ship."
   },
   {
    "t": "h2",
    "text": "Editions at a glance"
   },
   {
    "t": "table",
    "head": [
     "Edition",
     "Who it is for / what it includes"
    ],
    "rows": [
     [
      "<strong>Official</strong>",
      "The base edition for users, gamers and developers. Debian Testing with KDE Plasma."
     ],
     [
      "<strong>Hydra</strong>",
      "A copy of Official with a different look (Garuda-like)."
     ],
     [
      "<strong>GNOME</strong>",
      "Same as Official, but with the GNOME desktop."
     ],
     [
      "<strong>Xfce</strong>",
      "Same as Official, but with the Xfce desktop."
     ],
     [
      "<strong>Blue</strong>",
      "A custom desktop environment."
     ],
     [
      "<strong>Gaming</strong>",
      "Inspired by SteamOS/Bazzite. Steam and Gamescope out of the box, XanMod LTS kernel."
     ],
     [
      "<strong>Cybersecurity</strong>",
      "KDE Plasma, a mutable system on Debian stable, Red Team tooling and a Cybersecurity Mode session."
     ],
     [
      "<strong>LTS</strong>",
      "Same as Official, but on Debian Stable instead of Testing."
     ],
     [
      "<strong>Atomic</strong>",
      "Immutable system (ostree) with the hammer package manager. Currently pre-release."
     ],
     [
      "<strong>NVIDIA</strong>",
      "Same as Official, with NVIDIA drivers preinstalled."
     ],
     [
      "<strong>Container</strong>",
      "HackerOS tools in a container — a replacement for a Distrobox or Docker/Podman image."
     ]
    ]
   },
   {
    "t": "h2",
    "text": "How to choose"
   },
   {
    "t": "ul",
    "items": [
     "<strong>Daily work and learning:</strong> Official — the most polished, released monthly.",
     "<strong>NVIDIA graphics card:</strong> the NVIDIA edition saves you a manual driver install.",
     "<strong>Gaming:</strong> Gaming, switched to game mode with the <code>gaming</code> command.",
     "<strong>Stability over novelty:</strong> LTS (Debian Stable).",
     "<strong>A different desktop:</strong> GNOME or Xfce; older hardware usually copes better with Xfce.",
     "<strong>Don't want to install an OS:</strong> Container, e.g. with Distrobox."
    ]
   },
   {
    "t": "h2",
    "text": "Release cycle"
   },
   {
    "t": "table",
    "head": [
     "Editions",
     "Cadence"
    ],
    "rows": [
     [
      "Official, Cybersecurity, NVIDIA",
      "Every month"
     ],
     [
      "GNOME, Hydra, XFCE",
      "With the main <strong>x.0</strong> and <strong>x.5</strong> releases"
     ],
     [
      "LTS",
      "<strong>x.0</strong> versions only (a new one every 9 months)"
     ],
     [
      "Gaming",
      "<strong>x.3</strong> and <strong>x.7</strong> versions"
     ],
     [
      "Atomic",
      "<strong>x.1</strong> and <strong>x.9</strong> versions"
     ]
    ]
   },
   {
    "t": "p",
    "html": "The current release list is on the <a href=\"releases.html\">Releases</a> page — and you can turn on notifications for specific editions in the HackerOS app."
   },
   {
    "t": "h2",
    "text": "Cybersecurity — an important disclaimer"
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Tools in the Cybersecurity edition may only be used lawfully and only as part of activities authorised by the owner of the system under test. The HackerOS authors are not responsible for how this edition is used."
   },
   {
    "t": "p",
    "html": "The <strong>Cybersecurity Default</strong> edition (in preparation) is planned as immutable, based on ostree and hammer, with the custom SDE desktop, a dedicated kernel and the Xen hypervisor. More on the tooling: <a href=\"cybersecurity-tools/index.html\">Cybersecurity tools documentation</a>."
   }
  ]
 }
};
