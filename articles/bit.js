window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["bit"] = {
 "id": "bit",
 "date": "2026-09-29",
 "author": "HackerOS Team",
 "readingMinutes": 12,
 "icon": "📦",
 "tags": [
  "tools",
  "programming"
 ],
 "title": {
  "pl": "bit — menedżer pakietów dla H#, HackerScript i Hacker Lang",
  "en": "bit — the package manager for H#, HackerScript and Hacker Lang"
 },
 "summary": {
  "pl": "Następca bytes: jeden menedżer pakietów i narzędzie budowania dla całego ekosystemu HackerOS. Bit.hk, zależności i zakresy wersji, Bit.lock, indeks bibliotek i tryb offline.",
  "en": "The successor of bytes: one package manager and build tool for the whole HackerOS ecosystem. Bit.hk, dependencies and version ranges, Bit.lock, the library index and offline mode."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "<strong>bit</strong> to menedżer pakietów i narzędzie do budowania projektów dla trzech języków ekosystemu HackerOS: <strong>H#</strong>, <strong>Hacker Lang</strong> i <strong>HackerScript</strong>. Jest następcą dawnego <code>bytes</code>, napisany w całości w H# i linkowany statycznie — jedna binarka bez zależności."
   },
   {
    "t": "note",
    "kind": "info",
    "html": "<code>bytes</code> nie jest już menedżerem pakietów. Jego miejsce zajął <strong>bit</strong> — jeden wspólny menedżer dla H#, Hacker Lang i HackerScript. Stare pliki <code>Bit.hk</code> w dawnej składni i stare pliki blokad konwertuje polecenie <code>bit migrate</code>."
   },
   {
    "t": "h2",
    "text": "Szybki start"
   },
   {
    "t": "p",
    "html": "Nowy projekt zakładasz jednym poleceniem, wybierając język. Samo <code>bit</code>, bez argumentów, robi wszystko, co opisuje <code>Bit.hk</code>: instaluje brakujące zależności, buduje projekt według <code>[default-build]</code> i — jeśli sobie tego życzysz — uruchamia wynik."
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init myapp --lang h#   ;; h# | hl | hs   (--lib dla biblioteki)",
     "cd myapp",
     "bit                         ;; zależności → build → run"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Trzy języki, jedno narzędzie"
   },
   {
    "t": "table",
    "head": [
     "Język",
     "Kod źródłowy",
     "Wybór w bit"
    ],
    "rows": [
     [
      "H#",
      "<code>src/*.h#</code>",
      "<code>--lang h#</code>"
     ],
     [
      "Hacker Lang",
      "<code>main.hl</code> (wskazany w <code>hl-entry</code>)",
      "<code>--lang hl</code>"
     ],
     [
      "HackerScript",
      "<code>cmd/</code> i <code>lib/</code> (<code>*.hcs</code>)",
      "<code>--lang hs</code>"
     ]
    ]
   },
   {
    "t": "p",
    "html": "W jednym projekcie można łączyć kilka języków (<code>lang => h#, hs</code>). Jeśli pole <code>lang</code> nie jest podane, bit rozpoznaje język automatycznie. Które toolchainy masz zainstalowane, sprawdzisz poleceniem <code>bit langs</code>."
   },
   {
    "t": "h2",
    "text": "Plik Bit.hk"
   },
   {
    "t": "p",
    "html": "Manifest projektu to <code>Bit.hk</code> — plik w formacie <code>.hk</code> (HackerOS Configuration Format). Parsuje go oficjalna biblioteka <strong>hk-parser</strong>, więc obowiązuje jej gramatyka: komentarz zaczyna się od <code>!</code> (całe linie), wpis to <code>-&gt; klucz =&gt; wartość</code>, każdy kolejny poziom zagnieżdżenia dodaje myślnik (<code>--&gt;</code>, <code>---&gt;</code>), a tablice zapisujesz jako <code>[a, b]</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[package]",
     "-> name        => myapp",
     "-> version     => 0.1.0",
     "-> lang        => h#        ;; h# | hl | hs",
     "",
     "[build]",
     "-> link     => static      ;; jedyny tryb",
     "-> target   => h#          ;; toolchain: h# | hl | hs",
     "",
     "[default-build]",
     "-> profile => release",
     "-> emit    => bin",
     "-> run     => true",
     "",
     "[dependencies]",
     "-> mold => *               ;; najnowszy wpis w indeksie",
     "-> tui  => rev v1.0        ;; tag / branch / commit",
     "",
     "[commands]",
     "-> deploy",
     "--> run => scp cache/build/release/myapp server:/opt/",
     "--> description => Skopiuj build release na serwer"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "table",
    "head": [
     "Sekcja",
     "Do czego służy"
    ],
    "rows": [
     [
      "<code>[package]</code>",
      "nazwa, wersja, opis, autorzy, licencja, język"
     ],
     [
      "<code>[layout]</code>",
      "opcjonalne wskazanie katalogów (<code>src</code>, <code>hl-entry</code>); domyślnie wykrywane automatycznie"
     ],
     [
      "<code>[build]</code>",
      "linkowanie (tylko <code>static</code>), toolchain, platforma, flagi, część natywna"
     ],
     [
      "<code>[lib]</code>",
      "rodzaj wyjścia biblioteki: <code>hlib</code> (domyślnie), <code>so</code>, <code>a</code>, <code>obj</code>"
     ],
     [
      "<code>[default-build]</code>",
      "co robi samo <code>bit</code> / <code>bit build</code>: profil, emit, <code>before</code>/<code>after</code>, <code>run</code>"
     ],
     [
      "<code>[dependencies]</code>",
      "zależności z indeksu, z gita lub ze ścieżki"
     ],
     [
      "<code>[commands]</code>",
      "własne polecenia uruchamiane jako <code>bit nazwa</code>"
     ],
     [
      "<code>[hooks]</code>",
      "<code>pre-build</code> i <code>post-build</code>"
     ],
     [
      "<code>[workspace]</code>",
      "<code>members</code> — kilka projektów w jednym repozytorium"
     ]
    ]
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Starsze pliki (komentarze <code>;;</code>, zapis <code>klucz = wartość</code>) bit nadal czyta w trybie zgodności z ostrzeżeniem. Żeby je zaktualizować, uruchom <code>bit migrate</code> (z <code>--check</code> w CI)."
   },
   {
    "t": "h2",
    "text": "Najważniejsze polecenia"
   },
   {
    "t": "h3",
    "text": "Projekt"
   },
   {
    "t": "table",
    "head": [
     "Polecenie",
     "Działanie"
    ],
    "rows": [
     [
      "<code>bit init [nazwa] [--lang h#|hl|hs] [--lib]</code>",
      "nowy projekt albo inicjalizacja bieżącego katalogu"
     ],
     [
      "<code>bit build [--release] [--target] [--platform] [--emit]</code>",
      "budowanie; bez flag używa <code>[default-build]</code>"
     ],
     [
      "<code>bit run [-- args]</code>",
      "zbuduj i uruchom"
     ],
     [
      "<code>bit check</code>",
      "sprawdzenie składni i typów"
     ],
     [
      "<code>bit clean [--all]</code>",
      "usuwa <code>cache/</code> (<code>--all</code>: także stare wersje)"
     ],
     [
      "<code>bit x nazwa</code> / <code>bit nazwa</code>",
      "własne polecenie z <code>[commands]</code>"
     ],
     [
      "<code>bit publish</code>",
      "waliduje <code>Bit.hk</code> i wypisuje wpis do zgłoszenia w indeksie"
     ]
    ]
   },
   {
    "t": "h3",
    "text": "Biblioteki"
   },
   {
    "t": "table",
    "head": [
     "Polecenie",
     "Działanie"
    ],
    "rows": [
     [
      "<code>bit install [nazwa|git-url …]</code>",
      "instaluje biblioteki (bez nazwy: <code>[dependencies]</code> projektu)"
     ],
     [
      "<code>bit add nazwa [rev]</code>",
      "instaluje i dopisuje do <code>[dependencies]</code>"
     ],
     [
      "<code>bit remove nazwa [--global]</code>",
      "usuwa z projektu albo odinstalowuje"
     ],
     [
      "<code>bit upgrade [nazwa]</code>",
      "ponownie rozwiązuje zakresy wersji i odświeża <code>Bit.lock</code>"
     ],
     [
      "<code>bit outdated</code>",
      "zablokowana → najnowsza w zakresie → najnowsza w ogóle"
     ],
     [
      "<code>bit search</code>, <code>info</code>, <code>list</code>",
      "przeglądanie indeksu i zainstalowanych bibliotek"
     ],
     [
      "<code>bit update</code>",
      "odświeża indeks bibliotek"
     ],
     [
      "<code>bit verify</code>, <code>doctor</code>, <code>langs</code>",
      "sumy kontrolne, diagnostyka toolchainów, zainstalowane języki"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Przydatne opcje: <code>--release</code>, <code>--verbose</code>, <code>--force</code>, <code>--no-lock</code>, <code>--locked</code>, <code>--offline</code>, <code>--jobs N</code>. Biblioteki trafiają do <code>~/.hackeros/libs/</code>, są weryfikowane sumami kontrolnymi i linkowane statycznie."
   },
   {
    "t": "h2",
    "text": "Wersje, zakresy i Bit.lock"
   },
   {
    "t": "p",
    "html": "Zależności można przypinać dokładnie albo podawać zakresy wersji. Zakresy bit rozwiązuje na podstawie tagów gita biblioteki (<code>v1.2.3</code> lub <code>1.2.3</code>; wersje wstępne są pomijane). Wynik trafia do pliku <strong><code>Bit.lock</code></strong> (JSON Lines: nazwa, tag, commit, suma kontrolna i zakres, z którego pochodzi) — warto go commitować."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[dependencies]",
     "-> regex => ^1.2      ;; >= 1.2.0, < 2.0.0",
     "-> tui   => ~1.2.3     ;; >= 1.2.3, < 1.3.0",
     "-> json  => >=1.0 <2.0",
     "-> mold  => 1.x",
     "-> old   => rev v0.9.1 ;; dokładnie ten tag / branch / commit",
     "-> mine",
     "--> git => https://github.com/you/mine",
     "--> version => ^0.3"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "ul",
    "items": [
     "<code>bit install --locked</code> — dokładnie to, co mówi <code>Bit.lock</code>; kończy się błędem, gdy czegoś brakuje (idealne do CI).",
     "<code>bit upgrade --dry-run</code> działa jak <code>bit outdated</code> — pokazuje zmiany, niczego nie instalując.",
     "Zależność może wskazywać repozytorium gita lub lokalną ścieżkę (<code>path</code>)."
    ]
   },
   {
    "t": "h2",
    "text": "Indeks bibliotek"
   },
   {
    "t": "p",
    "html": "Biblioteki są opisane w publicznym indeksie <code>index/repository.json</code> repozytorium bit; ich przeglądarka działa na stronie bit.io. W indeksie znajdziesz m.in.:"
   },
   {
    "t": "table",
    "head": [
     "Biblioteka",
     "Opis"
    ],
    "rows": [
     [
      "<code>mold</code>, <code>tui</code>",
      "biblioteki TUI (inspirowane ratatui oraz bubbles/bubbletea)"
     ],
     [
      "<code>gtk</code>, <code>qt</code>, <code>silver</code>",
      "GUI: GTK, Qt i biblioteka Silver"
     ],
     [
      "<code>H2D</code>",
      "biblioteka gier 2D"
     ],
     [
      "<code>hprompt</code>",
      "biblioteka do powłok (inspirowana rustyline)"
     ],
     [
      "<code>obsidian</code>, <code>wasm</code>",
      "wrapper LLVM dla H# oraz biblioteka WASM"
     ],
     [
      "<code>hk-parser</code>, <code>hacker</code>",
      "oficjalne parsery plików <code>.hk</code> i <code>.hacker</code>"
     ],
     [
      "<code>json-parser</code>, <code>toml-parser</code>, <code>regex</code>",
      "parsery JSON i TOML oraz regex dla Hacker Lang"
     ],
     [
      "<code>landlock</code>, <code>libseccomp</code>",
      "piaskownica i filtrowanie wywołań systemowych"
     ],
     [
      "<code>container</code>, <code>git</code>, <code>lsp</code>, <code>progress-bar</code>, <code>nidus</code>",
      "kontenery, git, serwer LSP, paski postępu, czytelne błędy"
     ],
     [
      "<code>volcan</code>, <code>libfasttree</code>, <code>satsolv</code>",
      "Wayland (inspirowana smithay), następca ostree, wrapper libsolv"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Indeks liczy obecnie 25 bibliotek. Wpisy dodawane od teraz muszą mieć przypięty <code>rev</code> (tag wersji lub pełny commit, nie branch) i mogą zawierać sumę <code>checksum</code> (<code>sha256:…</code>). Zgłoszenia z forków zmieniające indeks czekają na zatwierdzenie przez maintainera, zanim CI zbuduje ich kod."
   },
   {
    "t": "h2",
    "text": "Części natywne"
   },
   {
    "t": "p",
    "html": "Biblioteka z kodem natywnym opisuje, jak go zbudować. Przed kompilacją bit buduje część natywną projektu i wszystkich zależności (rekurencyjnie) i eksportuje katalogi <code>native-lib-path</code> w <code>LIBRARY_PATH</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[build]",
     "-> native          => cargo build --release --lib",
     "-> native-lib-path => target/release",
     "-> native-skip-if  => target/release/libhk_parser.a"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "h2",
    "text": "Sieć i tryb offline"
   },
   {
    "t": "table",
    "head": [
     "Ustawienie",
     "Działanie"
    ],
    "rows": [
     [
      "<code>BIT_RETRIES</code>",
      "liczba prób (domyślnie 3), wykładniczy back-off 2 s, 4 s, 8 s"
     ],
     [
      "<code>BIT_TIMEOUT</code>",
      "limit w sekundach (domyślnie 120); git nigdy nie pyta o hasło"
     ],
     [
      "<code>--offline</code> / <code>BIT_OFFLINE=1</code>",
      "tylko zainstalowane biblioteki i zbuforowany indeks"
     ],
     [
      "<code>--jobs N</code> / <code>BIT_JOBS</code>",
      "równoległe klonowanie (domyślnie 4)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Przy klonowaniu i budowaniu bit pokazuje spinner (z procentami klonowania gita), a w CI albo z <code>--verbose</code> zwykłe linie logu."
   },
   {
    "t": "h2",
    "text": "Własne polecenia i haki"
   },
   {
    "t": "p",
    "html": "Sekcja <code>[commands]</code> pozwala zdefiniować własne polecenia, np. <code>bit deploy</code>; lista dostępna jest pod <code>bit commands</code>. Haki <code>pre-build</code> i <code>post-build</code> uruchamiają się przed i po budowaniu. Zmienne <code>BIT_HSHARP</code>, <code>BIT_HL</code> i <code>BIT_HACKERC</code> pozwalają wskazać własne toolchainy."
   },
   {
    "t": "h2",
    "text": "Bit i pozostałe języki"
   },
   {
    "t": "ul",
    "items": [
     "<strong>H#</strong> — bit woła <code>h# compile</code>; zależności kompilowane są jako <code>hlib</code>, <code>so</code>, <code>a</code> lub <code>obj</code>.",
     "<strong>Hacker Lang</strong> — biblioteki bit importujesz w skryptach przez <code># &lt;bit/nazwa&gt;</code>; punkt wejścia wskazuje <code>hl-entry</code>.",
     "<strong>HackerScript</strong> — bit buduje projekty z katalogów <code>cmd/</code> i <code>lib/</code>, korzystając z transpilatora <code>hackerc</code>."
    ]
   },
   {
    "t": "p",
    "html": "Szczegóły języków znajdziesz w artykułach: <a href=\"articles.html#/hsharp\">H#</a>, <a href=\"articles.html#/hacker-lang\">Hacker Lang</a> i <a href=\"articles.html#/hackerscript\">HackerScript</a>."
   },
   {
    "t": "h2",
    "text": "Jak zbudowany jest sam bit"
   },
   {
    "t": "p",
    "html": "bit jest napisany w H# i nie reimplementuje trzech rzeczy, tylko korzysta z gotowych bibliotek:"
   },
   {
    "t": "table",
    "head": [
     "Co",
     "Skąd"
    ],
    "rows": [
     [
      "manifesty <code>.hk</code>",
      "<strong>hk-parser</strong> (staticlib w Rust z ABI C, linkowana przez <code>extern static</code>)"
     ],
     [
      "paski postępu",
      "<strong>progress-bar</strong> (czyste H#)"
     ],
     [
      "JSON",
      "<code>std -> json</code> z H# (dlatego <code>Bit.lock</code> to JSON Lines)"
     ]
    ]
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bash scripts/bootstrap-ci.sh",
     "h# compile src/main.h# -o cache/build/release/bit --release"
    ],
    "title": "Budowanie bit ze źródeł"
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Repozytorium bit zawiera też skrypty CI (walidacja indeksu, test i budowanie nowych bibliotek) oraz stronę bit.io napisaną w TypeScript."
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "<strong>bit</strong> is the package manager and project build tool for the three languages of the HackerOS ecosystem: <strong>H#</strong>, <strong>Hacker Lang</strong> and <strong>HackerScript</strong>. It is the successor of the former <code>bytes</code>, written entirely in H# and statically linked — a single binary with no dependencies."
   },
   {
    "t": "note",
    "kind": "info",
    "html": "<code>bytes</code> is no longer a package manager. <strong>bit</strong> took its place — one shared manager for H#, Hacker Lang and HackerScript. Old-syntax <code>Bit.hk</code> files and old lock files are converted by <code>bit migrate</code>."
   },
   {
    "t": "h2",
    "text": "Quick start"
   },
   {
    "t": "p",
    "html": "Create a new project with one command and pick a language. A bare <code>bit</code> does everything <code>Bit.hk</code> describes: it installs missing dependencies, builds according to <code>[default-build]</code> and — if you asked for it — runs the result."
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init myapp --lang h#   ;; h# | hl | hs   (--lib for a library)",
     "cd myapp",
     "bit                         ;; dependencies → build → run"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Three languages, one tool"
   },
   {
    "t": "table",
    "head": [
     "Language",
     "Source code",
     "Selecting it in bit"
    ],
    "rows": [
     [
      "H#",
      "<code>src/*.h#</code>",
      "<code>--lang h#</code>"
     ],
     [
      "Hacker Lang",
      "<code>main.hl</code> (set in <code>hl-entry</code>)",
      "<code>--lang hl</code>"
     ],
     [
      "HackerScript",
      "<code>cmd/</code> and <code>lib/</code> (<code>*.hcs</code>)",
      "<code>--lang hs</code>"
     ]
    ]
   },
   {
    "t": "p",
    "html": "One project may combine several languages (<code>lang => h#, hs</code>). When <code>lang</code> is omitted, bit detects the language automatically. Use <code>bit langs</code> to see which toolchains are installed."
   },
   {
    "t": "h2",
    "text": "The Bit.hk file"
   },
   {
    "t": "p",
    "html": "The project manifest is <code>Bit.hk</code> — a file in the <code>.hk</code> format (HackerOS Configuration Format). It is parsed by the official <strong>hk-parser</strong> library, so its grammar applies: a comment starts with <code>!</code> (whole lines only), an entry is <code>-&gt; key =&gt; value</code>, each nesting level adds a dash (<code>--&gt;</code>, <code>---&gt;</code>), and arrays are written as <code>[a, b]</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[package]",
     "-> name        => myapp",
     "-> version     => 0.1.0",
     "-> lang        => h#        ;; h# | hl | hs",
     "",
     "[build]",
     "-> link     => static      ;; the only mode",
     "-> target   => h#          ;; toolchain: h# | hl | hs",
     "",
     "[default-build]",
     "-> profile => release",
     "-> emit    => bin",
     "-> run     => true",
     "",
     "[dependencies]",
     "-> mold => *               ;; newest index entry",
     "-> tui  => rev v1.0        ;; tag / branch / commit",
     "",
     "[commands]",
     "-> deploy",
     "--> run => scp cache/build/release/myapp server:/opt/",
     "--> description => Copy the release build to the server"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "table",
    "head": [
     "Section",
     "Purpose"
    ],
    "rows": [
     [
      "<code>[package]</code>",
      "name, version, description, authors, license, language"
     ],
     [
      "<code>[layout]</code>",
      "optional directory hints (<code>src</code>, <code>hl-entry</code>); auto-detected by default"
     ],
     [
      "<code>[build]</code>",
      "linking (only <code>static</code>), toolchain, platform, flags, native part"
     ],
     [
      "<code>[lib]</code>",
      "library output kind: <code>hlib</code> (default), <code>so</code>, <code>a</code>, <code>obj</code>"
     ],
     [
      "<code>[default-build]</code>",
      "what a bare <code>bit</code> / <code>bit build</code> does: profile, emit, <code>before</code>/<code>after</code>, <code>run</code>"
     ],
     [
      "<code>[dependencies]</code>",
      "dependencies from the index, from git or from a path"
     ],
     [
      "<code>[commands]</code>",
      "custom commands run as <code>bit name</code>"
     ],
     [
      "<code>[hooks]</code>",
      "<code>pre-build</code> and <code>post-build</code>"
     ],
     [
      "<code>[workspace]</code>",
      "<code>members</code> — several projects in one repository"
     ]
    ]
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Older files (<code>;;</code> comments, <code>key = value</code> syntax) are still read in compatibility mode with a warning. Run <code>bit migrate</code> to update them (with <code>--check</code> in CI)."
   },
   {
    "t": "h2",
    "text": "Key commands"
   },
   {
    "t": "h3",
    "text": "Project"
   },
   {
    "t": "table",
    "head": [
     "Command",
     "What it does"
    ],
    "rows": [
     [
      "<code>bit init [name] [--lang h#|hl|hs] [--lib]</code>",
      "new project or initialise the current directory"
     ],
     [
      "<code>bit build [--release] [--target] [--platform] [--emit]</code>",
      "build; without flags it uses <code>[default-build]</code>"
     ],
     [
      "<code>bit run [-- args]</code>",
      "build and run"
     ],
     [
      "<code>bit check</code>",
      "syntax and type check"
     ],
     [
      "<code>bit clean [--all]</code>",
      "removes <code>cache/</code> (<code>--all</code>: also old versions)"
     ],
     [
      "<code>bit x name</code> / <code>bit name</code>",
      "a custom command from <code>[commands]</code>"
     ],
     [
      "<code>bit publish</code>",
      "validates <code>Bit.hk</code> and prints the index entry to submit"
     ]
    ]
   },
   {
    "t": "h3",
    "text": "Libraries"
   },
   {
    "t": "table",
    "head": [
     "Command",
     "What it does"
    ],
    "rows": [
     [
      "<code>bit install [name|git-url …]</code>",
      "installs libraries (no name: the project's <code>[dependencies]</code>)"
     ],
     [
      "<code>bit add name [rev]</code>",
      "installs and adds to <code>[dependencies]</code>"
     ],
     [
      "<code>bit remove name [--global]</code>",
      "removes from the project or uninstalls"
     ],
     [
      "<code>bit upgrade [name]</code>",
      "re-resolves version ranges and refreshes <code>Bit.lock</code>"
     ],
     [
      "<code>bit outdated</code>",
      "locked → newest in range → newest overall"
     ],
     [
      "<code>bit search</code>, <code>info</code>, <code>list</code>",
      "browse the index and installed libraries"
     ],
     [
      "<code>bit update</code>",
      "refreshes the library index"
     ],
     [
      "<code>bit verify</code>, <code>doctor</code>, <code>langs</code>",
      "checksums, toolchain diagnostics, installed languages"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Useful options: <code>--release</code>, <code>--verbose</code>, <code>--force</code>, <code>--no-lock</code>, <code>--locked</code>, <code>--offline</code>, <code>--jobs N</code>. Libraries are installed to <code>~/.hackeros/libs/</code>, checksummed and linked statically."
   },
   {
    "t": "h2",
    "text": "Versions, ranges and Bit.lock"
   },
   {
    "t": "p",
    "html": "Dependencies can be pinned exactly or given as version ranges. Ranges are resolved against the library's git tags (<code>v1.2.3</code> or <code>1.2.3</code>; pre-releases are ignored). The result is written to <strong><code>Bit.lock</code></strong> (JSON Lines: name, resolved tag, commit, checksum and the range it came from) — commit it."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[dependencies]",
     "-> regex => ^1.2      ;; >= 1.2.0, < 2.0.0",
     "-> tui   => ~1.2.3     ;; >= 1.2.3, < 1.3.0",
     "-> json  => >=1.0 <2.0",
     "-> mold  => 1.x",
     "-> old   => rev v0.9.1 ;; exactly this tag / branch / commit",
     "-> mine",
     "--> git => https://github.com/you/mine",
     "--> version => ^0.3"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "ul",
    "items": [
     "<code>bit install --locked</code> — exactly what <code>Bit.lock</code> says; fails if something is missing (ideal for CI).",
     "<code>bit upgrade --dry-run</code> behaves like <code>bit outdated</code> — it shows changes without installing anything.",
     "A dependency can point to a git repository or a local <code>path</code>."
    ]
   },
   {
    "t": "h2",
    "text": "The library index"
   },
   {
    "t": "p",
    "html": "Libraries are described in the public <code>index/repository.json</code> of the bit repository; a browser for it runs on the bit.io website. The index includes, among others:"
   },
   {
    "t": "table",
    "head": [
     "Library",
     "Description"
    ],
    "rows": [
     [
      "<code>mold</code>, <code>tui</code>",
      "TUI libraries (inspired by ratatui and bubbles/bubbletea)"
     ],
     [
      "<code>gtk</code>, <code>qt</code>, <code>silver</code>",
      "GUI: GTK, Qt and the Silver library"
     ],
     [
      "<code>H2D</code>",
      "2D game library"
     ],
     [
      "<code>hprompt</code>",
      "library for shells (inspired by rustyline)"
     ],
     [
      "<code>obsidian</code>, <code>wasm</code>",
      "LLVM wrapper for H# and a WASM library"
     ],
     [
      "<code>hk-parser</code>, <code>hacker</code>",
      "official parsers for <code>.hk</code> and <code>.hacker</code> files"
     ],
     [
      "<code>json-parser</code>, <code>toml-parser</code>, <code>regex</code>",
      "JSON and TOML parsers and a regex library for Hacker Lang"
     ],
     [
      "<code>landlock</code>, <code>libseccomp</code>",
      "sandboxing and syscall filtering"
     ],
     [
      "<code>container</code>, <code>git</code>, <code>lsp</code>, <code>progress-bar</code>, <code>nidus</code>",
      "containers, git, an LSP library, progress bars, nice errors"
     ],
     [
      "<code>volcan</code>, <code>libfasttree</code>, <code>satsolv</code>",
      "Wayland (inspired by smithay), an ostree successor, a libsolv wrapper"
     ]
    ]
   },
   {
    "t": "p",
    "html": "The index currently holds 25 libraries. Entries added from now on must carry a pinned <code>rev</code> (a version tag or a full commit id, not a branch) and may carry a <code>checksum</code> (<code>sha256:…</code>). Pull requests from forks that touch the index wait for a maintainer's approval before CI builds their code."
   },
   {
    "t": "h2",
    "text": "Native parts"
   },
   {
    "t": "p",
    "html": "A library with native code says how to build it. Before compiling anything, bit builds the native part of the project and of every dependency (transitively) and exports all <code>native-lib-path</code> directories on <code>LIBRARY_PATH</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[build]",
     "-> native          => cargo build --release --lib",
     "-> native-lib-path => target/release",
     "-> native-skip-if  => target/release/libhk_parser.a"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "h2",
    "text": "Network and offline mode"
   },
   {
    "t": "table",
    "head": [
     "Setting",
     "Effect"
    ],
    "rows": [
     [
      "<code>BIT_RETRIES</code>",
      "number of attempts (default 3), exponential back-off 2 s, 4 s, 8 s"
     ],
     [
      "<code>BIT_TIMEOUT</code>",
      "limit in seconds (default 120); git never prompts for credentials"
     ],
     [
      "<code>--offline</code> / <code>BIT_OFFLINE=1</code>",
      "installed libraries and the cached index only"
     ],
     [
      "<code>--jobs N</code> / <code>BIT_JOBS</code>",
      "parallel clones (default 4)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "While cloning and building, bit shows a spinner (with git's clone percentage); in CI or with <code>--verbose</code> it prints plain log lines."
   },
   {
    "t": "h2",
    "text": "Custom commands and hooks"
   },
   {
    "t": "p",
    "html": "The <code>[commands]</code> section lets you define your own commands such as <code>bit deploy</code>; list them with <code>bit commands</code>. The <code>pre-build</code> and <code>post-build</code> hooks run before and after building. The <code>BIT_HSHARP</code>, <code>BIT_HL</code> and <code>BIT_HACKERC</code> variables point bit to custom toolchains."
   },
   {
    "t": "h2",
    "text": "bit and the other languages"
   },
   {
    "t": "ul",
    "items": [
     "<strong>H#</strong> — bit calls <code>h# compile</code>; dependencies are built as <code>hlib</code>, <code>so</code>, <code>a</code> or <code>obj</code>.",
     "<strong>Hacker Lang</strong> — import bit libraries in scripts with <code># &lt;bit/name&gt;</code>; the entry point is set by <code>hl-entry</code>.",
     "<strong>HackerScript</strong> — bit builds projects from the <code>cmd/</code> and <code>lib/</code> directories using the <code>hackerc</code> transpiler."
    ]
   },
   {
    "t": "p",
    "html": "Language details are in the articles on <a href=\"articles.html#/hsharp\">H#</a>, <a href=\"articles.html#/hacker-lang\">Hacker Lang</a> and <a href=\"articles.html#/hackerscript\">HackerScript</a>."
   },
   {
    "t": "h2",
    "text": "How bit itself is built"
   },
   {
    "t": "p",
    "html": "bit is written in H# and does not re-implement three things — it relies on ready-made libraries instead:"
   },
   {
    "t": "table",
    "head": [
     "What",
     "Where it comes from"
    ],
    "rows": [
     [
      "<code>.hk</code> manifests",
      "<strong>hk-parser</strong> (a Rust staticlib with a C ABI, linked with <code>extern static</code>)"
     ],
     [
      "progress bars",
      "<strong>progress-bar</strong> (pure H#)"
     ],
     [
      "JSON",
      "H# <code>std -> json</code> (which is why <code>Bit.lock</code> is JSON Lines)"
     ]
    ]
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bash scripts/bootstrap-ci.sh",
     "h# compile src/main.h# -o cache/build/release/bit --release"
    ],
    "title": "Building bit from source"
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "The bit repository also contains the CI scripts (index validation, testing and building new libraries) and the bit.io website written in TypeScript."
   }
  ]
 }
};
