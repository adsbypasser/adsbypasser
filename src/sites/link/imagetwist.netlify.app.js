/**
 * @domain imagetwist.netlify.app
 */
_.register({
  rule: {
    host: /^imagetwist\.netlify\.app$/,
  },
  async ready() {
    const a = $(".btn.btn-dark");
    await $.openLink(a.href);
  },
});
