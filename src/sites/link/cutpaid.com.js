_.register({
  rule: {
    host: /^cutpaid\.com$/,
  },
  async ready() {
    let a = $(".btn-primary");
    if (a) {
      await _.wait(20000);
      a.click();
    }
    a = $(".btn-success.btn-lg.get-link");
    await _.wait(9000);
    await $.openLink(a.href);
  },
});
