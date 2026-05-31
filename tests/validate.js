const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function validateRequiredFiles() {
  for (const file of ["README.md", "SYNC.md", "LICENSE", ".gitignore"]) {
    assert(exists(file), `${file} should exist`);
  }
}

function validateRegistry() {
  const registry = readJson("agent-registry.json");
  assert(registry.repository === "Agent-Boya", "registry should identify Agent-Boya");
  assert(Array.isArray(registry.skills) && registry.skills.length === 3, "registry should list three starter skills");
  for (const skill of registry.skills) {
    assert(skill.id && skill.file && exists(skill.file), `${skill.id} should point to an existing skill file`);
    assert(Array.isArray(skill.triggers) && skill.triggers.length > 0, `${skill.id} should include trigger phrases`);
  }
  assert(Array.isArray(registry.examples) && registry.examples.length >= 1, "registry should include at least one example");
  for (const example of registry.examples) {
    assert(example.file && exists(example.file), `${example.id} should point to an existing example file`);
  }
  assert(Array.isArray(registry.schemas) && registry.schemas.length >= 1, "registry should list at least one schema");
  for (const schema of registry.schemas) {
    assert(schema.file && exists(schema.file), `${schema.id} should point to an existing schema file`);
  }
}

function validateSchema() {
  const schema = readJson("schemas/music-diary.schema.json");
  assert(schema.type === "object", "music diary schema should validate an object");
  assert(Array.isArray(schema.required) && schema.required.includes("collections") && schema.required.includes("entries"),
    "schema should require collections and entries");
  const entryRequired = schema.properties.entries.items.required;
  for (const field of ["id", "title", "work", "composer", "year", "city", "country", "lat", "lng", "collections", "blurb", "background", "meaning", "source"]) {
    assert(entryRequired.includes(field), `schema entries should require ${field}`);
  }
}

function validateMusicDiaryExample() {
  const data = readJson("examples/music-diary/music-diary.json");
  assert(data && typeof data === "object" && !Array.isArray(data), "Music Diary example should be an object");
  assert(Array.isArray(data.collections) && data.collections.length >= 1, "example should define at least one collection");
  assert(Array.isArray(data.entries) && data.entries.length >= 12, "example should include a substantial dataset");

  const collectionIds = new Set(data.collections.map((c) => c.id));
  for (const collection of data.collections) {
    assert(collection.id && collection.title, `collection should include id and title: ${collection.id}`);
  }

  const ids = new Set();
  for (const entry of data.entries) {
    assert(entry.id && !ids.has(entry.id), `entry id should be unique: ${entry.id}`);
    ids.add(entry.id);
    for (const field of ["title", "work", "composer", "year", "city", "country", "lat", "lng", "blurb", "background", "meaning"]) {
      assert(entry[field] !== undefined && entry[field] !== "", `${entry.id} should include ${field}`);
    }
    assert(Number.isInteger(entry.year), `${entry.id} year should be an integer`);
    assert(typeof entry.lat === "number" && entry.lat >= -90 && entry.lat <= 90, `${entry.id} should include valid latitude`);
    assert(typeof entry.lng === "number" && entry.lng >= -180 && entry.lng <= 180, `${entry.id} should include valid longitude`);
    assert(Array.isArray(entry.collections) && entry.collections.length >= 1, `${entry.id} should belong to at least one collection`);
    for (const cid of entry.collections) {
      assert(collectionIds.has(cid), `${entry.id} references undefined collection: ${cid}`);
    }
    assert(entry.source && entry.source.label && entry.source.url && entry.source.summary,
      `${entry.id} should include source label, url, and summary`);
    if (entry.place !== undefined) {
      const pl = entry.place;
      assert(pl && pl.name && pl.address && pl.certainty && pl.note,
        `${entry.id} place should include name, address, certainty, and note`);
      assert(pl.source && pl.source.label && pl.source.url,
        `${entry.id} place should include a source label and url`);
    }
    if (entry.sources !== undefined) {
      assert(Array.isArray(entry.sources) && entry.sources.length >= 1, `${entry.id} sources should be a non-empty array`);
      for (const s of entry.sources) {
        assert(s && s.label && s.url && s.summary, `${entry.id} each source should include label, url, and summary`);
      }
    }
  }
}

function validateSkills() {
  const skillPaths = [
    "skills/portal-source-harvester/SKILL.md",
    "skills/source-grounded-entry-writer/SKILL.md",
    "skills/dual-view-site-builder/SKILL.md",
  ];
  for (const skillPath of skillPaths) {
    const text = fs.readFileSync(path.join(root, skillPath), "utf8");
    assert(text.startsWith("---\n"), `${skillPath} should start with YAML frontmatter`);
    assert(text.includes("\nname:"), `${skillPath} should include a name`);
    assert(text.includes("\ndescription:"), `${skillPath} should include a description`);
  }
}

const tests = [
  validateRequiredFiles,
  validateRegistry,
  validateSchema,
  validateMusicDiaryExample,
  validateSkills,
];

for (const test of tests) {
  test();
  console.log(`PASS ${test.name}`);
}
