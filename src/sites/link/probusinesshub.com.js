_.register({
  rule: {
    host: [
      /^probusinesshub\.com$/,
      /^(trackywe|starvate)\.in$/,
      /^technodia\.xyz$/,
    ],
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
