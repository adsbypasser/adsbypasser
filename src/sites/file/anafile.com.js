_.register({
  rule: {
    host: /^www\.anafile\.com$/,
  },
  async ready () {
    let b = $.$('#btn_download');
    if (!b) {
      // first stage
      b = $('#plans_free form [type=submit]');
      b.click();
      return;
    }
    // second stage
    b.disabled = false;
    $.remove('div[align=center]');
    return;
  },
});
