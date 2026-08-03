(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Active section highlighting ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));

  function setActiveLink(id) {
    navAnchors.forEach(function (a) {
      var match = a.getAttribute("href") === "#" + id;
      a.classList.toggle("active", match);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        if (visible.length) {
          setActiveLink(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Back-to-top button ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      function () {
        toTop.classList.toggle("visible", window.scrollY > 640);
      },
      { passive: true }
    );
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Copy-to-clipboard on code blocks ---------- */
  document.querySelectorAll(".code-block").forEach(function (block) {
    var btn = block.querySelector(".copy-btn");
    var pre = block.querySelector("pre");
    if (!btn || !pre) return;
    btn.addEventListener("click", function () {
      var text = pre.innerText;
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Skopiowano";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text, done);
        });
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  /* ---------- Config tabs ---------- */
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll(".tab-btn"));
    var panelWrap = tabs.parentElement;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");
        buttons.forEach(function (b) { b.classList.toggle("active", b === btn); });
        panelWrap.querySelectorAll(".tab-panel").forEach(function (panel) {
          panel.classList.toggle("active", panel.getAttribute("data-tab") === target);
        });
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // Close siblings within the same FAQ list for a tidier accordion.
      var list = item.parentElement;
      if (list) {
        list.querySelectorAll(".faq-item.open").forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove("open");
            var openA = openItem.querySelector(".faq-a");
            if (openA) openA.style.maxHeight = "";
          }
        });
      }
      item.classList.toggle("open", !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : "";
    });
  });

  /* ---------- Keybinding table filter ---------- */
  var kbFilter = document.querySelector("#kb-filter");
  var kbRows = Array.prototype.slice.call(document.querySelectorAll("#kb-table tbody tr"));
  if (kbFilter && kbRows.length) {
    kbFilter.addEventListener("input", function () {
      var q = kbFilter.value.trim().toLowerCase();
      kbRows.forEach(function (row) {
        var text = row.innerText.toLowerCase();
        row.style.display = text.indexOf(q) === -1 ? "none" : "";
      });
    });
  }

  /* ---------- Hero terminal: typed IPC exchange ---------- */
  var termBody = document.querySelector("#term-body");
  if (termBody) {
    var script = [
      { cls: "term-prompt", text: "$ ", noBreak: true },
      { cls: "term-req", text: "hwde-ipc send SwitchWorkspace" },
      { cls: "term-key", text: "\n{\"type\":\"SwitchWorkspace\",\"data\":{\"id\":2}}" },
      { cls: "term-ok", text: "\n← {\"type\":\"Ok\"}" },
      { cls: "", text: "\n\n" },
      { cls: "term-prompt", text: "$ ", noBreak: true },
      { cls: "term-req", text: "hwde-ipc send ListOutputs" },
      { cls: "term-str", text: "\n← [{\"name\":\"WL-1\",\"width\":1920,\"height\":1080,\"scale\":1.0,\"is_primary\":true}]" },
      { cls: "", text: "\n\n" },
      { cls: "term-prompt", text: "$ ", noBreak: true },
      { cls: "term-req", text: "hwde-ipc send ToggleFloatingWindow" },
      { cls: "term-key", text: "\n{\"type\":\"ToggleFloatingWindow\",\"data\":{\"id\":42}}" },
      { cls: "term-ok", text: "\n← {\"type\":\"Ok\"}   " },
      { cls: "term-ok", text: "# v0.2", tag: "span", faint: true }
    ];

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      renderTermInstant();
    } else {
      typeTerminal();
    }

    function renderTermInstant() {
      var html = script.map(function (part) {
        var cls = part.cls ? ' class="' + part.cls + '"' : "";
        return "<span" + cls + ">" + escapeHtml(part.text) + "</span>";
      }).join("");
      termBody.innerHTML = html;
    }

    function typeTerminal() {
      termBody.innerHTML = "";
      var line = document.createElement("div");
      line.className = "term-line";
      termBody.appendChild(line);

      var partIndex = 0;
      var charIndex = 0;
      var speed = 14; // ms per character - fast enough not to feel gimmicky

      function step() {
        if (partIndex >= script.length) {
          var cursor = document.createElement("span");
          cursor.className = "term-cursor";
          line.appendChild(cursor);
          return;
        }
        var part = script[partIndex];
        if (charIndex === 0) {
          var span = document.createElement("span");
          if (part.cls) span.className = part.cls;
          span.dataset.buffer = "";
          line.appendChild(span);
        }
        var currentSpan = line.lastChild;
        if (charIndex < part.text.length) {
          currentSpan.textContent += part.text[charIndex];
          charIndex++;
          setTimeout(step, part.text[charIndex - 1] === "\n" ? 60 : speed);
        } else {
          partIndex++;
          charIndex = 0;
          setTimeout(step, 30);
        }
      }
      step();
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
