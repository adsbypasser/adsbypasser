/**
 * @domain fappic.com
 */

_.register({
  rule: {
    host: /^(www\.)?fappic\.com$/,
  },
  async ready() {
    const i = $(".pic");
    await $.openImage(i.src);
  },
});
