# Build log — Kura Trophy Atlas (gta6-trophy-guide-01)

## What was built
An offline guide and tracker for all 55 GTA VI PlayStation 5 trophies, in `app/` (static files, no build step, no network at run time). Vanilla JS split by job: `app/src/storage.js` (localStorage progress, export/import), `app/src/filters.js` (search, grade, kind, unearned-only), `app/src/roadmap.js` (the 8-stage roadmap), `app/src/render.js` (checklist, detail panel, roadmap and missables views), `app/src/main.js` (bootstrap and `?shot=` states). `app/data/trophies.json` holds all 55 trophies with official name, description, grade, hidden flag, kind, missable flag, roadmap stage, count where PlayStation tracks one, a guide in the atlas's own words, and cited sources.

## Steps, in order
1. Read the kit's RULES.txt, the starter's `main.ts`, `serve.ts`, `shots.json` and `app/` files, and the starter's `app/data/trophies.json` (the official 55 names, descriptions and grades).
2. Checked the hidden set against the cross-checked public list (Exophase / PSNProfiles via Planet GTA 6): 28 hidden — ids 2–13, 22–24, 26–27, 29, 37–38, 44–51. The one possibly-missable trophy (Positive Mental Attitude, Chapter 1 balcony meditation, no mission replay) follows PowerPyx via Outputlag and GTA Zone. Trophies whose descriptions are the only confirmed hint say so in their guide instead of inventing steps.
3. Wrote `main.ts` (first version), then the full `app/data/trophies.json` (55 guides + citations), `app/index.html`, `app/style.css`, and the five `app/src/*.js` modules, plus README.md, `.makefun/owner.json` and `shots.json`.
4. Served `app/` with `node serve.ts` (localhost:8091) and played it in headless Chrome (file:// URLs, since this VM's Chrome blocks localhost; `--allow-file-access-from-files` so the app's `fetch('data/trophies.json')` works from file://, exactly as it works from a static server).
5. Took exactly 4 real-render screenshots at 1280×720 with the CDP driver: 1-guide (checklist + Positive Mental Attitude guide and sources open), 2-roadmap (roadmap to the platinum), 3-tracker (9 trophies earned, progress bar, spoiler setting on), 4-filters (missable filter: 1 of 55 shown).
6. Revised `main.ts` in a second pass (screenshot-count guard before the dossier build), then ran the entrypoint twice into separate output dirs and confirmed byte-identical output, ran the kit's pre-submit check, and played the built app from `out/` in the browser.
7. Committed locally (no push, no submit — the parent handles those).

## Design decisions
- Warm sunset-coast look of its own (sand, teal, sunset orange), an original SVG tortoise mark, system fonts only, no Rockstar logo or artwork.
- Spoiler setting on by default: hidden story trophies are masked until earned; earning one reveals it in place.
- Honesty over completeness: the five-plus cryptic trophies with no confirmed unlock method published yet are labelled as such, with the official description as the only confirmed hint.
- The missable filter shows exactly one trophy — that is the honest count, and the app says why the rest are safe.
- `?shot=` states make every screenshot reproducible from the app's own code.

## Validation numbers
- Trophies: 55/55 named, 55/55 with non-blank guides, 55/55 with cited sources. Grades: 1 platinum, 2 gold, 6 silver, 46 bronze. Hidden: 28. Missable: 1.
- Screenshots: 4 JPEGs, each 1280×720, 101,166–119,546 bytes (under the 256 KiB cap).
- Dossier: byte-identical across two runs (`diff -r out1 out2` clean); `dossier.json` 670,728 bytes (cap 1.5 MiB); dossier text 77,356 bytes (cap 160 KiB); app/ 75,953 bytes, 8 files (caps 48 MiB / 993 entries).
- Kit check: `node cli/makefun.mjs check --kit . --repo <repo>` — 4 passed, 0 failed, 17 skipped (transcript checks run on the site), 5 checked at submission (repo must be public, pushed, created after opening; .makefun/owner.json present). The check ran before this commit, so it saw the starter commit; re-run after push for the new commit.
