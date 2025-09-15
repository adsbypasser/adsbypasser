/**
 * @domain shortmoz.link
 */
_.register({
  rule: {
    host: /^shortmoz\.link$/,
  },
  async ready() {
    const button = $(".btn.btn-primary.btn-block");
    button.click();
  },
});
