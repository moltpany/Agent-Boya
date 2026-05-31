---
name: portal-source-harvester
description: Gather citable, source-grounded facts about musical works from authoritative composer portals, official institutions, and reference encyclopedias. Use when researching a new work before writing a Music Diary entry, or when upgrading an existing entry's source to an official portal. Produces candidate entries with verified year, place, and a source label/url/summary — never full-text copies of the portal.
---

# Portal Source Harvester

This is Boya's defining skill. Use it to turn authoritative music websites into **citations**, not into copied prose.

## What counts as an authoritative source

Prefer, roughly in this order:

1. Composer-specific official institutions and portals, e.g.
   - Narodowy Instytut Fryderyka Chopina (Chopin, `chopin.nifc.pl`)
   - The Mozart Portal / Salzburg.info (Mozart)
   - Schubert online, Wiener Schubertbund (Schubert)
   - Official Liszt / Wagner / Brahms societies and research centres
2. Opera houses' official repertoire/premiere pages (La Scala, La Fenice, Teatro Costanzi, Semperoper, etc.)
3. IMSLP for scores, dates, and edition history
4. Reputable encyclopedias (Britannica, Wikipedia) as a **starting point** with stable URLs

## Hard rules

- **Do not copy portal body text.** Take the *facts* (title, catalogue number, year, place, premiere, dedication) and your own concise summary. Quote at most a short phrase, attributed.
- **Do not invent.** If a year, place, dedication, or "love letter" intention is uncertain or disputed, say so and use conservative wording.
- Record where the fact came from: every harvested fact maps to a `source.label`, `source.url`, and a short `source.summary`.
- When the composing location and the premiere location differ, capture both and note which one the map entry will use.
- Respect copyright and each site's terms; collect references, not reproductions.

## Workflow

1. Identify the work and what is already known (title, composer, catalogue).
2. Search authoritative sources; confirm year, place, premiere, and any love/relationship context.
3. Cross-check at least the year and place against a second source when the first is not an official institution.
4. Draft a candidate entry: `year`, `city`, `country`, `lat`, `lng`, and a `source` object.
5. Flag uncertainty explicitly (e.g. "premiere venue confirmed; composing location city-level only").
6. Hand the candidate to `source-grounded-entry-writer` for final wording and theme assignment.

## Output

A candidate entry (or list of them) ready for review, each carrying a verifiable `source` and an honest uncertainty note. Log open questions in the project's `content-audit.md`.
