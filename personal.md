---
layout: base
title: "Personal - Ryan L'Italien"
description: "Native macOS apps, open-source tooling, race reports, and the White Mountains: what Ryan L'Italien builds and does off the clock."
permalink: /personal/
---

<section class="hero">
  <h1>Personal</h1>
  <p class="tagline"><strong>The work that doesn&rsquo;t bill by the hour.</strong></p>
  <p>Proof I build for the love of it: native Mac apps, open-source tooling, race reports, and a standing date with the White Mountains.</p>
</section>

<section class="personal-apps" aria-labelledby="apps-heading">
  <h2 id="apps-heading">Simple apps</h2>
  <p>Nine native macOS viewer apps (JSON, CSV, Markdown, YAML, Text, Image, Audio, 3D, 3MF) sharing one Swift core, plus Viewer Toolbox to install and update them all. Each app is about 2 MB; the Electron equivalent would be 80 to 120 MB.</p>
  <div class="cta-group">
    <a class="btn" href="/simple/">See the apps</a>
  </div>
</section>

<section class="personal-projects" aria-labelledby="projects-heading">
  <h2 id="projects-heading">Side projects</h2>
  <p>A rotating bench of tools I build because I use them: MCP servers that wire AI assistants into version control, fitness platforms, and office suites; Claude Code plugins and multi-agent pipelines; and always at least one game prototype in flight. The public ones live on <a href="https://github.com/ryanlitalien">GitHub</a>.</p>
  <div class="work-grid">
    <div class="work-card">
      <img class="shot-light" src="/assets/img/viewer-toolbox-screenshot.png" alt="Viewer Toolbox screenshot">
      <div class="work-card-body">
        <h3><a href="/simple/">Simple apps</a></h3>
        <p>Nine native macOS viewers (JSON, CSV, Markdown, YAML, Text, Image, Audio, 3D, 3MF) on one shared Swift core, each about 2 MB where an Electron app would be 80 to 120. Viewer Toolbox installs and updates the whole set.</p>
        <p class="stack">Swift &middot; SwiftUI &middot; Sparkle &middot; Mac App Store &middot; GitHub Actions</p>
      </div>
    </div>
    <div class="work-card">
      <img class="shot-light" src="/assets/img/personal/firstchair.png" alt="FirstChair, a ski adventure hub">
      <div class="work-card-body">
        <h3><a href="https://firstchair.ski/">FirstChair</a></h3>
        <p>A ski adventure hub covering 440+ mountains: track favorite resorts, compare passes, find uphill access, and never miss a powder day.</p>
        <p class="stack">Vue 3 &middot; Vite &middot; Tailwind &middot; Netlify Functions &middot; Google Maps</p>
      </div>
    </div>
    <div class="work-card">
      <img class="fit-top" src="/assets/img/personal/pilot-light.jpeg" alt="Pilot Light title screen, pixel-art biplanes and gunships at sunset">
      <div class="work-card-body">
        <h3>Game prototypes</h3>
        <p>Always at least one in flight. The current one is Pilot Light: WW1 biplanes, wrong-century enemies, pixel art. The best excuse to keep the game-dev tooling honest.</p>
        <p class="stack">Godot &middot; Android &middot; Retro Diffusion &middot; agentic pipeline</p>
      </div>
    </div>
    <div class="work-card">
      <img class="fit-top shot-light" src="/assets/img/personal/coachview.png" alt="CoachView form builder">
      <div class="work-card-body">
        <h3>CoachView</h3>
        <p>Coaching-business SaaS for endurance coaches: athlete onboarding forms, drip sequences, landing pages, and billing in one place, designed to sit beside TrainingPeaks rather than replace it. Built 2018 to 2020, sold.</p>
        <p class="stack">Ruby on Rails &middot; Heroku &middot; Stripe &middot; PostgreSQL</p>
      </div>
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/aida-icon.svg" alt="">
      <div class="work-card-body">
        <h3>A.I.D.A.</h3>
        <p>Aida (Artificial Intelligence Digital Assistant) is my personal AI chief of staff: long-term memory across every project, a wiki distilled from fifteen years of notes, agents that run overnight, and one CLI that answers for work and life.</p>
        <p class="stack">Go &middot; MCP &middot; Claude &middot; Docker</p>
      </div>
    </div>
    <div class="work-card">
      <img class="fit-top shot-light" src="/assets/img/personal/butterstack-org-chart.png" alt="ButterStack org chart of AI staff">
      <div class="work-card-body">
        <h3>AI org chart</h3>
        <p>ButterStack&rsquo;s staff is mostly AI: a product manager queues the backlog, a tech lead gates quality, engineer agents ship PRs from sandboxed worktrees, and humans review. Blog post coming soon.</p>
        <p class="stack">Claude Code &middot; subagents &middot; Docker sandboxes &middot; GitHub Actions</p>
      </div>
    </div>
  </div>
</section>

<section class="personal-writing" aria-labelledby="writing-heading">
  <h2 id="writing-heading">Writing</h2>
  <ul class="work-list">
    {% for post in site.posts limit:6 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> <span class="post-date">{{ post.date | date: "%b %Y" }}</span></li>
    {% endfor %}
  </ul>
  <p><a href="/posts/">All posts &rarr;</a></p>
</section>

<section class="personal-outdoors" aria-labelledby="outdoors-heading">
  <h2 id="outdoors-heading">When I&rsquo;m not in front of a computer</h2>
  <ul class="work-list">
    <li>Two full Ironmans, a dozen halves.</li>
    <li>All 48 of New Hampshire&rsquo;s 4,000-footers.</li>
    <li>Eagle Scout.</li>
    <li>Three company-wide hackathon wins and various innovation awards.</li>
  </ul>
  <div class="work-grid">
    <div class="work-card">
      <img src="/assets/img/personal/outdoors-ironman.jpg" alt="With my kids under the Ironman logo at a race village" style="object-position: center 62%">
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/outdoors-bike.jpg" alt="On the lift at a New Hampshire bike park, mountain bike hanging behind me">
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/outdoors-camp.jpg" alt="Camp selfie in the autumn woods" style="object-position: center 30%">
    </div>
  </div>
</section>
