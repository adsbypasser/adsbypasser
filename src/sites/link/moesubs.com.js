_.register({
  rule: {
    host: /^moesubs\.com$/,
    path: /^\/url\//,
  },
  async ready () {
    let a = $('.gotolink > center:nth-child(1) > div:nth-child(1) > i:nth-child(2)');
    a = a.textContent;
    const i = a.lastIndexOf('http');
    a = a.substr(i);
    await $.openLink(a);
  },
});
