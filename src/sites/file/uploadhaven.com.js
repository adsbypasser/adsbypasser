_.register({
  rule: {
    host: /^uploadhaven\.com$/,
    path: /^\/download\//,
  },
  async ready() {
    await _.wait(18000);
    const f = $(".btn-submit-free.btn-download-free");
    f.click();
  },
});
