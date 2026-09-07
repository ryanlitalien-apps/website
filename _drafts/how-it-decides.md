---
layout: post
title: "How it decides"
series: aida
series_part: 2
tags:
  - Technology
  - AI
---

<!--
OUTLINE, not a draft. Part 2 of Building Aida. Target 1,300-1,600 words of prose plus
three or four short code blocks (YAML, a table, a shell command, one ~12-line Go snippet).
Due Thu 2026-09-10 on the weekly cadence from part 1 (2026-09-03).

THESIS: The AI understands the question. A rulebook you can read decides where to look.
When it looks in the wrong place, you tell it once, and the rulebook changes.

Rules: no code the reader must understand to follow the story; code that SHOWS is fine.
No employer names or real merchant names (the finances example below is clean).
ButterStack only at pattern level. No em dashes.

BEATS

1. Lede: the switchboard operator (~150 words)
   A 1950s operator has no idea what you are about to say, but knows every line on the
   board. That is the split. The model does the listening. The board is a folder of
   small text files. Callback to part 1's "one design bet", now shown rather than stated.

2. The board is a folder of YAML (~200 words + snippet)
   Show one real source file, whole, ten lines:

     path: ~/dev/3d-viewer
     type: docs
     context: CLAUDE.md
     description: A native macOS SwiftUI app for viewing 3D model files.
     capabilities: [partner-docs, doc-search]
     entities: [3d-viewer, viewer]
     profiles: [home]

   Adding a knowledge source is writing one of these. Fifty-five of them on my laptop
   right now. No retraining, no prompt engineering, no convincing a model to behave.
   Point out the two lines that matter for routing: entities (words that name this
   source) and capabilities (kinds of question it can answer).

3. A question hits the board (~300 words + table)
   The question: "how many open github issues do I have across my viewer repos".
   Show the real scoring table, trimmed to the top rows plus the cut line:

     score  source          ptnr  cap
     24     github             0   24   <- picked
     16     gh                 0   16
     15     audio-viewer      15    0
     15     viewer-core       15    0
     15     3d-viewer         15    0
     ... eight more viewer repos, all 15 ...
     8      git-dev            0    8
     ---  zero-score (considered, cut): 39 sources  ---

   One sentence per column: "cap" means a capability on the source matched the kind
   of question (issue-lookup); "ptnr" means a word in the question matched the
   source's entity list (viewer). Eleven viewer apps tie because they all claim the
   word "viewer". github wins because it claims the *kind* of question.
   Every number is arithmetic. I can run `aida <question> --explain` and get this
   table for any question, before or after it answers. That is the whole point of
   putting the decision in config: it can be printed.

4. The one vote the model gets (~200 words)
   The model does not choose from 55 sources. It chooses from the shortlist the
   rulebook already ranked. In July this exact question fanned out to three viewer
   repos and answered in eight seconds; the router took the tie at 15 and asked
   several. The model can pick among candidates. It cannot invent one.
   Count the model calls honestly: understand the question, ask each chosen source,
   write the answer. Plus one bounded call to pick from the shortlist. Everything
   else is Go. (Cape Cod in part 1 was five calls and a cent and a half; same shape.)

5. When it is wrong (~350 words + command + Go snippet)
   A real miss from the lesson log: "what was the total personal spend in 2025?" went
   to my notes app instead of the finances database, because nothing in the question
   named a finances entity. The fix was one command:

     aida thumbs-down --because "should have used finances, no need for notion"

   What that does, in order: the reason is tokenized with polarity, so "should have
   used finances" marks finances as intended and "no need for notion" marks notion as
   excluded (negation phrases flip the sign, sentence boundaries reset it); the
   question is embedded and stored as a lesson with those two lists; the next time a
   similar question arrives, the router pulls the three most similar lessons and
   applies +50 to intended sources and -50 to excluded ones BEFORE the model sees the
   shortlist. The correction is arithmetic on the board, not a note the model may or
   may not honor.
   Go snippet candidate (~12 lines): the polarity loop in internal/cli/feedback.go
   (extractDirective), showing negation flipping the sign. Or the +50/-50 application
   in the router. Pick whichever reads cleaner standalone.
   Optional one-liner: the same thumbs-down exists by voice ("Jarvis, thumbs down, you
   should have used the weather tool") and writes to the same place.

6. How I know it keeps working (~150 words)
   Golden seeds: a list of real questions with the sources they should route to.
   Every change to the rulebook or the router runs them; a routing regression fails
   the test suite like any other bug. The blog version is one paragraph; the harness
   itself is a "for the nerds" link.

7. Close (~100 words)
   The rulebook is the product. I have swapped model versions under it and run it
   offline on a local model; the YAML and the lessons are what I would grab in a fire.
   Tease part 3: the lessons are one kind of memory. There are four more.

FOR THE NERDS (sidebar links into aida's docs/, once public; until then, plain text)
- The six-step pipeline diagram (docs/pipeline-diagram.mmd, needs the redesign pass
  the launch plan calls for; Dana critique)
- Scoring weights and the +50 partner-entity boost (planner.go)
- The polarity-tracking directive tokenizer (feedback.go) and its test table
- The golden-seed harness

ARTIFACTS TO PRODUCE BEFORE DRAFTING
- [ ] Pipeline diagram redesigned for blog-column width, both themes
- [x] Real --explain table (captured 2026-09-07, above)
- [ ] One live thumbs-down with the extracted directives shown (the 48 stored
      thumbs-downs predate the directive fields; run one fresh and capture the output)
- [ ] Golden-seed count for beat 6 (docs/golden-seed-questions-home.md)
- [ ] Pick the Go snippet for beat 5 and trim it to ~12 lines
- [ ] Decide: does the video pilot start here? The --explain table is the one demo
      that is better on video than in text.
-->
