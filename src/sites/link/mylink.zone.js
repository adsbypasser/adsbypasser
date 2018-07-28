_.register({
  rule: {
    host: /^(www\.)?mylink\.zone$/,
    path: /^\/[^/]+$/,
  },
  async ready () {
    $.remove('iframe');
    const matches = $.searchFromScripts(/<a href="http:\/\/(?:www\.)?mylink\.zone\/link\/redirect\/\?url=([^&]+)&/);
    const url = decodeURIComponent(matches[1]);
    await $.openLink(url);
  },
});

_.register({
  rule: {
    host: /^onepiece-ex\.com\.br$/,
  },
  async ready () {
    $.remove('iframe');
    const matches = $.searchFromScripts(/<a href="([^&]+)(?=" )/);
    await $.openLink(matches[1]);
  },
});
