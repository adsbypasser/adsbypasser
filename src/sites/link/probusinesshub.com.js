_.register({
  rule: {
    host: /^probusinesshub\.com$/,
  },
  async ready () {
    let f = $.$('form[id$=-subscribe]');
    if (f) {
      f.action = f.action.replace('http:', 'https:');
      f.submit();
      return;
    }

    f = $.searchFromScripts(/location\.href="([^"]+)"/);
    f = f[1];
    await $.openLink(f);
  },
});
