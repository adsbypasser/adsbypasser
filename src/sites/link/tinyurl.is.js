_.register({
  rule: {
    host: /^tinyurl\.is$/,
  },
  async ready () {
    const a = $('a#skip-btn');
    await $.openLink(a.href);
  },
});
