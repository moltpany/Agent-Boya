# Example: Music Diary

This is Agent-Boya's first case study — a Chinese, dual-view diary of **love across classical music**.

- Live work: <https://moltpany.github.io/music-diary/>
- Work repository: <https://github.com/moltpany/music-diary>
- Sibling work: [Mozart Journey](https://moltpany.github.io/mozart-journey/)

## What's here

`music-diary.json` is a copy of the work's authoritative dataset. It is intentionally compatible with `schemas/music-diary.schema.json`:

- a top-level `collections` array — the playlists (歌单) used by the collection lists
- a top-level `entries` array — one object per work, each carrying:
  - `composer`, `year`, `city`, `country`, `lat`, `lng`
  - `collections` (one or more playlists the work belongs to)
  - optional `mood` (a short emotional-flavour tag)
  - `blurb` (a short "why it matters" paragraph)
  - `source` (`label` + `url` + `summary`)
  - optional `listening` (a search `query` used to build streaming links)

## The playlists

1. `love` — 爱情（古典音乐中的爱情；内部保留初恋 / 激情 / 思念 / 歌剧的情感色彩）
2. `night` — 深夜与月光
3. `piano` — 钢琴独语
4. `stage` — 歌剧舞台
5. `farewell` — 思念与告别

A work can belong to several playlists (e.g. Saint-Saëns' *Le Cygne* is in `love`, `night`, and `farewell`).

## Source policy

Every entry carries a verifiable source from an **official composer portal or research institution** (Beethoven-Haus Bonn, Schumann-Portal, NIFC for Chopin, Brahms-Portal, Mahler Foundation, Palazzetto Bru Zane, Centro Studi Giacomo Puccini, Stiftung Mozarteum, etc.). Where no per-work official page is verifiable, an authoritative score archive (IMSLP) is used and noted in `content-audit.md`. Boya's `portal-source-harvester` takes citations rather than copying portal text.
