_.register({
  rule: {
    host: /^stash-coins\.com$/,
  },
  async start () {
    let url = window.location.toString();
    const i = url.lastIndexOf('http');
    url = url.substr(i);
    await $.openLink(url);
  },
});
