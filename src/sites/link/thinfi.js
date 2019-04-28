_.register({
  rule: {
    host: /^thinfi\.com$/,
  },
  async ready () {
    const a = $('div p a');
    await $.openLink(a.href);
  },
});

_.register({
  rule: {
    host: /^hello\.tribuntekno\.com$/,
  },
  async ready () {
    const a = $('div p u b a');
    await $.openLink(a.href);
  },
});
