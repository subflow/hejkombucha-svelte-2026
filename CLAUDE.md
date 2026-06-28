# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for "Hej Kombucha", a Swedish kombucha company in Örebro. All user-facing
content is in Swedish.

This is a **SvelteKit 2 / Svelte 5** app. The previous static HTML/CSS/JS site
lives in `html-version/` and is the **visual source of truth** — the Svelte pages
are ported to match it. It is a legacy reference only and is not built or served.

The marketing pages (home, `/stores`, `/about`) and the blog live under the
`src/routes/(site)/` route group, which wraps them in shared `Header`/`Footer`
(`src/lib/components/`). `/admin` sits outside that group so the CMS renders
chrome-free.

## Commands

Package manager is **Bun** (`bun.lock`, `engine-strict=true`). Use `bun` / `bunx`.

```sh
bun install
bun run dev        # vite dev server
bun run build      # production build (adapter-node)
bun run preview    # serve the production build
bun run check      # svelte-kit sync + svelte-check (type checking)
bun run lint       # prettier --check . && eslint .
bun run format     # prettier --write .
```

No test framework is configured. There is no single-test command.

## Architecture

- **Framework**: SvelteKit 2 with Svelte 5 runes (`$props`, `$state`, `{@render ...}`).
  Deployed via `@sveltejs/adapter-node`.
- **Styling**: Tailwind CSS 4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js`;
  config is CSS-first in `src/app.css`). `app.css` defines the brand design system in a
  Tailwind `@theme` block — colors `brand` (#f24440), `cream` (#f3f5f0), `ink` (#333),
  fonts `display` (Space Grotesk) / `body` (Roboto Mono), and an `xs` breakpoint — plus
  component classes (`.btn`, `.link`, `.card`, `.social`, `.markdown`, `.field`) that
  recreate the original `sb-*`/`colors-*` system. Note: a stray/malformed CSS comment
  before `@theme` silently disables the whole block, so keep comments well-formed.
- **Markdown**: `mdsvex` (configured in `svelte.config.js`) processes `.md`/`.svx`.
  `.md` and `.svx` are registered as Svelte component extensions, so markdown files
  compile to components.

### Blog (markdown content pipeline)

- Posts are markdown files with YAML frontmatter in `src/content/blog/`,
  named `YYYY-MM-DD-slug.md` (fields: `title`, `date`, `description`, `image`, body).
- `src/routes/blog/+page.js` builds the index by eagerly globbing
  `import.meta.glob('../content/blog/*.md')`, reading each file's `metadata`, and
  sorting by date descending.
- `src/routes/blog/[slug]/+page.js` dynamically `import()`s the matching markdown
  file by slug; missing slug → `error(404)`.
- mdsvex applies the `blog` layout (`src/lib/BlogLayout.svelte`) to rendered posts.
  Post heading/prose styling lives in that layout's `<style>` block.

### Content management (CMS)

- `/admin` route (`src/routes/admin/+page.svelte`) loads **Sveltia CMS** at runtime
  from unpkg (`onMount`).
- CMS config: `static/admin/config.yml`. Backend is **GitHub** (`repo: jonas/hejkombucha2025`);
  editors commit markdown directly to `src/content/blog/`. Media uploads go to `static/images`.
- Note: the config's `pages` collection references `src/content/pages/about.md`, which
  does not exist yet.

## Conventions

- `bun run lint` enforces Prettier (incl. `prettier-plugin-svelte` and
  `prettier-plugin-tailwindcss` for class sorting) plus ESLint. Run `bun run format`
  before committing.
- Path alias `$lib` → `src/lib`.
- New routes follow SvelteKit file-based routing under `src/routes/`; static assets
  served from `static/` at the site root.

## Contact info (used in site content)

- Email: yo@hejkombucha.se · Phone: +46704171239 · Address: Lindbacka 403, 705 93 Lindbacka
