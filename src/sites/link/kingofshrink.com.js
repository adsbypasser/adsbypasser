_.register({
  rule: {
    host: /^(www\.)?kingofshrink\.com$/,
  },
  async ready () {
    const l = $('#textresult > a');
    await $.openLink(l.href);
  },
});
