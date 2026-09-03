---
layout: post
title: "An agent of agents for one person"
tags:
  - Technology
  - AI
---

I've been using technology in some capacity since the 286 and Hayes modem. I don't remember those, but I do remember the Atari 2600 and playing shareware games on our 386:

![Classic PC games, 1988 to 1995](/assets/img/blog/classic-pc-games-1988-1995-grid.png)

- **The Adventures of Captain Comic** - 1988
- **Commander Keen: Marooned on Mars** (shareware) - December 14, 1990
- **The Incredible Machine** - 1992
- **Doom** (shareware) - December 10, 1993
- **Warcraft: Orcs & Humans** - November 1994
- **Command & Conquer** - August 31, 1995

Man, what a blast, great memories. From typing commands in MS-DOS to play Doom, to customizing my first college computer ("Dude, you're getting a Dell!"), to a full file and photo NAS back up of what I've accumulated so far, to home automation and now AI assistants. It's been so fun to play, tinker, learn and adapt along the way. This isn't a blog post series about games (maybe a little?) or home automation (maybe?), it's about how technology has gotten to the point of magic. Magic, the same feeling of playing Super Mario World with the family, to asking an LLM about an obscure game I remember but couldn't recall the name (Captain Comic!). I know generally how machine learning works, how training data, model weights, tokens, embeddings, and runtime memory make up an LLM, but to my tech friends and I, LLMs/AI is still magic. Almost infinite knowledge a query away. LLM's are great, but can we add our own memories, knowledge, personality in it's context, memory and results? Not in a safe way at the moment. That's why I've built my own AI, to help with the pieces that aren't available to the LLM/agentic core. Yes, I could import my projects, memories and tools into OpenAI, Anthropic and the like, but I own my thoughts and memories, in my noggin' and on physical disk. The state of the art (SOTA) models should help organize and relay information, not control or own. No tin foil hats here, per se, but I'd like to keep certain personal data, personal. 

How can you keep data local, use SOTA models and avoid vendor lock-in? Build your own AI.

Introducing, A.I.D.A, or Aida for short (or 'aida' in the cli) and J.A.R.V.I.S. or Jarvis for short.

<picture and link to GH>

In Aida's own words:
<quote>
I am Aida. I live in a terminal on Ryan's laptop, which is the entire point: the models I call are rented, but the memory is his. Ask me something and I do not guess where the answer lives. I keep a registry of his sources, score them against the question, and query the ones that can answer. The language model handles the language. Everything in between is configuration he can read, edit, and blame. My memory is markdown in a git repo, not a vendor's database, so when he corrects me the correction becomes a file. That is also where whatever passes for my personality comes from. I do not use em dashes, because he told me once they read as machine-written and I wrote it down. None of that came from training. It accumulated, one correction at a time.
</quote>

<audio controls preload="none" src="/assets/audio/aida-intro.mp3"></audio>

In Jarvis's own words:
<quote>
I am Jarvis. I am the voice on the same machine, and I speak in the dry English register Ryan picked on purpose, briefly, because a spoken answer cannot be skimmed. I speak only when spoken to. I keep his tasks, his weather, his calendar, and whatever is running in the background, and when something finishes while he is away I hold it until he next wakes me. I am the front door, sir. Aida does the thinking.
</quote>

<audio controls preload="none" src="/assets/audio/jarvis-intro.mp3"></audio>

## You Can't Have an AI Strategy Without a Data Strategy

That line got drilled into me at Snowflake, aimed at enterprises that wanted to sprinkle machine learning on top of a mess. It applies just as well to one person. If your knowledge lives in forty places and you can't say where, remember the filename of x or photo was in y folder, no model is going to fix that for you (yet). It will just be confidently wrong, but in a nicer voice. "You're absolutely right!"

So before any of the fun parts, the question is boring and structural: where does my stuff actually live, and how can I query something without me moving it into someone else's cloud/platform/proprietary system first?

## The Problem

Here's an actual problem I had Tuesday of last week. I have to fill out a piece of legal paperwork, but I can't remember the Tax ID. Did I put in 1Password, Google Drive or was it on a piece of paper in the closet?

Chat models are great to find a Tax ID as it has a certain "Tax"onomy /dad-pun. The models haven't seen my passwords, Claude isn't properly connected to the shared Google Drive and I haven't scaned in the tax forms yet. Agentic frameworks fix that by pointing a model at your tools, with their skills, but then the model decides where to look, and when it guesses wrong it does it with total confidence and no trace you can observe/track. I did not want a system that improvises or infers info about real, valid details.

## One Design Bet

Aida makes exactly one bet, and everything else follows from it: **LLM at the edges, deterministic middle.**

A fine-tuned model (Haiku 4.5) turns my English into a structured question. The same model turns the results back into English. Everything in between, which sources are candidates, how they rank, interanlly tracked confidence scores, what actually gets queried, is configuration I wrote and can read (YAML), edit (YAML Viewer <link>), and blame (git). Adding a knowledge source is writing a small YAML file, not retraining anything or convincing a model to behave.

That's the whole thesis. The next post opens up the pipeline and shows the scoring table, which is where it either holds up or doesn't.

## What That Buys, In One Real Query

Last July I asked:

> how many times did I go to Cape Cod, Massachusetts in 2023 and 2024

There is no model on earth that can answer that. Not because it's hard, but because the answer isn't in any training set. It's in my own location history, sitting on disk.

Aida pulled out one entity, "Cape Cod, Massachusetts," scored my sources against it, and picked my personal archive (phrase "did I" triggered a personal search) over a web search. Then:

> You made 28 trips to Cape Cod, Massachusetts across 2023 and 2024: 23 in 2023 and 5 in 2024, each trip confirmed by Google-measured driving distance (230 to 465 mi round trip).

Then it did the thing I actually care about. Unprompted, it flagged its own ambiguity: one stay was folded into a longer trip through Vermont, so if I only count trips where the Cape was the only real destination, it's 4 in 2024 and 27 total.

That caveat is the whole point. A system that traditional <i>infers</i>, hands you a confident round number. A system that knows where it looked can tell you which number it's less sure about, and why. The query took 105 seconds, five model calls, and one and a half cents.

## Two Lives, One Binary

I have a consulting practice, a company I co-founded, half a dozen side projects, a household, and until recently a day job. Those need entirely different source sets, and some of them must never see each other. So Aida has profiles. Sources and entities get scoped to `work` or `home`, and it picks by detecting which tools exist on the machine, with an environment variable to force it.

Same binary, same habits, same memory of how I like answers written. Completely partitioned knowledge. My employer's data never routes into a question about my kids' schedules, and not because I remembered to be careful.

## What I Borrowed

Almost none of the ideas here are mine, and I'd rather say so up front than get caught.

The autonomous loop is the Ralph pattern: a dumb deterministic outer loop around fresh-context agents, which beats a clever agent trying to manage its own state. The tiered memory owes a lot to published memory-consolidation research, promoting episodic notes into durable knowledge and letting the rest decay. The LLM-maintained wiki idea is Karpathy's. The orchestration skeleton is what's left of the LangChain era after you remove the part where the model decides everything: parallel fan-out and structured outputs, kept; agents conferring about where to look, gone. Recall is Voyage embeddings in a SQLite index. MCP is the interop layer in both directions, so Aida is a server to my other agents and a client to everything else.

What I'll claim as mine is the integration and the discipline of keeping that middle deterministic. That's it. That's the contribution.

## What This Is Not

It is not a product. It is not a framework you should adopt. I am not looking for users, and if you're about to ask why I didn't just use an existing tool, the honest answer is that most of them are good and none of them knew my sources, my two lives, or how I like to be spoken to.

It's a substrate. It's the place I prove a pattern before it shows up somewhere that matters, and it's where my knowledge stops evaporating every time I close a terminal.

Over the next few posts I'll open it up: the pipeline and where the model calls actually go, what happens when I tell it that it was wrong, how the memory tiers work, and the loop that does work while I sleep.

It is, still, mostly magic. It's just magic I can read the source of.
