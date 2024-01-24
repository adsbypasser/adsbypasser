_.register({
  rule: {
    host: /^k2s\.cc$/,
  },
  async ready () {
    await _.wait(35000);
    const a = $('a.link-to-file');
    await $.openLink(a.href);
  },
});
