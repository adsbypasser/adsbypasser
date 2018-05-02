_.register({
  rule: {
    host: [
      /^mant[ae][pb]\.in$/,
      /^st\.oploverz\.net$/,
      /^minidroid\.net$/,
      /^ww3\.awaremmxv\.com$/,
      /^linkpoi\.in$/,
    ],
  },
  async ready () {
    const a = $('a.redirect, a[target=_blank][rel=nofollow]');
    await $.openLink(a.href);
  },
});
