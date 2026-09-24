window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["hsharp"] = {
 "id": "hsharp",
 "date": "2026-09-20",
 "author": "HackerOS Team",
 "readingMinutes": 8,
 "icon": "⚡",
 "tags": [
  "programming",
  "tools"
 ],
 "title": {
  "pl": "H# — wprowadzenie do języka stworzonego dla HackerOS",
  "en": "H# — an introduction to the language built for HackerOS"
 },
 "summary": {
  "pl": "Kompilowany, statycznie typowany język z interpreterem, kompilatorem LLVM i własnym menedżerem pakietów. Od pierwszego programu po projekty z bytes.",
  "en": "A compiled, statically typed language with an interpreter, an LLVM compiler and its own package manager. From your first program to bytes projects."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "<strong>H#</strong> to kompilowany, statycznie typowany język programowania stworzony dla HackerOS. Ma zastępować Pythona w narzędziach CLI, GUI, cybersecurity i codziennych skryptach — z natywną wydajnością i bez zależności od interpretera na docelowej maszynie."
   },
   {
    "t": "note",
    "kind": "info",
    "html": "Ten artykuł to szybkie wprowadzenie. Pełna, aktualna dokumentacja języka znajduje się w <a href=\"h-sharp/docs.html\">dokumentacji H#</a>."
   },
   {
    "t": "h2",
    "text": "Dwa sposoby uruchamiania kodu"
   },
   {
    "t": "p",
    "html": "H# oferuje osobne narzędzia do szybkiej pracy i do produkcji. Interpreter pozwala uruchomić plik od razu, a kompilator generuje natywną binarkę przez LLVM 21."
   },
   {
    "t": "table",
    "head": [
     "Narzędzie",
     "Backend",
     "Kiedy używać"
    ],
    "rows": [
     [
      "<code>h# preview</code>",
      "Interpreter",
      "Szybki cykl deweloperski, skrypty, debugowanie"
     ],
     [
      "<code>h# compile</code>",
      "LLVM 21 (O3 + AVX2)",
      "Produkcyjna, natywna binarka"
     ],
     [
      "<code>h# compile --target wasm32</code>",
      "LLVM → WASM",
      "Moduł WebAssembly"
     ],
     [
      "<code>bytes build</code>",
      "LLVM (przez h# compile)",
      "Budowanie projektu opisanego w <code>bytes.hk</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Instalacja"
   },
   {
    "t": "p",
    "html": "Na HackerOS H# instalujesz menedżerem pakietów systemu:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hacker unpack h#",
     "hacker unpack h#-utils"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Pierwszy program"
   },
   {
    "t": "p",
    "html": "Blok w H# zaczyna się słowem <code>is</code>, a kończy <code>end</code>. Punktem wejścia jest funkcja <code>main</code>."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn main() is",
     "  write(\"Witaj, HackerOS!\")",
     "end"
    ],
    "title": "hello.h#"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "h# preview hello.h#          ;; uruchom od razu",
     "h# compile hello.h# -o hello  ;; natywna binarka"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Zmienne i typy"
   },
   {
    "t": "p",
    "html": "Zmienne są domyślnie niemutowalne (<code>let</code>). Jeśli wartość ma się zmieniać, użyj <code>let mut</code>. Typy można pominąć, gdy kompilator jest w stanie je wywnioskować."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     ";; Niemutowalne (domyślnie)",
     "let x: int = 42",
     "let s: string = \"hacker\"",
     ";; Mutowalne",
     "let mut counter: int = 0",
     ";; Wnioskowanie typów",
     "let a = 10",
     ";; Optional",
     "let opt: int? = nil"
    ],
    "title": "zmienne.h#"
   },
   {
    "t": "p",
    "html": "Wbudowane typy to m.in. <code>int</code>, <code>uint</code>, <code>i8..i128</code>, <code>u8..u128</code>, <code>f32</code>, <code>f64</code>, <code>bool</code>, <code>string</code> i <code>bytes</code> (surowe dane binarne)."
   },
   {
    "t": "h2",
    "text": "Sterowanie przepływem"
   },
   {
    "t": "p",
    "html": "<code>if</code>/<code>elsif</code>/<code>else</code>, <code>while</code> oraz <code>for</code> z zakresami (<code>1 .. 10</code> wyłączny, <code>1 ..= 10</code> włączny) działają tak, jak się spodziewasz. Do tego pełne dopasowanie wzorców w <code>match</code>:"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn classify(port: int) -> string is",
     "  match port is",
     "    22  => \"SSH\"",
     "    80  => \"HTTP\"",
     "    443 => \"HTTPS\"",
     "    _   => \"Unknown\"",
     "  end",
     "end",
     "",
     "fn main() is",
     "  let ports: [int] = [22, 80, 443, 8080]",
     "  for port in ports is",
     "    write(to_string(port) + \" -> \" + classify(port))",
     "  end",
     "end"
    ],
    "title": "match.h#"
   },
   {
    "t": "h2",
    "text": "Enumy z danymi"
   },
   {
    "t": "p",
    "html": "Warianty enuma mogą przenosić dane, a <code>match</code> wymusza obsłużenie każdego przypadku:"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "enum ScanResult is",
     "  Open",
     "  Closed",
     "  Filtered(string)",
     "  Error(int, string)",
     "end",
     "",
     "fn handle(r: ScanResult) is",
     "  match r is",
     "    Open         => write(\"open\")",
     "    Closed       => write(\"closed\")",
     "    Filtered(m)  => write(\"filtered: \" + m)",
     "    Error(c, m)  => write(\"error \" + to_string(c) + \": \" + m)",
     "  end",
     "end"
    ],
    "title": "enum.h#"
   },
   {
    "t": "h2",
    "text": "Projekty z bytes"
   },
   {
    "t": "p",
    "html": "<strong>bytes</strong> to menedżer pakietów i system budowania napisany w samym H#. Konfiguracja mieści się w jednym pliku <code>bytes.hk</code> (prosty format sekcyjny — nie TOML ani HCL)."
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bytes new myapp && cd myapp",
     "bytes build --release   ;; compile via LLVM",
     "bytes run               ;; build + run",
     "bytes add scanner       ;; add a package",
     "bytes test              ;; test runner",
     "bytes fmt               ;; formatter"
    ],
    "title": "Terminal"
   },
   {
    "t": "code",
    "lang": "bytes.hk",
    "code": [
     "[package]",
     "-> name => myapp",
     "-> version => 0.1.0",
     "-> entry => src/main.h#",
     "[build]",
     "-> emit => bin",
     "[dependencies]",
     "-> scanner => 1.2"
    ],
    "title": "bytes.hk"
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Szablony projektów: <code>h# new myapp --template cybersec</code> (dostępne także <code>app</code>, <code>web</code>, <code>tui</code>, <code>wasm</code>, <code>lib</code>)."
   },
   {
    "t": "h2",
    "text": "Biblioteka standardowa"
   },
   {
    "t": "p",
    "html": "Moduły importujesz składnią <code>use \"std -> moduł\" from \"alias\"</code>. Wśród wbudowanych są między innymi:"
   },
   {
    "t": "ul",
    "items": [
     "<code>std -> io</code> — wejście/wyjście i pliki",
     "<code>std -> crypto -> hex / hash</code> — kodowanie hex i haszowanie",
     "<code>std -> sec</code> — narzędzia cybersecurity (xor, rot13, skanowanie portów)",
     "<code>std -> net -> tcp / udp</code> oraz <code>std -> http</code> — sieć",
     "<code>std -> json</code>, <code>yaml</code> — formaty danych",
     "<code>std -> gtk</code> — interfejsy graficzne GTK4"
    ]
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Dyrektywa <code>using \"2026\"</code> na początku pliku jest na razie tylko metadaną: kompilator ją zapisuje, ale nie zmienia na jej podstawie żadnego zachowania. To zarezerwowana składnia pod przyszłe edycje języka."
   },
   {
    "t": "h2",
    "text": "Co dalej?"
   },
   {
    "t": "ul",
    "items": [
     "Wypróbuj kod w przeglądarce w <a href=\"h-sharp/docs.html\">playgroundzie H#</a>.",
     "Przeczytaj o adnotacjach trybu pamięci: <code>@safety</code>, <code>@arc</code>, <code>@arena</code>, <code>@pointers</code>.",
     "Zajrzyj do sekcji o async/await i testach w dokumentacji."
    ]
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "<strong>H#</strong> is a compiled, statically typed programming language built for HackerOS. It is meant to replace Python in CLI tools, GUI apps, cybersecurity utilities and everyday scripts — with native performance and no interpreter needed on the target machine."
   },
   {
    "t": "note",
    "kind": "info",
    "html": "This article is a quick introduction. The full, up-to-date language reference lives in the <a href=\"h-sharp/docs.html\">H# documentation</a> (currently written in Polish)."
   },
   {
    "t": "h2",
    "text": "Two ways to run code"
   },
   {
    "t": "p",
    "html": "H# ships separate tools for fast iteration and for production. The interpreter runs a file immediately, while the compiler produces a native binary through LLVM 21."
   },
   {
    "t": "table",
    "head": [
     "Tool",
     "Backend",
     "When to use it"
    ],
    "rows": [
     [
      "<code>h# preview</code>",
      "Interpreter",
      "Fast dev loop, scripting, debugging"
     ],
     [
      "<code>h# compile</code>",
      "LLVM 21 (O3 + AVX2)",
      "Production-grade native binary"
     ],
     [
      "<code>h# compile --target wasm32</code>",
      "LLVM → WASM",
      "WebAssembly module"
     ],
     [
      "<code>bytes build</code>",
      "LLVM (via h# compile)",
      "Building a project described in <code>bytes.hk</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Installation"
   },
   {
    "t": "p",
    "html": "On HackerOS you install H# with the system package manager:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hacker unpack h#",
     "hacker unpack h#-utils"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Your first program"
   },
   {
    "t": "p",
    "html": "A block in H# opens with <code>is</code> and closes with <code>end</code>. The entry point is the <code>main</code> function."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn main() is",
     "  write(\"Hello, HackerOS!\")",
     "end"
    ],
    "title": "hello.h#"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "h# preview hello.h#          ;; run right away",
     "h# compile hello.h# -o hello  ;; native binary"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Variables and types"
   },
   {
    "t": "p",
    "html": "Variables are immutable by default (<code>let</code>). When a value has to change, use <code>let mut</code>. Types can be omitted when the compiler can infer them."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     ";; Immutable by default",
     "let x: int = 42",
     "let s: string = \"hacker\"",
     ";; Mutable",
     "let mut counter: int = 0",
     ";; Type inference",
     "let a = 10",
     ";; Optional",
     "let opt: int? = nil"
    ],
    "title": "variables.h#"
   },
   {
    "t": "p",
    "html": "Built-in types include <code>int</code>, <code>uint</code>, <code>i8..i128</code>, <code>u8..u128</code>, <code>f32</code>, <code>f64</code>, <code>bool</code>, <code>string</code> and <code>bytes</code> (raw binary data)."
   },
   {
    "t": "h2",
    "text": "Control flow"
   },
   {
    "t": "p",
    "html": "<code>if</code>/<code>elsif</code>/<code>else</code>, <code>while</code> and <code>for</code> with ranges (<code>1 .. 10</code> exclusive, <code>1 ..= 10</code> inclusive) work as you would expect. On top of that comes full pattern matching with <code>match</code>:"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn classify(port: int) -> string is",
     "  match port is",
     "    22  => \"SSH\"",
     "    80  => \"HTTP\"",
     "    443 => \"HTTPS\"",
     "    _   => \"Unknown\"",
     "  end",
     "end",
     "",
     "fn main() is",
     "  let ports: [int] = [22, 80, 443, 8080]",
     "  for port in ports is",
     "    write(to_string(port) + \" -> \" + classify(port))",
     "  end",
     "end"
    ],
    "title": "match.h#"
   },
   {
    "t": "h2",
    "text": "Enums with data"
   },
   {
    "t": "p",
    "html": "Enum variants can carry data, and <code>match</code> makes you handle every case:"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "enum ScanResult is",
     "  Open",
     "  Closed",
     "  Filtered(string)",
     "  Error(int, string)",
     "end",
     "",
     "fn handle(r: ScanResult) is",
     "  match r is",
     "    Open         => write(\"open\")",
     "    Closed       => write(\"closed\")",
     "    Filtered(m)  => write(\"filtered: \" + m)",
     "    Error(c, m)  => write(\"error \" + to_string(c) + \": \" + m)",
     "  end",
     "end"
    ],
    "title": "enum.h#"
   },
   {
    "t": "h2",
    "text": "Projects with bytes"
   },
   {
    "t": "p",
    "html": "<strong>bytes</strong> is the package manager and build system, written in H# itself. Configuration lives in a single <code>bytes.hk</code> file (a simple sectioned format — not TOML or HCL)."
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bytes new myapp && cd myapp",
     "bytes build --release   ;; compile via LLVM",
     "bytes run               ;; build + run",
     "bytes add scanner       ;; add a package",
     "bytes test              ;; test runner",
     "bytes fmt               ;; formatter"
    ],
    "title": "Terminal"
   },
   {
    "t": "code",
    "lang": "bytes.hk",
    "code": [
     "[package]",
     "-> name => myapp",
     "-> version => 0.1.0",
     "-> entry => src/main.h#",
     "[build]",
     "-> emit => bin",
     "[dependencies]",
     "-> scanner => 1.2"
    ],
    "title": "bytes.hk"
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Project templates: <code>h# new myapp --template cybersec</code> (also <code>app</code>, <code>web</code>, <code>tui</code>, <code>wasm</code>, <code>lib</code>)."
   },
   {
    "t": "h2",
    "text": "Standard library"
   },
   {
    "t": "p",
    "html": "Modules are imported with <code>use \"std -> module\" from \"alias\"</code>. Built-in modules include:"
   },
   {
    "t": "ul",
    "items": [
     "<code>std -> io</code> — input/output and files",
     "<code>std -> crypto -> hex / hash</code> — hex encoding and hashing",
     "<code>std -> sec</code> — cybersecurity helpers (xor, rot13, port scanning)",
     "<code>std -> net -> tcp / udp</code> and <code>std -> http</code> — networking",
     "<code>std -> json</code>, <code>yaml</code> — data formats",
     "<code>std -> gtk</code> — GTK4 graphical interfaces"
    ]
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "The <code>using \"2026\"</code> directive at the top of a file is currently just metadata: the compiler records it but does not change any behaviour based on it. It is reserved syntax for future language editions."
   },
   {
    "t": "h2",
    "text": "Where to go next"
   },
   {
    "t": "ul",
    "items": [
     "Try code in the browser in the <a href=\"h-sharp/docs.html\">H# playground</a>.",
     "Read about the memory-mode annotations: <code>@safety</code>, <code>@arc</code>, <code>@arena</code>, <code>@pointers</code>.",
     "Check the async/await and testing sections of the documentation."
    ]
   }
  ]
 }
};
