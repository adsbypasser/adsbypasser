_.register({
  rule: {
    host: /^(www\.)?clictune\.com$/,
    path: /^\/id=\d+/,
  },
  async ready () {
    $.remove('iframe');
    const matches = $.searchFromScripts(/<a href="http:\/\/(?:www.)?clictune\.com\/redirect\.php\?url=([^&]+)&/);
    const url = decodeURIComponent(matches[1]);
    await $.openLink(url);
  },
});
