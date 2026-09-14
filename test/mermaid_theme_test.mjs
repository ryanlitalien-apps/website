// Tests the effectiveTheme() pure function that lives inside
// _includes/mermaid.html, without a build step. The include stays the
// single source of truth: this test extracts the function's source text
// straight out of the include with a regex, evals it, and exercises it.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const includePath = join(__dirname, "..", "_includes", "mermaid.html");
const source = readFileSync(includePath, "utf8");

const match = source.match(/function effectiveTheme[\s\S]*?\n  }/);
assert.ok(match, "expected to find an effectiveTheme function in _includes/mermaid.html");

// eslint-disable-next-line no-eval
const effectiveTheme = eval(`(${match[0]})`);

test("explicit dark wins regardless of OS preference", () => {
  assert.equal(effectiveTheme("dark", false), "dark");
  assert.equal(effectiveTheme("dark", true), "dark");
});

test("explicit light wins regardless of OS preference", () => {
  assert.equal(effectiveTheme("light", true), "light");
  assert.equal(effectiveTheme("light", false), "light");
});

test("no explicit theme and OS prefers dark falls back to dark", () => {
  assert.equal(effectiveTheme(null, true), "dark");
});

test("no explicit theme and OS prefers light falls back to light", () => {
  assert.equal(effectiveTheme(null, false), "light");
});

test("a garbage explicit value falls through to the OS preference", () => {
  assert.equal(effectiveTheme("sepia", true), "dark");
  assert.equal(effectiveTheme("sepia", false), "light");
});
