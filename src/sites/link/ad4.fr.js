_.register({
  rule: {
    host: /^ad4\.fr$/,
  },
  async ready () {
    $.remove('iframe');

    const s = $.searchFromScripts(/"src", "([^"]+)"/);
    if (!s) {
      _.warn('changed');
      return;
    }
    await $.openLink(s[1]);
  },
});
