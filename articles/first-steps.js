window.HACKEROS_ARTICLES = window.HACKEROS_ARTICLES || {};
window.HACKEROS_ARTICLES["first-steps"] = {
 "id": "first-steps",
 "date": "2026-08-28",
 "author": "HackerOS Team",
 "readingMinutes": 4,
 "icon": "🚀",
 "tags": [
  "guide",
  "system"
 ],
 "title": {
  "pl": "Pierwsze kroki po instalacji HackerOS: ściąga na start",
  "en": "First steps after installing HackerOS: a starter cheat sheet"
 },
 "summary": {
  "pl": "Nośnik i tryb Live, hacker update, instalowanie programów, sieć, zmiana jądra i szybka diagnostyka problemów.",
  "en": "Installation media and Live mode, hacker update, installing software, networking, switching kernels and quick troubleshooting."
 },
 "content": {
  "pl": [
   {
    "t": "p",
    "html": "Właśnie zainstalowałeś HackerOS (albo odpaliłeś go z pendrive'a). Co dalej? Ta krótka ściąga zbiera rzeczy, które przydają się w pierwszych godzinach."
   },
   {
    "t": "h2",
    "text": "Nośnik instalacyjny"
   },
   {
    "t": "p",
    "html": "Obraz ISO pobierzesz ze strony <a href=\"download.html\">Download</a>. Na Windowsie nagraj go programem Rufus, na Linuksie — balenaEtcher, Fedora Media Writer albo <code>dd</code>:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "dd if=obraz.iso of=/dev/sdX bs=4M status=progress conv=fsync"
    ],
    "title": "Terminal"
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Podmień <code>/dev/sdX</code> na właściwy dysk — <code>dd</code> nadpisze wszystko na wskazanym urządzeniu bez pytania."
   },
   {
    "t": "h2",
    "text": "Tryb Live"
   },
   {
    "t": "p",
    "html": "Po starcie z pendrive'a wybierz „Uruchom HackerOS Live”. Domyślne hasło użytkownika <code>live</code> to <code>live</code>. Instalator Calamares poprowadzi Cię przez wybór języka, partycjonowanie i utworzenie użytkownika."
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Dual-boot jest wspierany — instalator potrafi zainstalować system obok istniejącego. Zawsze zrób kopię zapasową przed zmianą partycji."
   },
   {
    "t": "h2",
    "text": "Aktualizacje"
   },
   {
    "t": "p",
    "html": "Cały system aktualizujesz jedną komendą:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hacker update"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Instalowanie programów"
   },
   {
    "t": "ul",
    "items": [
     "Z GUI: otwórz <code>Software</code> i wybierz aplikację.",
     "Z CLI: <code>sudo apt install &lt;pakiet&gt;</code> lub <code>sudo hacker install &lt;pakiet&gt;</code>.",
     "Możesz też używać <strong>Flatpak</strong>, <strong>Snap</strong> albo <strong>brew</strong>."
    ]
   },
   {
    "t": "h2",
    "text": "Sieć"
   },
   {
    "t": "p",
    "html": "<code>hacker network</code> to przyjazny interfejs graficzny do nmcli: kilka kliknięć wystarczy, by połączyć się z Wi-Fi, skonfigurować VPN albo edytować połączenia."
   },
   {
    "t": "h2",
    "text": "Inne jądro"
   },
   {
    "t": "p",
    "html": "Chcesz spróbować XanMod lub Liquorix? Użyj narzędzia <code>chker</code>. Domyślnie system pracuje na standardowym jądrze Debiana."
   },
   {
    "t": "h2",
    "text": "Gdy coś nie działa"
   },
   {
    "t": "ol",
    "items": [
     "Sprawdź sieć: <code>nmcli device status</code> i <code>ping 8.8.8.8</code>.",
     "Przejrzyj logi: <code>journalctl -b</code> i <code>dmesg | less</code>.",
     "Napraw pakiety: <code>sudo apt --fix-broken install</code> i <code>sudo dpkg --configure -a</code>.",
     "Spróbuj <code>hacker repair</code> (BETA).",
     "Napisz na <a href=\"mailto:hackeros068@gmail.com\">hackeros068@gmail.com</a> lub zgłoś issue na <a href=\"https://github.com/HackerOS-Linux-System/HackerOS-Website/issues\">GitHubie</a>."
    ]
   },
   {
    "t": "p",
    "html": "Pełny opis znajdziesz w <a href=\"hackeros-documentation.html\">dokumentacji</a>."
   }
  ],
  "en": [
   {
    "t": "p",
    "html": "You have just installed HackerOS (or booted it from a USB stick). What now? This short cheat sheet collects the things that help in the first few hours."
   },
   {
    "t": "h2",
    "text": "Installation media"
   },
   {
    "t": "p",
    "html": "Grab the ISO from the <a href=\"download.html\">Download</a> page. On Windows write it with Rufus; on Linux use balenaEtcher, Fedora Media Writer or <code>dd</code>:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "dd if=image.iso of=/dev/sdX bs=4M status=progress conv=fsync"
    ],
    "title": "Terminal"
   },
   {
    "t": "note",
    "kind": "warn",
    "html": "Replace <code>/dev/sdX</code> with the correct disk — <code>dd</code> overwrites everything on the target device without asking."
   },
   {
    "t": "h2",
    "text": "Live mode"
   },
   {
    "t": "p",
    "html": "After booting from the USB stick choose “Run HackerOS Live”. The default password for the <code>live</code> user is <code>live</code>. The Calamares installer walks you through language, partitioning and user creation."
   },
   {
    "t": "note",
    "kind": "tip",
    "html": "Dual-boot is supported — the installer can install alongside an existing system. Always back up before changing partitions."
   },
   {
    "t": "h2",
    "text": "Updates"
   },
   {
    "t": "p",
    "html": "Update the whole system with a single command:"
   },
   {
    "t": "code",
    "lang": "bash",
    "code": [
     "hacker update"
    ],
    "title": "Terminal"
   },
   {
    "t": "h2",
    "text": "Installing software"
   },
   {
    "t": "ul",
    "items": [
     "From the GUI: open <code>Software</code> and pick an app.",
     "From the CLI: <code>sudo apt install &lt;package&gt;</code> or <code>sudo hacker install &lt;package&gt;</code>.",
     "You can also use <strong>Flatpak</strong>, <strong>Snap</strong> or <strong>brew</strong>."
    ]
   },
   {
    "t": "h2",
    "text": "Networking"
   },
   {
    "t": "p",
    "html": "<code>hacker network</code> is a friendly GUI front end for nmcli: a few clicks are enough to join Wi-Fi, set up a VPN or edit connections."
   },
   {
    "t": "h2",
    "text": "A different kernel"
   },
   {
    "t": "p",
    "html": "Want to try XanMod or Liquorix? Use the <code>chker</code> tool. By default the system runs the standard Debian kernel."
   },
   {
    "t": "h2",
    "text": "When something breaks"
   },
   {
    "t": "ol",
    "items": [
     "Check the network: <code>nmcli device status</code> and <code>ping 8.8.8.8</code>.",
     "Read the logs: <code>journalctl -b</code> and <code>dmesg | less</code>.",
     "Fix packages: <code>sudo apt --fix-broken install</code> and <code>sudo dpkg --configure -a</code>.",
     "Try <code>hacker repair</code> (BETA).",
     "Email <a href=\"mailto:hackeros068@gmail.com\">hackeros068@gmail.com</a> or open an issue on <a href=\"https://github.com/HackerOS-Linux-System/HackerOS-Website/issues\">GitHub</a>."
    ]
   },
   {
    "t": "p",
    "html": "The full description is in the <a href=\"hackeros-documentation.html\">documentation</a>."
   }
  ]
 }
};
