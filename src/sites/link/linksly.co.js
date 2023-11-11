_.register({
  rule: {
    host: /^linksly\.co$/,
  },
  async ready () {
    const b = $('.btn.btn-primary');
    b.click();
  },
});

_.register({
  rule: {
    host: /^go\.linksly\.co$/,
  },
  async ready () {
    await _.wait(6000);
    const a = $('a[class="btn btn-success btn-lg get-link"]');
    await $.openLink(a.href);
  },
});
