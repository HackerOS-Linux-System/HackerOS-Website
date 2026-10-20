#!/usr/bin/env lua
-- Buduje cala strone HackerOS (100% HackerScript, use <mode:website>) do katalogu _site:
--   1. statyczne pliki (obrazy, LICENSE, README, ...) -> kopiowane bez zmian,
--   2. kazda strona cmd/pages/**/*.hcs -> _site/<sciezka>.html + _site/<sciezka>.app.js,
--   3. Service Worker (cmd/worker/sw.hcs -> sw.js) i worker playgroundu H#
--      (cmd/worker/hsharp_worker.hcs -> h-sharp/playground/worker.js).
--
-- Uzycie:   lua scripts/build-site.lua                       -- wszystko
--           lua scripts/build-site.lua cmd/pages/404.hcs     -- tylko wybrane strony (bez krokow 1 i 3)
-- Zmienne:  HACKERC   - sciezka do hackerc (domyslnie: hackerc z PATH)
--           OUT       - katalog wyjsciowy (domyslnie: _site)
--           SITE_BASE - sciezka serwisu na hostingu, np. /HackerOS-Website/. Strony 404 i offline sa
--                       serwowane pod dowolnym adresem, wiec na hostingu laduja swoj skrypt sciezka
--                       bezwzgledna. Puste (domyslnie) = sciezka wzgledna, dziala tez z file:// lokalnie.

local HACKERC   = os.getenv("HACKERC") or "hackerc"
local OUT       = os.getenv("OUT") or "_site"
local SITE_BASE = os.getenv("SITE_BASE") or ""

local function q(s) return "'" .. tostring(s):gsub("'", "'\\''") .. "'" end

local function run(cmd)
  local ok = os.execute(cmd)
  return ok == true or ok == 0
end

local function read_file(path)
  local f = assert(io.open(path, "rb"))
  local data = f:read("a")
  f:close()
  return data
end

local function write_file(path, data)
  local f = assert(io.open(path, "wb"))
  f:write(data)
  f:close()
end

local function capture(cmd)
  local p = assert(io.popen(cmd))
  local out = p:read("a")
  p:close()
  return out
end

local function strip_ansi(s) return (s:gsub("\27%[[0-9;]*m", "")) end

local function dirname(path) return path:match("^(.*)/[^/]*$") or "." end
local function basename(path) return path:match("([^/]*)$") end

-- literalna podmiana (bez wzorcow Lua)
local function replace_plain(s, from, to)
  local i, j = s:find(from, 1, true)
  if not i then return s end
  return s:sub(1, i - 1) .. to .. s:sub(j + 1)
end

local function build_page(f)
  local rel = f:gsub("^.*cmd/pages/", "")
  local base = rel:gsub("%.hcs$", "")
  local name = basename(base)
  local tmp = capture("mktemp -d"):gsub("%s+$", "")
  print("==> " .. rel)
  local ok = run(q(HACKERC) .. " build " .. q(f) .. " -o " .. q(tmp) .. " >" .. q(tmp .. "/log") .. " 2>&1")
  if not ok then
    io.write(strip_ansi(read_file(tmp .. "/log")))
    io.stderr:write("BLAD: " .. rel .. "\n")
    os.exit(1)
  end
  run("mkdir -p " .. q(OUT .. "/" .. dirname(base)))
  local script = name .. ".app.js"
  if SITE_BASE ~= "" and (rel == "404.hcs" or rel == "offline.hcs") then
    script = SITE_BASE .. script
  end
  local html = replace_plain(read_file(tmp .. "/index.html"), 'src="app.js"', 'src="' .. script .. '"')
  write_file(OUT .. "/" .. base .. ".html", html)
  run("cp " .. q(tmp .. "/app.js") .. " " .. q(OUT .. "/" .. base .. ".app.js"))
  run("rm -rf " .. q(tmp))
end

local function build_worker(src, dst)
  print("==> " .. dst)
  run("mkdir -p " .. q(dirname(OUT .. "/" .. dst)))
  if not run(q(HACKERC) .. " build " .. q(src) .. " -o " .. q(OUT .. "/" .. dst) .. " >/dev/null") then
    io.stderr:write("BLAD: " .. src .. "\n")
    os.exit(1)
  end
end

run("mkdir -p " .. q(OUT))

if #arg > 0 then
  for _, f in ipairs(arg) do build_page(f) end
  os.exit(0)
end

print("==> pliki statyczne")
local excludes = { "./.git", "./.github", "./.gitignore", "./cmd", "./scripts", "./Bit.hk", "./cache" }
if OUT:sub(1, 1) ~= "/" then excludes[#excludes + 1] = "./" .. OUT end
local ex = {}
for _, e in ipairs(excludes) do ex[#ex + 1] = "--exclude=" .. q(e) end
run("tar -c " .. table.concat(ex, " ") .. " . | tar -x -C " .. q(OUT))
write_file(OUT .. "/.nojekyll", "")

for f in capture("find cmd/pages -name '*.hcs' | sort"):gmatch("[^\n]+") do
  build_page(f)
end

build_worker("cmd/worker/sw.hcs", "sw.js")
build_worker("cmd/worker/hsharp_worker.hcs", "h-sharp/playground/worker.js")

local count = capture("find " .. q(OUT) .. " -type f | wc -l"):gsub("%s+", "")
print("Gotowe: " .. OUT .. " (" .. count .. " plikow)")
