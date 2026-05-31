---
name: source-grounded-entry-writer
description: Write, revise, or fact-check Music Diary entries with reliable sources, conservative claims, coordinates, collection (playlist) assignments, and listening links. Use when adding entries to a Music Diary dataset (data/music-diary.json) or refining existing works.
---

# Source-Grounded Entry Writer

Use this skill when creating or changing Music Diary entries. It pairs with `portal-source-harvester`, which supplies the raw, cited facts.

## Rules

- Do not invent facts, dates, places, premieres, dedications, coordinates, or meanings.
- Use reliable sources before adding factual claims; prefer official composer portals.
- Prefer city-level wording when a precise venue or composing location is uncertain.
- Keep `source.label`, `source.url`, and `source.summary` compact and verifiable.
- Keep user-facing copy in the project's language (Music Diary is Chinese-first).
- Prefer official composer portals/institutions for sources; fall back to authoritative score archives (e.g. IMSLP) only when no per-work official page is verifiable, and log the fallback in `content-audit.md`.
- Assign `collections` (playlists) only when the grouping is justified; a work may belong to more than one. An optional `mood` tag can carry the emotional flavour.
- For interpretive claims ("a love letter to ..."), use "通常被认为" / "常被解读为" unless a source documents the intention.

## Entry workflow

1. Confirm the dataset shape against `schemas/music-diary.schema.json` and the existing `collections` ids.
2. Take cited facts from `portal-source-harvester`.
3. Draft the entry with all required fields: `id`, `title`, `work`, `composer`, `year`, `city`, `country`, `lat`, `lng`, `collections`, `blurb`, `background`, `meaning`, `source` (plus an optional `mood`).
4. Write the three text fields, all grounded in the sources:
   - `blurb` — a one-line teaser (used in cards/popups);
   - `background` (创作背景) — composition date, place, dedication, premiere, who/why;
   - `meaning` (作品含义) — what the music expresses and why it matters; keep interpretation conservative.
5. Cite generously: `source` is the primary official portal; add a `sources` array to include the primary plus any verified secondary sources (each with `label` + `url` + `summary`).
6. Add `listening` with a clean search `query` (used to build YouTube/Bilibili/Spotify/Apple Music links).
6. Validate JSON syntax and required fields, then regenerate the `data/*.js` mirror.
7. Update `content-audit.md` with the source type and any open items.

## Wording guidance

Conservative phrases to prefer:

- "通常被认为" / "commonly associated with"
- "首演于" when the premiere date/venue is documented
- "作曲地点为城市级标注" when the exact location is uncertain
- "（含义为后人记述）" when an interpretation is not a documented intention

Avoid:

- "写给某人" without a source
- precise venues or coordinates for uncertain locations
- presenting a popular legend as established fact

## Validation

```bash
node tests/validate.js
```
