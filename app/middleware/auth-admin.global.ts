declare module "#auth-utils" {
  interface User {
    roles?: string[];
  }
}

export default defineNuxtRouteMiddleware(async function (to) {
  if (!to.path.startsWith("/admin")) {
    return;
  }

  const { loggedIn, fetch, user } = useUserSession();

  await fetch();

  if (!loggedIn.value || !user.value) {
    return navigateTo("/api/auth/keycloak", { external: true });
  }

  if (!user.value.roles?.includes("rd-tech-admin")) {
    return navigateTo({ path: "/403" });
  }
});
