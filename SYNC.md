# Sync Notes

This repository is the public Agent-Boya framework. It can be developed directly here, while case-study data may come from other repositories such as the Music Diary work.

## Initial publish

```bash
git add .
git commit -m "init: Agent-Boya framework"
git push -u origin claude/gallant-johnson-hqe90
```

## Updating from a case study

When the Music Diary work changes, copy only the reusable data that belongs in Agent-Boya. Do not copy private notes, credentials, local config, or unrelated site assets.

The expected public example file is:

```text
examples/music-diary/music-diary.json
```

Keep it identical to the work's authoritative `data/music-diary.json`. After copying, run:

```bash
node tests/validate.js
```

## Release checklist

- [ ] README reflects the current framework scope.
- [ ] `agent-registry.json` points to existing files.
- [ ] `schemas/music-diary.schema.json` parses as JSON.
- [ ] Example dataset parses and passes validation.
- [ ] Skills contain concise frontmatter and actionable workflows.
- [ ] No secrets, tokens, private `.env` values, or credentials are committed.
- [ ] Harvested sources are citations, not copied portal text.
