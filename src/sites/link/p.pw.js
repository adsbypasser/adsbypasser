_.register({
  rule: {
    host: /^p\.pw$/,
  },
  async ready () {
    $.remove('iframe');
    let m = $.searchFromScripts(/window\.location = "(.*)";/);
    m = m[1];
    await $.openLink(m);
  },
});
