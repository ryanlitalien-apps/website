---
layout: base
title: "Ryan L'Italien - Fractional CTO"
description: "Fractional CTO for companies whose growth runs through partners, integrations, and AI. Diagnostic, advisory, fractional CTO, and technical due diligence engagements."
permalink: /
---

<section class="hero">
  <h1>Ryan L&rsquo;Italien</h1>
  <p class="tagline"><strong>Fractional CTO for companies whose growth runs through partners, integrations, and AI.</strong></p>
  <p>Most fractional CTOs are pure engineering. I also carry the revenue side: the partner channel, the solutions function, and being the person your biggest partner&rsquo;s engineers actually want on the call. 20+ years, startups to Fortune 100. I ship, not just advise.</p>
  <div class="cta-group">
    <a class="btn btn-primary" href="{{ site.data.contact.calendly }}">Book a 20-minute call</a>
    <a class="btn" href="#how-i-work">See how I work</a>
  </div>
</section>

<hr class="hairline">

<section class="stats" aria-labelledby="stats-heading">
  <h2 id="stats-heading" class="sr-only">By the numbers</h2>
  <div class="stat-bar">
    {% for stat in site.data.stats %}
    <div class="stat">
      <span class="stat-number">{{ stat.number }}</span>
      <span class="stat-label">{{ stat.label }}</span>
    </div>
    {% endfor %}
  </div>
</section>

<section class="problems" aria-labelledby="problems-heading">
  <h2 id="problems-heading">Pick the sentence that sounds like you</h2>
  <ul class="problem-list">
    <li class="problem-card">
      <p class="problem-quote">We signed the partner deal and nobody senior enough owns landing it.</p>
      <p class="problem-answer">Integration architecture, partner-technical relationships, marketplace listings. I did this for a public fintech&rsquo;s largest merchant partners.</p>
    </li>
    <li class="problem-card">
      <p class="problem-quote">Our AI plans are slideware.</p>
      <p class="problem-answer">I build agentic systems for real: MCP servers, Claude-based tooling, multi-agent pipelines in production. I will tell you where AI pays off in your stack and where it is theater.</p>
    </li>
    <li class="problem-card">
      <p class="problem-quote">Engineering outgrew the architecture and the founders&rsquo; hours.</p>
      <p class="problem-answer">Fractional CTO: architecture, hiring, delivery process, board-ready technical narrative.</p>
    </li>
    <li class="problem-card">
      <p class="problem-quote">We need a senior technical read before we wire the money.</p>
      <p class="problem-answer">Technical due diligence for investors: a written, defensible findings document on the target&rsquo;s stack and team.</p>
    </li>
  </ul>
</section>

<section class="proof" aria-labelledby="proof-heading">
  <h2 id="proof-heading">Proof</h2>
  <div class="proof-grid">
    {% for block in site.data.proof.blocks %}
    <div class="proof-block">
      <h3>{{ block.title }}</h3>
      {% if block.employer_block %}
      <p>{{ site.data.proof.employer_title }} at {{ site.data.proof.employer }}: {{ site.data.proof.employer_body_suffix }}</p>
      {% else %}
      <p>{{ block.body }}</p>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</section>

<section class="engagements" aria-labelledby="engagements-heading">
  <h2 id="engagements-heading">Engagements</h2>
  <ul class="engagement-list">
    {% for e in site.data.engagements %}
    <li class="engagement">
      <h3 class="engagement-name">{{ e.name }}</h3>
      <span class="engagement-terms">{{ e.terms }}</span>
      <p>{{ e.body }}</p>
    </li>
    {% endfor %}
  </ul>
  <p class="engagements-note">No public prices here on purpose, fixed-fee language above, numbers in the conversation.</p>
</section>

<section class="how-i-work" id="how-i-work" aria-labelledby="how-i-work-heading">
  <h2 id="how-i-work-heading">How I work</h2>
  <ul class="work-list">
    <li>Diagnose before prescribing. The first deliverable is always a written read of where you actually are.</li>
    <li>Fixed scopes, named deliverables, no meter running.</li>
    <li>I write code with your team, not decks about your team.</li>
    <li>Everything I recommend, I have run in production somewhere.</li>
  </ul>
</section>

<section class="social-proof" aria-labelledby="social-proof-heading">
  <h2 id="social-proof-heading">What people say</h2>
  <!--
    Content brief (portfolio-site-content.md) names two LinkedIn
    recommendations on file (Michael Adams, Sue Derderian, 2008 and 2012)
    but does not include their quote text, and that text is not something
    this build should invent and attribute to a named person. Placeholder
    below is deliberately labeled as one -- pull the real quotes from the
    LinkedIn archive before this ships. See final report.
  -->
  <p class="testimonial-placeholder">
    Two LinkedIn recommendations are on file (2008, 2012) and will run here,
    plainly labeled, once their text is pulled in. Standing task: ask for one
    fresh line from every engagement going forward.
  </p>
</section>

<section class="selected-work" aria-labelledby="selected-work-heading">
  <h2 id="selected-work-heading">Selected work</h2>
  <div class="work-grid">
    <div>
      <h3><a href="https://butterstack.com">ButterStack</a></h3>
      <p>Game-studio SaaS I founded and run, born from the AWS partnership and studio-infrastructure work turning into a product.</p>
    </div>
    <div>
      <h3><a href="/simple/">Viewer suite</a></h3>
      <p>Nine native macOS apps (JSON, CSV, Markdown, YAML, Text, Image, Audio, 3D, 3MF) sharing one core, plus Viewer Toolbox to manage and update them.</p>
    </div>
    <div>
      <h3>Agentic tooling</h3>
      <p>MCP servers and Claude Code plugins built for daily use, not demos: this site&rsquo;s own build pipeline runs on the same tooling.</p>
    </div>
  </div>
</section>

<section class="faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading">FAQ</h2>
  {% for item in site.data.faq %}
  <details class="faq-item">
    <summary>{{ item.question }}</summary>
    <p>
      {{ item.answer }}
      {% if item.link_url %}<a href="{{ item.link_url }}">{{ item.link_text }}</a>.{% endif %}
    </p>
  </details>
  {% endfor %}
</section>

<section class="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Get in touch</h2>
  <p>The fastest path in is a 20-minute call. Email works too, though a booked call skips a round trip.</p>
  <div class="cta-group">
    <a class="btn btn-primary" href="{{ site.data.contact.calendly }}">Book a 20-minute call</a>
    <a class="btn" href="mailto:{{ site.data.contact.email }}">{{ site.data.contact.email }}</a>
  </div>
</section>
