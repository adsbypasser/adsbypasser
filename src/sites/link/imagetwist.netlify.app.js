_.register({
  rule: {
    host: /^imagetwist\.netlify\.app$/,
  },
  async ready () {
    const a = $('form a');
    await $.openLink(a.href);
  },
});
