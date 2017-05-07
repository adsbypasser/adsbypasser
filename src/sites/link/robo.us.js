_.register({
  rule: {
    host: /^robo\.us$/,
  },
  async ready () {
    $.remove('iframe');
    const url = atob($.window.fl);
    await $.openLink(url);
  },
});
