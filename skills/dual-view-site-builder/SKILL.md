---
name: dual-view-site-builder
description: Build or adapt a no-backend static site that presents a Music Diary dataset as a Leaflet map (markers open popups that jump to a shared detail panel) plus clickable collection (playlist) lists. Use when publishing or updating a Music Diary work from a valid dataset.
---

# Dual-View Site Builder

Use this skill to produce or maintain the static site that renders a Music Diary dataset.

## Map + playlists, one dataset

- **Map**: Leaflet + OpenStreetMap. One marker per entry at its `lat`/`lng` (premiere or composing city). Each marker binds a popup containing the title, composer, and a "查看作品详情 →" button; clicking the button selects the entry and scrolls to the shared detail panel (mirror Mozart Journey).
- **Collections (歌单)**: each collection lists the works it contains as clickable items; clicking an item selects the entry, focuses it on the map, and scrolls to detail. A work may belong to multiple collections.
- Both read the **same** `data/music-diary.json`. An entry carries both `lat`/`lng` (for the map) and `collections` (for the playlists); this is what lets them coexist.

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
3. Render filters (search / collection / composer), the map markers (with detail-button popups), and the collection lists from the data — never hard-code entries into HTML.
4. Keep a single shared detail panel used by the map popups and the collection lists; show each entry's collection membership in the detail.
5. Render the sources section from each entry's `source`.
6. Verify locally with a static server or `file://`, then commit.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000/
```
