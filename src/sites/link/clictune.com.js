_.register({
  rule: {
    host: /^(www\.)?clictune\.com$/,
    path: /^\/[^/]+$/,
  },
  async ready () {
    $.remove('iframe');
    const matches = $.searchFromScripts(/<a href="http:\/\/(?:www.)?clictune\.com\/link\/redirect\/?url=([^&]+)&/);
    const url = decodeURIComponent(matches[1]);
    await $.openLink(url);
  },
});
