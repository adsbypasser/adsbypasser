/**
 * @domain gplinks.co
 * @domain gplinks.com
 */
_.register({
  rule: {
    host: [/^gplinks\.co$/, /^gplinks\.com$/],
  },
  async ready() {
    await _.wait(8000);
    const d = $(".get-link");
    d.click();
  },
});
