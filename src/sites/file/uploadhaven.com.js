/**
 * @domain uploadhaven.com
 */
_.register({
  rule: {
    host: /^uploadhaven\.com$/,
    path: /^\/download\//,
  },
  async ready() {
    await _.wait(18000);
    const f = $("#submitFree");
    f.click();
  },
});
