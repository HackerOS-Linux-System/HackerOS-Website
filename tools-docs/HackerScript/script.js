(function () {
  'use strict';

  // ---- mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');

  if (navToggle && sidebar) {
    navToggle.addEventListener('click', function () {
      var isOpen = sidebar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 860) {
        sidebar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- copy-to-clipboard on code blocks ----
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-copy-target');
      var target = document.getElementById(targetId);
      if (!target) return;

      var text = target.innerText;

      function showCopied() {
        var original = btn.textContent;
        btn.textContent = 'Skopiowano';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function () {
          fallbackCopy(text, showCopied);
        });
      } else {
        fallbackCopy(text, showCopied);
      }
    });
  });

  function fallbackCopy(text, onDone) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    onDone();
  }

  // ---- scrollspy: highlight the sidebar link for the section in view ----
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.doc-section[id]'));
  var sidebarLinks = Array.prototype.slice.call(document.querySelectorAll('.sidebar a'));

  function linkFor(id) {
    return sidebarLinks.find(function (a) {
      return a.getAttribute('href') === '#' + id;
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var current = null;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (current) current.classList.remove('active');
          var link = linkFor(entry.target.id);
          if (link) {
            link.classList.add('active');
            current = link;
          }
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ---- sidebar search filter ----
  var searchInput = document.getElementById('docSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      sidebarLinks.forEach(function (a) {
        var li = a.parentElement;
        var matches = !q || a.textContent.toLowerCase().indexOf(q) !== -1;
        li.classList.toggle('no-match', !matches);
      });
    });

    // "/" focuses search, like GitHub/docs sites
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
})();
