_.register({
  rule: {
    host: /^techgeek\.digital$/,
  },
  async ready() {
    const b = $('[class="btn-main get-link"]');
    if (b) {
      b.click();
    }
    const a = $('a[class="btn-main get-link"]');
    if (a) {
      await $.openLink(a.href);
    }
  },
});
