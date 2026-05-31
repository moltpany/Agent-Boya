---
name: dual-view-site-builder
description: Build or adapt a no-backend static site that presents a Music Diary dataset in two synchronized views — a Leaflet map view (by place) and a theme view (by emotional dimension). Use when publishing or updating a Music Diary work from a valid dataset.
---

# Dual-View Site Builder

Use this skill to produce or maintain the static site that renders a Music Diary dataset.

## The two views, one dataset

- **Map view**: Leaflet + OpenStreetMap. One marker per entry at its `lat`/`lng` (premiere or composing city). Clicking a marker opens the shared detail panel.
- **Theme view**: no map. Entries grouped by the `themes` defined in the dataset; each group shows a heading, tagline, and cards.
- Both views read the **same** `data/music-diary.json`. An entry carries both `lat`/`lng` (for the map) and `themes` (for the theme view); this is what lets the two views coexist.

## Constraints

- No build step, no backend, no database, no analytics or telemetry.
- Only external resources allowed: the Leaflet CDN and OpenStreetMap tiles (for the map view). Nothing else.
- Chinese-first UI copy; keep English only for proper nouns (composers, work titles).
- Maintain a `data/music-diary.json` (authoritative) and a synced `data/music-diary.js` that assigns `window.MUSIC_DIARY_DATA`, so the page also works when opened via `file://`.
- Persist the dark/light theme in `localStorage` under `music-diary-theme`, and the active view under `music-diary-view`.
- Cross-link to the sibling work Mozart Journey (`https://moltpany.github.io/mozart-journey/`) and back to Moltpany.

## Workflow

1. Validate the dataset: `node tests/validate.js`.
2. Regenerate `data/music-diary.js` from `data/music-diary.json`.
3. Render filters (search / theme / composer), the map markers, and the theme groups from the data — never hard-code entries into HTML.
4. Keep a single shared detail panel used by both views.
5. Render the sources section from each entry's `source`.
6. Verify locally with a static server or `file://`, then commit.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000/
```
