import { OAuthTokens } from "~/types";
import { COOKIE_NAME, redirectUri } from "~/utils/const";

export default defineEventHandler(async (event) => {
  const {
    public: { clientId },
    clientSecret,
  } = useRuntimeConfig();

  const { code, state } = getQuery(event);
  try {
    if (!code) {
      return sendRedirect(event, "/login");
    }

    const response = await $fetch<OAuthTokens>(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code as string,
          redirect_uri: redirectUri,
        }),
      }
    );

    setCookie(event, COOKIE_NAME, response.access_token, {
      secure: true,
      sameSite: "strict",
      maxAge: response.expires_in,
      path: "/",
    });

    return sendRedirect(event, "/");
  } catch (e) {
    console.error(e);
    return sendRedirect(event, "/login?error=true", 500);
  }
});
