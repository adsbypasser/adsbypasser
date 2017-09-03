_.register({
  rule: {
    host: /^(www\.)?typ\.me$/,
  },
  async ready () {
    const a = $('#skipAdBtn');
    await $.openLink(a.href);
  },
});
