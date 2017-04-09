_.register({
  rule: {
    host: /^(www\.)?loook\.ga$/,
    path: /^\/\d+$/
  },
  async ready () {
    const a = $('#download_link > a.btn');
    await $.openLink(a.href);
  },
});
