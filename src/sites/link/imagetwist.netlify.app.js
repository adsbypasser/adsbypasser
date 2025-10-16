/**
 * @domain imagetwist.netlify.app
 */
_.register({
  rule: {
    host: /^imagetwist\.netlify\.app$/,
  },
  async ready() {
    const a = $("center h2 p a, .btn-dark");
    await $.openLink(a.href);
  },
});
