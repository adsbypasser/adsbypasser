_.register({
  rule: {
    host: /^imagetwist\.netlify\.app$/,
  },
  async ready() {
    const a = $(".btn.btn-dark");
    await $.openLink(a.href);
  },
});
