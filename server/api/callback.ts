import type { OAuthTokens } from '~/types';
import { COOKIE_NAME, OAUTH_STATE_COOKIE } from '~/utils/const';
import { Buffer } from 'buffer';

export default defineEventHandler(async (event) => {
  const {
    public: { clientId, redirectUri },
    clientSecret,
  } = useRuntimeConfig();

  const { code, state, error } = getQuery(event);

  // One-shot: the state cookie is only valid for this callback.
  const expectedState = getCookie(event, OAUTH_STATE_COOKIE);
  deleteCookie(event, OAUTH_STATE_COOKIE, { path: '/' });

  try {
    if (error) {
      return sendRedirect(event, `/login?error=${error}`);
    }

    // Reject callbacks not started by this browser's login() (login CSRF).
    if (!state || !expectedState || state !== expectedState) {
      return sendRedirect(event, '/login?error=state_mismatch');
    }

    if (!code) {
      return sendRedirect(event, '/login?error=no_code');
    }

    const response = await $fetch<OAuthTokens>(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`,
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: redirectUri,
        }),
      },
    );

    // Get protocol from request to set cookie properly
    const isHttps =
      getHeader(event, 'x-forwarded-proto') === 'https' ||
      getRequestURL(event).protocol === 'https:';

    setCookie(event, COOKIE_NAME, response.access_token, {
      secure: isHttps, // Only secure in HTTPS
      sameSite: 'lax', // Changed from strict to lax for better compatibility
      maxAge: response.expires_in,
      path: '/',
      httpOnly: false, // Allow access from client-side
    });

    return sendRedirect(event, '/');
  } catch (e) {
    return sendRedirect(event, '/login?error=auth_failed');
  }
});
