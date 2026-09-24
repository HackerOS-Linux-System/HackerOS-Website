window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["gaming-on-hackeros"] = {
 "id": "gaming-on-hackeros",
 "date": "2026-09-05",
 "author": "HackerOS Team",
 "readingMinutes": 4,
 "icon": "🎮",
 "tags": [
  "gaming",
  "guide"
 ],
 "title": {
  "pl": "Gry na HackerOS: edycja Gaming, Hacker Launcher i gry społeczności",
  "en": "Gaming on HackerOS: the Gaming edition, Hacker Launcher and community games"
 },
 "summary": {
  "pl": "Steam, Gamescope, jądro XanMod, uruchamianie gier .exe przez Proton i jak dodać własną grę do HackerOS.",
  "en": "Steam, Gamescope, the XanMod kernel, running .exe games through Proton and how to add your own game to HackerOS."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "HackerOS opiera się na Debianie Testing, więc gracze dostają świeże sterowniki i biblioteki, a do tego kilka narzędzi napisanych z myślą o grach. Oto, co warto wiedzieć."
   },
   {
    "t": "h2",
    "text": "Edycja Gaming"
   },
   {
    "t": "p",
    "html": "Edycja <strong>Gaming</strong> jest inspirowana SteamOS i Bazzite i celuje w komputery oraz laptopy do grania. W wersji standardowej ma preinstalowanego Steama oraz Gamescope, a jądrem systemu jest <strong>XanMod LTS v3</strong>. (W starszej wersji używano jądra Liquorix.)"
   },
   {
    "t": "p",
    "html": "Do trybu gry przełączysz się poleceniem w terminalu albo skrótem na pulpicie:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "gaming"
    ],
    "title": "Terminal"
   },
   {
    "t": "note",
    "kind": "info",
    "html": "Edycja Gaming nie jest edycją standardową — ukazuje się w wersjach <strong>x.3</strong> i <strong>x.7</strong>."
   },
   {
    "t": "h2",
    "text": "Inne jądro w dowolnej edycji"
   },
   {
    "t": "p",
    "html": "Domyślnie HackerOS używa zwykłego jądra Debiana. Jądra XanMod lub Liquorix zainstalujesz narzędziem <code>chker</code>. Nie oczekuj cudów: w grach różnice bywają niewielkie, więc warto mierzyć własny sprzęt, zamiast wierzyć w mit."
   },
   {
    "t": "h2",
    "text": "Hacker Launcher i gry z Windowsa"
   },
   {
    "t": "p",
    "html": "<strong>Hacker Launcher</strong> to narzędzie do uruchamiania gier <code>.exe</code> z użyciem wybranych wersji Protona. Jeśli jakaś gra działa gorzej z jedną wersją, możesz spróbować innej — bez ruszania całego systemu."
   },
   {
    "t": "h2",
    "text": "Gry od HackerOS"
   },
   {
    "t": "ul",
    "items": [
     "<strong>Bark Squadron</strong>",
     "<strong>The Racer</strong>",
     "<strong>Bit Jump</strong>",
     "<strong>StarBlaster</strong>"
    ]
   },
   {
    "t": "p",
    "html": "Dokumentację gier znajdziesz na stronie <a href=\"hackeros-games/docs.html\">HackerOS Games</a>. W aplikacji mobilnej HackerOS jest też sekcja <strong>Games</strong> z grami społeczności na Androida."
   },
   {
    "t": "h2",
    "text": "Dodaj własną grę"
   },
   {
    "t": "p",
    "html": "Zgłoszenia przyjmujemy wyłącznie przez Pull Requesty na GitHubie:"
   },
   {
    "t": "ul",
    "items": [
     "<strong>Gra:</strong> PR do repozytorium <a href=\"https://github.com/HackerOS-Linux-System/HackerOS-Games\">HackerOS-Games</a>, edycja pliku <code>HackerOS-Community-Games/list.json</code>.",
     "<strong>Pakiet:</strong> PR do repozytorium <a href=\"https://github.com/HackerOS-Linux-System/HackerOS-Package-Manager\">HackerOS-Package-Manager</a>, edycja pliku <code>repo/repo.json</code>."
    ]
   },
   {
    "t": "p",
    "html": "Kontrybutorzy są mile widziani — każdy może dołączyć do rozwoju projektu."
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "HackerOS is built on Debian Testing, so gamers get fresh drivers and libraries plus a few tools designed with games in mind. Here is what is worth knowing."
   },
   {
    "t": "h2",
    "text": "The Gaming edition"
   },
   {
    "t": "p",
    "html": "The <strong>Gaming</strong> edition is inspired by SteamOS and Bazzite and aimed at gaming PCs and laptops. The standard version ships with Steam and Gamescope preinstalled, and the kernel is <strong>XanMod LTS v3</strong>. (Older versions used the Liquorix kernel.)"
   },
   {
    "t": "p",
    "html": "Switch to game mode with a command in the terminal or with the desktop shortcut:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "gaming"
    ],
    "title": "Terminal"
   },
   {
    "t": "note",
    "kind": "info",
    "html": "The Gaming edition is not a standard edition — it is released as <strong>x.3</strong> and <strong>x.7</strong> versions."
   },
   {
    "t": "h2",
    "text": "A different kernel on any edition"
   },
   {
    "t": "p",
    "html": "By default HackerOS uses the regular Debian kernel. You can install the XanMod or Liquorix kernels with the <code>chker</code> tool. Don't expect miracles: in games the differences are often small, so measure your own hardware rather than trusting the myth."
   },
   {
    "t": "h2",
    "text": "Hacker Launcher and Windows games"
   },
   {
    "t": "p",
    "html": "<strong>Hacker Launcher</strong> is a tool for running <code>.exe</code> games with specific Proton versions. If a game runs worse on one version you can try another — without touching the rest of the system."
   },
   {
    "t": "h2",
    "text": "Games made by HackerOS"
   },
   {
    "t": "ul",
    "items": [
     "<strong>Bark Squadron</strong>",
     "<strong>The Racer</strong>",
     "<strong>Bit Jump</strong>",
     "<strong>StarBlaster</strong>"
    ]
   },
   {
    "t": "p",
    "html": "Documentation for the games is on the <a href=\"hackeros-games/docs.html\">HackerOS Games</a> page. The HackerOS mobile app also has a <strong>Games</strong> section with community games for Android."
   },
   {
    "t": "h2",
    "text": "Add your own game"
   },
   {
    "t": "p",
    "html": "Submissions are accepted only through Pull Requests on GitHub:"
   },
   {
    "t": "ul",
    "items": [
     "<strong>A game:</strong> open a PR to <a href=\"https://github.com/HackerOS-Linux-System/HackerOS-Games\">HackerOS-Games</a> editing <code>HackerOS-Community-Games/list.json</code>.",
     "<strong>A package:</strong> open a PR to <a href=\"https://github.com/HackerOS-Linux-System/HackerOS-Package-Manager\">HackerOS-Package-Manager</a> editing <code>repo/repo.json</code>."
    ]
   },
   {
    "t": "p",
    "html": "Contributors are very welcome — anyone can join the development of the project."
   }
  ]
 }
};
