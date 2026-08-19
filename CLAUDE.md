# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jekyll-based personal blog for ryanlitalien.com, hosted on GitHub Pages.

## Development Commands

```bash
# Install dependencies
bundle install

# Serve locally with live reload (http://localhost:4000)
bundle exec jekyll serve

# Build static site (outputs to _site/)
bundle exec jekyll build
```

Note: Changes to `_config.yml` require restarting the server.

## Architecture

- **_posts/**: Blog posts in Markdown with YAML front matter, publish at `/posts/<slug>/`
- **_layouts/**: `base.html` (the shell for every page) and `post.html` (articles, wraps `base`)
- **_includes/**: Reusable components (nav, head, site footer with Plausible analytics)
- **assets/**: `site.css` (the single design system) + `theme.js`, plus images

## Key Configuration

- `_config.yml`: Site settings, theme configuration
- `Gemfile`: Ruby dependencies (github-pages gem)
- `.ruby-version`: Ruby 3.3.0
- `CNAME`: Custom domain (www.ryanlitalien.com)

## Creating New Posts

Posts go in `_posts/` with filename format: `YYYY-MM-DD-title.md`

Required front matter:
```yaml
---
layout: post
title: "Post Title"
---
```
