<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Single Next.js 16 (App Router) app named `contractor-timecard`; npm project (see `package.json` scripts). Fully client-side (React `useState` only) — no database, backend, auth, or env vars needed to run or test.
- Run the dev server with `npm run dev` (Turbopack) at http://localhost:3000. Build/lint/prod-start use the standard `npm run build` / `npm run lint` / `npm run start`.
- `npm run lint` currently reports 2 pre-existing errors in `app/page.tsx` (`prefer-const`, `no-explicit-any`); these are in the app code, not an environment problem.
