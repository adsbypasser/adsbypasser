/**
 * @domain imgdawgknuttz.com
 */
_.register({
  rule: {
    host: /^imgdawgknuttz\.com$/,
  },
  async ready() {
    await _.wait(1000);
    let a = $.$(".button");
    if (a) {
      a.click();
    }
    a = $(".centred");
    await $.openImage(a.src);
  },
});
