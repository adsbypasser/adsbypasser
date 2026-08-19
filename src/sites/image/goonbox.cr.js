/**
 * @domain goonbox.cr
 */
_.register({
  rule: {
    host: /^goonbox\.cr$/,
  },
  async ready() {
    await _.wait(1000);
    const a = $("img.max-w-full");
    await $.openImage(a.src);
  },
});
