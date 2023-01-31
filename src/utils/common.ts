import { stateKey } from "./constants";

export function getHashParams(): any {
  let hashParams: { [e: string]: string } = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function buildSpotifyRedirectUrl() {
  let client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  let redirect_uri = window.location.origin + window.location.pathname;
  let state = generateRandomString(16);
  localStorage.setItem(stateKey, state);
  let scope = "user-top-read";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  return url;
}
