# Base44 App — TanStack Start

A full-stack Base44 app: TanStack Start (React 19, plain JavaScript) with file-based routes, server functions and server routes, server-rendered and hosted by Base44.

## cPanel static deployment

This branch (`migration/static-cpanel`) enables TanStack Start SPA mode for Apache/cPanel hosting. The invitation still renders in the browser, so its intro sequence, Framer Motion animations, gallery/lightbox, countdown, navigation, and background music remain client-side features.

1. Use Node.js 22 or newer and run `npm ci`.
2. Make the same public Base44 app configuration available at build time that the project uses for its SDK client. The app reads `VITE_BASE44_APP_ID`, `VITE_BASE44_APP_BASE_URL`, and optionally `VITE_BASE44_FUNCTIONS_VERSION`.
3. Run `npm run build`.
4. Upload the **contents** of `dist/client/` into the target domain's `public_html/` directory. Include the hidden `.htaccess` file.
5. Do not upload `dist/server/`, `node_modules/`, source files, or `.env` files.

The `public/.htaccess` file sets `/_shell.html` as the SPA fallback so direct visits and refreshes of client-side routes work on Apache. A GitHub Actions workflow also builds the project and publishes `dist/client/` as a short-lived artifact.

**Static-hosting boundary:** cPanel serves the frontend files; it does not run TanStack server functions or server routes. The guest invitation no longer uses the RSVP or wishes sections, and their former server-backed summary is not part of this static build. The decoration studio and authentication still call the existing Base44 service from the browser, so those features require the original Base44 app to remain active, valid app configuration at build time, and working Base44 permissions/CORS. This branch does not move Base44 data or privileged server logic onto cPanel.

For the original full-stack Base44 deployment, use the standard instructions below.

## What is in the starter

| Route | File |
| --- | --- |
| `/` | `src/routes/index.jsx` — the invitation |
| `GET /api/time` | `src/routes/api/time.js` — a server route available only on a server-capable deployment, not on static cPanel |

## Run locally

```bash
npm ci
base44 login   # one-time per machine
base44 link    # one-time per clone
base44 dev     # local backend + app together
```

## Build and publish

```bash
npm run build         # -> dist/client (static shell/assets) + dist/server (Worker output)
base44 deploy         # or publish from the Base44 builder
```

There is no hand-authored `index.html`: TanStack Start generates the document shell from `src/routes/__root.jsx`. The build runs through the Cloudflare Vite plugin, so dev and build both execute server code in `workerd`.

## How the pieces fit

- **Pages** are files in `src/routes/`. A route's `loader` runs on the server for a document request and in the browser for a client navigation; `Route.useLoaderData()` gives the component the resolved data.
- **Server functions** (`src/lib/server-fns.js`) are RPCs created with `createServerFn`. `src/start.js` runs every one of them through `authMiddleware`, which sends the visitor's token along, so `context.getBase44()` returns a client acting as that visitor and entity access rules apply. `context.getBase44().asServiceRole` bypasses them, so use it only after authenticating the caller (`.middleware([requireUser])`) and checking they may access the records involved: server functions and server routes are public endpoints anyone can call with any input. See **Server Security** in `AGENTS.md`.
- **Secrets** are read in server code with `import { secrets } from "base44:runtime"` and `secrets.get("NAME")`, inside a handler. Never `process.env`.
- **Server routes** (`src/routes/api/*.js`) are raw HTTP endpoints for URLs something other than the app's own code requests (webhooks, downloads, feeds); the app's pages call server functions.
- **Server-only code** lives in `*.server.js` files (TanStack refuses to bundle them for the browser).
- **Auth** is resolved client-side after hydration (`useAuth()`).
- **Sign-in and gated pages** live in `src/components/auth/` and the auth routes.
- **AI**: TanStack AI is installed and runs on the Base44 AI gateway, with no API key and usage billed to the app's AI credits.
- **Caching**: the platform caches only what a route opts into via `headers()` (`Cache-Control: public, s-maxage=…`). Everything else is served fresh.