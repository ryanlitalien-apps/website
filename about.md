---
layout: base
title: "About - Ryan L'Italien"
description: "Fractional CTO and forward deployed engineer: payments infrastructure, enterprise AI, and game-dev infrastructure, from startups to Fortune 100."
permalink: /about/
---

<section class="hero">
  <h1>About</h1>
  <p class="tagline"><strong>Fractional CTO &amp; forward deployed engineer for companies whose growth runs through partners, integrations, and AI.</strong></p>
</section>

<section class="about-bio" aria-labelledby="bio-heading">
  <h2 id="bio-heading" class="sr-only">Background</h2>
  <p>20+ years shipping greenfield, legacy and innovative production code, startups to Fortune 100: payments infrastructure at platform scale, enterprise AI that closed $21M+ deals, game-dev infrastructure from 2-person studios to Disney, Epic Games, EA and Ubisoft.</p>
  <p>Founder of ButterStack, CoachView, FirstChair and others.</p>
  <p>I read, review and ask questions before I solution, and I ship, not just advise (or maybe a combination of all of the above).</p>
  <p>Bring your hard partners, integrations, or AI problems and we&rsquo;ll tackle them together.</p>
</section>

<section class="certifications" aria-labelledby="certifications-heading">
  <h2 id="certifications-heading">Certifications</h2>
  <p class="certification">
    <a href="https://achieve.snowflake.com/a1762c54-0a20-4dff-ba46-bce977554591" title="SnowPro Core Certification, verify credential">
      <img class="cert-badge" src="/assets/img/snowpro-core-badge.png" alt="SnowPro Core Certification badge">
    </a>
    <a href="https://achieve.snowflake.com/a1762c54-0a20-4dff-ba46-bce977554591" title="SnowPro Core Certification, verify credential">SnowPro Core Certification, Snowflake. Issued Dec 2024, valid through Dec 2026.</a>
  </p>
  <p><a href="https://aws.amazon.com/certification/certified-solutions-architect-associate/">AWS Certified Solutions Architect, Associate</a>. Coming soon.</p>
  <p><a href="https://anthropic-partners.skilljar.com/claude-certified-associate-foundations-certification">(Anthropic) Claude Certified Associate, Foundations</a>. Coming soon.</p>
</section>

<section class="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Get in touch</h2>
  {% if site.data.contact.booking != empty %}
  <p>The fastest path in is a 20-minute call. Email works too, though a booked call skips a round trip.</p>
  {% else %}
  <p>Email is the fastest path in for now.</p>
  {% endif %}
  <div class="cta-group">
    {% if site.data.contact.booking != empty %}
    <a class="btn btn-primary" href="{{ site.data.contact.booking }}">Book a 20-minute call</a>
    <a class="btn" href="mailto:{{ site.data.contact.email }}">{{ site.data.contact.email }}</a>
    {% else %}
    <a class="btn btn-primary" href="mailto:{{ site.data.contact.email }}">Email me about your project</a>
    {% endif %}
  </div>
</section>
