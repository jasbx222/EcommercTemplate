# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MatDash — a free Tailwind + Next.js admin dashboard template (by Adminmart, distributed via ThemeWagon). It is a UI showcase/template: all data (blog posts, tickets, notes, dashboard stats) is static/mocked in `src/app/data/*.ts`, and there is no real backend or auth — login/register pages exist but do not authenticate against anything.

## Commands

```bash
npm run dev      # start dev server (next dev)
npm run build    # production build — outputs a static export (see next.config.mjs)
npm run start    # serve the production build
npm run lint     # next lint
```

There is no test suite configured in this repo.

## Architecture

**Static export target.** `next.config.mjs` sets `output: 'export'`, `basePath`/`assetPrefix: '/matdash-nextjs'`, and `images: { unoptimized: true }`. The app is built as static HTML (deployed to GitHub Pages / Netlify — see `netlify.toml`), so anything requiring a Node server at runtime (API routes, SSR-only features, dynamic image optimization) will not work as expected.

**Route groups.** Under `src/app`:
- `(DashboardLayout)/` — the authenticated-app shell. Its `layout.tsx` renders the persistent `Sidebar` + `Header` chrome around every page in this group (dashboard home, `apps/*`, `icons/*`, `sample-page/*`, `user-profile/*`, `utilities/*`).
- `auth/` — `login` and `register` pages, rendered outside the dashboard shell (no sidebar/header).

Route-group folders (parenthesized) don't appear in the URL path.

**Component split** mirrors two roots — don't confuse them:
- `src/app/components/**` — feature/page-specific components (dashboard widgets, apps/blog, apps/notes, apps/tickets, auth forms, user-profile, shared). Import via `@/app/components/...`.
- `src/components/ui/**` — generic shadcn/ui primitives (button, dialog, table, etc.), generated per `components.json` (style: new-york, baseColor: neutral). Import via `@/components/ui/...`. Regenerate/add new primitives with the shadcn CLI rather than hand-rolling.
- `src/lib/utils.ts` — the shadcn `cn()` class-merge helper.

Path alias: `@/*` → `src/*` (see `tsconfig.json`).

**Layout internals** live under `src/app/(DashboardLayout)/layout/`:
- `sidebar/Sidebaritems.ts` — the single source of truth for sidebar navigation (headings → items → nested children), each with `icon` (Iconify string, e.g. `solar:widget-add-line-duotone`), `url`, and an `isPro` flag used to badge/gate premium-only template items. Add new nav entries here.
- `header/` — top header, notifications dropdown, profile dropdown.
- `shared/logo`, `shared/breadcrumb` — reusable chrome pieces.

**Icons**: Iconify (`@iconify/react`, `<Icon icon="solar:..." />`) is used for most UI icons per `Sidebaritems.ts` convention; `lucide-react` and `@tabler/icons-react` are also present and used inside shadcn/ui components. `(DashboardLayout)/icons/solar` is a page that showcases the Solar icon set.

**Charts**: built with `apexcharts`/`react-apexcharts`. Always import via `next/dynamic` with `{ ssr: false }` (e.g. `src/app/components/dashboard/TotalIncome.tsx`) — ApexCharts touches `window` and breaks server rendering / static export otherwise. Chart colors typically reference CSS theme variables (`var(--color-error)`, etc.) rather than hardcoded hex.

**Mock data & "apps"**: `apps/blog`, `apps/notes`, `apps/tickets` each pair a page under `(DashboardLayout)/apps/*` with static data in `src/app/data/*.ts`. Blog additionally has a React Context provider (`src/app/context/BlogContext`) that simulates async fetching over the static array (`setLoading` wrapping local data); notes/tickets currently read their static data directly without a context layer. Follow the existing pattern for whichever app you're extending rather than wiring in a real API.

**Styling**: Tailwind CSS v4 (`@import 'tailwindcss'` in `src/app/css/globals.css`, no `tailwind.config.*` — theme is defined via `@theme` blocks and CSS files). Theme tokens are layered from:
- `theme/default-colors.css` / `theme/dark-colors.css` — light/dark color variables (dark mode toggled via the `dark` class, see `@custom-variant dark`)
- `layouts/container.css`, `layouts/sidebar.css`, `layouts/header.css` — layout-specific utility layers
- `override/reboot.css` — base element resets
- `app.css` — remaining custom styles

Dark mode is handled by `next-themes` (`src/components/theme-provider.tsx`, `attribute='class'`, `defaultTheme='system'`), wired in the root `layout.tsx`.

**Redux Persist** (`redux-persist`) is a listed dependency but no store is currently wired up anywhere in `src` — don't assume global Redux state exists; check before relying on it.
