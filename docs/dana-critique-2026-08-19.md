# Design critique: ryanlitalien.com

**Design Score: 14/20 applicable (70%) — Polish**

Reviewed live at http://127.0.0.1:4400/ on 2026-08-19: `/`, `/personal/`, `/about/`, `/posts/`, `/posts/what-is-virtual-production/`, `/404.html`. Desktop 1440x900 and mobile 390x844 in both themes on every page; wide 1900x950 on the homepage only, per the brief's instruction to spend depth there. Reversibility, Forgiveness, and Escape are marked N/A: this is a static marketing site with no forms, no destructive actions, and no modals or multi-step flows to escape from.

| Principle | Score | Why |
|---|---|---|
| Persistence | 4/4 | Theme choice survives reload via localStorage, degrades gracefully without it, no flash on load. |
| Transparency | 3/4 | Current-page nav state, synced aria-pressed theme buttons, labeled new-tab links on the dock. |
| Consistency | 2/4 | Same destination (LinkedIn, GitHub) behaves differently depending on which part of the page you click it from. |
| Craft | 2/4 | Real strengths (focus rings, skip link, reduced-motion, documented contrast) sit next to two verified, high-cost bugs. |
| Recognition | 3/4 | Nav location always legible; FAQ answers visible without an extra click. |

14 of 20 applicable points. Polish band (68-86%): shippable, but two of the findings below sit on the site's actual conversion path, not in a corner nobody visits.

## Context

This is Ryan's personal site, a fractional-CTO/forward-deployed-engineer pitch aimed at fintech and game-studio buyers, with one job: get a 20-minute call booked. Production-close, pre-launch. The visitor is a skeptical, time-pressured evaluator (a referral or a LinkedIn click) giving the page well under a minute before deciding whether it's worth a call. Getting this wrong costs the thing the whole site exists to produce: a booked call that never gets booked, because something silently didn't work.

## First Impressions

Confident and quiet, exactly the Swiss-grotesque register the brief describes. Real proof (`$21M`, `$1M ARR`, `3x`, `20+ yrs`) lands before any pitch language, which reads as someone who doesn't need to perform confidence. The hero, the card system, the hairline rules, the mono-caps buttons, all of it feels like one hand. Nothing about a first glance suggests a problem. Two things puncture that on actual interaction rather than a look: the floating dock, the site's one deliberately playful element, sits directly on top of real content at both ends of the device spectrum instead of floating cleanly above it, and one of the six pages reviewed silently breaks its own layout on mobile. Neither is visible from the hero. Both surface the moment a real visitor scrolls or taps.

## Findings

### Visual Composition

Color is disciplined: ground, surface, text, muted, rule, and one accent, six tokens doing all the work, and the accent never means anything but action or emphasis. Type carries one clear hero size (the 2.1rem h1) against body copy and mono-caps labels; h2 through h6 falling to browser defaults is a known, deliberate call and reads as fine in practice, since nothing above h1 ever needs to compete with it. Depth is a single consistent strategy: hairline borders, flat surfaces, one shadow reserved for the dock. This all holds up in both themes and at all three widths checked.

**Opening: the "Selected work" screenshots fight the dark theme.** Five of the nine project-card images across `/` and `/personal/` are light-UI app screenshots (the homepage's Viewer suite card; four of six on `/personal/`: Simple apps, FirstChair, CoachView, AI org chart) sitting inside a near-black `#0D0F0E` page. Each one reads as a stray bright rectangle rather than a framed screenshot, because the two cards that happen to be dark-native (Pilot Light, the AIDA icon) look completely at home while the light ones don't. The `.work-card > img` treatment (hairline border, surface-color letterboxing) is already doing real work here; it just can't fully compensate for five different competing app-chrome colors sitting in a page that otherwise only has one hue. A subtle frame or duotone treatment behind the light screenshots would fold them back into the family instead of asking the reader's eye to context-switch five times per page.

### Interface Composition

Entry point is unambiguous on every page: one H1, one primary CTA in accent green, one outlined secondary. No dead ends; "Get in touch" repeats at the top and bottom of every conversion-relevant page with the same two buttons in the same order.

**Structural: the dock sits on top of the content it's supposed to float above.** Verified two ways.

On the About page at 1440x900, `document.elementFromPoint()` at a coordinate 10px inside the right edge of the `ryan@ryanlitalien.com` secondary CTA button returns the dock's LinkedIn icon, not the button. The button's box runs x:453.7 to 670.5 (217px wide); the dock's box runs x:590.5 to 849.5. The overlap is real geometry, about 80px, roughly 37% of the button's clickable width, and it happens with zero scrolling: About is short enough that its final CTA row rests inside the dock's fixed footprint at natural page-load position. A visitor who aims for the right third of that button doesn't get an error and doesn't get silence; they get LinkedIn, or the theme toggle, with no indication anything went wrong. I checked whether the homepage's own "Get in touch" section has the same problem at full scroll: it doesn't, because the homepage has enough trailing content (and the 96px reserved bottom padding) to clear the dock. About doesn't have that luxury given how short it is.

On the homepage at true 390x844 mobile, the same dock (fixed at viewport-bottom, y:768-820) overlaps the bottom edge of the first Proof stat row at initial load, no scroll required: the `$21M` and `$1M ARR` labels ("largest multi-year renewal negotiated" / "year-one revenue on a product I created and launched") sit partly under it. This is the page's credibility proof, the thing meant to land before the pitch copy, and on a phone it's partially covered before the visitor does anything.

Neither instance is a case against the dock itself, which is a nice idea and works cleanly everywhere it doesn't collide. The fix is scroll- or content-aware clearance (a bottom-padding reservation that accounts for the dock's real footprint on short pages, or a dock that steps aside near an interactive element) rather than a fixed 96px assumption that only happens to work on the longer pages.

### Interaction

**Persistence is a genuine strength.** The theme control is the only stateful thing on this site and it's done right: a real click on the dark button sets `data-theme`, writes `localStorage`, and syncs `aria-pressed` across all three buttons in one pass; the inline head script blocks paint until the stored choice is read, so there's no flash; a `try/catch` around storage means private-mode visitors still get a working (if session-only) toggle. This is more careful than most static sites bother to be.

**🔴 Structural: a legacy video embed breaks the entire mobile layout of one post.** `/posts/what-is-virtual-production/` carries a raw `<iframe width="854" height="480" src="youtube.com/embed/...">` (see `_posts/2021-09-22-what-is-virtual-production.md:32`). `.pitch img` gets `max-width: 100%`; nothing in site.css touches `iframe`. At a true 390px mobile viewport the post's own text column measures 342px wide, but the iframe's computed width stays 854px, an HTML attribute no media query touches. The result isn't a clipped video, it's the whole layout viewport ballooning to fit it (`window.innerWidth` measured 878 instead of 390 after reload), so the entire post, headline included, renders zoomed out with a horizontal scrollbar. I confirmed via a real network request that the YouTube embed itself loads fine (200, and it paints a real thumbnail at desktop width once I scrolled a genuine viewport screenshot to it rather than trusting a full-page capture), so this isn't a network or blocked-embed problem, it's a missing responsive wrapper on one specific element type. Worth a quick check of the pre-2021 republished Perforce posts for the same raw-iframe pattern, since this one came from that batch.

**🟡 Consistency: LinkedIn and GitHub behave differently depending on where you click them.** The dock's links (`_layouts/base.html:40-45`) carry `target="_blank" rel="noopener"` and an "opens in a new tab" aria-label. The footer's links to the same two URLs (`_includes/site-footer.html`) carry neither, same tab, no label. Same destination, two different click experiences depending on which part of the page a visitor happens to use, which is a small thing until someone loses their place on the pitch page because a same-tab LinkedIn link navigated them away from it.

**Recognition holds up well.** The nav's `aria-current="page"` plus accent underline makes location legible on every page I checked (confirmed correctly switching across Work/Personal/About). The FAQ renders every answer already expanded (`open` is hardcoded per item in `index.md`), and the `+`/`−` glyph correctly tracks that expanded state, so nothing here asks a returning visitor to remember where an answer was.

### Craft

The foundational layer is genuinely careful: visible focus rings on every interactive element, a working skip link, `prefers-reduced-motion` respected globally, and contrast ratios documented and computed in the CSS file's own header comments (body 18.8:1/16.5:1, accent 6.8:1/7.1:1, muted 6.1:1/7.0:1) rather than eyeballed. That's staff-level discipline that most marketing sites skip.

Two paper cuts sit next to that strength. The video embed on the virtual-production post gets none of the framing `.post-content img` gets elsewhere (no border, no `space-4` margin rhythm), so once the responsive issue above is fixed, it's still going to look bolted on rather than part of the same photo/media system as every other image in the archive. And the `/posts/` list mixes pre-2021 personal dev-notes ("AWS EC2 disk on Linux confusion," "LinkedIn/Facebook loading issue using jQuery Mobile," "This site was built with hubpress.io") into the same flat, undated-feeling list as the professional thought-leadership pieces a fintech buyer would actually want to read. That may be intentional archive completeness rather than an oversight; worth confirming rather than asserting, since "writing from 2012 to now" is stated as the page's own framing.

One methodology note: while testing the mobile breakpoint I found the rail headshot rendering (and colliding with the nav text) below the 900px point where `.rail-photo { display: none }` should hide it. I ran this down hard, a fresh CSS probe unrelated to the site's own stylesheet, a sibling rule in the identical `@media` block (`.rail-id`'s flex-direction) that correctly resolves to mobile values in the same pass, a clean isolated tab, and proper device emulation, and the `.rail-photo` rule alone still contradicts its own media query while everything else in that exact block doesn't. That's not something a real CSS cascade can do; it's the kind of automation-browser artifact flagged in my brief. Not reported as a site finding.

### Consistency

Outside the LinkedIn/GitHub link-target gap above, this site is unusually consistent for something spanning six page types: the same button system, the same card system, the same hairline-rule section dividers, and the same nav pattern hold across every page and both themes I checked. Nothing here reads as assembled from different kits.

### Flow Coherence

This is closer to a set of independent pages than a flow, so most of the flow-specific checks don't apply, but the ones that do hold up: the nav's current-page state means a visitor always knows where they are, and even the 404 offers two concrete ways back in (Go home, All posts) rather than a dead end.

## User Context

The visitor is evaluative and short on patience: they're deciding, in well under a minute, whether this person is worth 20 minutes of their calendar. The page mostly respects that: proof before pitch, no forced scrolling, FAQ answers already open so nothing needs a second click to reveal. The two 🔴 findings above work directly against that state, though, and land on exactly the two paths meant to convert this visitor: the homepage's credibility numbers on a phone, and the About page's own secondary call-to-action. A skeptical visitor who taps in the wrong third of a button and gets LinkedIn instead of an email compose window doesn't file a bug report; they just leave with a slightly worse opinion of the "I ship, not just advise" claim two paragraphs above it.

## Top Opportunities

1. **Give the dock content-aware clearance.** One fix, `padding-bottom` that accounts for the dock's real footprint on short pages (About) rather than a fixed 96px that only clears the longer ones, plus checking the mobile stat-bar's rest position. This is the highest-leverage item because it touches both the money page's mobile first paint and the About page's own conversion button.
2. **Fix the mobile iframe overflow on the virtual-production post**, and sweep the other pre-2021 republished posts for the same raw-embed pattern before it ships as a general "any post with a video breaks on a phone" problem instead of a one-off.
3. **Fold the light-UI screenshots into the dark theme's family** with a consistent frame or duotone treatment, since five of nine work-card images currently read as a different, brighter product every time the eye lands on one.

## Where this could go next

If I had one more day here: unify the LinkedIn/GitHub click experience so the same destination means the same tab behavior everywhere on the site, not just within the dock or within the footer. I'd also ask whether the three "outdoors" placeholder icons (mountain, bike, compass) on `/personal/` are getting real photos before launch, since they're the one visibly unfinished element on an otherwise complete-feeling page, right where a reader is being asked to trust the personal side of the pitch. And I'd propose a light second tier for the `/posts/` archive, not hiding the 2012-2015 personal dev-notes, but visually distinguishing them from the 2021-2025 professional pieces, since a fintech buyer skimming that list for signal is being asked to weight "AWS EC2 disk on Linux confusion" the same as "What Is the Perforce Enhanced Studio Pack," and those two posts are doing very different jobs for very different readers.
