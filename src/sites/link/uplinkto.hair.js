/**
 * @domain uplinkto.hair
 */
_.register({
  rule: {
    host: [
      /^uplinkto\.hair$/,
    ],
  },
  async ready() {
    const a = $(".view-well a");
    await $.openLink(a.href);
  },
});
