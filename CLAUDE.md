# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Jekyll-based marketing website for Alpha Business (alphabusiness.nu), a Dutch-language course connecting faith and entrepreneurship, based in Lisse, NL.

Hosted on GitHub Pages with a custom domain configured via `CNAME`, currently `hvlt.nl` while the site is in development. The site's own footer/meta text already refers to the eventual production domain `alphabusiness.nu` — that's intentional, not a bug; `CNAME` should be switched to `alphabusiness.nu` once the site goes live there. Pushing to `main` triggers `.github/workflows/pages.yml`, which builds with `actions/jekyll-build-pages` and deploys with `actions/deploy-pages` — there is no staging environment. Treat every commit to `main` as a production deploy. Note: the GitHub repo's Pages source setting must be "GitHub Actions" (not "Deploy from a branch") for this workflow to actually publish.

## Commands

No `package.json`/npm — this is a Ruby/Jekyll site. To build or preview locally you need Jekyll installed (`gem install jekyll`, or `bundle exec jekyll ...` if a Gemfile is added later):

```
jekyll build --destination /tmp/_site   # one-off build, check output
jekyll serve                            # local preview with live reload
```

Then visit `http://localhost:4000`. There is no lint/test suite — verify changes by building and diffing/eyeballing the rendered `_site/` output.

## Architecture

- Pages are per-route `.html` files at the repo root (`index.html`, `wat-we-doen.html`, `agenda.html`, `team.html`, `ervaringen.html`, `partners.html`, `contact.html`, `training-detail.html`), each with YAML front matter (`layout: default`, `title`, `description`) followed by only the page's unique body content — no more duplicated nav/head/footer per file.
- `_layouts/default.html` wraps every page: the shared `<head>` (favicons, `css/style.css`), `{% include nav.html %}`, `{{ content }}`, the shared footer, and `js/main.js`. Edit this file for any change to head/footer markup that should apply site-wide.
- `_includes/nav.html` holds the shared nav bar (logo, hamburger button, nav links) — edit this file, not individual pages, for nav changes.
- `wat-we-doen.html` has page-specific CSS (the `.offering-card` styles) passed through front matter as a YAML block-literal `extra_style`, which `_layouts/default.html` conditionally renders into a `<style>` tag in `<head>`. This is the pattern to follow if another page ever needs page-scoped CSS.
- `_config.yml` is intentionally minimal (title, description, lang, excludes `CLAUDE.md` from the build). No plugins are configured, so `actions/jekyll-build-pages` can build with the default `github-pages` gem bundle without a `Gemfile`.
- `css/style.css` is a single stylesheet for the whole site, organized in commented sections (Reset, Typography, Layout, Navigation, Buttons, Hero, per-page component blocks, Responsive at the bottom). Design tokens (colors, fonts, radius, shadow) live in `:root` CSS variables — reuse these vars rather than hardcoding values. Responsive breakpoints (1024px, 900px, 640px) are consolidated in dedicated `@media` blocks at the end of the file rather than inline per component.
- `js/main.js` is small and handles exactly three things: mobile nav hamburger toggle, active-nav-link highlighting based on `location.pathname` (still works unchanged since page URLs/filenames are unchanged by the Jekyll conversion), and fake-submit handling for forms marked `data-form="..."` (contact, ervaring/testimonial, registration). Form submission is currently simulated client-side (shows a canned "Bedankt!" thank-you message after a timeout) — there is no real backend; wiring a real endpoint (Formspree/Netlify Forms/etc.) is a TODO called out directly in the code.
- Content is in Dutch. Some content is intentionally placeholder/bogus for early sharing of the concept (e.g. Lorem ipsum testimonials in `index.html`/`ervaringen.html`) — check with the user before treating placeholder copy as final.
- Images live under `images/` (site icons/favicons at top level, `images/partners/` for partner logos, `images/team/` for team headshots). Partner and team members are added as new cards in the corresponding HTML page plus an image asset — there's no data-driven list to update.
