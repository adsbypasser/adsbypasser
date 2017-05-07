_.register({
  rule: {
    host: /^riurl\.com$/,
    path: /^\/.+/,
  },
  async ready () {
    let s = $.$('body script');
    if (s) {
      s = s.innerHTML.indexOf('window.location.replace');
      if (s >= 0) {
        // let inline script redirect
        return;
      }
    }
    await $.openLink('', {
      path: {
        hidden: '1',
        image: ' ',
      },
    });
  },
});
