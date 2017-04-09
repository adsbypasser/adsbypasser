_.register({
  rule: {
    host: /^(www\.)?maxmirror\.com$/,
    path: /^\/redirect\//,
  },
  async ready () {
    const l = $('#download_url > a');
    await $.openLink(l.href);
  },
});
