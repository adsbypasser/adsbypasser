_.register({
  rule: {
    host: /^2ty\.cc$/,
    path: /^\/.+/,
  },
  async ready () {
    $.remove('iframe');
    const a = $('#close');
    await $.openLink(a.href);
  },
});
