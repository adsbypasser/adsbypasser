/**
 * @domain mangalist.org
 */
_.register({
  rule: {
    host: /^mangalist\.org$/,
  },
  async ready() {
    await _.wait(1000);
    const b = $(".btn-primary.url.text-center");
    b.click();
  },
});
