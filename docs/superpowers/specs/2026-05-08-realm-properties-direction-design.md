# Realm Properties Direction Design

## Product Direction

Realm Properties will be a single Vue application with two surfaces:

- A public boutique real estate site focused on brand, curated listings, story, and contact conversion.
- A private `/admin` section for operational work: properties, users, traces/audit activity, and future internal workflows.

The public site is the first visible product experience. The admin section is part of the same app, but should be built behind authentication and route guards once the public structure and shared data model are stable.

## Recommended Approach

Use a lightweight version of the shared-base approach:

1. Keep one Vue + Vite + TypeScript project.
2. Separate public and admin routes clearly.
3. Introduce layouts when the screens need different navigation and density.
4. Build the public site first, using data structures that the future admin can own.
5. Add admin features incrementally: property CRUD, user management, trace/audit views, and role-based access.

This avoids building a polished public site that later has to be rewired, while still allowing visible progress early.

## Architecture Notes

- Public routes should remain approachable and brand-forward: Home, About, Properties, Contact.
- Admin routes should live under `/admin` and use a denser operational UI.
- Firebase Auth is already present and should become the source of admin access.
- Firestore or another Firebase data service can later store properties, users, and trace records.
- Shared types should be introduced before duplicating property/user structures across views.

## UX Direction

The project currently has a fantasy/medieval identity through fonts and copy. Keep that personality, but make the real estate value clear:

- Use "Realm Properties" as the brand anchor.
- Prefer elegant boutique language over joke-heavy fantasy text.
- Make properties inspectable with real fields: price, location, type, status, bedrooms, bathrooms, area, images, and description.
- Keep the admin calmer and more utilitarian than the public site.

## Near-Term Scope

The next useful build steps are:

1. Clean up routing and decide where login appears.
2. Create a public landing/home experience.
3. Build a property listing view with local sample data.
4. Add property detail routing.
5. Add `/admin` shell behind Firebase Auth.
6. Move sample data toward Firebase-backed CRUD when the UI shape is clear.

## Testing And Verification

- Run `npm run build` before considering feature work complete.
- Add tests when logic moves into composables, stores, route guards, or data mappers.
- Manually verify mobile and desktop layouts for public pages and admin pages.
