window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["hackerscript"] = {
 "id": "hackerscript",
 "date": "2026-09-29",
 "author": "HackerOS Team",
 "readingMinutes": 11,
 "icon": "📜",
 "tags": [
  "programming",
  "tools"
 ],
 "title": {
  "pl": "HackerScript — język, który kompiluje się do Rusta",
  "en": "HackerScript — the language that compiles to Rust"
 },
 "summary": {
  "pl": "Język ogólnego przeznaczenia: fun kompiluje się do prawdziwego Rusta, direct[…] wykonuje czysty Python. Self-hostujący transpilator hackerc, moduły, FFI i playground WASM.",
  "en": "A general-purpose language: fun compiles to real Rust, direct[…] runs plain Python. The self-hosting hackerc transpiler, modules, FFI and a WASM playground."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "<strong>HackerScript</strong> to język programowania ogólnego przeznaczenia. Zwykła funkcja <code>fun</code> kompiluje się do <strong>prawdziwego Rusta</strong> — ze statycznymi typami, bezpieczeństwem pamięci i abstrakcjami bez narzutu. Blok <code>direct [ … ]</code> to ucieczka do czystego Pythona, wykonywanego przez wbudowany interpreter (PyO3) — dla tych niewielu fragmentów kodu, które nigdy nie będą potrzebowały wydajności."
   },
   {
    "t": "note",
    "kind": "info",
    "html": "HackerScript osiągnął <strong>bootstrap</strong>: transpilator <code>hackerc</code> jest w całości napisany w samym HackerScript (pliki <code>.hcs</code>). Aktualna wersja to <strong>0.4</strong>, a licencja to MIT."
   },
   {
    "t": "h2",
    "text": "Pierwszy program"
   },
   {
    "t": "p",
    "html": "Bloki w HackerScript ujmujesz w nawiasy kwadratowe <code>[ … ]</code>, wartość z funkcji zwracasz słowem <code>end</code>, a komentarze zaczynają się od <code>!!</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "struct Point [",
     "    x: Int,",
     "    y: Int",
     "]",
     "",
     "fun distance_squared(p: Point) -> Int [",
     "    end (p.x * p.x) + (p.y * p.y)",
     "]",
     "",
     "fun main() [",
     "    let p = Point(3, 4)",
     "    log(\"dist^2 =\", distance_squared(p))",
     "",
     "    direct [",
     "        print(\"To jest czysty Python wewnątrz binarki Rust.\")",
     "    ]",
     "    end",
     "]"
    ],
    "title": "main.hcs"
   },
   {
    "t": "h2",
    "text": "Jak to działa"
   },
   {
    "t": "ul",
    "items": [
     "<strong><code>fun</code> → Rust:</strong> <code>hackerc</code> generuje prawdziwy kod Rust. <code>struct</code> staje się <code>struct</code> z <code>impl new()</code>, <code>manual[]</code> — blokiem <code>unsafe{}</code>, a <code>List&lt;T&gt;</code> — <code>Vec&lt;T&gt;</code>.",
     "<strong>Własność bez bólu:</strong> parametry typu <code>struct</code>, <code>List</code> i <code>Str</code> automatycznie dostają <code>&amp;</code> / <code>&amp;mut</code> zamiast przenoszenia własności.",
     "<strong><code>direct [ … ]</code> → Python:</strong> surowy Python wykonywany w trakcie działania programu przez <code>Python::with_gil</code> (PyO3). Hostem jest Rust.",
     "<strong>Moduły:</strong> <code>get &lt;core:memory::arena&gt;</code> realnie importuje kod z <code>libs/core/lib/memory/arena.hcs</code>. Sygnatury zbierane są z całego projektu w dwóch fazach, dzięki czemu wywołania między plikami też dostają poprawne referencje.",
     "<strong>Zależności Rust:</strong> <code>get &lt;crates:nazwa&gt;</code> to prawdziwa zależność Cargo.",
     "<strong>Budowanie:</strong> <code>hackerc</code> generuje crate Cargo, a <code>cargo build</code> kompiluje go do binarki — Cargo jest tu wyłącznie kompilatorem."
    ]
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Do uruchomienia wygenerowanego programu potrzebujesz zainstalowanego Rusta."
   },
   {
    "t": "h2",
    "text": "Szybki start"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hackerc check projekt/cmd/main.hcs",
     "hackerc build projekt/cmd/main.hcs -o /tmp/out",
     "cd /tmp/out && cargo run"
    ],
    "title": "Terminal"
   },
   {
    "t": "p",
    "html": "Projekty zakładasz i budujesz menedżerem <a href=\"articles.html#/bit\">bit</a>, który obsługuje HackerScript obok H# i Hacker Lang:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init mój-projekt --lang hs",
     "cd mój-projekt",
     "bit build --release"
    ],
    "title": "Terminal"
   },
   {
    "t": "p",
    "html": "Plik wejściowy budowalnego projektu to zawsze <code>cmd/main.hcs</code> — bez żadnej konfiguracji, tak jak Cargo samo znajduje <code>src/main.rs</code>. Kod biblioteczny trafia do <code>lib/</code> (z punktem wejścia <code>lib/mod.hcs</code>)."
   },
   {
    "t": "h2",
    "text": "Wersja języka: using"
   },
   {
    "t": "p",
    "html": "Na początku pliku możesz zadeklarować wymaganą wersję kompilatora dyrektywą <code>using &lt;wersja&gt;</code>. Jeśli odpowiedni <code>hackerc</code> nie jest zainstalowany, jest pobierany automatycznie z GitHub Releases i buforowany."
   },
   {
    "t": "h2",
    "text": "Typy, struktury i dopasowanie wzorców"
   },
   {
    "t": "p",
    "html": "HackerScript ma statyczne typy (<code>Int</code>, <code>Bool</code>, <code>Str</code>, <code>List&lt;T&gt;</code>, <code>Dict</code>, <code>Set</code>), struktury z blokami <code>impl</code>, enumy, generyki oraz pełne <code>match</code> na <code>Result</code> i <code>Option</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "!! komentarz liniowy",
     "fun unwrap_or<T, E>(r: Result<T, E>, domyslna: T) -> T [",
     "    match r [",
     "        Ok(v) -> [",
     "            end v",
     "        ]",
     "        Err(_e) -> [",
     "            end domyslna",
     "        ]",
     "    ]",
     "]"
    ],
    "title": "result.hcs"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "fun constant_time_eq(a: List<Int>, b: List<Int>) -> Int [",
     "    if a.len() != b.len() [",
     "        end 0",
     "    ]",
     "    let diff = 0",
     "    let i = 0",
     "    while i < a.len() [",
     "        if a[i] != b[i] [",
     "            diff = diff + 1",
     "        ]",
     "        i = i + 1",
     "    ]",
     "    if diff == 0 [",
     "        end 1",
     "    ]",
     "    end 0",
     "]"
    ],
    "title": "constant_time.hcs"
   },
   {
    "t": "h2",
    "text": "direct i manual"
   },
   {
    "t": "p",
    "html": "<code>direct [ … ]</code> uruchamia czysty Python — przydatne do prototypowania lub kodu, który nigdy nie będzie krytyczny dla wydajności. <code>manual[ … ]</code> kompiluje się do bloku <code>unsafe{}</code>, gdy potrzebna jest niskopoziomowa kontrola."
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Kod w <code>direct</code> działa w interpreterze Pythona osadzonym w binarce, więc nie zyskuje na wydajności kompilacji do Rusta."
   },
   {
    "t": "h2",
    "text": "System modułów: get"
   },
   {
    "t": "p",
    "html": "Importy realizuje słowo <code>get</code>. Aliasy <code>core</code> i <code>std</code> wskazują na biblioteki dołączone do języka, a od wersji 0.4 <code>get &lt;work:członek[::plik]&gt;</code> importuje <code>lib/mod.hcs</code> (albo <code>lib/&lt;plik&gt;.hcs</code>) dowolnego członka workspace — analog Rustowego <code>use nazwa_membera::modul::*;</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "get <core:memory::arena>",
     "get <std:term>",
     "get <work:czlonek::plik>"
    ],
    "title": "moduly.hcs"
   },
   {
    "t": "table",
    "head": [
     "Import",
     "Znaczenie"
    ],
    "rows": [
     [
      "<code>get &lt;core:…&gt;</code>",
      "biblioteka <code>core</code> — alokatory pamięci"
     ],
     [
      "<code>get &lt;std:…&gt;</code>",
      "biblioteka standardowa"
     ],
     [
      "<code>get &lt;work:członek::plik&gt;</code>",
      "dowolny członek <code>[workspace] members</code> (od 0.4)"
     ],
     [
      "<code>get &lt;crates:nazwa&gt;</code>",
      "zależność Cargo"
     ],
     [
      "<code>get &lt;c:…&gt;</code>, <code>get &lt;cpp:…&gt;</code>",
      "zależności C i C++ (FFI 0.3)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "Biblioteka musi mieć <code>mod.hcs</code> w korzeniu, jeśli ma być importowana bez <code>::</code>. Zewnętrzne biblioteki instalujesz przez <a href=\"articles.html#/bit\">bit</a>."
   },
   {
    "t": "h2",
    "text": "FFI: extern, region, C i C++"
   },
   {
    "t": "p",
    "html": "Od wersji 0.3 FFI zostało przeprojektowane: <code>get &lt;extern:ścieżka&gt; use &lt;static|dynamic&gt;</code> wraz z blokiem <code>region [ … ]</code> pozwala zadeklarować dowolnie wiele sygnatur powiązanych z jedną biblioteką. Dochodzą <code>get &lt;c:…&gt;</code> i <code>get &lt;cpp:…&gt;</code> (zależności budowane przez crate <code>cc</code>) oraz <code>native {C++} [ … ]</code> — kod C++ kompilowany w czasie budowania (a nie interpretowany)."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ";; FFI 0.3: sygnatury powiązane z jedną biblioteką",
     "get <extern:sciezka> use <static>",
     "region [",
     "    ;; dowolnie wiele sygnatur naraz",
     "",
     "]",
     "",
     ";; zależności C i C++",
     "get <c:nazwa>",
     "get <cpp:nazwa>",
     "",
     ";; kod C++ kompilowany w czasie budowania",
     "native {C++} [",
     "    ;; ...",
     "]"
    ],
    "title": "ffi.hcs"
   },
   {
    "t": "h2",
    "text": "Biblioteka standardowa"
   },
   {
    "t": "table",
    "head": [
     "Moduł",
     "Zawartość"
    ],
    "rows": [
     [
      "<code>core</code>",
      "cztery alokatory pamięci: <code>arena</code>, <code>chained_arena</code>, <code>stack_allocator</code>, <code>pool_allocator</code>"
     ],
     [
      "<code>std</code> — pliki i ścieżki",
      "<code>fs</code>, <code>io</code>, <code>path</code>, <code>env</code>, <code>process</code>"
     ],
     [
      "<code>std</code> — dane",
      "<code>string</code>, <code>math</code>, <code>json</code>, <code>toml</code>, <code>hk</code> (format <code>.hk</code>), <code>result</code>"
     ],
     [
      "<code>std</code> — sieć i terminal",
      "<code>http</code>, <code>term</code> (kolory i pasek postępu)"
     ],
     [
      "<code>std</code> — cybersecurity",
      "<code>constant_time_eq</code> (porównanie w stałym czasie), <code>shannon_entropy</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Kolorowe CLI i pasek postępu"
   },
   {
    "t": "p",
    "html": "<code>hackerc build</code>, <code>check</code>, <code>lint</code> i <code>fmt</code> mają kolorowe wyjście (zielony — sukces, czerwony — błąd, cyjan — nazwy) i prawdziwy, procentowy pasek postępu. Kolory wyłączysz zmienną środowiskową <code>NO_COLOR</code>. Błędy renderowane są w stylu rustc, z podkreśloną linią."
   },
   {
    "t": "h2",
    "text": "Struktura kompilatora"
   },
   {
    "t": "p",
    "html": "Cały transpilator <code>hackerc</code> jest napisany w HackerScript:"
   },
   {
    "t": "table",
    "head": [
     "Plik",
     "Rola"
    ],
    "rows": [
     [
      "<code>lexer.hcs</code>, <code>parser.hcs</code>",
      "tokenizacja i parser rekurencyjnie zstępujący → AST"
     ],
     [
      "<code>typecheck.hcs</code>, <code>typeinfer.hcs</code>",
      "diagnostyki, inferencja typów, sygnatury projektu"
     ],
     [
      "<code>codegen.hcs</code>",
      "AST → tekst Rust (największy plik)"
     ],
     [
      "<code>project.hcs</code>",
      "składanie projektów wieloplikowych i <code>Cargo.toml</code>"
     ],
     [
      "<code>formatter.hcs</code>, <code>diagnostics.hcs</code>",
      "formater kodu i renderowanie błędów"
     ],
     [
      "<code>main.hcs</code>",
      "CLI: <code>build</code>, <code>check</code>, <code>lint</code>, <code>fmt</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Playground w przeglądarce (WASM)"
   },
   {
    "t": "p",
    "html": "Od wersji 0.4 istnieje pierwszy działający pipeline do WebAssembly: atrybut <code>@wasm_export</code> oznacza funkcje eksportowane do WASM. Dzięki niemu checker HackerScript działa w przeglądarce — w stylu Rust Playground."
   },
   {
    "t": "h2",
    "text": "Historia wersji"
   },
   {
    "t": "table",
    "head": [
     "Wersja",
     "Co przyniosła"
    ],
    "rows": [
     [
      "0.0.1",
      "zamrożona wersja startowa — punkt odniesienia „skąd zaczęliśmy”"
     ],
     [
      "0.1",
      "<strong>bootstrap</strong>: <code>hackerc</code> przepisany na samo HackerScript, pierwsze wydanie binarne"
     ],
     [
      "0.2",
      "kolorowe CLI i pasek postępu (<code>std:term</code>)"
     ],
     [
      "0.3",
      "przeprojektowane FFI: <code>extern</code> + <code>region</code>, <code>c</code>/<code>cpp</code>, <code>native {C++}</code>"
     ],
     [
      "0.4",
      "<code>get &lt;work:…&gt;</code>, wspólny <code>cache/</code> dla workspace, <code>@wasm_export</code> i playground WASM"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Status i ograniczenia"
   },
   {
    "t": "p",
    "html": "Kompilator jest weryfikowany przez <code>hackerc check</code> oraz CI, które buduje i uruchamia wygenerowane crate'y. Do znanych braków należą m.in. iteracja po <code>Dict</code> i <code>Set</code>, numery linii w AST czy <code>log()</code> dla struktur i enumów. Pełna, szczera lista znajduje się w <code>docs/ROADMAP.md</code> repozytorium, a pełny opis składni w <code>docs/SYNTAX.md</code>."
   },
   {
    "t": "p",
    "html": "Dokumentacja języka: <a href=\"tools-docs/HackerScript/docs.html\">HackerScript — dokumentacja</a>."
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "<strong>HackerScript</strong> is a general-purpose programming language. A regular <code>fun</code> compiles to <strong>real Rust</strong> — with static types, memory safety and zero-cost abstractions. A <code>direct [ … ]</code> block is an escape hatch to plain Python, executed by an embedded interpreter (PyO3) — for those few fragments of code that will never need performance."
   },
   {
    "t": "note",
    "kind": "info",
    "html": "HackerScript has reached <strong>bootstrap</strong>: the <code>hackerc</code> transpiler is written entirely in HackerScript itself (<code>.hcs</code> files). The current version is <strong>0.4</strong> and the licence is MIT."
   },
   {
    "t": "h2",
    "text": "Your first program"
   },
   {
    "t": "p",
    "html": "Blocks in HackerScript are enclosed in square brackets <code>[ … ]</code>, a function returns its value with the word <code>end</code>, and comments start with <code>!!</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "struct Point [",
     "    x: Int,",
     "    y: Int",
     "]",
     "",
     "fun distance_squared(p: Point) -> Int [",
     "    end (p.x * p.x) + (p.y * p.y)",
     "]",
     "",
     "fun main() [",
     "    let p = Point(3, 4)",
     "    log(\"dist^2 =\", distance_squared(p))",
     "",
     "    direct [",
     "        print(\"This is plain Python inside a Rust binary.\")",
     "    ]",
     "    end",
     "]"
    ],
    "title": "main.hcs"
   },
   {
    "t": "h2",
    "text": "How it works"
   },
   {
    "t": "ul",
    "items": [
     "<strong><code>fun</code> → Rust:</strong> <code>hackerc</code> generates real Rust code. A <code>struct</code> becomes a <code>struct</code> with <code>impl new()</code>, <code>manual[]</code> becomes an <code>unsafe{}</code> block and <code>List&lt;T&gt;</code> becomes <code>Vec&lt;T&gt;</code>.",
     "<strong>Ownership without pain:</strong> <code>struct</code>, <code>List</code> and <code>Str</code> parameters automatically get <code>&amp;</code> / <code>&amp;mut</code> instead of moving ownership.",
     "<strong><code>direct [ … ]</code> → Python:</strong> raw Python executed at run time through <code>Python::with_gil</code> (PyO3). Rust is the host.",
     "<strong>Modules:</strong> <code>get &lt;core:memory::arena&gt;</code> really imports code from <code>libs/core/lib/memory/arena.hcs</code>. Signatures are collected from the whole project in two phases, so cross-file calls get correct references too.",
     "<strong>Rust dependencies:</strong> <code>get &lt;crates:name&gt;</code> is a real Cargo dependency.",
     "<strong>Building:</strong> <code>hackerc</code> generates a Cargo crate and <code>cargo build</code> compiles it into a binary — Cargo is used purely as a compiler here."
    ]
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "You need Rust installed to run the generated program."
   },
   {
    "t": "h2",
    "text": "Quick start"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hackerc check project/cmd/main.hcs",
     "hackerc build project/cmd/main.hcs -o /tmp/out",
     "cd /tmp/out && cargo run"
    ],
    "title": "Terminal"
   },
   {
    "t": "p",
    "html": "Create and build projects with the <a href=\"articles.html#/bit\">bit</a> package manager, which supports HackerScript alongside H# and Hacker Lang:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init my-project --lang hs",
     "cd my-project",
     "bit build --release"
    ],
    "title": "Terminal"
   },
   {
    "t": "p",
    "html": "The entry file of a buildable project is always <code>cmd/main.hcs</code> — with no configuration, just as Cargo finds <code>src/main.rs</code> by itself. Library code goes into <code>lib/</code> (with the entry point <code>lib/mod.hcs</code>)."
   },
   {
    "t": "h2",
    "text": "Language version: using"
   },
   {
    "t": "p",
    "html": "At the top of a file you can declare the required compiler version with the <code>using &lt;version&gt;</code> directive. If the matching <code>hackerc</code> is not installed, it is downloaded automatically from GitHub Releases and cached."
   },
   {
    "t": "h2",
    "text": "Types, structs and pattern matching"
   },
   {
    "t": "p",
    "html": "HackerScript has static types (<code>Int</code>, <code>Bool</code>, <code>Str</code>, <code>List&lt;T&gt;</code>, <code>Dict</code>, <code>Set</code>), structs with <code>impl</code> blocks, enums, generics and full <code>match</code> on <code>Result</code> and <code>Option</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "!! line comment",
     "fun unwrap_or<T, E>(r: Result<T, E>, domyslna: T) -> T [",
     "    match r [",
     "        Ok(v) -> [",
     "            end v",
     "        ]",
     "        Err(_e) -> [",
     "            end domyslna",
     "        ]",
     "    ]",
     "]"
    ],
    "title": "result.hcs"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "fun constant_time_eq(a: List<Int>, b: List<Int>) -> Int [",
     "    if a.len() != b.len() [",
     "        end 0",
     "    ]",
     "    let diff = 0",
     "    let i = 0",
     "    while i < a.len() [",
     "        if a[i] != b[i] [",
     "            diff = diff + 1",
     "        ]",
     "        i = i + 1",
     "    ]",
     "    if diff == 0 [",
     "        end 1",
     "    ]",
     "    end 0",
     "]"
    ],
    "title": "constant_time.hcs"
   },
   {
    "t": "h2",
    "text": "direct and manual"
   },
   {
    "t": "p",
    "html": "<code>direct [ … ]</code> runs plain Python — handy for prototyping or code that will never be performance-critical. <code>manual[ … ]</code> compiles to an <code>unsafe{}</code> block when you need low-level control."
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Code inside <code>direct</code> runs in a Python interpreter embedded in the binary, so it does not benefit from compilation to Rust."
   },
   {
    "t": "h2",
    "text": "The module system: get"
   },
   {
    "t": "p",
    "html": "Imports are done with the word <code>get</code>. The <code>core</code> and <code>std</code> aliases point to libraries bundled with the language, and since 0.4 <code>get &lt;work:member[::file]&gt;</code> imports <code>lib/mod.hcs</code> (or <code>lib/&lt;file&gt;.hcs</code>) of any workspace member — an analogue of Rust's <code>use member_name::module::*;</code>."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "get <core:memory::arena>",
     "get <std:term>",
     "get <work:member::file>"
    ],
    "title": "modules.hcs"
   },
   {
    "t": "table",
    "head": [
     "Import",
     "Meaning"
    ],
    "rows": [
     [
      "<code>get &lt;core:…&gt;</code>",
      "the <code>core</code> library — memory allocators"
     ],
     [
      "<code>get &lt;std:…&gt;</code>",
      "the standard library"
     ],
     [
      "<code>get &lt;work:member::file&gt;</code>",
      "any member of <code>[workspace] members</code> (since 0.4)"
     ],
     [
      "<code>get &lt;crates:name&gt;</code>",
      "a Cargo dependency"
     ],
     [
      "<code>get &lt;c:…&gt;</code>, <code>get &lt;cpp:…&gt;</code>",
      "C and C++ dependencies (FFI 0.3)"
     ]
    ]
   },
   {
    "t": "p",
    "html": "A library needs a <code>mod.hcs</code> at its root to be imported without <code>::</code>. Install external libraries with <a href=\"articles.html#/bit\">bit</a>."
   },
   {
    "t": "h2",
    "text": "FFI: extern, region, C and C++"
   },
   {
    "t": "p",
    "html": "Version 0.3 redesigned the FFI: <code>get &lt;extern:path&gt; use &lt;static|dynamic&gt;</code> together with a <code>region [ … ]</code> block lets you declare any number of signatures bound to one library. It adds <code>get &lt;c:…&gt;</code> and <code>get &lt;cpp:…&gt;</code> (dependencies built through the <code>cc</code> crate) and <code>native {C++} [ … ]</code> — C++ code compiled at build time (not interpreted)."
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     ";; FFI 0.3: signatures bound to one library",
     "get <extern:sciezka> use <static>",
     "region [",
     "    ;; any number of signatures at once",
     "",
     "]",
     "",
     ";; C and C++ dependencies",
     "get <c:nazwa>",
     "get <cpp:nazwa>",
     "",
     ";; C++ code compiled at build time",
     "native {C++} [",
     "    ;; ...",
     "]"
    ],
    "title": "ffi.hcs"
   },
   {
    "t": "h2",
    "text": "Standard library"
   },
   {
    "t": "table",
    "head": [
     "Module",
     "Contents"
    ],
    "rows": [
     [
      "<code>core</code>",
      "four memory allocators: <code>arena</code>, <code>chained_arena</code>, <code>stack_allocator</code>, <code>pool_allocator</code>"
     ],
     [
      "<code>std</code> — files and paths",
      "<code>fs</code>, <code>io</code>, <code>path</code>, <code>env</code>, <code>process</code>"
     ],
     [
      "<code>std</code> — data",
      "<code>string</code>, <code>math</code>, <code>json</code>, <code>toml</code>, <code>hk</code> (the <code>.hk</code> format), <code>result</code>"
     ],
     [
      "<code>std</code> — network and terminal",
      "<code>http</code>, <code>term</code> (colours and a progress bar)"
     ],
     [
      "<code>std</code> — cybersecurity",
      "<code>constant_time_eq</code> (constant-time comparison), <code>shannon_entropy</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Coloured CLI and progress bar"
   },
   {
    "t": "p",
    "html": "<code>hackerc build</code>, <code>check</code>, <code>lint</code> and <code>fmt</code> have coloured output (green — success, red — error, cyan — names) and a real percentage progress bar. Disable colours with the <code>NO_COLOR</code> environment variable. Errors are rendered rustc-style, with an underlined line."
   },
   {
    "t": "h2",
    "text": "Compiler structure"
   },
   {
    "t": "p",
    "html": "The whole <code>hackerc</code> transpiler is written in HackerScript:"
   },
   {
    "t": "table",
    "head": [
     "File",
     "Role"
    ],
    "rows": [
     [
      "<code>lexer.hcs</code>, <code>parser.hcs</code>",
      "tokenisation and a recursive-descent parser → AST"
     ],
     [
      "<code>typecheck.hcs</code>, <code>typeinfer.hcs</code>",
      "diagnostics, type inference, project signatures"
     ],
     [
      "<code>codegen.hcs</code>",
      "AST → Rust text (the largest file)"
     ],
     [
      "<code>project.hcs</code>",
      "multi-file project assembly and <code>Cargo.toml</code>"
     ],
     [
      "<code>formatter.hcs</code>, <code>diagnostics.hcs</code>",
      "code formatter and error rendering"
     ],
     [
      "<code>main.hcs</code>",
      "CLI: <code>build</code>, <code>check</code>, <code>lint</code>, <code>fmt</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Browser playground (WASM)"
   },
   {
    "t": "p",
    "html": "Version 0.4 brought the first working WebAssembly pipeline: the <code>@wasm_export</code> attribute marks functions exported to WASM. It lets the HackerScript checker run in the browser — Rust Playground style."
   },
   {
    "t": "h2",
    "text": "Version history"
   },
   {
    "t": "table",
    "head": [
     "Version",
     "What it brought"
    ],
    "rows": [
     [
      "0.0.1",
      "frozen starting version — the \"where we started\" reference"
     ],
     [
      "0.1",
      "<strong>bootstrap</strong>: <code>hackerc</code> rewritten in HackerScript itself, first binary release"
     ],
     [
      "0.2",
      "coloured CLI and a progress bar (<code>std:term</code>)"
     ],
     [
      "0.3",
      "redesigned FFI: <code>extern</code> + <code>region</code>, <code>c</code>/<code>cpp</code>, <code>native {C++}</code>"
     ],
     [
      "0.4",
      "<code>get &lt;work:…&gt;</code>, a shared workspace <code>cache/</code>, <code>@wasm_export</code> and the WASM playground"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Status and limitations"
   },
   {
    "t": "p",
    "html": "The compiler is verified by <code>hackerc check</code> and by CI, which builds and runs the generated crates. Known gaps include iteration over <code>Dict</code> and <code>Set</code>, line numbers in the AST and <code>log()</code> for structs and enums. The full, honest list is in the repository's <code>docs/ROADMAP.md</code>, and the full syntax description in <code>docs/SYNTAX.md</code>."
   },
   {
    "t": "p",
    "html": "Language reference: <a href=\"tools-docs/HackerScript/docs.html\">HackerScript documentation</a>."
   }
  ]
 }
};
