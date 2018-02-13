_.register({
  rule: {
    host: /^1ink\.cc$/,
    path: /^\/\w+$/,
  },
  async ready () {
    let url = document.head.querySelector('[name=keywords]').content;
    const urlCheck = url.includes('http');
    if (urlCheck != true)
      url = 'http://' + url;
    await $.openLink(url);
  },
});
