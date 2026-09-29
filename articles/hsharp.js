window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["hsharp"] = {
 "id": "hsharp",
 "date": "2026-09-29",
 "author": "HackerOS Team",
 "readingMinutes": 15,
 "icon": "⚡",
 "tags": [
  "programming",
  "tools"
 ],
 "title": {
  "pl": "H# — język, w którym powstaje większość ekosystemu HackerOS",
  "en": "H# — the language most of the HackerOS ecosystem is written in"
 },
 "summary": {
  "pl": "Główny język ekosystemu HackerOS — większość narzędzi i aplikacji systemu jest napisana w H#. Kompilator LLVM, interpreter, menedżer pakietów bit, biblioteka standardowa i FFI: od pierwszego programu po duże projekty.",
  "en": "The primary language of the HackerOS ecosystem — most of the system's tools and applications are written in H#. LLVM compiler, interpreter, the bit package manager, the standard library and FFI: from your first program to larger projects."
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
    "text": "H# w sercu ekosystemu HackerOS"
   },
   {
    "t": "p",
    "html": "H# nie jest dodatkiem ani eksperymentem obok systemu — to <strong>główny język ekosystemu HackerOS</strong>. Większość narzędzi, aplikacji i komponentów HackerOS jest pisana właśnie w H#: narzędzia wiersza poleceń, aplikacje graficzne (przez <code>std -> gtk</code>), specjalistyczne narzędzia z edycji Cybersecurity, a także <strong>bit</strong> — menedżer pakietów całego ekosystemu, sam napisany w H#."
   },
   {
    "t": "p",
    "html": "Dzięki temu cały ekosystem mówi jednym językiem: te same moduły biblioteki standardowej, ten sam kompilator, ten sam system budowania i te same konwencje. Kto nauczy się H#, może czytać, poprawiać i rozszerzać praktycznie każdy element systemu — od skryptu pomocniczego po aplikację z interfejsem graficznym."
   },
   {
    "t": "ul",
    "items": [
     "<strong>Jedno narzędzie zamiast wielu:</strong> ten sam język służy do skryptów, narzędzi CLI, aplikacji GTK4 i narzędzi bezpieczeństwa.",
     "<strong>Natywna wydajność:</strong> kod trafia przez LLVM do binarki, która nie potrzebuje interpretera na docelowej maszynie.",
     "<strong>Wspólny ekosystem:</strong> pakiety H# instaluje i buduje <code>bit</code> (następca <code>bytes</code>), a gotowe moduły systemowe są dostępne w bibliotece standardowej (np. <code>std -> hk</code> do interfejsu z jądrem HackerOS).",
     "<strong>Otwartość:</strong> język jest udostępniany na licencji MPL 2.0."
    ]
   },
   {
    "t": "note",
    "kind": "info",
    "html": "Kompilator i interpreter samego H# są zaimplementowane w Rust (osobne crate'y: parser, typecheck, interpreter, compiler, lsp, cli). Natomiast narzędzia i aplikacje <em>na</em> HackerOS to w większości kod H#."
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
      "<code>bit build</code>",
      "LLVM (przez h# compile)",
      "Budowanie projektu opisanego w <code>Bit.hk</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Dlaczego powstał H#"
   },
   {
    "t": "p",
    "html": "Python świetnie nadaje się do prototypów, ale w narzędziach systemowych oznacza zależność od interpretera, wolniejsze uruchamianie i błędy wychodzące dopiero w czasie działania. H# powstał, żeby zachować prostą, czytelną składnię, a dołożyć do niej statyczne typy, natywną kompilację i wsparcie dla pracy systemowej i cybersecurity."
   },
   {
    "t": "table",
    "head": [
     "Cecha",
     "Co daje w praktyce"
    ],
    "rows": [
     [
      "Statyczne typowanie z wnioskowaniem",
      "Błędy typów wychodzą przy <code>h# check</code>, a nie u użytkownika"
     ],
     [
      "Niemutowalność domyślnie",
      "<code>let</code> vs <code>let mut</code> — jasne, gdzie zmienia się stan"
     ],
     [
      "Kompilacja przez LLVM 21",
      "Szybkie binarki, różne targety, WebAssembly"
     ],
     [
      "Bloki <code>is … end</code>",
      "Czytelna składnia bez nawiasów klamrowych"
     ],
     [
      "Wbudowane cybersecurity",
      "Moduły <code>sec</code>, <code>crypto</code>, <code>tls</code>, <code>net_*</code>"
     ],
     [
      "Interop z C i Pythonem",
      "Można korzystać z istniejących bibliotek zamiast pisać wszystko od zera"
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
    "text": "Struktury, traity i generyki"
   },
   {
    "t": "p",
    "html": "Dane modelujesz strukturami, a zachowanie dodajesz blokami <code>impl</code>. Traity opisują wspólny interfejs, a generyki pozwalają pisać kod niezależny od typu."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "struct Point is",
     "  pub x: f64",
     "  pub y: f64",
     "end",
     "",
     "impl Point is",
     "  fn distance(self, other: Point) -> f64 is",
     "    let dx = self.x - other.x",
     "    let dy = self.y - other.y",
     "    return math::sqrt(dx * dx + dy * dy)",
     "  end",
     "end",
     "",
     "trait Printable is",
     "  fn print(self)",
     "end",
     "",
     "impl Point : Printable is",
     "  fn print(self) is",
     "    write(\"(\" + to_string(self.x) + \", \" + to_string(self.y) + \")\")",
     "  end",
     "end"
    ],
    "title": "struct.h#"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn first<T>(arr: [T]) -> T? is",
     "  if arr.len() == 0 is",
     "    return nil",
     "  end",
     "  return arr[0]",
     "end",
     "",
     ";; closures i iteratory",
     "let double = |x: int| -> int is x * 2 end",
     "let big = arr.iter().map(|x| x * 2).filter(|x| x > 4).collect()"
    ],
    "title": "generyki.h#"
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Domknięcia (closures) potrafią <em>odczytywać</em> zmienne z otaczającego zakresu, ale mutacja przechwyconej zmiennej wewnątrz closure nie jest jeszcze widoczna po jej zakończeniu. Zmiana jest zaplanowana architektonicznie w kolejnych wersjach."
   },
   {
    "t": "h2",
    "text": "Obsługa błędów operatorem ?"
   },
   {
    "t": "p",
    "html": "Funkcje, które mogą się nie powieść, zwracają typ opcjonalny (<code>T?</code>). Operator <code>?</code> przerywa funkcję i zwraca <code>nil</code>, jeśli wywołanie się nie udało — bez rozbudowanych bloków <code>try/catch</code>."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn read_config(path: string) -> string? is",
     "  let content = fs::read(path)?   ;; nil => wczesny return",
     "  return content",
     "end"
    ],
    "title": "blad.h#"
   },
   {
    "t": "h2",
    "text": "Async / await"
   },
   {
    "t": "p",
    "html": "Funkcje asynchroniczne oznaczasz <code>async fn</code>. Moduły <code>async</code>, <code>channel</code> i <code>sync</code> dostarczają zadania, kanały, mutexy i timeouty, a <code>net_http</code> obsługuje zarówno klienta, jak i prosty serwer HTTP."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "async fn fetch(url: string) -> string is",
     "  let resp = http::get(url)?",
     "  return resp.body",
     "end"
    ],
    "title": "async.h#"
   },
   {
    "t": "h2",
    "text": "Moduły i widoczność"
   },
   {
    "t": "p",
    "html": "Kod porządkujesz w modułach (<code>mod nazwa is … end</code>). Elementy są prywatne, dopóki nie oznaczysz ich <code>pub</code>. Importy zewnętrzne zapisujesz tą samą składnią <code>use</code> — dla biblioteki standardowej, pakietów Pythona i repozytoriów GitHub:"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "use \"std -> io\"           from \"io\"",
     "use \"python -> numpy\"     from \"np\"",
     "use \"github.com/u/repo\"   from \"repo\"",
     "",
     "mod utils is",
     "  pub fn hex_encode(data: string) -> string is",
     "    return conv::to_hex(data)",
     "  end",
     "end"
    ],
    "title": "use.h#"
   },
   {
    "t": "h2",
    "text": "Projekty z bit"
   },
   {
    "t": "p",
    "html": "<strong>bit</strong> to menedżer pakietów i narzędzie do budowania projektów dla H#, Hacker Lang i HackerScript — sam jest napisany w H# i linkowany statycznie. Zastąpił dawny <code>bytes</code>. Konfiguracja mieści się w jednym pliku <code>Bit.hk</code> (format HackerOS <code>.hk</code>), a samo polecenie <code>bit</code> bez argumentów robi wszystko, co opisuje ten plik. Więcej w osobnym artykule o <a href=\"articles.html#/bit\">menedżerze pakietów bit</a>."
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init myapp --lang h#   ;; nowy projekt",
     "cd myapp",
     "bit                       ;; zależności → build → run",
     "bit build --release       ;; kompilacja przez LLVM",
     "bit add mold              ;; dodaj bibliotekę",
     "bit check                 ;; sprawdź składnię i typy"
    ],
    "title": "Terminal"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[package]",
     "-> name => myapp",
     "-> version => 0.1.0",
     "-> lang => h#",
     "",
     "[build]",
     "-> link => static",
     "",
     "[default-build]",
     "-> profile => release",
     "-> run => true",
     "",
     "[dependencies]",
     "-> mold => *"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Szablony projektów: <code>h# new myapp --template cybersec</code> (dostępne także <code>app</code>, <code>web</code>, <code>tui</code>, <code>wasm</code>, <code>lib</code>). Nowe projekty zakładasz też przez <code>bit init</code>."
   },
   {
    "t": "h2",
    "text": "Interop z C i Pythonem (FFI)"
   },
   {
    "t": "p",
    "html": "Blok <code>extern</code> deklaruje funkcje z zewnętrznych bibliotek. Tryb <code>static</code> linkuje bibliotekę przy budowaniu, a <code>dynamic</code> ładuje ją w czasie działania. Ten sam mechanizm obsługuje biblioteki C i Pythona."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     ";; biblioteka C, linkowana statycznie",
     "extern static [c] is",
     "  fn malloc(size: int) -> int",
     "  fn free(ptr: int)",
     "end",
     "",
     ";; biblioteka C ładowana dynamicznie",
     "extern dynamic [c, \"libssl\"] is",
     "  fn SSL_connect(fd: int) -> int",
     "end",
     "",
     ";; biblioteka Pythona",
     "extern static [python, \"numpy\"] is",
     "  fn array(data: string) -> any",
     "  fn mean(arr: any) -> f64",
     "end"
    ],
    "title": "ffi.h#"
   },
   {
    "t": "h2",
    "text": "Tryby pamięci i kod unsafe"
   },
   {
    "t": "p",
    "html": "Domyślnie H# dba o bezpieczeństwo pamięci. Gdy potrzebujesz niskopoziomowej kontroli — np. przy pracy z surowymi danymi — możesz użyć bloku <code>unsafe</code> z areną pamięci, a zachowanie całego pliku dostroić adnotacjami <code>@safety</code>, <code>@arc</code>, <code>@arena</code> i <code>@pointers</code>. Szczegóły opisuje sekcja o pamięci w dokumentacji."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "unsafe arena(65536) is",
     "  let raw: string = \"raw data\"",
     "end"
    ],
    "title": "unsafe.h#"
   },
   {
    "t": "h2",
    "text": "Biblioteka standardowa"
   },
   {
    "t": "p",
    "html": "Biblioteka standardowa liczy <strong>ponad 80 modułów</strong> i obejmuje większość potrzeb narzędzi systemowych. Moduły importujesz składnią <code>use \"std -> moduł\" from \"alias\"</code>. Wśród wbudowanych są między innymi:"
   },
   {
    "t": "ul",
    "items": [
     "<code>std -> io</code> — wejście/wyjście i pliki",
     "<code>std -> crypto -> hex / hash</code> — kodowanie hex i haszowanie",
     "<code>std -> sec</code> — narzędzia cybersecurity (xor, rot13, skanowanie portów)",
     "<code>std -> net -> tcp / udp</code> oraz <code>std -> http</code> — sieć",
     "<code>std -> json</code>, <code>yaml</code> — formaty danych",
     "<code>std -> gtk</code> — interfejsy graficzne GTK4",
     "<code>std -> fs</code>, <code>path</code>, <code>os</code>, <code>env</code>, <code>process</code>, <code>signal</code> — system plików i procesy",
     "<code>std -> crypto</code>, <code>crypto_aes</code>, <code>crypto_rsa</code>, <code>tls</code>, <code>jwt</code> — kryptografia i TLS",
     "<code>std -> net_ssh</code>, <code>net_dns</code>, <code>net_ip</code>, <code>websocket</code>, <code>grpc</code>, <code>smtp</code> — rozszerzone sieci",
     "<code>std -> sqlite</code>, <code>postgres</code>, <code>redis</code> — bazy danych",
     "<code>std -> collections</code>, <code>iter</code>, <code>sort</code>, <code>regex</code> — struktury danych i przetwarzanie tekstu",
     "<code>std -> cli</code>, <code>term</code>, <code>fmt</code>, <code>log</code> — budowanie narzędzi wiersza poleceń",
     "<code>std -> container</code>, <code>cron</code>, <code>archive</code> — kontenery, zadania cykliczne, archiwa",
     "<code>std -> hk</code> — interfejs z jądrem HackerOS (wywołania systemowe, HAL)"
    ]
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Dyrektywa <code>using \"2026\"</code> na początku pliku jest na razie tylko metadaną: kompilator ją zapisuje, ale nie zmienia na jej podstawie żadnego zachowania. To zarezerwowana składnia pod przyszłe edycje języka."
   },
   {
    "t": "h2",
    "text": "Testy"
   },
   {
    "t": "p",
    "html": "Testy piszesz w tym samym języku, oznaczając funkcje atrybutem <code>#[test]</code>. Asercje z modułu <code>test</code> zgłaszają panikę przy niepowodzeniu."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "use \"std -> test\" from \"test\"",
     "",
     "#[test]",
     "fn test_arithmetic() is",
     "  assert_eq(2 + 2, 4)",
     "  assert_true(3 > 2)",
     "end",
     "",
     "#[test]",
     "fn test_strings() is",
     "  let s = \"hello\"",
     "  assert_eq(s.len(), 5)",
     "  assert_true(s.contains(\"ell\"))",
     "end"
    ],
    "title": "testy.h#"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "h# check tests/          ;; składnia i typy",
     "bit check                ;; sprawdź cały projekt"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Narzędzia i edytor"
   },
   {
    "t": "p",
    "html": "Wokół języka działa kompletny zestaw narzędzi:"
   },
   {
    "t": "ul",
    "items": [
     "<strong><code>h#</code></strong> — komendy <code>preview</code>, <code>compile</code>, <code>check</code>, <code>new</code>, <code>targets</code>.",
     "<strong><code>bit</code></strong> — <code>init</code>, <code>build</code>, <code>run</code>, <code>check</code>, <code>install</code>, <code>add</code>, <code>upgrade</code>, <code>outdated</code>, własne komendy z <code>[commands]</code>; szczegóły w <a href=\"articles.html#/bit\">artykule o bit</a>.",
     "<strong>Serwer LSP i rozszerzenie VS Code</strong> — kolorowanie składni i podpowiedzi w edytorze.",
     "<strong>Pakiety dla wielu systemów</strong> — Debian/Ubuntu, Arch, Fedora, openSUSE, macOS i Windows.",
     "<strong>Playground w przeglądarce</strong> — kod H# można wypróbować bez instalacji."
    ]
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "h# preview src/main.h#                 ;; interpreter",
     "h# compile src/main.h# --release -o app ;; natywna binarka",
     "h# compile src/main.h# --target linux-aarch64",
     "h# compile src/main.h# --emit obj      ;; plik .o",
     "h# compile src/main.h# --emit so       ;; biblioteka współdzielona",
     "h# compile src/main.h# --emit lib      ;; archiwum statyczne .a",
     "h# check a.h# b.h# c.h#                ;; tylko weryfikacja",
     "h# targets                             ;; lista targetów"
    ],
    "title": "Kompilacja"
   },
   {
    "t": "h2",
    "text": "Ograniczenia i status"
   },
   {
    "t": "p",
    "html": "H# jest językiem młodym i aktywnie rozwijanym. Warto wiedzieć, że backend LLVM to ścieżka produkcyjna, a interpreter służy głównie do szybkiego podglądu i testów, więc zachowanie w niektórych rzadkich przypadkach może się różnić. Aktualną listę znanych ograniczeń znajdziesz w README repozytorium oraz w dokumentacji."
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
    "text": "H# at the heart of the HackerOS ecosystem"
   },
   {
    "t": "p",
    "html": "H# is not a side project or an experiment next to the system — it is the <strong>primary language of the HackerOS ecosystem</strong>. Most HackerOS tools, applications and components are written in H#: command-line tools, graphical applications (through <code>std -> gtk</code>), the specialised tools of the Cybersecurity edition, and <strong>bit</strong> itself — the package manager of the whole ecosystem, itself written in H#."
   },
   {
    "t": "p",
    "html": "That means the whole ecosystem speaks one language: the same standard-library modules, the same compiler, the same build system and the same conventions. Once you learn H#, you can read, fix and extend practically any part of the system — from a helper script to a GUI application."
   },
   {
    "t": "ul",
    "items": [
     "<strong>One tool instead of many:</strong> the same language covers scripts, CLI tools, GTK4 apps and security tooling.",
     "<strong>Native performance:</strong> code goes through LLVM into a binary that needs no interpreter on the target machine.",
     "<strong>A shared ecosystem:</strong> H# packages are installed and built by <code>bit</code> (the successor of <code>bytes</code>), and system-level modules ship in the standard library (e.g. <code>std -> hk</code> for the HackerOS kernel interface).",
     "<strong>Openness:</strong> the language is released under the MPL 2.0 licence."
    ]
   },
   {
    "t": "note",
    "kind": "info",
    "html": "The compiler and interpreter of H# itself are implemented in Rust (separate crates: parser, typecheck, interpreter, compiler, lsp, cli). The tools and applications running <em>on</em> HackerOS, however, are mostly H# code."
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
      "<code>bit build</code>",
      "LLVM (via h# compile)",
      "Building a project described in <code>Bit.hk</code>"
     ]
    ]
   },
   {
    "t": "h2",
    "text": "Why H# exists"
   },
   {
    "t": "p",
    "html": "Python is great for prototypes, but in system tooling it means an interpreter dependency, slower startup and errors that only appear at run time. H# keeps a simple, readable syntax and adds static types, native compilation and first-class support for systems work and cybersecurity."
   },
   {
    "t": "table",
    "head": [
     "Feature",
     "What it gives you in practice"
    ],
    "rows": [
     [
      "Static typing with inference",
      "Type errors show up in <code>h# check</code>, not on the user's machine"
     ],
     [
      "Immutable by default",
      "<code>let</code> vs <code>let mut</code> — it is clear where state changes"
     ],
     [
      "Compiled through LLVM 21",
      "Fast binaries, multiple targets, WebAssembly"
     ],
     [
      "<code>is … end</code> blocks",
      "Readable syntax without curly braces"
     ],
     [
      "Built-in cybersecurity",
      "<code>sec</code>, <code>crypto</code>, <code>tls</code> and <code>net_*</code> modules"
     ],
     [
      "C and Python interop",
      "Reuse existing libraries instead of rewriting everything"
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
    "text": "Structs, traits and generics"
   },
   {
    "t": "p",
    "html": "Model data with structs and add behaviour with <code>impl</code> blocks. Traits describe a shared interface, and generics let you write type-independent code."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "struct Point is",
     "  pub x: f64",
     "  pub y: f64",
     "end",
     "",
     "impl Point is",
     "  fn distance(self, other: Point) -> f64 is",
     "    let dx = self.x - other.x",
     "    let dy = self.y - other.y",
     "    return math::sqrt(dx * dx + dy * dy)",
     "  end",
     "end",
     "",
     "trait Printable is",
     "  fn print(self)",
     "end",
     "",
     "impl Point : Printable is",
     "  fn print(self) is",
     "    write(\"(\" + to_string(self.x) + \", \" + to_string(self.y) + \")\")",
     "  end",
     "end"
    ],
    "title": "struct.h#"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn first<T>(arr: [T]) -> T? is",
     "  if arr.len() == 0 is",
     "    return nil",
     "  end",
     "  return arr[0]",
     "end",
     "",
     ";; closures and iterators",
     "let double = |x: int| -> int is x * 2 end",
     "let big = arr.iter().map(|x| x * 2).filter(|x| x > 4).collect()"
    ],
    "title": "generics.h#"
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Closures can <em>read</em> variables from the enclosing scope, but mutating a captured variable inside a closure is not yet visible after it returns. The fix is an architectural change planned for later versions."
   },
   {
    "t": "h2",
    "text": "Error handling with the ? operator"
   },
   {
    "t": "p",
    "html": "Functions that may fail return an optional type (<code>T?</code>). The <code>?</code> operator stops the function and returns <code>nil</code> if the call failed — no heavyweight <code>try/catch</code> blocks."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "fn read_config(path: string) -> string? is",
     "  let content = fs::read(path)?   ;; nil => early return",
     "  return content",
     "end"
    ],
    "title": "errors.h#"
   },
   {
    "t": "h2",
    "text": "Async / await"
   },
   {
    "t": "p",
    "html": "Mark asynchronous functions with <code>async fn</code>. The <code>async</code>, <code>channel</code> and <code>sync</code> modules provide tasks, channels, mutexes and timeouts, while <code>net_http</code> covers both an HTTP client and a simple HTTP server."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "async fn fetch(url: string) -> string is",
     "  let resp = http::get(url)?",
     "  return resp.body",
     "end"
    ],
    "title": "async.h#"
   },
   {
    "t": "h2",
    "text": "Modules and visibility"
   },
   {
    "t": "p",
    "html": "Organise code in modules (<code>mod name is … end</code>). Items are private until marked <code>pub</code>. External imports use the same <code>use</code> syntax — for the standard library, Python packages and GitHub repositories:"
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "use \"std -> io\"           from \"io\"",
     "use \"python -> numpy\"     from \"np\"",
     "use \"github.com/u/repo\"   from \"repo\"",
     "",
     "mod utils is",
     "  pub fn hex_encode(data: string) -> string is",
     "    return conv::to_hex(data)",
     "  end",
     "end"
    ],
    "title": "use.h#"
   },
   {
    "t": "h2",
    "text": "Projects with bit"
   },
   {
    "t": "p",
    "html": "<strong>bit</strong> is the package manager and project build tool for H#, Hacker Lang and HackerScript — it is written in H# itself and linked statically. It replaced the former <code>bytes</code>. Configuration lives in a single <code>Bit.hk</code> file (the HackerOS <code>.hk</code> format), and a bare <code>bit</code> does everything that file describes. See the dedicated article on the <a href=\"articles.html#/bit\">bit package manager</a>."
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "bit init myapp --lang h#   ;; new project",
     "cd myapp",
     "bit                       ;; dependencies → build → run",
     "bit build --release       ;; compile via LLVM",
     "bit add mold              ;; add a library",
     "bit check                 ;; check syntax and types"
    ],
    "title": "Terminal"
   },
   {
    "t": "code",
    "lang": "text",
    "code": [
     "[package]",
     "-> name => myapp",
     "-> version => 0.1.0",
     "-> lang => h#",
     "",
     "[build]",
     "-> link => static",
     "",
     "[default-build]",
     "-> profile => release",
     "-> run => true",
     "",
     "[dependencies]",
     "-> mold => *"
    ],
    "title": "Bit.hk"
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Project templates: <code>h# new myapp --template cybersec</code> (also <code>app</code>, <code>web</code>, <code>tui</code>, <code>wasm</code>, <code>lib</code>). New projects can also be created with <code>bit init</code>."
   },
   {
    "t": "h2",
    "text": "C and Python interop (FFI)"
   },
   {
    "t": "p",
    "html": "An <code>extern</code> block declares functions from external libraries. The <code>static</code> mode links the library at build time, while <code>dynamic</code> loads it at run time. The same mechanism handles both C and Python libraries."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     ";; C library, linked statically",
     "extern static [c] is",
     "  fn malloc(size: int) -> int",
     "  fn free(ptr: int)",
     "end",
     "",
     ";; C library, loaded dynamically",
     "extern dynamic [c, \"libssl\"] is",
     "  fn SSL_connect(fd: int) -> int",
     "end",
     "",
     ";; Python library",
     "extern static [python, \"numpy\"] is",
     "  fn array(data: string) -> any",
     "  fn mean(arr: any) -> f64",
     "end"
    ],
    "title": "ffi.h#"
   },
   {
    "t": "h2",
    "text": "Memory modes and unsafe code"
   },
   {
    "t": "p",
    "html": "By default H# looks after memory safety. When you need low-level control — for example when handling raw data — use an <code>unsafe</code> block with a memory arena, and tune a whole file with the <code>@safety</code>, <code>@arc</code>, <code>@arena</code> and <code>@pointers</code> annotations. The memory section of the documentation has the details."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "unsafe arena(65536) is",
     "  let raw: string = \"raw data\"",
     "end"
    ],
    "title": "unsafe.h#"
   },
   {
    "t": "h2",
    "text": "Standard library"
   },
   {
    "t": "p",
    "html": "The standard library has <strong>over 80 modules</strong> and covers most needs of system tools. Modules are imported with <code>use \"std -> module\" from \"alias\"</code>. Built-in modules include:"
   },
   {
    "t": "ul",
    "items": [
     "<code>std -> io</code> — input/output and files",
     "<code>std -> crypto -> hex / hash</code> — hex encoding and hashing",
     "<code>std -> sec</code> — cybersecurity helpers (xor, rot13, port scanning)",
     "<code>std -> net -> tcp / udp</code> and <code>std -> http</code> — networking",
     "<code>std -> json</code>, <code>yaml</code> — data formats",
     "<code>std -> gtk</code> — GTK4 graphical interfaces",
     "<code>std -> fs</code>, <code>path</code>, <code>os</code>, <code>env</code>, <code>process</code>, <code>signal</code> — filesystem and processes",
     "<code>std -> crypto</code>, <code>crypto_aes</code>, <code>crypto_rsa</code>, <code>tls</code>, <code>jwt</code> — cryptography and TLS",
     "<code>std -> net_ssh</code>, <code>net_dns</code>, <code>net_ip</code>, <code>websocket</code>, <code>grpc</code>, <code>smtp</code> — extended networking",
     "<code>std -> sqlite</code>, <code>postgres</code>, <code>redis</code> — databases",
     "<code>std -> collections</code>, <code>iter</code>, <code>sort</code>, <code>regex</code> — data structures and text processing",
     "<code>std -> cli</code>, <code>term</code>, <code>fmt</code>, <code>log</code> — building command-line tools",
     "<code>std -> container</code>, <code>cron</code>, <code>archive</code> — containers, scheduled jobs, archives",
     "<code>std -> hk</code> — HackerOS kernel interface (syscalls, HAL)"
    ]
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "The <code>using \"2026\"</code> directive at the top of a file is currently just metadata: the compiler records it but does not change any behaviour based on it. It is reserved syntax for future language editions."
   },
   {
    "t": "h2",
    "text": "Testing"
   },
   {
    "t": "p",
    "html": "Write tests in the same language by marking functions with <code>#[test]</code>. Assertions from the <code>test</code> module panic on failure."
   },
   {
    "t": "code",
    "lang": "hsharp",
    "code": [
     "use \"std -> test\" from \"test\"",
     "",
     "#[test]",
     "fn test_arithmetic() is",
     "  assert_eq(2 + 2, 4)",
     "  assert_true(3 > 2)",
     "end",
     "",
     "#[test]",
     "fn test_strings() is",
     "  let s = \"hello\"",
     "  assert_eq(s.len(), 5)",
     "  assert_true(s.contains(\"ell\"))",
     "end"
    ],
    "title": "tests.h#"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "h# check tests/          ;; syntax and types",
     "bit check                ;; check the whole project"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Tooling and editor support"
   },
   {
    "t": "p",
    "html": "A complete toolset surrounds the language:"
   },
   {
    "t": "ul",
    "items": [
     "<strong><code>h#</code></strong> — the <code>preview</code>, <code>compile</code>, <code>check</code>, <code>new</code> and <code>targets</code> commands.",
     "<strong><code>bit</code></strong> — <code>init</code>, <code>build</code>, <code>run</code>, <code>check</code>, <code>install</code>, <code>add</code>, <code>upgrade</code>, <code>outdated</code>, custom commands from <code>[commands]</code>; see the <a href=\"articles.html#/bit\">bit article</a> for details.",
     "<strong>LSP server and VS Code extension</strong> — syntax highlighting and editor hints.",
     "<strong>Packages for many systems</strong> — Debian/Ubuntu, Arch, Fedora, openSUSE, macOS and Windows.",
     "<strong>In-browser playground</strong> — try H# code without installing anything."
    ]
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "h# preview src/main.h#                 ;; interpreter",
     "h# compile src/main.h# --release -o app ;; native binary",
     "h# compile src/main.h# --target linux-aarch64",
     "h# compile src/main.h# --emit obj      ;; .o object file",
     "h# compile src/main.h# --emit so       ;; shared library",
     "h# compile src/main.h# --emit lib      ;; static archive .a",
     "h# check a.h# b.h# c.h#                ;; check only",
     "h# targets                             ;; list targets"
    ],
    "title": "Compilation"
   },
   {
    "t": "h2",
    "text": "Limitations and status"
   },
   {
    "t": "p",
    "html": "H# is a young, actively developed language. The LLVM backend is the production path, while the interpreter is mainly for quick previews and tests, so behaviour may differ in some rare cases. The current list of known limitations is in the repository README and in the documentation."
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
