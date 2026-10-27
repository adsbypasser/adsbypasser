/**
 * @domain imgpv.com
 */
_.register({
  rule: {
    host: /^imgpv\.com$/,
  },
  async ready() {
    const a = $("#img-preview");
    await $.openImage(a.src, {
      replace: true,
    });
  },
});
