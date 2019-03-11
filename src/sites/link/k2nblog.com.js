_.register({
  rule: {
    host: /^k2nblog\.com$/,
  },
  async ready () {
    const a = $('a');
    let url = a.href.match(/.*(http.*)$/)[1];
    url = decodeURIComponent(url);
    await $.openLink(url);
  },
});
