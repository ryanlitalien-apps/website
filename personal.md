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
      <img src="/assets/img/viewer-toolbox-screenshot.png" alt="Viewer Toolbox screenshot">
      <div class="work-card-body">
        <h3><a href="/simple/">Simple apps</a></h3>
        <p>Nine native macOS viewers plus Viewer Toolbox to manage them.</p>
      </div>
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/firstchair.png" alt="FirstChair, a ski adventure hub">
      <div class="work-card-body">
        <h3><a href="https://firstchair.ski/">FirstChair</a></h3>
        <p>Ski adventure hub: track favorite resorts, discover new mountains, never miss a powder day.</p>
      </div>
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/prototypes-placeholder.svg" alt="">
      <div class="work-card-body">
        <h3>Game prototypes</h3>
        <p>Always at least one in flight; the best excuse to keep the game-dev tooling honest.</p>
      </div>
    </div>
    <div class="work-card">
      <img class="fit-top" src="/assets/img/personal/coachview.png" alt="CoachView form builder">
      <div class="work-card-body">
        <h3>CoachView</h3>
        <p>Multi-tenant SaaS for endurance coaches: forms, drip sequences, landing pages, billing. Rails, 2018 to 2020, built and sold.</p>
      </div>
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/aida-icon.svg" alt="">
      <div class="work-card-body">
        <h3>Aida</h3>
        <p>The personal AI I built to run my whole world: memory across every project, a fleet of agents, one CLI that answers for all of it.</p>
      </div>
    </div>
    <div class="work-card">
      <img class="fit-top" src="/assets/img/personal/butterstack-org-chart.png" alt="ButterStack org chart of AI staff">
      <div class="work-card-body">
        <h3>AI org chart</h3>
        <p>ButterStack runs on an AI staff: named agents with real roles reporting through an org chart like any team. Blog post coming soon.</p>
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
      <img src="/assets/img/personal/outdoors-placeholder-1.svg" alt="">
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/outdoors-placeholder-2.svg" alt="">
    </div>
    <div class="work-card">
      <img src="/assets/img/personal/outdoors-placeholder-3.svg" alt="">
    </div>
  </div>
</section>
