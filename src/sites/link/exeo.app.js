/**
 * @domain exe-links.com
 * @domain exe.io
 * @domain exeo.app
 * @domain exeygo.com
 */
_.register({
  rule: {
    host: [/^exe-links\.com$/, /^exeo\.app$/, /^exe\.io$/, /^exeygo\.com$/],
  },
  async ready() {
    await _.wait(2000);
    const a = $("#submit-button");
    a.click();
    await _.wait(2000);
    const b = $("#submit-button");
    b.click();
    await _.wait(6000);
    const c = $("#submit-button");
    c.click();
  },
});
