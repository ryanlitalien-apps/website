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

## Deployment

Push to `master` branch. GitHub Pages automatically builds and deploys to www.ryanlitalien.com.

## Writing Posts

Create a new file in `_posts/` with format `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Your Post Title"
---

Your content here...
```
