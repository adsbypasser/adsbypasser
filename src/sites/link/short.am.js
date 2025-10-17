/**
 * @domain short.am
 * @domain srt.am
 */
_.register({
  rule: {
    host: /^(short|srt)\.am$/,
  },
  async ready() {
    await _.wait(6000);
    const button = $(".skipp");
    button.click();
  },
});
