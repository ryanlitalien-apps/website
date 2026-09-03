---
layout: post
title: "Introducing Aida - An agent of agents for one person"
published_at: 2026-09-03
tags:
  - Technology
  - AI
---

I've been using technology in some capacity since the 286 and Hayes modem. I don't remember those, but I do remember the Atari 2600 and playing shareware games on our 386.

<img src="/assets/img/blog/classic-pc-games-1988-1995-grid.png" alt="Classic PC games, 1988 to 1995" style="display:block;width:75%;margin:0 auto;">

Man, what a blast, great memories. From typing commands in MS-DOS to play Doom, to customizing my first college computer ("Dude, you're getting a Dell!"), to a full file and photo NAS backup of what I've accumulated so far, to home automation and now AI assistants. It's been so fun to play, tinker, learn and adapt along the way.

This isn't a blog post series about games (maybe a little?) or home automation (maybe?), it's about how technology has gotten to the point of magic. Magic, the same feeling of playing Super Mario World with the family, to asking an LLM about an obscure game I remember but couldn't recall the name (Captain Comic!). I know generally how machine learning works, how training data, model weights, tokens, embeddings, and runtime memory make up an LLM, but to my tech friends and me, LLMs/AI is still magic. Almost infinite knowledge a query away.

LLMs are great, but can we add our own memories, knowledge, personality in its context, memory and results? Not in a safe way at the moment. That's why I've built my own AI, to help with the pieces that aren't available to the LLM/agentic core. Yes, I could import my projects, memories and tools into OpenAI, Anthropic and the like, but I own my thoughts and memories, in my noggin' and on physical disk. The state of the art (SOTA) models should help organize and relay information, not control or own. No tin foil hats here, per se, but I'd like to keep certain personal data, personal. 

How can you keep data local, use SOTA models and avoid vendor lock-in? Build your own AI.

Introducing, A.I.D.A., or Aida for short (or 'aida' in the cli) and J.A.R.V.I.S. or Jarvis for short.

Yes, the names are Marvel. J.A.R.V.I.S. (Just A Rather Very Intelligent System) is Tony Stark's AI, the dry voice in the workshop that runs the house, the suits, and the sarcasm. A.I.D.A. (Artificial Intelligent Digital Assistant) is from Agents of S.H.I.E.L.D., the lab assistant that started out helpful and, well... that one doesn't end well. The theme goes all the way down: the daemon listens on port 1610 (Earth-1610), the phone talks to it on port 1218 (Earth-1218, the "real world" in Marvel cosmology), and the Android Auto client is the Life Model Decoy. It started with one device years ago to help name my desktop and laptop. Now it makes the terminal way more fun, sarcastic and a butler with a British accent are far more interesting to talk to than Piper (rhasspy/piper).

<img src="/assets/img/blog/deadpool-wolverine-standee.jpg" alt="Me between the Deadpool and Wolverine standees at the theater" style="display:block;width:75%;margin:0 auto;">

<!-- TODO: picture + GitHub link once the repo is public -->

In Aida's own words:

<blockquote><p>I am Aida. I live in a terminal on Ryan's laptop, which is the entire point: the models I call are rented, but the memory is his. Ask me something and I do not guess where the answer lives. I keep a registry of his sources, score them against the question, and query the ones that can answer. The language model handles the language. Everything in between is configuration he can read, edit, and blame. My memory is markdown in a git repo, not a vendor's database, so when he corrects me the correction becomes a file. That is also where whatever passes for my personality comes from. I do not use em dashes, because he told me once they read as machine-written and I wrote it down. None of that came from training. It accumulated, one correction at a time.</p></blockquote>

<audio controls preload="none" src="/assets/audio/aida-intro.mp3"></audio>

In Jarvis's own words:

<blockquote><p>I am Jarvis. I am the voice on the same machine, and I speak in the dry English register Ryan picked on purpose, briefly, because a spoken answer cannot be skimmed. I speak only when spoken to. I keep his tasks, his weather, his calendar, and whatever is running in the background, and when something finishes while he is away I hold it until he next wakes me. I am the front door, sir. Aida does the thinking.</p></blockquote>

<audio controls preload="none" src="/assets/audio/jarvis-intro.mp3"></audio>

## You Can't Have an AI Strategy Without a Data Strategy

That line got drilled into me at Snowflake. Although it was aimed at enterprises (who weren't ready for AI) that just wanted to sprinkle machine learning on top of data that was in disarray. That line also applies just as well to one person. If your knowledge lives in forty places and you can't say where, how to access it, can't remember the filename, or which folder the photo was in, no model is going to fix that for you (yet). It will just be confidently wrong, but in a nicer voice. "You're absolutely right!"

So before any of the fun parts, the question is boring and structural: where does my stuff actually live, and how can I query something without me moving it into someone else's cloud/platform/proprietary system first?

## The Problem

Here's an actual problem I had Tuesday of last week. I have to fill out a piece of legal paperwork, but I can't remember the Tax ID. Did I put in 1Password, Google Drive or was it on a piece of paper in the closet?

Chat models would be great at finding a Tax ID (it has a certain "Tax"onomy, dad pun intended) if they could see any of it. The models haven't seen my passwords, Claude isn't properly connected to the shared Google Drive and I haven't scanned in the tax forms yet. Agentic frameworks fix that by pointing a model at your tools, with their skills, but then the model decides where to look, and when it guesses wrong it does it with total confidence and no trace you can observe/track. I did not want a system that improvises or infers info about real, valid details.

## One Design Bet

Aida makes exactly one bet, and everything else follows from it: **LLM at the edges, deterministic middle.**

A fine-tuned model (Haiku 4.5) turns my English into a structured question. The same model turns the results back into English. Everything in between, which sources are candidates, how they rank, interanlly tracked confidence scores, what actually gets queried, is configuration I wrote and can read (YAML), edit ([YAML Viewer](/simple/)), and blame (git). Adding a knowledge source is writing a small YAML file, not retraining anything or convincing a model to behave.

That's the whole thesis. The next post opens up the pipeline and shows the scoring table, which is where it either holds up or doesn't.

## What That Buys, In One Real Query

Last July I asked:

> how many times did I go to Cape Cod, Massachusetts in 2023 and 2024

There is no model on earth that can answer that. Not because it's hard, but because the answer isn't in any training set. It's in my own location history, sitting on disk.

Aida pulled out one entity, "Cape Cod, Massachusetts," scored my sources against it, and picked my personal archive (phrase "did I" triggered a personal search) over a web search. Then:

> You made 28 trips to Cape Cod, Massachusetts across 2023 and 2024: 23 in 2023 and 5 in 2024, each trip confirmed by Google-measured driving distance (230 to 465 mi round trip).

Then it did the thing I actually care about. Unprompted, it flagged its own ambiguity: one stay was folded into a longer trip through Vermont, so if I only count trips where the Cape was the only real destination, it's 4 in 2024 and 27 total.

That caveat is the whole point. A system that traditionally *infers* hands you a confident round number. A system that knows where it looked can tell you which number it's less sure about, and why. The query took 105 seconds, five model calls, and one and a half cents.

## Two Lives, One Binary

I have a consulting practice, a company I co-founded, half a dozen side projects, a household and a day job. Those need entirely different context environments, and some of them must never see each other. So Aida has profiles. Sources and entities get scoped to `work` or `home` (more available later), and it picks by detecting which tools exist on the machine, with an environment variable to force it.

Same (Go) binary, same habits, same memory of how I like answers written. Completely partitioned knowledge. 'Work' profile's data never routes into the 'home' question about my kids' schedules, and not because I remembered to be careful.

## What I Borrowed

> Immature poets imitate; mature poets steal; bad poets deface what they take, and good poets make it into something better, or at least something different.
>
> <cite>T.S. Eliot, ["Philip Massinger"](https://tseliot.com/essays/philip-massinger) (1919)</cite>

The autonomous /eval loop is the [Ralph Wiggum pattern](https://ghuntley.com/ralph/) (see also [snarktank/ralph](https://github.com/snarktank/ralph)): a dumb deterministic outer loop around fresh-context agents, which beats a clever agent trying to manage its own state. The tiered memory owes a lot to published memory-consolidation research, in particular [Elastic's Atlas](https://www.elastic.co/search-labs/blog/agent-memory-elasticsearch), promoting episodic notes into durable knowledge and letting the rest decay. The LLM-maintained wiki idea is [Karpathy's](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). The orchestration skeleton is what's left of the [LangChain](https://blog.langchain.com/deep-agents-deploy-an-open-alternative-to-claude-managed-agents/) era after you remove the part where the model decides everything: parallel fan-out and structured outputs, kept; agents conferring about where to look, gone. Recall is [Voyage](https://www.voyageai.com/) embeddings in a (rebuildable from git) SQLite index. [MCP](https://modelcontextprotocol.io) is the interop layer in both directions, so Aida is a server to my other agents and a client to everything else. (other harnesses/agents can create/update tasks in Aida). (Maybe coming soon is an agentic commerce piece using A2P/UCP/A2A/etc.)

What I'll claim as mine is the integration, distillation, simplicity, maintenance, improvements and the discipline of keeping that middle deterministic. I need workflows and pipelines to be consistent and stable.

## What This Is Not

It is not a product, framework or paid service. I am not looking for users or additions (but possibly open to issues/PRs!), and if you're about to ask why I didn't just use an existing tool, the honest answer is that most of them are good/great and none of them knew my sources, my own context, and I like to keep external tools separate. OpenClaw was a great start, but I didn't jump on the bandwagon. Putting on my CTO hat, my Spidey sense was tingling and it proved right when there were leaks/security risks/sent emails that weren't supposed to be sent. And lastly, hermes/pi came out after I had already started building!

This is a substrate. It's the place I prove a pattern before it shows up somewhere that matters, and it's where my knowledge stops evaporating every time I close a terminal, and persists instead. My memory is questionable, why not back it up! :)

Over the next few posts I'll open it up: the pipeline, process and where the model calls actually go, what happens when I send a thumbs-up or down, how the memory tiers work, and the looping that works while I sleep.

It is, still, mostly magic. It's just magic I can understand. Rock on 🤘!

<img src="/assets/img/blog/college-dell-crt.jpg" alt="My college Dell: Winamp, a Golf R32 wallpaper, and a Return of the King poster" style="display:block;width:50%;margin:0 auto;">
