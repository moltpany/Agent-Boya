# Example: Music Diary

This is Agent-Boya's first case study — a Chinese, dual-view diary of **love across classical music**.

- Live work: <https://moltpany.github.io/music-diary/>
- Work repository: <https://github.com/moltpany/music-diary>
- Sibling work: [Mozart Journey](https://moltpany.github.io/mozart-journey/)

## What's here

`music-diary.json` is a copy of the work's authoritative dataset. It is intentionally compatible with `schemas/music-diary.schema.json`:

- a top-level `themes` array — the emotional dimensions used by the theme view
- a top-level `entries` array — one object per work, each carrying:
  - `composer`, `year`, `city`, `country`, `lat`, `lng`
  - `themes` (one or more emotional dimensions)
  - `blurb` (a short "why it matters" paragraph)
  - `source` (`label` + `url` + `summary`)
  - optional `listening` (a search `query` used to build streaming links)

## The four themes

1. `first-love` — 初恋的悸动与朦胧
2. `passion` — 炽热的渴望与激情
3. `longing` — 忧伤的离别与思念
4. `opera` — 歌剧舞台上的爱情宣言

## Source policy

Every entry carries a verifiable source. The first version uses authoritative encyclopedia entries as a starting point (stable URLs, easy to verify); Boya's `portal-source-harvester` upgrades these to official composer portals and institutions over time, taking citations rather than copying portal text.
