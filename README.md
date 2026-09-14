# ryanlitalien.com

Personal blog built with Jekyll and hosted on GitHub Pages.

## Setup

```bash
# Install Ruby 3.3.0 (via rbenv, asdf, or similar)
rbenv install 3.3.0

# Install dependencies
bundle install
```

## Development

```bash
# Start local server at http://localhost:4000
bundle exec jekyll serve
```

## Tests

There are two test scripts, both run in CI on every push and pull request (`.github/workflows/test.yml`).

```bash
# Builds a temp copy of the site with fixture posts and checks the rendered
# HTML for the mermaid opt-in behavior
bash test/mermaid_test.sh

# Unit tests for the theme-selection logic in _includes/mermaid.html
node --test test/*.mjs
```

## Deployment

Push to `main` branch. GitHub Pages automatically builds and deploys to www.ryanlitalien.com.

## Writing Posts

Create a new file in `_posts/` with format `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Your Post Title"
---

Your content here...
```
