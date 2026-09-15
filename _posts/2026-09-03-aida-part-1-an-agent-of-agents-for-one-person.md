---
layout: post
title: "Introducing Aida - An agent of agents for one person"
published_at: 2026-09-03
redirect_from:
  - /posts/an-agent-of-agents-for-one-person/
series: aida
series_part: 1
tags:
  - Technology
  - AI
---

Tuesday of last week I had to fill out a piece of legal paperwork, and it needed a Tax ID I could not remember. Was it in the password manager? A shared drive? A piece of paper in a folder in the closet? I asked a chat model, and it was useless, and not because it's dumb. It has never seen my password manager, it was never connected to the shared drive, and the paper folder isn't scanned in. The model doesn't know where my stuff is. No model does, and that isn't a training problem. It's a plumbing problem.

I've been using computers since the 286 and the Hayes modem, or so I'm told. I don't remember those. I remember the Atari 2600, and shareware on our 386, and that kid grew into someone with a consulting practice, a company he co-founded, a handful of side projects, and a household to run.

<img src="/assets/img/blog/classic-pc-games-1988-1995-grid.jpg" alt="Classic PC games, 1988 to 1995" style="display:block;width:75%;margin:0 auto;">

My knowledge now lives in something like forty places: codebases, a task tracker, a photo library, a location history, calendars, two companies' worth of documents. Asking a model a real question about my own life means first knowing which of those forty places has the answer.

## You can't have an AI strategy without a data strategy

**You can't have an AI strategy without a data strategy.** It's a line I heard from a data-warehouse vendor's sales deck years ago, aimed at enterprises whose data was in disarray before anyone tried to bolt machine learning onto it. It applies just as well to one person. If you can't say where your stuff lives, the model doesn't fail loudly. It just answers anyway, confidently, in a nicer voice.

So before anything fun, the question was boring and structural: where does my stuff actually live, and how do I query it without moving it into someone else's cloud first?

## One design bet

Agent frameworks will happily point a model at your tools and let it decide where to look. That's the part I didn't want. When the model guesses wrong, it guesses with total confidence and leaves no trace you can check. Aida makes one bet instead, and everything else follows from it: **LLM at the edges, deterministic middle.**

A small fast model turns my English into a structured question. The same model turns results back into English. Everything between those two calls, which sources are candidates, how they're ranked, what actually gets queried, is a YAML file I wrote. I can read it, edit it, and blame it in git. Adding a knowledge source means writing a small file, not retraining anything or persuading a model to behave.

That's the whole thesis, and the next post opens up that middle and shows the scoring table.

## What that buys, in one real query

Here's what it buys me. Last July I asked:

> how many times did I go to Cape Cod, Massachusetts in 2023 and 2024

No model on earth can answer that from training. The answer was never public. It's in my own location history, on my own disk. Aida pulled out one entity, "Cape Cod, Massachusetts," scored my sources against it, and picked my personal archive over a web search. Then:

> You made 28 trips to Cape Cod, Massachusetts across 2023 and 2024: 23 in 2023 and 5 in 2024, each trip confirmed by Google-measured driving distance (230 to 465 mi round trip).

Then, unprompted, it flagged its own ambiguity: one stay was folded into a longer trip through Vermont, so if I only count trips where the Cape was the only real destination, it's 4 in 2024 and 27 total. That caveat is the whole point. A system that infers hands you a clean round number and stops there. A system that knows where it looked can tell you which number it's less sure about, and why. The query took 105 seconds, five model calls, and one and a half cents.

## Two lives, one binary

I also have two lives that must never mix. A consulting practice and a co-founded company on one side, a household and side projects on the other. Aida handles that with profiles: sources and entities scope to `work` or `home`, detected from which tools exist on the machine, with an environment variable to force it when detection guesses wrong. Same binary, same habits, completely partitioned knowledge.

## The names

The two halves have names, because of course they do. J.A.R.V.I.S., or Jarvis, is the dry voice that runs tasks, weather, and whatever finished while I was away. A.I.D.A., or Aida, is the one that does the thinking, sources, scoring, and all. The daemon listens on port 1610 (Earth-1610), the phone talks to it on 1218 (Earth-1218), and the Android client is the Life Model Decoy. The names are not decoration, and they go well past those two. With this many machines and agents I needed a way to remember what each one is for, and a name that carries the job beats a hostname every time. Jarvis listens, talks, and takes orders. Hank is the Windows gaming workstation, because Hank McCoy is the Beast, and that box is one. Friday is the NAS, because Friday knows everything. Nidavellir is where the dwarves forge Thor's hammer, so naturally it runs the Forge(jo). The mapping goes on from there, dad puns included, and every name is one less thing I have to look up.


In Aida's own words:

<blockquote><p>I am Aida. I live in a terminal on Ryan's laptop, which is the entire point: the models I call are rented, but the memory is his. Ask me something and I do not guess where the answer lives. I keep a registry of his sources, score them against the question, and query the ones that can answer. The language model handles the language. Everything in between is configuration he can read, edit, and blame. My memory is markdown in a git repo, not a vendor's database, so when he corrects me the correction becomes a file. That is also where whatever passes for my personality comes from. I do not use em dashes, because he told me once they read as machine-written and I wrote it down. None of that came from training. It accumulated, one correction at a time.</p></blockquote>

<audio controls preload="none" src="/assets/audio/aida-intro.mp3"></audio>

In Jarvis's own words:

<blockquote><p>I am Jarvis. I am the voice on the same machine, and I speak in the dry English register Ryan picked on purpose, briefly, because a spoken answer cannot be skimmed. I speak only when spoken to. I keep his tasks, his weather, his calendar, and whatever is running in the background, and when something finishes while he is away I hold it until he next wakes me. I am the front door, sir. Aida does the thinking.</p></blockquote>

<audio controls preload="none" src="/assets/audio/jarvis-intro.mp3"></audio>

## What I borrowed

> Immature poets imitate; mature poets steal; bad poets deface what they take, and good poets make it into something better, or at least something different.
>
> <cite>T.S. Eliot, ["Philip Massinger"](https://tseliot.com/essays/philip-massinger) (1919)</cite>

- The autonomous loop is the [Ralph Wiggum pattern](https://ghuntley.com/ralph/) (see also [snarktank/ralph](https://github.com/snarktank/ralph)): a dumb deterministic outer loop around fresh-context agents, which beats a clever agent trying to manage its own state.
- The tiered memory owes a lot to published memory-consolidation research, in particular [Elastic's Atlas](https://www.elastic.co/search-labs/blog/agent-memory-elasticsearch), promoting episodic notes into durable knowledge and letting the rest decay.
- The LLM-maintained wiki idea is [Karpathy's](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
- The orchestration skeleton is what's left of the [LangChain](https://blog.langchain.com/deep-agents-deploy-an-open-alternative-to-claude-managed-agents/) era after removing the part where the model decides everything: parallel fan-out and structured outputs, kept; agents conferring about where to look, gone.
- Recall is [Voyage](https://www.voyageai.com/) embeddings in a rebuildable-from-git SQLite index.
- [MCP](https://modelcontextprotocol.io) is the interop layer in both directions, so Aida is a server to my other agents and a client to everything else.

What I'll claim as mine is the integration, the distillation, the discipline of keeping that middle deterministic. Workflows and pipelines need to be consistent and stable, and that part isn't borrowed from anyone.

## What this is not

This is not a product, a framework, or a paid service. I'm not looking for users, though I'm open to issues and PRs once the repo is public. Most existing agent tools are good, even great, and none of them know my sources or my own context, which is the actual reason I built this rather than adopting one. A few early entrants in this space leaked data or sent things they shouldn't have, which mostly confirmed the instinct to keep that middle deterministic rather than handing it to a model. Over the next few posts I'll open it up: how the pipeline decides where to look, how the memory tiers work and what a thumbs-up or thumbs-down actually changes, and what runs while I sleep, ending with the repo going public. A fifth part on dynamic model selection follows once that layer is built.

It is, still, mostly magic. It's just magic I can understand. Rock on 🤘!

<img src="/assets/img/blog/deadpool-thumbs-up.jpg" alt="Deadpool figure on the windowsill giving a thumbs up" style="display:block;width:50%;margin:0 auto;">
