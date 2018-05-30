_.register({
  rule: {
    host: [
      /^minidroid\.net$/,
      /^linkpoi\.in$/,
    ],
  },
  async ready () {
    const a = $('a.redirect, a[target=_blank][rel=nofollow]');
    await $.openLink(a.href);
  },
});
