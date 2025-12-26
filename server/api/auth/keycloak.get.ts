export default defineOAuthKeycloakEventHandler({
  async onSuccess(event, { tokens }: { tokens?: { access_token?: string } }) {
    const token = tokens?.access_token;
    let roles: string[] = [];

    if (isDefined(token)) {
      try {
        const part = token.split(".")[1];

        if (isDefined(part)) {
          const payload: {
            resource_access?: Record<string, { roles?: string[] }>;
          } = JSON.parse(Buffer.from(part, "base64").toString());
          roles =
            payload.resource_access?.[
              String(process.env.NUXT_OAUTH_KEYCLOAK_CLIENT_ID)
            ]?.roles ?? [];
        }
      } catch {
        roles = [];
      }
    }

    await setUserSession(event, {
      user: {
        roles
      }
    });
    return sendRedirect(event, "/admin");
  }
});
