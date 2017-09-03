_.register({
  rule: {
    host: /^adlock\.org$/,
  },
  async ready () {
    let a = $.$('#xre a.xxr, #downloadButton1');
    if (a) {
      await $.openLink(a.href);
      return;
    }

    a = $.window.fileLocation;
    if (a) {
      await $.openLink(a);
    }
  },
});
