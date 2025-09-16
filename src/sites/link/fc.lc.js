/**
 * @domain fc-lc.com
 * @domain fc-lc.xyz
 * @domain loaninsurehub.com
 */
_.register({
  rule: {
    host: /^fc-lc\.(com|xyz)$/,
  },
  async ready() {
    await _.wait(2000);
    const b = $(".btn-primary.btn-captcha.mb-4");
    b.click();
  },
});

_.register({
  rule: {
    host: /^loaninsurehub\.com$/,
  },
  async ready() {
    const b = $("#glink");
    if (b) {
      b.click();
    }
    await _.wait(12000);
    $.remove("#overlay");
    const a = $("#surl");
    if (a) {
      a.click();
    }
  },
});
