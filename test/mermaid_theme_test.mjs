// Tests the browser-independent rendering options in _includes/mermaid.html.
// The include remains the single source of truth; this extracts and evaluates
// the small pure function without requiring a DOM or a build step.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const includePath = join(__dirname, "..", "_includes", "mermaid.html");
const source = readFileSync(includePath, "utf8");

const match = source.match(/function diagramOptions[\s\S]*?\n  }/);
assert.ok(match, "expected to find diagramOptions() in _includes/mermaid.html");

// eslint-disable-next-line no-eval
const diagramOptions = eval(`(${match[0]})`);

test("uses the site palette through live CSS properties", () => {
  assert.deepEqual(
    {
      bg: diagramOptions().bg,
      fg: diagramOptions().fg,
      accent: diagramOptions().accent,
      surface: diagramOptions().surface,
      border: diagramOptions().border,
    },
    {
      bg: "var(--mermaid-bg)",
      fg: "var(--mermaid-fg)",
      accent: "var(--mermaid-accent)",
      surface: "var(--mermaid-surface)",
      border: "var(--mermaid-border)",
    },
  );
});

test("uses a roomy ELK layout for dense blog diagrams", () => {
  const options = diagramOptions();
  assert.equal(options.transparent, true);
  assert.equal(options.nodeSpacing, 32);
  assert.equal(options.layerSpacing, 52);
  assert.equal(options.thoroughness, 5);
});

test("pins the beautiful-mermaid browser dependency", () => {
  assert.match(source, /beautiful-mermaid@1\.1\.3\/\+esm/);
});

test("removes renderer font imports so diagrams use the site's font stack", () => {
  const fontMatch = source.match(/function useSiteFont[\s\S]*?\n  }/);
  assert.ok(fontMatch, "expected to find useSiteFont() in _includes/mermaid.html");
  // eslint-disable-next-line no-eval
  const useSiteFont = eval(`(${fontMatch[0]})`);
  const svg = "<style>@import url('https://fonts.googleapis.com/css2?family=Inter&amp;display=swap'); text { color: red; }</style>";
  assert.equal(useSiteFont(svg), "<style>text { color: red; }</style>");
});

test("enlarges SVG marker viewports by 50 percent", () => {
  const arrowMatch = source.match(/function enlargeArrowheads[\s\S]*?\n  }/);
  assert.ok(arrowMatch, "expected to find enlargeArrowheads() in _includes/mermaid.html");
  // eslint-disable-next-line no-eval
  const enlargeArrowheads = eval(`(${arrowMatch[0]})`);
  const marker = '<marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7">';
  assert.equal(
    enlargeArrowheads(marker),
    '<marker id="arrowhead" markerWidth="12" markerHeight="9" viewBox="0 0 8 6" refX="7">',
  );
});
