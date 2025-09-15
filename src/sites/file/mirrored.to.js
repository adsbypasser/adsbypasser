/**
 * @domain mirrored.to
 */
_.register({
  rule: "https://www.mirrored.to/files/*",
  async ready() {
    const a = $(".col-sm.centered.extra-top a");
    await $.openLink(a.href);
  },
});
