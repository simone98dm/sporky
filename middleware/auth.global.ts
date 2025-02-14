export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie(COOKIE_NAME);
  if (!accessToken.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
