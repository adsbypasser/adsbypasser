_.register({
  rule: {
    host: /^linkduit\.net$/,
  },
  async ready () {
    const l = $('.col-lg-8 h1').textContent;
    const check = l.match(/^https?:\/\//);
    if (check) {
      await $.openLink(l);
    } else {
      return;
    }
  },
});
