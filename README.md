# Kura Trophy Atlas — GTA VI Trophy Guide & Tracker

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/srimuryaticitra-cpu/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/srimuryaticitra-cpu/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

A slow-but-sure offline guide and tracker for all 55 PlayStation 5 trophies of Grand Theft Auto VI — 1 platinum, 2 gold, 6 silver, 46 bronze, 28 of them hidden on PlayStation until earned.

Every trophy shows its official name, description and grade, plus a guide in this atlas's own words with its sources cited beside it. Where the official description is the only confirmed source, the guide says so plainly instead of inventing a location or step.

## What it does

- **Checklist tracker** — tick trophies as you earn them; progress is saved in the browser (localStorage) and shown as a progress bar with counts by grade.
- **Export / import** — save your progress to a JSON file and import it back on another browser.
- **Filters** — by grade, by kind (story, missable, collectibles, activities, exploration, robbery, money, odds & ends, online), by search text, and unearned-only. There are no online trophies in this list — all 55 are single-player, and the app says so when you pick the online filter.
- **Spoiler setting** — on by default: hidden story trophies show as "Hidden trophy — earn it to reveal" until you earn them.
- **Roadmap to the platinum** — eight stages in order, built from the official descriptions: saves first, story, side-character finales, exploration and collectibles, activities and combat, robberies, money and property, then the cryptic odds and ends and 100% completion.
- **Missables** — the one trophy reported as possibly missable (Positive Mental Attitude: the Chapter 1 balcony meditation spot) is flagged with why, and the app explains why the rest are safe.

## How to run it

No build step, no network. Serve `app/` with any static server, or open `app/index.html` directly:

```sh
node serve.ts
# then open http://localhost:8080
```

Everything loads from files inside `app/` — the app makes no network request at run time.

## Controls

- Click a trophy to read its guide and sources; use its button (or its checkbox) to mark it earned.
- Search, grade and kind filters narrow the list; "Unearned only" hides what you already have.
- "Hide story spoilers" (on by default) masks hidden story trophies until earned.
- "Export progress" downloads your ticks as JSON; "Import progress" restores them.

## Sources

Names and descriptions are the official PlayStation text, as listed by Exophase and PSNProfiles (18 Nov 2026) and cross-checked on Planet GTA 6. Missable and unconfirmed-trigger notes come from Outputlag and GTA Zone (PowerPyx). Each trophy's guide cites its sources in the app. No Rockstar logo or artwork is used.
