# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sporky is a Nuxt 4 / Vue 3 app that shows a user's top Spotify tracks across time ranges, with audio preview playback and shareable cards. Auth is Spotify OAuth (cookie-based Bearer tokens).

## Commands

```bash
yarn dev            # HTTPS dev server on :3000 — REQUIRED for Spotify OAuth (redirect URI must be https)
yarn dev:http       # plain HTTP dev (no OAuth callback)
yarn generate-cert  # create cert/localhost*.pem — run once before yarn dev
yarn build          # production build
yarn generate       # static generation
yarn preview        # preview built output
yarn type-check     # nuxt typecheck (TypeScript validation)
yarn lint           # prettier --write . (lint == format here; no ESLint runner wired despite eslint config files)
yarn lint:check     # prettier --check .
```

No test runner is configured. There are no tests.

### First-time setup

`cp .env.example .env` then set `NUXT_CLIENT_ID`, `NUXT_CLIENT_SECRET`, `NUXT_BASE_URL=127.0.0.1:3000`. Add `https://127.0.0.1:3000/api/callback` to Redirect URIs in the Spotify dashboard (Spotify's 2025 policy rejects `localhost` as an insecure redirect — use the loopback IP). Run `yarn generate-cert`, then `yarn dev`, and open the app at `https://127.0.0.1:3000`.

## Architecture

Strict 4-layer separation — keep responsibilities in their layer:

```
Components (UI only) → Pages (orchestration) → Stores (business logic) → Composables (API + DTO mapping)
```

- **Components** — display, interactions, emit events. No API calls.
- **Pages** (`pages/`) — call store methods, manage UI state.
- **Stores** (`stores/`) — Pinia composition-API stores; state, validation, business logic.
- **Composables** (`composables/`) — all HTTP, DTO→domain mapping, centralized error handling.

### Key files

- `stores/sporky.ts` — main state (tracks per time range, audio player state).
- `composables/useSpotifyApi.ts` — Spotify API integration; the only place `$fetch` to Spotify lives.
- `composables/useErrorHandler.ts` / `useShare.ts` — error normalization and share-card export (html2canvas).
- `server/api/callback.ts` — OAuth callback (token exchange).
- `utils/mapper.ts` — `mapTrackToSong` DTO→domain mapping.
- `utils/const.ts` — API base, OAuth scopes, constants.
- `types/index.ts` — shared interfaces.

### Conventions (enforced by .github/copilot-instructions.md)

- Never call `$fetch` to Spotify directly from components/stores — go through a composable.
- Auth: cookie-stored access token, sent as `Authorization: Bearer ${token}`.
- Props/events: named interfaces, destructured `defineProps` (no `withDefaults`); events typed `'event-name': [arg: T]`.
- Stores: Pinia composition API (`defineStore('name', () => { ... })`); expose refs via `storeToRefs`.
- Track preview URLs may be `null` from the top-tracks endpoint and get enriched via a follow-up `getTracks` call by ID.

## Config notes

- `runtimeConfig`: `public.clientId` + `public.redirectUri` (built from `NUXT_PROTOCOL`/`NUXT_BASE_URL`); private `clientSecret`.
- `dev` script sets `NODE_TLS_REJECT_UNAUTHORIZED=0` for the self-signed cert.
- Modules: `@nuxtjs/tailwindcss`, `@pinia/nuxt`. Styling is Tailwind. CSS entry `~/assets/css/main.css`.
