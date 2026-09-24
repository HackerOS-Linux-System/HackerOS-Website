# HackerOS-Website

Lost? Visit the home page: https://hackeros-linux-system.github.io/HackerOS-Website/Home-page.html

### Witaj na polskiej dystrbucji HackerOS bazujacej na debianie testowym :D

## Articles

The Articles section lives in `articles.html` and is driven by data files in `articles/`:

- `articles/index.js` - list of published article ids (+ tag labels)
- `articles/<id>.js` - one article: metadata + content blocks in `pl` and `en`
  (other languages fall back to English)

To publish a new article add `articles/<id>.js` (copy an existing one) and list its id in
`articles/index.js`. Keep the object strict JSON - the HackerOS App (Android and iOS) reads the
same files. Block types: `h2 h3 p ul ol code note table quote`; inline HTML is limited to
`<strong> <em> <code> <a href> <br>`.
