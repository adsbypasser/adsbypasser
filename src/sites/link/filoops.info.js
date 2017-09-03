_.register({
  rule: {
    host: /^(www\.)?filoops\.info$/,
  },
  async ready () {
    const a = $('#text > center a, #text > div[align=center] a');
    await $.openLink(a.href);
  },
});
