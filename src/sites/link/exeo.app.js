_.register({
  rule: {
    host: [
      /^exeo\.app$/,
      /^exe-links\.com$/,
    ],
  },
  async ready () {
    const a = $('.link-button.button');
    a.click();
    await _.wait(2000);
    const b = $('.link-button');
    b.click();
    await _.wait(6000);
    const c = $('.link-button.get-link');
    c.click();
  },
});
