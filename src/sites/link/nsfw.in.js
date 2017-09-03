_.register({
  rule: {
    host: /^nsfw\.in$/,
  },
  async ready () {
    const a = $('#long_url a');
    await $.openLink(a.href);
  },
});
