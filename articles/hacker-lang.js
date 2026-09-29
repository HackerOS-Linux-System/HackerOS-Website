window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["hacker-lang"] = {
 "id": "hacker-lang",
 "date": "2026-09-29",
 "author": "HackerOS Team",
 "readingMinutes": 11,
 "icon": "🖥️",
 "tags": [
  "programming",
  "tools"
 ],
 "title": {
  "pl": "Hacker Lang — natywny język skryptowy HackerOS",
  "en": "Hacker Lang — the native scripting language of HackerOS"
 },
 "summary": {
  "pl": "Skryptowy język HackerOS z pipeline JIT (bytecode + Cranelift), składnią operatorową, goroutines, powłoką i dostępem do narzędzi systemu. Projekty budujesz przez bit.",
  "en": "The HackerOS scripting language with a JIT pipeline (bytecode + Cranelift), operator syntax, goroutines, a shell and access to system tools. Projects are built with bit."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "<strong>Hacker Lang</strong> (HL) to natywny język skryptowy HackerOS. Skrypty przechodzą przez pipeline JIT (AST → bytecode → kod maszynowy Cranelift), a język ma własną składnię operatorową i bezpośredni dostęp do narzędzi systemu. Aktualna generacja to <strong>gen 2</strong>."
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Hacker Lang działa <strong>wyłącznie na HackerOS</strong> — binarka <code>hl</code> jest wbudowana w system. Licencja: MPL 2.0."
   },
   {
    "t": "h2",
    "text": "Pierwszy skrypt"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "#!/usr/bin/env hl",
     "using <gen 2>",
     "",
     "% name: str = HackerOS",
     "~> Witaj, @name!"
    ],
    "title": "hello.hl"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hl hello.hl          ;; uruchom skrypt",
     "hl -c \"~> Hej!\"      ;; kod inline",
     "hl repl               ;; interaktywny REPL"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Pipeline wykonania"
   },
   {
    "t": "p",
    "html": "Domyślnie <code>hl run plik.hl</code> parsuje plik do AST, kompiluje go do zoptymalizowanego bytecode <code>.bc</code> (Cranelift IR), zapisuje go w cache i uruchamia przez interpreter bytecode z silnikiem JIT. Gorące pętle i funkcje (co najmniej 50 wywołań) są kompilowane do natywnego kodu maszynowego (x86_64/aarch64)."
   },
   {
    "t": "table",
    "head": [
     "Etap",
     "Co się dzieje"
    ],
    "rows": [
     [
      "parse",
      "<code>.hl</code> → AST"
     ],
     [
      "lower + optimize",
      "AST → <code>.bc</code>; stałe są składane, martwy kod usuwany"
     ],
     [
      "cache",
      "<code>~/.hackeros/hacker-lang/cache/</code> — klucz to hash źródła, ścieżki i mtime; maks. 30 plików, najstarsze usuwane automatycznie"
     ],
     [
      "run",
      "interpreter bytecode (zimna ścieżka) + JIT Cranelift (gorąca ścieżka, ≥ 50 wywołań)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Do JIT kwalifikują się głównie czyste pętle arytmetyczne i funkcje bez wywołań systemowych; I/O i komendy zawsze idą przez interpreter. JIT wyłączysz przez <code>hl run --no-jit plik.hl</code> lub <code>HL_NO_JIT=1</code>."
   },
   {
    "t": "h2",
    "text": "Komendy systemowe i operatory"
   },
   {
    "t": "p",
    "html": "W HL polecenia powłoki zapisujesz operatorami. Wybór operatora decyduje o uprawnieniach, izolacji i sposobie interpolacji zmiennych:"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ">   komenda            # zwykła",
     "^>  komenda            # sudo",
     "->  komenda            # izolacja namespace",
     "^-> komenda            # sudo + izolacja",
     ">>  komenda @var       # z interpolacją zmiennych",
     "*>  komenda            # przez hsh -c (powłoka HackerOS)",
     "&   komenda            # w tle, PID → @_bg_pid"
    ],
    "title": "komendy.hl"
   },
   {
    "t": "h2",
    "text": "Zmienne, typy i arytmetyka"
   },
   {
    "t": "p",
    "html": "Gen 2 wprowadza typowane zmienne (<code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>), natywną arytmetykę <code>$( … )</code> oraz przekazywanie wyniku komendy do zmiennej operatorem <code>|&gt;</code>. Do zmiennych odwołujesz się przez <code>@nazwa</code>, a tekst wypisujesz operatorem <code>~&gt;</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "% nazwa = wartosc           # gen 1 — bez typu",
     "% liczba: int  = 42        # gen 2",
     "% pi: float    = 3.14",
     "% tekst: str   = HackerOS",
     "% flaga: bool  = true",
     "@liczba                     # odwołanie do zmiennej",
     "",
     "$( @liczba * 2 + 10 ) -> @wynik    # arytmetyka natywna",
     "> hostname |> @host                # wynik komendy → zmienna"
    ],
    "title": "zmienne.hl"
   },
   {
    "t": "h2",
    "text": "Pętle, warunki i switch"
   },
   {
    "t": "p",
    "html": "Dostępne są pętle <code>@ x in …</code> (for-in), <code>?~</code> (while) i <code>_N</code> (powtórz N razy), warunki <code>? ok</code> / <code>? err</code> sprawdzające kod wyjścia ostatniej komendy oraz <code>? switch</code>. Bloki kończy słowo <code>done</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "% tools = \"curl git nmap python3\"",
     "@ tool in @tools              # for-in",
     "    ::which @tool",
     "    ? ok",
     "        ::green ✓ @tool",
     "    done",
     "    ? err",
     "        ::red   ✗ @tool",
     "    done",
     "done",
     "",
     "% i: int = 0",
     "?~ @i < 5                     # while",
     "    $( @i + 1 ) -> @i",
     "    ~> iteracja: @i",
     "done",
     "",
     "> uname -s |> @os",
     "? switch @os",
     "| Linux",
     "    ::green Linux wykryty",
     "| *",
     "    ~> Nieznany OS: @os",
     "done"
    ],
    "title": "sterowanie.hl"
   },
   {
    "t": "h2",
    "text": "Funkcje, goroutines i kanały"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ": backup def",
     "    > tar czf /tmp/backup.tgz ~/Documents",
     "    ~> gotowe",
     "done",
     "",
     "-- backup                     # wywołanie",
     "_3 ::green OK                 # powtórz 3 razy"
    ],
    "title": "funkcje.hl"
   },
   {
    "t": "p",
    "html": "Współbieżność opiera się na goroutines i kanałach: <code>:**</code> deklaruje kanał, <code>:*</code> uruchamia goroutine (nazwaną w gen 2 lub anonimową w gen 1), a <code>*--</code> wysyła do kanału lub z niego odbiera."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ":** wyniki                   # kanał",
     "",
     ":* scanner def                # goroutine z nazwą",
     "    > nmap -sn 192.168.1.0/24",
     "    *-- wyniki                # wyślij do kanału",
     "done",
     "",
     ":* pinger def",
     "    > ping -c 3 8.8.8.8",
     "    *-- wyniki",
     "done",
     "",
     "*-- wyniki                     # odbierz z kanału"
    ],
    "title": "goroutines.hl"
   },
   {
    "t": "h2",
    "text": "Importy, zależności i API HackerOS"
   },
   {
    "t": "p",
    "html": "Zależności systemowe deklarujesz komentarzem <code>// narzędzie</code> (są instalowane automatycznie). Biblioteki importujesz składnią <code># &lt;źródło/nazwa&gt;</code>, a narzędzia HackerOS wołasz operatorem <code>||</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "// curl                       # deklaracja zależności (auto-install)",
     "// nmap",
     "",
     "# <main/net>                 # biblioteka standardowa (.hl)",
     "# <main/colors>",
     "# <main/json>",
     "# <bit/hashlib>              # biblioteka z bit",
     "# <github/user/repo>         # GitHub",
     "",
     "|| hacker update             # API HackerOS",
     "|| hpkg install nmap",
     "|| hsh -c \"ls /tmp\""
    ],
    "title": "importy.hl"
   },
   {
    "t": "table",
    "head": [
     "Źródło importu",
     "Skąd pochodzi"
    ],
    "rows": [
     [
      "<code>main/</code>",
      "pliki <code>.hl</code> w <code>/usr/lib/HackerOS/Hacker-Lang/main-libs/</code>"
     ],
     [
      "<code>bit/</code>",
      "biblioteki instalowane menedżerem <a href=\"articles.html#/bit\">bit</a>"
     ],
     [
      "<code>github/user/repo</code>",
      "repozytorium GitHub"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Biblioteki standardowe <code>main/</code>: <code>net</code>, <code>colors</code>, <code>json</code>, <code>fs</code>, <code>str</code>, <code>sys</code>, <code>proc</code>, <code>crypto</code>, <code>cli</code>, <code>progress-bar</code>, <code>hbuild</code>, <code>hk-parser</code> (pliki <code>.hk</code>) i <code>hacker</code> (pliki <code>.hacker</code>). Przez operator <code>||</code> dostępne są m.in. <code>hacker</code>, <code>hpkg</code>, <code>hsh</code>, <code>H#</code>, <code>hco</code>, <code>hedit</code>, <code>hnm</code>, <code>lpm</code>, <code>Blue-Environment</code> i <code>hackeros-steam</code>."
   },
   {
    "t": "h2",
    "text": "Szybkie funkcje"
   },
   {
    "t": "p",
    "html": "Operator <code>::</code> udostępnia wbudowane funkcje bez uruchamiania zewnętrznych programów:"
   },
   {
    "t": "table",
    "head": [
     "Kategoria",
     "Przykłady"
    ],
    "rows": [
     [
      "tekst",
      "<code>::upper</code>, <code>::lower</code>, <code>::len</code>, <code>::trim</code>, <code>::rev</code>, <code>::replace</code>, <code>::split</code>, <code>::contains</code>"
     ],
     [
      "liczby",
      "<code>::abs</code>, <code>::ceil</code>, <code>::floor</code>, <code>::round</code>, <code>::max</code>, <code>::min</code>, <code>::rand</code>"
     ],
     [
      "system i pliki",
      "<code>::env</code>, <code>::date</code>, <code>::time</code>, <code>::pid</code>, <code>::which</code>, <code>::exists</code>, <code>::isdir</code>, <code>::isfile</code>, <code>::basename</code>, <code>::dirname</code>, <code>::read</code>"
     ],
     [
      "zmienne",
      "<code>::set</code>, <code>::get</code>, <code>::type</code>, <code>::unset</code>"
     ],
     [
      "wyjście",
      "<code>::nl</code>, <code>::hr</code>, <code>::bold</code>, <code>::red</code>, <code>::green</code>, <code>::yellow</code>, <code>::cyan</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Narzędzie hl"
   },
   {
    "t": "table",
    "head": [
     "Polecenie",
     "Działanie"
    ],
    "rows": [
     [
      "<code>hl plik.hl</code> / <code>hl run plik.hl</code>",
      "uruchom skrypt (pipeline JIT); <code>hl run plik.bc</code> uruchamia bytecode"
     ],
     [
      "<code>hl compile plik.hl</code>",
      "kompiluje do <code>plik.bc</code> (z shebangiem i bitem wykonywalnym)"
     ],
     [
      "<code>hl check plik.hl</code>",
      "składnia + linter (<code>--meta</code>: także gen i shebang)"
     ],
     [
      "<code>hl ast plik.hl</code>",
      "AST jako JSON"
     ],
     [
      "<code>hl repl</code>, <code>hl shell</code>",
      "REPL i powłoka systemowa"
     ],
     [
      "<code>hl exec</code>, <code>hl search</code>",
      "skrypty systemowe: uruchamianie i wyszukiwanie"
     ],
     [
      "<code>hl docs</code>",
      "dokumentacja w TUI"
     ],
     [
      "<code>hl clean</code>, <code>hl cache-info</code>",
      "czyszczenie i statystyki cache bytecode"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Bytecode .bc"
   },
   {
    "t": "p",
    "html": "Pliki <code>.bc</code> to binarny bytecode (nagłówek <code>HLBC</code>, wersja, nagłówek JSON i moduł IR w bincode). Mają dopisany shebang i bit wykonywalny, więc można je uruchamiać bezpośrednio: <code>./skrypt.bc</code>."
   },
   {
    "t": "h2",
    "text": "Powłoka i ~/.hlrc"
   },
   {
    "t": "p",
    "html": "HL może działać jako powłoka systemowa (<code>hl shell</code>). Konfigurację trzymasz w <code>~/.hlrc</code> — eksporty zmiennych (<code>=&gt;</code>) i własne funkcje. Wbudowane polecenia powłoki to <code>cd</code>, <code>vars</code>, <code>funcs</code>, <code>help</code>, <code>clear</code> i <code>exit</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "using <gen 2>",
     "",
     "=> EDITOR = nvim",
     "=> PATH [",
     "| /usr/local/bin",
     "| /usr/bin",
     "| /usr/lib/HackerOS",
     "]",
     "",
     ": ll def",
     "    > ls -la",
     "done"
    ],
    "title": "~/.hlrc"
   },
   {
    "t": "h2",
    "text": "Linter"
   },
   {
    "t": "p",
    "html": "Wbudowany linter w stylu Rusta wskazuje numery linii i podpowiada poprawkę. Wykrywa m.in. <code>echo</code> w blokach komend (zamiast tego użyj <code>~&gt;</code>), <code>sudo</code> zamiast <code>^&gt;</code>, <code>% PATH</code> zamiast <code>=&gt;</code> oraz brakujące deklaracje <code>//</code> dla narzędzi sieciowych."
   },
   {
    "t": "h2",
    "text": "Generacje języka"
   },
   {
    "t": "table",
    "head": [
     "Gen",
     "Status",
     "Opis"
    ],
    "rows": [
     [
      "gen 1",
      "aktywny",
      "podstawowa składnia: <code>&amp;</code>, <code>*&gt;</code>, <code>_N</code>, <code>&lt;&lt;</code>, goroutines"
     ],
     [
      "gen 2",
      "aktywny (domyślny)",
      "typowane zmienne, <code>$()</code>, <code>|&gt;</code>, <code>@ in</code>, <code>?~</code>, <code>? switch</code>, <code>||</code>"
     ],
     [
      "gen 3",
      "zarezerwowany",
      "domknięcia (planowane)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Generację deklarujesz opcjonalnie: <code>using &lt;gen 2&gt;</code> (domyślnie gen 2)."
   },
   {
    "t": "h2",
    "text": "Projekty z bit"
   },
   {
    "t": "p",
    "html": "Projekty Hacker Lang zakładasz i budujesz przez <a href=\"articles.html#/bit\">bit</a>. Ponieważ HL musi wiedzieć, gdzie leży kod, punkt wejścia wskazujesz w <code>Bit.hk</code>:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init myscript --lang hl",
     "cd myscript",
     "bit                 ;; instaluje zależności i uruchamia"
    ],
    "title": "Terminal"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[package]",
     "-> name => myscript",
     "-> lang => hl",
     "",
     "[layout]",
     "-> hl-entry => main.hl"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "h2",
    "text": "Pliki i rozszerzenia"
   },
   {
    "t": "table",
    "head": [
     "Rozszerzenie",
     "Opis"
    ],
    "rows": [
     [
      "<code>.hl</code>",
      "kod źródłowy Hacker Lang"
     ],
     [
      "<code>.bc</code>",
      "bytecode HL (wykonywalny bezpośrednio)"
     ],
     [
      "<code>.hlrc</code>",
      "konfiguracja powłoki (<code>~/.hlrc</code>)"
     ],
     [
      "<code>.hk</code>",
      "format konfiguracyjny HackerOS (<code>main/hk-parser</code>)"
     ],
     [
      "<code>.hacker</code>",
      "format metadanych HackerOS v1/v2/v3 (<code>main/hacker</code>)"
     ]
    ]
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Hacker Lang jest napisany w Rust jako workspace (parser, core, compiler, jit, shell, cli). Do automatyzacji systemu wybierz HL; do większych programów natywnych — <a href=\"articles.html#/hsharp\">H#</a>."
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "<strong>Hacker Lang</strong> (HL) is the native scripting language of HackerOS. Scripts go through a JIT pipeline (AST → bytecode → Cranelift machine code), and the language has its own operator-based syntax and direct access to system tools. The current generation is <strong>gen 2</strong>."
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Hacker Lang runs <strong>only on HackerOS</strong> — the <code>hl</code> binary is built into the system. Licence: MPL 2.0."
   },
   {
    "t": "h2",
    "text": "Your first script"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "#!/usr/bin/env hl",
     "using <gen 2>",
     "",
     "% name: str = HackerOS",
     "~> Hello, @name!"
    ],
    "title": "hello.hl"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hl hello.hl          ;; run a script",
     "hl -c \"~> Hi!\"       ;; inline code",
     "hl repl               ;; interactive REPL"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Execution pipeline"
   },
   {
    "t": "p",
    "html": "By default <code>hl run file.hl</code> parses the file into an AST, compiles it into optimised <code>.bc</code> bytecode (Cranelift IR), caches it and runs it through the bytecode interpreter with a JIT engine. Hot loops and functions (at least 50 calls) are compiled to native machine code (x86_64/aarch64)."
   },
   {
    "t": "table",
    "head": [
     "Stage",
     "What happens"
    ],
    "rows": [
     [
      "parse",
      "<code>.hl</code> → AST"
     ],
     [
      "lower + optimize",
      "AST → <code>.bc</code>; constants are folded, dead code is removed"
     ],
     [
      "cache",
      "<code>~/.hackeros/hacker-lang/cache/</code> — the key is a hash of source, path and mtime; max. 30 files, the oldest are removed automatically"
     ],
     [
      "run",
      "bytecode interpreter (cold path) + Cranelift JIT (hot path, ≥ 50 calls)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Mostly pure arithmetic loops and functions without system calls qualify for the JIT; I/O and commands always go through the interpreter. Disable the JIT with <code>hl run --no-jit file.hl</code> or <code>HL_NO_JIT=1</code>."
   },
   {
    "t": "h2",
    "text": "System commands and operators"
   },
   {
    "t": "p",
    "html": "In HL you write shell commands with operators. The operator you pick decides privileges, isolation and how variables are interpolated:"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ">   komenda            # plain",
     "^>  komenda            # sudo",
     "->  komenda            # namespace isolation",
     "^-> komenda            # sudo + isolation",
     ">>  komenda @var       # with variable interpolation",
     "*>  komenda            # through hsh -c (the HackerOS shell)",
     "&   komenda            # in the background, PID → @_bg_pid"
    ],
    "title": "commands.hl"
   },
   {
    "t": "h2",
    "text": "Variables, types and arithmetic"
   },
   {
    "t": "p",
    "html": "Gen 2 introduces typed variables (<code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>), native <code>$( … )</code> arithmetic and passing a command's output into a variable with the <code>|&gt;</code> operator. Variables are referenced as <code>@name</code>, and text is printed with <code>~&gt;</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "% nazwa = wartosc           # gen 1 — untyped",
     "% liczba: int  = 42        # gen 2",
     "% pi: float    = 3.14",
     "% tekst: str   = HackerOS",
     "% flaga: bool  = true",
     "@liczba                     # variable reference",
     "",
     "$( @liczba * 2 + 10 ) -> @wynik    # native arithmetic",
     "> hostname |> @host                # command output → variable"
    ],
    "title": "variables.hl"
   },
   {
    "t": "h2",
    "text": "Loops, conditions and switch"
   },
   {
    "t": "p",
    "html": "The language offers <code>@ x in …</code> (for-in), <code>?~</code> (while) and <code>_N</code> (repeat N times) loops, <code>? ok</code> / <code>? err</code> conditions that check the last command's exit code, and <code>? switch</code>. Blocks end with the word <code>done</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "% tools = \"curl git nmap python3\"",
     "@ tool in @tools              # for-in",
     "    ::which @tool",
     "    ? ok",
     "        ::green ✓ @tool",
     "    done",
     "    ? err",
     "        ::red   ✗ @tool",
     "    done",
     "done",
     "",
     "% i: int = 0",
     "?~ @i < 5                     # while",
     "    $( @i + 1 ) -> @i",
     "    ~> iteration: @i",
     "done",
     "",
     "> uname -s |> @os",
     "? switch @os",
     "| Linux",
     "    ::green Linux detected",
     "| *",
     "    ~> Unknown OS: @os",
     "done"
    ],
    "title": "control-flow.hl"
   },
   {
    "t": "h2",
    "text": "Functions, goroutines and channels"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ": backup def",
     "    > tar czf /tmp/backup.tgz ~/Documents",
     "    ~> done",
     "done",
     "",
     "-- backup                     # call",
     "_3 ::green OK                 # repeat 3 times"
    ],
    "title": "functions.hl"
   },
   {
    "t": "p",
    "html": "Concurrency is built on goroutines and channels: <code>:**</code> declares a channel, <code>:*</code> starts a goroutine (named in gen 2, anonymous in gen 1), and <code>*--</code> sends to or receives from a channel."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ":** wyniki                   # channel",
     "",
     ":* scanner def                # named goroutine",
     "    > nmap -sn 192.168.1.0/24",
     "    *-- wyniki                # send to the channelu",
     "done",
     "",
     ":* pinger def",
     "    > ping -c 3 8.8.8.8",
     "    *-- wyniki",
     "done",
     "",
     "*-- wyniki                     # receive from the channelu"
    ],
    "title": "goroutines.hl"
   },
   {
    "t": "h2",
    "text": "Imports, dependencies and the HackerOS API"
   },
   {
    "t": "p",
    "html": "Declare system dependencies with a <code>// tool</code> comment (they are installed automatically). Import libraries with <code># &lt;source/name&gt;</code> and call HackerOS tools with the <code>||</code> operator."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "// curl                       # dependency declaration (auto-install)",
     "// nmap",
     "",
     "# <main/net>                 # standard library (.hl)",
     "# <main/colors>",
     "# <main/json>",
     "# <bit/hashlib>              # library from bit",
     "# <github/user/repo>         # GitHub",
     "",
     "|| hacker update             # HackerOS API",
     "|| hpkg install nmap",
     "|| hsh -c \"ls /tmp\""
    ],
    "title": "imports.hl"
   },
   {
    "t": "table",
    "head": [
     "Import source",
     "Where it comes from"
    ],
    "rows": [
     [
      "<code>main/</code>",
      "<code>.hl</code> files in <code>/usr/lib/HackerOS/Hacker-Lang/main-libs/</code>"
     ],
     [
      "<code>bit/</code>",
      "libraries installed with the <a href=\"articles.html#/bit\">bit</a> package manager"
     ],
     [
      "<code>github/user/repo</code>",
      "a GitHub repository"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Standard <code>main/</code> libraries: <code>net</code>, <code>colors</code>, <code>json</code>, <code>fs</code>, <code>str</code>, <code>sys</code>, <code>proc</code>, <code>crypto</code>, <code>cli</code>, <code>progress-bar</code>, <code>hbuild</code>, <code>hk-parser</code> (<code>.hk</code> files) and <code>hacker</code> (<code>.hacker</code> files). Through the <code>||</code> operator you can reach, among others, <code>hacker</code>, <code>hpkg</code>, <code>hsh</code>, <code>H#</code>, <code>hco</code>, <code>hedit</code>, <code>hnm</code>, <code>lpm</code>, <code>Blue-Environment</code> and <code>hackeros-steam</code>."
   },
   {
    "t": "h2",
    "text": "Quick functions"
   },
   {
    "t": "p",
    "html": "The <code>::</code> operator exposes built-in functions without launching external programs:"
   },
   {
    "t": "table",
    "head": [
     "Category",
     "Examples"
    ],
    "rows": [
     [
      "text",
      "<code>::upper</code>, <code>::lower</code>, <code>::len</code>, <code>::trim</code>, <code>::rev</code>, <code>::replace</code>, <code>::split</code>, <code>::contains</code>"
     ],
     [
      "numbers",
      "<code>::abs</code>, <code>::ceil</code>, <code>::floor</code>, <code>::round</code>, <code>::max</code>, <code>::min</code>, <code>::rand</code>"
     ],
     [
      "system and files",
      "<code>::env</code>, <code>::date</code>, <code>::time</code>, <code>::pid</code>, <code>::which</code>, <code>::exists</code>, <code>::isdir</code>, <code>::isfile</code>, <code>::basename</code>, <code>::dirname</code>, <code>::read</code>"
     ],
     [
      "variables",
      "<code>::set</code>, <code>::get</code>, <code>::type</code>, <code>::unset</code>"
     ],
     [
      "output",
      "<code>::nl</code>, <code>::hr</code>, <code>::bold</code>, <code>::red</code>, <code>::green</code>, <code>::yellow</code>, <code>::cyan</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "The hl tool"
   },
   {
    "t": "table",
    "head": [
     "Command",
     "What it does"
    ],
    "rows": [
     [
      "<code>hl file.hl</code> / <code>hl run file.hl</code>",
      "run a script (JIT pipeline); <code>hl run file.bc</code> runs bytecode"
     ],
     [
      "<code>hl compile file.hl</code>",
      "compiles to <code>file.bc</code> (with a shebang and the executable bit)"
     ],
     [
      "<code>hl check file.hl</code>",
      "syntax + linter (<code>--meta</code>: also gen and shebang)"
     ],
     [
      "<code>hl ast file.hl</code>",
      "AST as JSON"
     ],
     [
      "<code>hl repl</code>, <code>hl shell</code>",
      "REPL and system shell"
     ],
     [
      "<code>hl exec</code>, <code>hl search</code>",
      "system scripts: run and search"
     ],
     [
      "<code>hl docs</code>",
      "documentation in a TUI"
     ],
     [
      "<code>hl clean</code>, <code>hl cache-info</code>",
      "clear and inspect the bytecode cache"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "The .bc bytecode"
   },
   {
    "t": "p",
    "html": "<code>.bc</code> files are binary bytecode (an <code>HLBC</code> header, a version, a JSON header and an IR module in bincode). They get a shebang and the executable bit, so you can run them directly: <code>./script.bc</code>."
   },
   {
    "t": "h2",
    "text": "Shell and ~/.hlrc"
   },
   {
    "t": "p",
    "html": "HL can act as a system shell (<code>hl shell</code>). Keep its configuration in <code>~/.hlrc</code> — variable exports (<code>=&gt;</code>) and your own functions. Built-in shell commands are <code>cd</code>, <code>vars</code>, <code>funcs</code>, <code>help</code>, <code>clear</code> and <code>exit</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "using <gen 2>",
     "",
     "=> EDITOR = nvim",
     "=> PATH [",
     "| /usr/local/bin",
     "| /usr/bin",
     "| /usr/lib/HackerOS",
     "]",
     "",
     ": ll def",
     "    > ls -la",
     "done"
    ],
    "title": "~/.hlrc"
   },
   {
    "t": "h2",
    "text": "Linter"
   },
   {
    "t": "p",
    "html": "The built-in Rust-style linter points to line numbers and suggests a fix. It detects, among others, <code>echo</code> inside command blocks (use <code>~&gt;</code> instead), <code>sudo</code> instead of <code>^&gt;</code>, <code>% PATH</code> instead of <code>=&gt;</code>, and missing <code>//</code> declarations for network tools."
   },
   {
    "t": "h2",
    "text": "Language generations"
   },
   {
    "t": "table",
    "head": [
     "Gen",
     "Status",
     "Description"
    ],
    "rows": [
     [
      "gen 1",
      "active",
      "basic syntax: <code>&amp;</code>, <code>*&gt;</code>, <code>_N</code>, <code>&lt;&lt;</code>, goroutines"
     ],
     [
      "gen 2",
      "active (default)",
      "typed variables, <code>$()</code>, <code>|&gt;</code>, <code>@ in</code>, <code>?~</code>, <code>? switch</code>, <code>||</code>"
     ],
     [
      "gen 3",
      "reserved",
      "closures (planned)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Declaring a generation is optional: <code>using &lt;gen 2&gt;</code> (gen 2 is the default)."
   },
   {
    "t": "h2",
    "text": "Projects with bit"
   },
   {
    "t": "p",
    "html": "Create and build Hacker Lang projects with <a href=\"articles.html#/bit\">bit</a>. Because HL must be told where its code lives, set the entry point in <code>Bit.hk</code>:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init myscript --lang hl",
     "cd myscript",
     "bit                 ;; installs dependencies and runs"
    ],
    "title": "Terminal"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[package]",
     "-> name => myscript",
     "-> lang => hl",
     "",
     "[layout]",
     "-> hl-entry => main.hl"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "h2",
    "text": "Files and extensions"
   },
   {
    "t": "table",
    "head": [
     "Extension",
     "Description"
    ],
    "rows": [
     [
      "<code>.hl</code>",
      "Hacker Lang source code"
     ],
     [
      "<code>.bc</code>",
      "HL bytecode (directly executable)"
     ],
     [
      "<code>.hlrc</code>",
      "shell configuration (<code>~/.hlrc</code>)"
     ],
     [
      "<code>.hk</code>",
      "HackerOS configuration format (<code>main/hk-parser</code>)"
     ],
     [
      "<code>.hacker</code>",
      "HackerOS metadata format v1/v2/v3 (<code>main/hacker</code>)"
     ]
    ]
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Hacker Lang itself is written in Rust as a workspace (parser, core, compiler, jit, shell, cli). Pick HL for system automation; for larger native programs pick <a href=\"articles.html#/hsharp\">H#</a>."
   }
  ]
 }
};
