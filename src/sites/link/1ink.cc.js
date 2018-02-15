_.register({
  rule: {
    host: /^1ink\.cc$/,
    path: /^\/\w+$/,
  },
  async ready () {
    let url = document.head.querySelector('[name=keywords]').content;
    const urlCheck = url.includes('http://') || url.includes('https://');
    if (!urlCheck) {
      url = 'http://' + url;
    }
    await $.openLink(url);
  },
});
