_.register({
  rule: {
    host: [
      /^(probusinesshub|tecnogb)\.com$/,
      /^(trackywe|starvate)\.in$/,
      /^viralcollect\.info$/,
      /^(technodia|ourtechnoew|mutharammss|thanda|thinana)\.xyz$/,
      /^entretendonaweb\.ga$/,
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
