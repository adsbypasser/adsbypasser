/**
 * @domain exe-links.com
 * @domain exe.io
 * @domain exeo.app
 */
_.register({
  rule: {
    host: [/^exe-links\.com$/, /^exeo\.app$/, /^exe\.io$/],
  },
  async ready() {
    const a = $(".link-button.button");
    a.click();
    await _.wait(2000);
    const b = $(".link-button");
    b.click();
    await _.wait(6000);
    const c = $(".button.link-button");
    c.click();
  },
});
