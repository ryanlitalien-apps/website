---
layout: base
title: "Posts - Ryan L'Italien"
description: "Everything Ryan L'Italien has written: viewer apps, studio infrastructure, virtual production, race reports, and engineering notes from 2012 to now."
permalink: /posts/
---

<section class="hero">
  <h1>Posts</h1>
  <p class="tagline"><strong>Writing from 2012 to now.</strong></p>
</section>

<section aria-labelledby="all-posts-heading">
  <h2 id="all-posts-heading" class="sr-only">All posts</h2>
  <ul class="post-list">
    {% for post in site.posts %}
    <li><span class="post-date">{{ post.date | date: "%b %Y" }}</span> <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</section>
