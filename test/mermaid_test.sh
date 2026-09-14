#!/usr/bin/env bash
# Basic build test for the mermaid include: verifies that a post opting in
# with `mermaid: true` gets the mermaid module + rendered code block, that a
# post without the flag does not get the module, and that a real existing
# post (none of which opt in today) is unaffected.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

TMP_DIR="$(mktemp -d)"
# On macOS /tmp is itself a symlink to /private/tmp; Jekyll's safe-mode
# include resolution trips over that mismatch and fails to locate real
# includes. Resolve to the real path up front so the build sees one
# consistent, non-symlinked source directory.
TMP_DIR="$(cd "$TMP_DIR" && pwd -P)"
trap 'rm -rf "$TMP_DIR"' EXIT

FAILED=0

pass() { echo "PASS: $1"; }
fail() { echo "FAIL: $1"; FAILED=1; }

# 1. Copy the site source into a temp dir, excluding generated/ignored dirs.
rsync -a \
  --exclude '_site' \
  --exclude '_drafts' \
  --exclude '.git' \
  ./ "$TMP_DIR/"

# 2. Write fixture posts into the temp copy's _posts/.
mkdir -p "$TMP_DIR/_posts"

cat > "$TMP_DIR/_posts/2020-01-01-mermaid-on.md" <<'EOF'
---
layout: post
title: "Mermaid on"
published_at: 2020-01-01
mermaid: true
tags:
  - Technology
---

A diagram, opted in.

```mermaid
graph TD; A-->B;
```
EOF

cat > "$TMP_DIR/_posts/2020-01-01-mermaid-off.md" <<'EOF'
---
layout: post
title: "Mermaid off"
published_at: 2020-01-01
tags:
  - Technology
---

A fenced block, not opted in.

```mermaid
graph TD; A-->B;
```
EOF

# 3. Build the temp site.
NEWEST_REAL_POST="$(ls -t "$REPO_ROOT"/_posts/*.md | head -1)"
NEWEST_REAL_SLUG="$(basename "$NEWEST_REAL_POST" .md)"

BUNDLE_GEMFILE="$REPO_ROOT/Gemfile" bundle exec jekyll build -s "$TMP_DIR" -d "$TMP_DIR/_site"

ON_HTML="$TMP_DIR/_site/posts/mermaid-on/index.html"
OFF_HTML="$TMP_DIR/_site/posts/mermaid-off/index.html"
NEWEST_REAL_TITLE="$(echo "$NEWEST_REAL_SLUG" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')"
REAL_HTML="$(find "$TMP_DIR/_site/posts" -ipath "*${NEWEST_REAL_TITLE}*index.html" | head -1)"

if [[ ! -f "$ON_HTML" ]]; then
  fail "mermaid-on post built an index.html at $ON_HTML"
else
  pass "mermaid-on post built an index.html"
fi

if [[ ! -f "$OFF_HTML" ]]; then
  fail "mermaid-off post built an index.html at $OFF_HTML"
else
  pass "mermaid-off post built an index.html"
fi

if [[ -z "$REAL_HTML" || ! -f "$REAL_HTML" ]]; then
  fail "found a built index.html for the newest real post ($NEWEST_REAL_SLUG)"
else
  pass "found a built index.html for the newest real post ($NEWEST_REAL_SLUG)"
fi

# 4. Assertions on the opt-in post.
if [[ -f "$ON_HTML" ]]; then
  if grep -q "mermaid.esm.min.mjs" "$ON_HTML"; then
    pass "opt-in post includes the mermaid module import"
  else
    fail "opt-in post includes the mermaid module import"
  fi

  if grep -q 'code class="language-mermaid"' "$ON_HTML"; then
    pass "opt-in post includes code class=\"language-mermaid\""
  else
    fail "opt-in post includes code class=\"language-mermaid\""
  fi
fi

# 5. Assertions on the opt-out post.
if [[ -f "$OFF_HTML" ]]; then
  if grep -q "language-mermaid" "$OFF_HTML"; then
    pass "opt-out post still has the fenced mermaid code block"
  else
    fail "opt-out post still has the fenced mermaid code block"
  fi

  if grep -q "mermaid.esm.min.mjs" "$OFF_HTML"; then
    fail "opt-out post does NOT include the mermaid module import"
  else
    pass "opt-out post does NOT include the mermaid module import"
  fi
fi

# 6. Assertion on a real, unrelated, already-published post.
if [[ -n "$REAL_HTML" && -f "$REAL_HTML" ]]; then
  if grep -q "mermaid.esm.min.mjs" "$REAL_HTML"; then
    fail "existing real post ($NEWEST_REAL_SLUG) does NOT include the mermaid module import"
  else
    pass "existing real post ($NEWEST_REAL_SLUG) does NOT include the mermaid module import"
  fi
fi

if [[ "$FAILED" -ne 0 ]]; then
  echo "One or more assertions failed."
  exit 1
fi

echo "All mermaid build assertions passed."
