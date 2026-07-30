# AGENTS.md

## Project Overview

Realm Properties is a Vue 3 + Vite + TypeScript real estate app. The product direction is a single application with two surfaces:

- Public boutique real estate site: brand, curated properties, story, and contact conversion.
- Private admin section under `/admin`: users, properties, traces/audit activity, and internal workflows.

Build public pages first, but keep the structure compatible with a future Firebase-backed admin.

## Stack

- Vue 3 with `<script setup lang="ts">`
- Vite
- Vue Router
- Tailwind CSS
- Firebase Auth, with Firebase data services expected later
- Pinia is installed and should be used when state becomes shared across views
- GSAP is installed; use it sparingly for meaningful polish, not core flow

## Commands

- `npm run dev` starts the Vite dev server with host binding.
- `npm run build` runs type checking through `vue-tsc` and creates the production build.
- `npm run preview` previews the built app.

Before marking implementation work complete, run `npm run build` unless the change is documentation-only.

## Product Rules

- Keep one project. Do not split admin into a separate app unless explicitly requested.
- Public routes should feel like a boutique real estate brand, not a generic template.
- Admin routes should be practical, dense, and operational.
- Keep the existing Realm Properties identity, but avoid copy that makes the real estate purpose unclear.
- Do not build a landing page that only describes features; make the first screen useful and inspectable.
- Property data should be shaped so it can later move from local fixtures to Firebase without rewriting views.

## Routing Direction

- Public routes: `/home`, `/about`, `/properties`, `/contact`, and property detail routes when added.
- Auth routes: `/login`, `/register`.
- Admin routes: `/admin` and nested routes such as `/admin/properties`, `/admin/users`, `/admin/traces`.
- Admin routes must eventually use Firebase Auth route guards.
- Prefer browser history for a deployed web app unless there is a specific reason to keep memory history.

## Code Style

- Follow existing Vue single-file component patterns.
- Use TypeScript types for shared entities such as properties, users, roles, and trace records.
- Keep components focused. Move reusable business logic into composables or stores when it becomes shared.
- Prefer Tailwind utilities already used in the project. Add scoped CSS only for component-specific needs.
- Avoid hardcoded remote stock images in final UI. Use project assets, generated assets, or stable curated image data.
- Keep comments short and only where they explain non-obvious decisions.

## Firebase And Data

- Do not commit new secrets. Existing Firebase config is public client config; keep privileged credentials out of the repo.
- Keep auth behavior explicit: login/register should redirect intentionally and handle provider errors.
- When adding Firestore or Storage, centralize Firebase exports in `src/firebase.ts` or a small Firebase module.
- Add typed mappers for data that crosses the Firebase boundary.

## Design Direction

- Public UI can use the medieval/fantasy brand flavor through typography, tone, and selective ornament.
- Do not let fantasy styling reduce clarity, accessibility, or trust.
- Admin UI should use a restrained palette, compact spacing, tables/lists/forms, and clear actions.
- Ensure text fits on mobile and desktop. Avoid oversized type in dense panels.
- Use real estate signals early: property images, location, price, status, and contact actions.

## Quality Gates

- Run `npm run build` after code changes.
- Verify navigation manually when touching router, auth, or layouts.
- Check responsive behavior for any new public or admin view.
- Add focused tests when adding route guards, composables, stores, or non-trivial data transforms.

## Current Priorities

1. Clean up app routing and layout boundaries.
2. Build the public boutique site experience.
3. Add local typed property data and a strong properties view.
4. Add property detail pages.
5. Add `/admin` shell and route protection.
6. Add admin property management, users, and traces.
