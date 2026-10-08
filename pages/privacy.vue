<template>
  <article>
    <h1>Privacy Policy</h1>
    <p class="text-body-sm">Last updated: {{ POLICY_LAST_UPDATED }}</p>

    <p>
      This notice explains how personal data is processed when you use Sporky,
      under Article 13 of the EU General Data Protection Regulation (GDPR, Reg.
      EU 2016/679). Sporky is a personal, non-commercial project run by a
      private individual.
    </p>

    <h2>1. Data controller</h2>
    <p>
      {{ PRIVACY_CONTROLLER }} (“I”, “the controller”).<br />
      Contact for anything privacy-related:
      <a :href="`mailto:${PRIVACY_CONTACT_EMAIL}`">{{
        PRIVACY_CONTACT_EMAIL
      }}</a
      >.
    </p>

    <h2>2. How Sporky works, in short</h2>
    <p>
      Sporky has no user database. When you log in with Spotify, your browser
      receives a temporary access token and talks to Spotify directly. Your
      profile and top tracks are loaded into your browser's memory to draw the
      pages, and they are gone when you close the tab or log out. I do not
      store, sell or share your listening data.
    </p>

    <h2>3. What data is processed, why, and on what legal basis</h2>

    <h3>a) Spotify login and account data</h3>
    <ul>
      <li>
        <strong>Data:</strong> a Spotify access token, which is valid for about
        one hour, and the data Spotify returns for the permissions you grant:
        display name, Spotify user ID, profile picture, country, subscription
        type, and your top tracks (title, artists, album, cover, 30-second
        preview).
      </li>
      <li>
        <strong>Purpose:</strong> to show you your top tracks and related
        statistics, which is the service you ask for when you log in.
      </li>
      <li>
        <strong>Legal basis:</strong> performance of the service you request
        (Art. 6(1)(b) GDPR).
      </li>
      <li>
        <strong>Where:</strong> the token is stored in a cookie in your browser
        (see the <NuxtLink to="/cookies">Cookie Policy</NuxtLink>). It passes
        through the Sporky server only once, when the login code is exchanged
        with Spotify, and it is not saved there. Profile and track data never
        reach the Sporky server. Your browser fetches them straight from
        Spotify.
      </li>
    </ul>

    <h3>b) Technical data needed to serve the website</h3>
    <ul>
      <li>
        <strong>Data:</strong> IP address, browser type, requested page, date
        and time, which are sent automatically with every web request.
      </li>
      <li>
        <strong>Purpose:</strong> to deliver the website and keep it secure and
        working.
      </li>
      <li>
        <strong>Legal basis:</strong> legitimate interest in running a secure
        website (Art. 6(1)(f) GDPR).
      </li>
    </ul>
    <p>
      Sporky uses no analytics, advertising, tracking pixels or profiling tools.
      Fonts and icons are served from Sporky's own server, so loading a page
      does not contact Google or any other third party.
    </p>

    <h2>4. Is providing data mandatory?</h2>
    <p>
      No. Using Sporky is entirely optional. If you do not log in with Spotify,
      the service cannot show you any data. The legal pages remain accessible
      without logging in.
    </p>

    <h2>5. Who receives the data</h2>
    <ul>
      <li>
        <strong>Spotify AB</strong> (Regeringsgatan 19, 111 53 Stockholm,
        Sweden). You authenticate with Spotify, and Spotify supplies your data
        through its Web API. Spotify acts as an independent controller for the
        data it holds about you. See the
        <a
          href="https://www.spotify.com/legal/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          >Spotify Privacy Policy</a
        >. Cover images and audio previews are loaded from Spotify's servers.
      </li>
      <li>
        <strong>Hosting provider:</strong> [[DA COMPLETARE: hosting provider
        name, country and link to its privacy policy]]. It runs the server that
        delivers the website and may keep technical logs as a data processor.
      </li>
    </ul>
    <p>Data is not shared with anyone else, and it is never sold.</p>

    <h2>6. Transfers outside the EU</h2>
    <p>
      Spotify AB is based in the EU. Spotify and the hosting provider may use
      sub-processors outside the European Economic Area. Where they do, they
      rely on the safeguards the GDPR provides, such as the EU–US Data Privacy
      Framework or the European Commission's Standard Contractual Clauses. The
      details are in their privacy policies.
    </p>

    <h2>7. How long data is kept</h2>
    <ul>
      <li>
        <strong>Access token cookie:</strong> expires automatically after about
        one hour, or immediately when you log out.
      </li>
      <li>
        <strong>Profile and top tracks:</strong> only in your browser's memory,
        until you close or reload the tab or log out.
      </li>
      <li>
        <strong>Technical server logs:</strong> [[DA COMPLETARE: log retention
        period of the hosting provider]].
      </li>
    </ul>

    <h2>8. Your rights</h2>
    <p>Under Articles 15–22 GDPR you have the right to:</p>
    <ul>
      <li>access the personal data concerning you;</li>
      <li>have inaccurate data corrected;</li>
      <li>have your data erased;</li>
      <li>restrict processing;</li>
      <li>data portability;</li>
      <li>object to processing based on legitimate interest (Art. 21 GDPR).</li>
    </ul>
    <p>
      To exercise any of these rights, write to
      <a :href="`mailto:${PRIVACY_CONTACT_EMAIL}`">{{
        PRIVACY_CONTACT_EMAIL
      }}</a
      >. I will reply within one month. Since Sporky does not store your Spotify
      data, most requests are satisfied simply by logging out.
    </p>
    <p>
      <strong>Withdrawing access:</strong> you can stop Sporky's access to your
      Spotify account at any time. Log out, then remove Sporky under
      <a
        href="https://www.spotify.com/account/apps/"
        target="_blank"
        rel="noopener noreferrer"
        >Spotify → Account → Manage apps</a
      >.
    </p>
    <p>
      <strong>Complaints:</strong> you can lodge a complaint with the data
      protection authority of the EU country where you live, work, or where the
      alleged infringement took place. In Italy that is the
      <a
        href="https://www.garanteprivacy.it"
        target="_blank"
        rel="noopener noreferrer"
        >Garante per la protezione dei dati personali</a
      >.
    </p>

    <h2>9. Automated decision-making</h2>
    <p>
      Sporky makes no automated decisions that have legal or similarly
      significant effects on you, and it does no profiling as defined in Article
      22 GDPR. Statistics such as your top artist are simple counts calculated
      in your browser, only for you to see.
    </p>

    <h2>10. Changes to this notice</h2>
    <p>
      If the way Sporky processes data changes, this page will be updated and
      the date at the top will change.
    </p>
  </article>
</template>

<script setup lang="ts">
import {
  POLICY_LAST_UPDATED,
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_CONTROLLER,
} from '~/utils/const';

definePageMeta({ layout: 'legal' });
useHead({ title: 'Privacy Policy · Sporky' });
</script>
