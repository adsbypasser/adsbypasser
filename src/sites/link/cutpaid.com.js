_.register({
  rule: {
    host: /^cutpaid\.com$/,
  },
  async ready () {
    await _.wait(10000);
    const a = $('.btn.btn-success.btn-lg.get-link');
    await $.openLink(a.href);
  },
});
