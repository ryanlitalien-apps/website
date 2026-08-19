# ryanlitalien.com rebrand plan

**Status:** plan only. No implementation in this PR.
**Written:** 2026-08-14
**Host:** GitHub Pages from `master` root, Route 53 DNS, no CDN in front.

This document is the engineering plan for turning ryanlitalien.com from a Jekyll blog into a consulting site, without breaking the software update server it has quietly been running for nine shipped macOS apps.

---

## Decisions locked

| Decision | Choice |
|---|---|
| Visual register | Mono-terminal. White default, dark toggle. Monospace for nav, labels and numbers; system sans for prose; one accent. |
| Root URL | `/` becomes the consulting page. Apps and writing become secondary sections. |
| Blog | Cleanup pass. All existing post URLs stay live; presentation changes. |
| Stack | Stay on Jekyll and GitHub Pages. Replace the theme, not the generator. |
| Accessibility | First-class feature. WCAG 2.2 AA target, published statement, CI-enforced. |
| Organizing principle | The site is autobiographical in its craft. Each build decision encodes a chapter of the work history. |
| Interactive proof | A live markdown-viewer widget and one more demo. Phase 2, not launch. |
| Brand | A personal mark and palette. Phase 2 or 3. Must not block launch. |

---

## 1. The organizing principle

Each part of the site's craft encodes a chapter of the work history. Personality lives in how the thing is built rather than in decoration, and a visitor experiences the claim instead of reading it.

| Craft decision | Chapter it encodes |
|---|---|
| WCAG 2.2 AA, screen-reader tested, published accessibility statement | HiSoftware, 2009-2012. Compliance monitoring for privacy, accessibility and web quality. |
| Typography and email-grade design polish | Litmus 2017-2019, Constant Contact 2013-2017. |
| A live in-browser markdown viewer widget | ViewerCore and the nine macOS apps. |
| A demo derived from CoachView | A multi-tenant SaaS built and sold: accounts, people, forms, email templates, drip sequences, landing pages, billing, integrations. |
| Mono-terminal register, agentic tooling on display | Current work. MCP servers, Claude Code, ButterStack. |
| Blaze orange, trail markers, summit and Ironman references | 48 New Hampshire four-thousand-footers, two Ironmans, Eagle Scout. |
| The site quietly running a production update server | Perforce. Studio infrastructure at scale. |

If a section cannot be traced to a chapter, it probably should not exist.

---

## 2. The constraint

ryanlitalien.com is not a blog with a downloads page bolted on. It is a **live software update server** with a blog bolted on. Shipped binaries poll these paths on a schedule, and App Store Connect has them registered as listing metadata.

**Frozen. Do not move, rename or redirect:**

| Path | Consumed by | Evidence |
|---|---|---|
| `/appcast.json` | Viewer Toolbox catalog fetch | Hardcoded absolute URL, `AppCatalog.swift:32` |
| `/appcast-toolbox.xml` | Sparkle updater | `SUFeedURL`, `Info.plist:32` |
| `/assets/downloads/*.dmg` | Both feeds, absolute URLs inside | 68 files |
| `/assets/icons/*.png` | `iconUrl` fields in the catalog | 9 files |
| `/site.webmanifest`, favicons, `apple-touch-icon.png` | PWA manifest, browsers | `_includes/header.html` |
| `/simple` (no trailing slash, plus `?utm_*`) | In-app "Website" link | `SettingsView.swift:134` |

The in-app link is baked into shipped binaries, so `/simple` must keep resolving forever even after store metadata is updated.

**Mechanism:** GitHub Pages cannot emit real 301 or 302 status codes. `jekyll-redirect-from` (on the Pages allowlist) emits a meta-refresh page with `rel=canonical` and a JS fallback. That is sufficient here. Real 3xx would require CloudFront or Cloudflare in front of Pages, which is out of scope.

**Caveat:** the plugin's generated page drops the query string, so the `?utm_source=viewer-toolbox` attribution from inside the app would vanish from analytics. Fix is a hand-written stub for that one path preserving `location.search` and `location.hash`. Spec in section 8.

---

## 3. Target URL map

```
PAGES
/                        Consulting page. Single page, sectioned.
/apps/                   Viewer suite index. Rewritten from simple.md. Hosts the markdown widget.
/writing/                Curated essay feed.
/about/                  Bio, mountains, Ironman, Eagle Scout, race reports.
/privacy/                Canonical privacy policy.
/accessibility/          Accessibility statement.
/2014/06/25/...          All 12 real post URLs unchanged. Zero redirects.

REDIRECTS
/simple  /simple/        Hand-written stub to /apps/, preserves query and hash. PERMANENT.
/author.html             jekyll-redirect-from to /about/
/simple/privacy/         Real page through one release cycle after App Store Connect is
                         updated, then becomes a redirect to /privacy/.

FROZEN
/appcast.json  /appcast-toolbox.xml  /assets/downloads/*  /assets/icons/*

DELETED
/CLAUDE.md  /CLAUDE.html  /README.md      currently served publicly, all return 200
/2026/04/09/placeholder.html               delete the post file
```

Nav: `[x] Work` / `[ ] Apps` / `[ ] Writing` / `[ ] About`. See section 4 for making that metaphor screen-reader safe.

---

## 4. Accessibility as a feature

Almost no consulting site is accessible, and it is a hard procurement gate for enterprise, education, healthcare and public-sector buyers. It is also the one differentiator here that is genuinely difficult to fake.

### Target

**WCAG 2.2 Level AA in full.** Level AAA where the palette gives it for free (body text at 18.9:1 is already AAA). Do not claim AAA globally: the accent at 5.07:1 is AA, and an overclaim on an accessibility statement is worse than a modest one.

### Non-negotiables

- Semantic landmarks: one `<header>`, `<nav>`, `<main>`, `<footer>`. Exactly one `h1` per page. No skipped heading levels.
- Skip-to-content link, visible on focus, first in tab order.
- Full keyboard operability. Visible focus ring, 2px accent at 3px offset, on every interactive element. No keyboard traps, no positive `tabindex`.
- Color is never the only carrier of meaning. Links get underlines, not just accent color.
- `prefers-reduced-motion: reduce` honored.
- Every image has considered alt text. Decorative images get `alt=""`, never a filename.
- Contrast documented per token pair, not asserted.

### The bracket-nav trap

The `[x]` / `[ ]` nav metaphor is the most likely accessibility bug on this site. Rendered naively a screen reader announces "left bracket x right bracket Work", which is noise.

- Brackets are CSS `::before` generated content, never DOM text.
- The active link carries `aria-current="page"`, which is what actually announces state.
- Some screen readers do announce generated content, so verify with VoiceOver rather than assuming. If it leaks, move the brackets into a `<span aria-hidden="true">` inside the link.

### Interactive widgets inherit the bar

The markdown viewer and the second demo are the highest-risk surfaces. Each needs keyboard operation, a labeled control for every input, `aria-live="polite"` on the output region, and a meaningful experience with JavaScript disabled. **A widget that cannot meet this bar does not ship.**

### Testing

- Manual: VoiceOver on macOS in Safari and Chrome, keyboard only. Zoom to 200% and 400% reflow.
- Automated: `axe-core` plus Lighthouse in GitHub Actions on every PR. `pa11y-ci` is the simplest runner for a static Jekyll build.
- Automated tooling catches roughly a third of real issues; the manual pass is the one that counts.

### `/accessibility/`

A real statement: conformance target, what is verified, **what is not yet conformant**, how to report a problem, and the date last tested. The admission of gaps is what makes it credible. Linked from the footer of every page.

---

## 5. Interactive proof

Rules: each widget traces to a chapter in section 1, meets the accessibility bar in section 4, degrades gracefully, and stays small. **Maximum two.**

### Widget 1: live markdown viewer, on `/apps/`

An in-browser miniature of MarkdownViewer. Paste or type markdown, see rendered output, with the app's affordances echoed: view/edit toggle, copy-as-rich-text, dark mode following the site theme.

It is simultaneously a portfolio piece, a product demo for something on sale, and an argument for the whole suite. A visitor who plays with it for ten seconds understands the product without reading the page.

Constraints: no CDN dependency. Either a small hand-rolled subset renderer or a vendored self-hosted parser. Sanitize output, since the widget takes untrusted input. `aria-live="polite"` on the preview pane, labeled textarea, keyboard-reachable toggle.

### Widget 2: a CoachView-derived sequence builder

CoachView was a multi-tenant coaching SaaS (Rails, roughly 2018-2020) with accounts, people, forms, form templates, email templates, drip sequences with steps, landing pages, tasks, activities, billing providers and integrations.

The demo worth building is the **sequence builder**: a few reorderable steps, each with a delay and an email template, showing the drip fire order. It encodes the email chapters and the founder chapter at once.

Accessibility note: drag-and-drop is a classic WCAG 2.2 failure (SC 2.5.7, Dragging Movements). Every reorder needs a keyboard equivalent, for example up and down buttons per step. Doing that correctly is itself the demonstration.

**Alternative if CoachView proves fiddly:** an interactive partner-integration architecture diagram where focusing a node reveals the failure mode. Lower charm, higher sales relevance. Decide in Phase 2.

Both are **Phase 2**. Neither may delay Phase 0.

---

## 6. Brand system

Structurally, the reference model is initials plus a number that means something, one tight palette used with total consistency, and a wordmark that works from favicon to banner. Important split: that kind of mark belongs to a product brand, while consulting sells the person. **The mark supports the name, it does not replace it.**

Wordmark is `RYAN L'ITALIEN` in the mono face. The monogram is the compact mark for favicon, avatar, sticker and banner.

### Candidate marks

| Mark | Meaning | Read |
|---|---|---|
| **RL48** | The 48 New Hampshire four-thousand-footers | Numeric, personal, outdoorsy, unclaimed, explains itself in one sentence. **Recommended.** |
| RL140.6 | Full Ironman distance | Too long, reads triathlon-only, and the distance is shared rather than personal. |
| RLI | Plain monogram | Clean, says nothing. |

RL48 shares a hook with the palette already chosen: blaze orange is trail-marker orange and 48 is a hiking number, so the brand and the site palette become one decision.

**Deliverables:** monogram SVG light and dark, favicon set, banner, avatar, a one-page brand sheet with palette, type and usage rules.

**Sequence: Phase 2 or 3.** The site ships fine with a mono wordmark. A personal mark earns its keep when there is an audience to be consistent for.

---

## 7. Design system

### Tokens

```
LIGHT (default)              DARK (toggle)
ground    #FFFFFF            #0D0D0F
surface   #FAF9F8            #16161A
text      #111110            #EDEBE8
muted     #6B6764            #99948E
rule      #E5E2DF            #26262B
accent    #D9480F            #FF7A45
```

Blaze orange rather than the default consultant blue: trail-marker and hunter-orange, so it carries the outdoors without a photograph. Neutrals carry a slight warm bias toward the accent rather than sitting on pure grey.

Documented contrast for the accessibility statement: body text 18.9:1 light and roughly 15.9:1 dark, both AAA. Accent on ground 5.07:1 light and roughly 6.7:1 dark, both AA for normal text. Muted on ground 5.4:1 light, AA. Publish the numbers rather than asserting conformance.

### Type

- **Mono** for nav, section labels, stat numbers, buttons. Self-hosted JetBrains Mono, latin subset, two weights, about 35 KB. Self-hosted because the site currently pulls a Google Font and a FontAwesome CDN on every page, and the product story is "native, 2 MB, no telemetry".
- **System sans** for prose. Zero bytes, renders native. Long copy in monospace is a readability tax.

### Layout

Content column 720px. Left rail 190px, sticky, at 900px and up; top bar below. Hairline rules, not cards or shadows. Boxed mono-caps buttons, one primary call to action per screen.

### The one playful element

The three-state theme toggle in the rail. Persisted, no flash on load. **Do not add a second gimmick.** The interactive widgets are proof, not personality.

---

## 8. Writing cleanup

All 12 real post URLs stay live. What changes is what gets surfaced where. Add a `section:` field to front matter and drive presentation off it.

| Posts | `section:` | Surfaced at |
|---|---|---|
| Two 2014 Ironman race reports | `race` | `/about/`, not the writing feed |
| Four 2025 app launch notes | `release` | `/apps/` release notes |
| Six 2012-2015 dev tips | `archive` | "Earlier writing" list at the foot of `/writing/` |

Archive intro line: *"Short technical notes from 2012 to 2015, back when a blog post could be four lines. Left up because that is where the habit started."*

Delete `_posts/2025-12-15-placeholder.md`.

`/writing/` launches nearly empty, which is honest and better than a feed topped by a 2015 Handlebars tip. Seed essays, each doubling as proof:

1. **What actually changes when you build with agents.** The concrete workflow and where it stops paying off.
2. **The partner integration nobody owns.** The expensive problem, named.
3. **Nine macOS apps and a shared core.** The ViewerCore story.
4. **Building an accessible site, and why it traces back to 2009.** The section 1 principle made explicit; natural companion to `/accessibility/`.

Add `jekyll-feed`. There is no RSS today.

---

## 9. Implementation

### Stack: stay on Jekyll and GitHub Pages

The site is an update server with binding absolute URLs and an App Store metadata dependency. Migration risks all of that to gain nothing a static site needs. **The theme is what has to go, not the generator.** Pages already allowlists `jekyll-seo-tag`, `jekyll-redirect-from` and `jekyll-feed`.

### Delete

`assets/css/bootstrap.min.css` (151 KB), `assets/css/mediumish.css`, the FontAwesome and Google Fonts CDN links in `_includes/header.html`, `assets/img/demopic/`, `_posts/2025-12-15-placeholder.md`, `theme: jekyll-theme-minimal` from config, and the stock hero photo `trail-running-medium-narrow.png`.

### Add

```
_config.yml            plugins: jekyll-seo-tag, jekyll-redirect-from, jekyll-feed
                       exclude: [CLAUDE.md, README.md, docs, Gemfile, Gemfile.lock, .idea, .claude]
_data/proof.yml        proof blocks
_data/engagements.yml  the offers
_data/faq.yml          FAQ entries
_data/stats.yml        proof-bar numbers
_data/apps.yml         viewer suite metadata for /apps/
_data/contact.yml      booking url + email, single source
_includes/head.html    meta, theme-init script, css link
_includes/nav.html     the rail, aria-current, skip link target
_includes/footer.html  rewritten, links /accessibility/ and /privacy/
_includes/privacy.html policy body, rendered at two URLs
_layouts/base.html     replaces default.html
_layouts/page.html
_layouts/post.html     rewritten
assets/css/site.css    hand-written, ~350 lines
assets/fonts/          JetBrains Mono 400/700 woff2, latin subset
assets/js/theme.js     three-state toggle
assets/js/md-demo.js   Phase 2 widget
index.md  apps.md  writing.md  about.md  privacy.md  accessibility.md
simple.md              redirect stub
simple-privacy.md      permalink /simple/privacy/
404.html               restyled
.github/workflows/a11y.yml   pa11y-ci or axe on every PR
```

### The `/simple` redirect stub

Hand-written rather than the plugin, so the in-app UTM survives:

```html
---
permalink: /simple/
sitemap: false
---
<!-- Shipped Viewer Toolbox builds link here with ?utm_source=viewer-toolbox.
     Preserve query + hash so analytics attribution survives. -->
<link rel="canonical" href="https://www.ryanlitalien.com/apps/">
<script>location.replace('/apps/' + location.search + location.hash);</script>
<meta http-equiv="refresh" content="0;url=/apps/">
<p>Moved to <a href="/apps/">ryanlitalien.com/apps</a>.</p>
```

### Two bugs found while surveying

1. **Every page has the same `<title>`.** `_includes/header.html` emits `{% seo %}` then a hardcoded `<title>{{ site.title }}</title>` immediately after, which wins. All 20 pages currently title as "ryanlitalien.com".
2. **`CLAUDE.md`, `CLAUDE.html` and `README.md` are publicly served**, all verified returning 200. Benign content, but it is repo exhaust. The `exclude:` above fixes it.

---

## 10. App Store Connect and Gumroad

All Viewer Toolbox listing URLs currently point at `https://www.ryanlitalien.com/simple/`, with the privacy URL at `https://www.ryanlitalien.com/simple/privacy/`. Those will be updated.

**Sequence, in this order:**

1. Ship `/apps/` and `/privacy/` as real, live pages (Phase 1).
2. Verify both render and are linked from the nav.
3. Update App Store Connect: Marketing and Support URLs to `/apps/`, Privacy Policy URL to `/privacy/`.
4. Update the Gumroad product page links.
5. Keep `/simple/privacy/` as a real page through one full release cycle as a safety net, then convert to a redirect.
6. Keep `/simple` and `/simple/` redirecting forever. The in-app link is baked into shipped binaries.

Never update store metadata before step 2. A privacy URL that 404s during review is a rejection.

---

## 11. Build order

### Phase 0, 2-3 hours: the page exists

Stylesheet with tokens, rail and theme toggle. Base layout and includes. Data files. `index.md` as the full page. Config cleanup, exclude list, duplicate-title fix. Skip link, landmarks, focus states and `aria-current` from the start, because retrofitting accessibility is how it never happens.

Everything else stays as it is.

### Phase 1, weekend: the rest catches up

`/apps/` data-driven. The `/simple/` stub. `/privacy/` canonical plus the App Store mirror. `/about/`. `/writing/` with the section split. `/accessibility/` written. Post layout, 404, `/author.html` redirect. Delete Bootstrap, mediumish, the CDNs, the placeholder post. Manual VoiceOver and keyboard pass. Then the store and Gumroad updates in section 10.

### Phase 2, next week: proof and identity

Markdown viewer widget. Booking link wired. Custom-domain email with send-as, SPF, DKIM and DMARC. First seed essay. Brand mark and sheet. CI accessibility check.

### Phase 3, ongoing

Remaining essays. The second widget. `butterstack.com/consulting` clones this template, then `butterstack.com/aws` clones that. Keep layouts and data files separate so a clone is a content swap rather than a rewrite.

---

## 12. Post-deploy check

```
/appcast.json
/appcast-toolbox.xml
/assets/downloads/ViewerToolbox.dmg
/assets/downloads/MarkdownViewer.dmg
/assets/icons/md-viewer.png
/simple                      lands on /apps/ with query preserved
/simple/privacy/             renders the policy
/2014/08/25/Race-Report-Ironman-Mont-Tremblant-1406.html
/site.webmanifest
```

Then open Viewer Toolbox and confirm it still sees the catalog and the update feed. That is the only test that actually matters.

---

## 13. What this deliberately does not do

- **No migration off Jekyll or GitHub Pages.** The update server makes migration risk asymmetric.
- **No ButterStack pages.** They clone from this once it exists.
- **No CMS, newsletter, lead magnet or resource center.**
- **No third interactive widget.** Two is the cap.
