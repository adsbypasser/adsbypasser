_.register({
  rule: {
    host: /^dikit\.in$/,
  },
  async ready () {
    $.remove('iframe');

    const a = $('.disclaimer a');
    await $.openLink(a.href);
  },
});
