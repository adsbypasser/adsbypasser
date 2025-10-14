/**
 * @domain blogmado.com
 */
_.register({
  rule: {
    host: /^blogmado\.com/,
  },
  async ready() {
    await _.wait(3000);
    const b = $(".btn");
    b.click();
  },
});
