/**
 * @domain adshnk.com
 */
_.register({
  rule: {
    host: /^adshnk\.com$/,
  },
  async ready() {
    await _.wait(16000);
    const b = $(
      'button[class="ui right labeled icon button primary huge fluid"]',
    );
    b.click();

    await _.wait(18000);
    const a = $('a[id="final_redirect"]');
    await $.openLink(a.href);
  },
});
