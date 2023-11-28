_.register({
  rule: {
    host: /^linksly\.co$/,
  },
  async ready () {
    const b = $('.btn-primary');
    b.click();
  },
});

_.register({
  rule: {
    host: [
      /^go\.linksly\.co$/,
      /^go\.bitcosite\.com$/,
    ],
  },
  async ready () {
    await _.wait(8000);
    const a = $('.btn-success.btn-lg.get-link');
    await $.openLink(a.href);
  },
});
