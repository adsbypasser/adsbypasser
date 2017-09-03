_.register({
  rule: {
    host: /^(www\.)?4fun\.tw$/,
  },
  async ready () {
    const i = $('#original_url');
    await $.openLink(i.value);
  },
});
