# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for "Hej Kombucha", a Swedish kombucha company in Örebro. All user-facing
content is in Swedish.

This is a **SvelteKit 2 / Svelte 5** app. The previous static HTML/CSS/JS site
lives in `html-version/` and is now a legacy reference only — it is not built or
served. The SvelteKit migration is in progress: the homepage (`src/routes/+page.svelte`)
is still the default SvelteKit welcome page.

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
  config is CSS-first in `src/app.css`, which imports Tailwind and the typography plugin).
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
