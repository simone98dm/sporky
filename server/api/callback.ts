import { OAuthTokens } from '~/types';
import { COOKIE_NAME } from '~/utils/const';

export default defineEventHandler(async (event) => {
  const {
    public: { clientId, redirectUri },
    clientSecret,
  } = useRuntimeConfig();

  const { code, state, error } = getQuery(event);

  try {
    if (error) {
      return sendRedirect(event, `/login?error=${error}`);
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
