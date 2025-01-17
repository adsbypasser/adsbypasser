_.register({
  rule: {
    host: /^dlupload\.com$/,
  },
  async ready () {
    await _.wait(3500);
    const b = $('.btn-block.btn-primary.text-white.shadow.m-1.position-relative.up-tooltip-container');
    b.click();
    await _.wait(6000);
    const btn = $('.btn-block.continue-btn-bg');
    btn.click();
  },
});
