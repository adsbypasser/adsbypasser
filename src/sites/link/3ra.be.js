_.register({
  rule: {
    host: /^(www\.)?3ra\.be$/,
  },
  async ready () {
    $.remove('iframe');

    let f = $.window.fc;
    if (!f) {
      throw new _.AdsBypasserError('window.fc is undefined');
    }
    f = f.toString();
    f = f.match(/href="([^"]*)/);
    if (!f) {
      throw new _.AdsBypasserError('url pattern outdated');
    }
    await $.openLink(f[1]);
  },
});
