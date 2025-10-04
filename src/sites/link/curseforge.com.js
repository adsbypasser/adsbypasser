/**
 * @domain curseforge.com
 */
_.register({
  rule: {
    host: /^www\.curseforge\.com$/,
  },
  async ready() {
    await _.wait(1000);
    const b = $(".btn-cta.download-btn");
    b.click();

    await _.wait(1000);
    const c = $(".btn-lined.download-btn");
    c.click();
  },
});
