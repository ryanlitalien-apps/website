---
layout: post
title: "Aida, Part 5: Dynamic model selection - teaching the loop what it can afford"
published_at: 2026-09-15
series: aida
series_part: 5
description: "Work in progress: the arbiter, a rulebook that picks which model and lane runs each task from quota, cost, task type, and data class."
tags:
  - Technology
  - AI
---

> <strong style="color:#C62828;font-size:1.15em;font-weight:800;">Work in progress.</strong> This part is not written yet. The layer it describes is designed and partly built; the enforcement is not. What follows is the shape of the post, so the series footer has something honest to point at.

Parts 2 through 4 covered three decisions Aida makes without asking a model: where to look, what to remember, and what to work on next. There is a fourth decision that today I make by hand, several times a day, badly. Which model should do this job?

I pay for several plans at once, each with its own five-hour and weekly windows, and each with models that are good at different things. Aida already knows the roster and can read the gauges: `aida models` prints every provider, its plan, how much of each window is used, and the nicknames I use for each model. What it cannot do yet is act on that. The autonomous loop spawns an agent with whatever model the config names, whether or not that plan has capacity left, whether or not the task deserves the expensive model, and whether or not that lane is cleared for the data the task touches.

Spoiler alert, the arbiter is the fix... coming soon.
