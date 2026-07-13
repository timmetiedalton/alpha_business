# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing website for Alpha Business (alphabusiness.nu), a Dutch-language course connecting faith and entrepreneurship, based in Lisse, NL. Plain HTML/CSS/JS, no build step, no framework, no package manager.

Hosted on GitHub Pages with a custom domain configured via `CNAME`, currently `hvlt.nl` while the site is in development. The site's own footer/meta text already refers to the eventual production domain `alphabusiness.nu` — that's intentional, not a bug; `CNAME` should be switched to `alphabusiness.nu` once the site goes live there. Pushing to `main` deploys automatically and is immediately visible to visitors of the current `CNAME` domain — there is no staging environment and no CI. Treat every commit to `main` as a production deploy.

## Commands

There is no build, lint, or test tooling — no `package.json`, no bundler. To preview changes, open the HTML files directly in a browser or serve the directory locally, e.g.:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

## Architecture

- Every page is a fully self-contained `.html` file at the repo root (`index.html`, `wat-we-doen.html`, `agenda.html`, `team.html`, `ervaringen.html`, `partners.html`, `contact.html`, `training-detail.html`) sharing one stylesheet (`css/style.css`) and one script (`js/main.js`). There are no templates or includes — shared markup (nav, footer) is duplicated across every page, so structural nav/footer changes must be applied to each HTML file individually.
- `css/style.css` is a single stylesheet for the whole site, organized in commented sections (Reset, Typography, Layout, Navigation, Buttons, Hero, per-page component blocks, Responsive at the bottom). Design tokens (colors, fonts, radius, shadow) live in `:root` CSS variables — reuse these vars rather than hardcoding values. Responsive breakpoints (1024px, 900px, 640px) are consolidated in dedicated `@media` blocks at the end of the file rather than inline per component.
- `js/main.js` is small and handles exactly three things: mobile nav hamburger toggle, active-nav-link highlighting based on `location.pathname`, and fake-submit handling for forms marked `data-form="..."` (contact, ervaring/testimonial, registration). Form submission is currently simulated client-side (shows a canned "Bedankt!" thank-you message after a timeout) — there is no real backend; wiring a real endpoint (Formspree/Netlify Forms/etc.) is a TODO called out directly in the code.
- Content is in Dutch. Some content is intentionally placeholder/bogus for early sharing of the concept (e.g. Lorem ipsum testimonials in `index.html`/`ervaringen.html`) — check with the user before treating placeholder copy as final.
- Images live under `images/` (site icons/favicons at top level, `images/partners/` for partner logos, `images/team/` for team headshots). Partner and team members are added as new cards in the corresponding HTML page plus an image asset — there's no data-driven list to update.
