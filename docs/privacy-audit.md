# Privacy & cookie audit — Sporky

_Last updated: 2026-10-08. Derived from the source code only; items marked **(verify)** could not be confirmed from the repo._

## 1. Stack

| Aspect                            | Finding                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| Framework                         | Nuxt 4 / Vue 3, SSR (Nitro server), file-based routing (`pages/`)                                  |
| Global head                       | `nuxt.config.ts` → `app.head` (meta, favicons, Google Fonts `<link>`s)                             |
| Shared layout                     | `layouts/default.vue` (sidebar + top nav); `pages/login.vue` uses `layout: false`                  |
| Styling                           | Tailwind (`tailwind.config.ts`, tokens from `DESIGN.md`), dark-only UI, Inter + Material Symbols   |
| i18n                              | **None.** English only, `<html lang="en">`                                                         |
| Existing consent/privacy solution | **None.** `pages/login.vue` mentions "Terms of Service and Privacy Policy" but neither page exists |
| Hosting                           | Not declared in the repo (no `vercel.json`, `netlify.toml`, etc.) **(verify)**                     |

## 2. Inventory

### 2.1 Cookies (first-party)

| Name                  | Set by                       | Purpose                                                                   | Duration                                           | Category           | httpOnly                              |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- | ------------------ | ------------------------------------- |
| `sporky_access_token` | `server/api/callback.ts`     | Spotify OAuth access token; authenticates API calls made from the browser | `expires_in` from Spotify (typically 3600 s = 1 h) | Strictly necessary | No (read client-side to call Spotify) |
| `spotify_oauth_state` | `stores/sporky.ts` (`login`) | OAuth `state` value                                                       | Session (no `maxAge`)                              | Strictly necessary | No                                    |

No `localStorage`, `sessionStorage` or IndexedDB usage found in project code. The refresh token returned by Spotify is discarded (not stored).

### 2.2 Third-party resources

| Service                                      | Provider                    | Where                                                                                                             | Purpose                                                         | Data sent                                                                      | Cookies                                                                         | Extra-EU                                         | Category                                                                                                                              |
| -------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Google Fonts (Inter, Material Symbols)       | Google LLC / Google Ireland | `nuxt.config.ts` `app.head.link` (`fonts.googleapis.com`, `fonts.gstatic.com`)                                    | Typography & icons                                              | IP address, User-Agent, Referer on **every page load, before any interaction** | None set (per Google Fonts FAQ)                                                 | Possible (US); Google is DPF-certified           | Not necessary — **replaceable by self-hosting**                                                                                       |
| Spotify Accounts                             | Spotify AB (Sweden)         | `stores/sporky.ts` (authorize redirect), `server/api/callback.ts` (token exchange)                                | Login via OAuth                                                 | OAuth code, client credentials (server→Spotify)                                | Spotify sets its own cookies on `accounts.spotify.com` (its domain, its policy) | Spotify AB is EU; sub-processors may be extra-EU | Necessary for the service                                                                                                             |
| Spotify Web API                              | Spotify AB                  | `composables/useSpotifyApi.ts` (`/me`, `/me/top/tracks`, `/tracks`)                                               | Fetch profile and top tracks — called directly from the browser | Access token, IP                                                               | None                                                                            | as above                                         | Necessary                                                                                                                             |
| Spotify CDN (covers, avatars, 30 s previews) | Spotify AB                  | `<img :src>` in `TrackCard.vue`, `index.vue`, `track/[id].vue`, `AppTopNav.vue`; `<audio>` in `useAudioPlayer.ts` | Display artwork / play previews                                 | IP, User-Agent                                                                 | None known                                                                      | as above                                         | Necessary (core feature, only after login). Avatar URLs can point to a Facebook CDN for Facebook-linked Spotify accounts **(verify)** |
| Link to `open.spotify.com`                   | Spotify AB                  | `pages/track/[id].vue`                                                                                            | Outbound link                                                   | Only on click                                                                  | —                                                                               | —                                                | n/a                                                                                                                                   |

**Not found:** analytics (GA/GTM/Matomo/Plausible…), pixels, chat widgets, A/B testing, heatmaps, iframes/embeds, CDNs for JS, forms, newsletter, captcha, payments, error tracking (Sentry etc.).

### 2.3 Personal data processed

| Data                                                                   | Source               | Where it lives                                                                        | Retention                            |
| ---------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------ |
| Access token                                                           | Spotify OAuth        | Cookie in user's browser; passes through the Nitro server only during `/api/callback` | ~1 h (cookie expiry) or until logout |
| Spotify profile (`display_name`, `country`, `product`, `images`, `id`) | `GET /me`            | Browser memory (Pinia), not persisted                                                 | Until tab closed / logout            |
| Top tracks                                                             | `GET /me/top/tracks` | Browser memory                                                                        | Until tab closed / logout            |
| IP address, User-Agent                                                 | Every HTTP request   | Hosting provider access logs **(verify)**; Google Fonts; Spotify                      | Per provider                         |

No database, no server-side storage, no server-side logging of user data in project code.

## 3. Assessment

- All cookies set by the site are **strictly necessary** (art. 122 Codice Privacy / art. 5(3) ePrivacy exemption). No analytics or profiling.
- **A consent banner is not legally required** for the cookies. The only non-necessary third-party transfer is **Google Fonts** (IP sent to Google without consent; cf. LG München I, 20.01.2022, 3 O 17493/20). It sets no cookies, so a cookie banner is not the right fix — self-hosting is.
- An information notice (Privacy Policy + Cookie Policy) **is** required.

## 4. Other findings (not cookie-related)

1. ~~**OAuth `state` never verified**: `spotify_oauth_state` is set in `login()` but `server/api/callback.ts` ignores the `state` query param → login CSRF possible. Also generated with `Math.random()` (`utils/common.ts`), not a CSPRNG.~~ Fixed: callback compares query `state` with the cookie and deletes it; state is now 32 hex chars from `crypto.getRandomValues`.
2. ~~**Data minimisation**: scope `user-read-email` is requested (`utils/const.ts`) but the email is never used. Drop it. (`user-read-private` is needed for `market=from_token` and `country`.)~~ Fixed: scope removed, Privacy Policy updated.
3. `plugins/auth.client.ts` calls `/api/cookie-test`, which does not exist (404 on every guarded navigation when the cookie check fails), and whitelists a non-existent `/debug` route.
4. ~~`pages/login.vue` references "Terms of Service", which does not exist.~~ Fixed: text now links to `/privacy`.
5. `sporky_access_token` is not `httpOnly` (by design, the browser calls Spotify directly). Acceptable given 1 h lifetime, but an XSS would expose it.

## 5. Remediation applied (2026-10-08)

- Google Fonts replaced by self-hosted `@fontsource-variable/inter` + `material-symbols` (via `nuxt.config.ts` `css`). Verified: first load of `/login` makes requests only to the site's own origin, sets no cookies, no storage.
- No consent banner: only strictly necessary cookies remain (owner's decision, option "self-host, no banner").
- Added `/privacy` and `/cookies` (layout `legal`), public in `plugins/auth.client.ts`; `AppFooter` with links on every layout and on `/login`.
- Open placeholders: hosting provider name/country/privacy link and server log retention (`pages/privacy.vue`).
- Findings 3 and 5 in §4 are **not** fixed yet.
