<template>
  <article>
    <h1>Cookie Policy</h1>
    <p class="text-body-sm">Last updated: {{ POLICY_LAST_UPDATED }}</p>

    <h2>1. What cookies are</h2>
    <p>
      Cookies are small text files that a website saves in your browser and
      reads back on later visits. Similar technologies, such as localStorage,
      work in the same way. They can be used for features the site needs, or to
      track people across sites.
    </p>

    <h2>2. Cookies used by Sporky</h2>
    <p>
      Sporky uses <strong>only strictly necessary (technical) cookies</strong>.
      They are first-party, they are needed to log you in with Spotify, and they
      are never used for tracking or advertising. Under Article 122 of the
      Italian Privacy Code and Article 5(3) of the ePrivacy Directive, these
      cookies do not require consent, so Sporky shows no cookie banner. Sporky
      uses no analytics, advertising or third-party cookies.
    </p>

    <div class="mb-4 overflow-x-auto">
      <table>
        <caption class="sr-only">
          Cookies set by Sporky
        </caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Purpose</th>
            <th scope="col">Duration</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cookie in COOKIES" :key="cookie.name">
            <td>
              <code>{{ cookie.name }}</code>
            </td>
            <td>{{ cookie.purpose }}</td>
            <td>{{ cookie.duration }}</td>
            <td>First-party, strictly necessary</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>Sporky does not use localStorage, sessionStorage or IndexedDB.</p>

    <h2>3. Third parties</h2>
    <p>
      When you click “Connect with Spotify”, you are taken to
      <code>accounts.spotify.com</code>. Spotify may set its own cookies on its
      own domain there, and its
      <a
        href="https://www.spotify.com/legal/cookies-policy/"
        target="_blank"
        rel="noopener noreferrer"
        >Cookie Policy</a
      >
      applies to them. After you log in, cover images and 30-second previews are
      loaded from Spotify's servers to provide the service. Fonts and icons are
      hosted by Sporky itself.
    </p>

    <h2>4. Managing cookies</h2>
    <p>
      Because the cookies are strictly necessary, there are no preferences to
      set. You can remove them at any time by logging out or by deleting them in
      your browser. Without them you cannot stay logged in. How to manage
      cookies in common browsers:
    </p>
    <ul>
      <li v-for="browser in BROWSER_HELP" :key="browser.name">
        <a :href="browser.url" target="_blank" rel="noopener noreferrer">{{
          browser.name
        }}</a>
      </li>
    </ul>

    <h2>5. More information</h2>
    <p>
      See the <NuxtLink to="/privacy">Privacy Policy</NuxtLink> for how personal
      data is processed and for your rights. For any questions, write to
      <a :href="`mailto:${PRIVACY_CONTACT_EMAIL}`">{{
        PRIVACY_CONTACT_EMAIL
      }}</a
      >.
    </p>
  </article>
</template>

<script setup lang="ts">
import {
  COOKIE_NAME,
  OAUTH_STATE_COOKIE,
  POLICY_LAST_UPDATED,
  PRIVACY_CONTACT_EMAIL,
} from '~/utils/const';

interface CookieInfo {
  name: string;
  purpose: string;
  duration: string;
}

definePageMeta({ layout: 'legal' });
useHead({ title: 'Cookie Policy · Sporky' });

// Names come from utils/const.ts so this table stays aligned with the code.
const COOKIES: CookieInfo[] = [
  {
    name: COOKIE_NAME,
    purpose:
      'Holds your temporary Spotify access token, which keeps you logged in.',
    duration: 'About 1 hour (token lifetime set by Spotify), or until logout',
  },
  {
    name: OAUTH_STATE_COOKIE,
    purpose:
      'Random value that ties the Spotify login request to its response.',
    duration: 'Session (deleted when the browser closes) or at logout',
  },
];

const BROWSER_HELP = [
  {
    name: 'Google Chrome',
    url: 'https://support.google.com/chrome/answer/95647',
  },
  {
    name: 'Mozilla Firefox',
    url: 'https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox',
  },
  {
    name: 'Apple Safari',
    url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac',
  },
  {
    name: 'Microsoft Edge',
    url: 'https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
  },
] as const;
</script>
