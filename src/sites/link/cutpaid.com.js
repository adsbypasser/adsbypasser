/**
 * @domain cutpaid.com
 */
_.register({
  rule: {
    host: /^cutpaid\.com$/,
  },
  async ready() {
    const a = $(".btn-lg.get-link");
    await _.wait(9000);
    await $.openLink(a.href);
  },
});
