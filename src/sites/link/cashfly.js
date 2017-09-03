_.register({
  rule: {
    host: /^(cf|ex|xt)\d\.(me|co)$/,
  },
  async ready () {
    $.remove('iframe');
    const a = $('#skip_button');
    await $.openLink(a.href);
  },
});
