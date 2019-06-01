_.register({
  rule: {
    host: /^uploadhaven\.com$/,
    path: /^\/download\//,
  },
  async ready () {
    await _.wait(5000);
    const f = $('.contactForm #downloadNowBtn.btn.btn-primary');
    f.click();
  },
});
