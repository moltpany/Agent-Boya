# Agent-Boya

> Source-grounded music storytelling: harvest authoritative portals, write cited entries, and publish dual-view (map + theme) static music diaries.

Agent-Boya（伯牙）is a lightweight framework for turning researched musical works — their composers, dates, places, premieres, sources, and emotional meaning — into publishable, source-grounded music stories. It starts from the **Music Diary** case study and generalizes the pattern into reusable schemas and Codex/OpenClaw-style skills.

命名取自中国历史上的伯牙——「高山流水」「知音」的典故。Boya 是一个「为音乐立传、寻觅知音」的智能体：它去听懂那些权威音乐门户里的事实，再把它们带着来源讲给人听。

## What this is

Agent-Boya is not a hosted music platform and not a background service. It is a repo-shaped workflow for agents and humans who want to build small, source-aware music narratives:

- Harvest facts from authoritative composer portals and institutions — as **citations**, not copied text.
- Write entries with conservative, source-grounded claims.
- Store entries in a machine-readable JSON schema, grouped by emotional theme and place.
- Build or maintain a static, dual-view site (map + theme) from that data.
- Keep examples small enough for GitHub Pages and local review.

"Auto-sync to the website" means exactly this: you talk to Boya, Boya runs these skills to edit `data/music-diary.json` (and its `.js` mirror), validates, and commits. The repository is the record.

## Core concepts

| Concept | Purpose |
| --- | --- |
| Music story | A self-contained dataset of works with themes, sources, and places |
| Entry | One work: composer, year, place, coordinates, themes, blurb, source |
| Theme | An emotional dimension (e.g. first love, passion, longing, opera) for the theme view |
| Source | A compact citation label, URL, and summary supporting the entry |
| Dual-view site | A no-backend HTML/CSS/JS layer rendering the data as a map view and a theme view |

## Core skills

| Skill | Status | What it does |
| --- | --- | --- |
| `portal-source-harvester` | Ready | Gathers citable facts from authoritative composer portals without copying their prose |
| `source-grounded-entry-writer` | Ready | Drafts and revises entries without inventing facts |
| `dual-view-site-builder` | Ready | Builds or adapts a static map + theme site from a valid dataset |

## Repository structure

```text
.
├── README.md
├── agent-registry.json
├── schemas/
│   └── music-diary.schema.json
├── examples/
│   └── music-diary/
│       ├── README.md
│       └── music-diary.json
├── skills/
│   ├── portal-source-harvester/
│   │   └── SKILL.md
│   ├── source-grounded-entry-writer/
│   │   └── SKILL.md
│   └── dual-view-site-builder/
│       └── SKILL.md
├── tests/
│   └── validate.js
├── SYNC.md
└── LICENSE
```

## Quick start

Validate the framework files and the example dataset:

```bash
node tests/validate.js
```

Use Music Diary as the first case study:

```text
examples/music-diary/music-diary.json
```

## How agents should use this

1. Use `portal-source-harvester` to gather cited facts before adding a work.
2. Use `source-grounded-entry-writer` to write or revise entries and assign themes.
3. Validate entries against `schemas/music-diary.schema.json`.
4. Use `dual-view-site-builder` to produce or adapt the static site.
5. Run `node tests/validate.js` before committing.

## Roadmap

| Module | Status | Description |
| --- | --- | --- |
| Framework README | Ready | Project positioning and usage |
| Music Diary schema | Ready | Shared JSON contract for entries and themes |
| Music Diary example | Ready | First case study (love across classical music) |
| Portal source upgrades | Next | Replace encyclopedia starters with official composer portals |
| Source audit helper | Next | Optional script to report missing or weak source fields |
| Multi-story examples | Later | Other themes, eras, or single-composer diaries |

## Works

- **Music Diary** — <https://moltpany.github.io/music-diary/> — Boya's first work, a dual-view diary of love across classical music. Sibling to [Mozart Journey](https://moltpany.github.io/mozart-journey/).

## License

MIT.
