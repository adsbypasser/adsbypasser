_.register({
  rule: {
    host: /^1ink\.(cc|info)$/,
    path: /^\/\w+$/,
  },
  async ready () {
    let url = document.head.querySelector('[name=keywords]').content;
    const urlCheck = url.match(/^https?:\/\//);
    if (!urlCheck) {
      url = 'http://' + url;
    }
    await $.openLink(url);
  },
});
