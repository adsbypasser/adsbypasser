/**
 * @domain exe-links.com
 * @domain exeo.app
 * @domain exeygo.com
 */
_.register({
  rule: {
    host: [/^exe-links\.com$/, /^exeo\.app$/, /^exeygo\.com$/],
  },
  async ready() {
    const a = $(".link-button.button");
    a.click();
    await _.wait(2000);
    const b = $(".link-button");
    b.click();
    await _.wait(6000);
    for (let i = 0; i < 60; i++) {
      const button = document.querySelector("#invisibleCaptchaShortlink");
      if (button && !button.disabled) {
        button.click();
        break;
      }
      await _.wait(500);
    }
    await _.wait(2000);
    const c = $(".link-button.get-link");
    if (c.length) {
      c.click();
    }
  },
});
