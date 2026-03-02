/**
 * @domain nmac.to
 */
_.register({
  rule: {
      host: /^nmac\.to$/,
      path: /^\/ads\/(.+)$/,
  },
  async start(m) {
    try {
      const b64 = m.path[1];
      const decoded = atob(b64);
      await $.openLink(decoded);
    } catch (e) {
      _.warn("Failed to decode nmac.to ads url", e);
    }
  },
});
