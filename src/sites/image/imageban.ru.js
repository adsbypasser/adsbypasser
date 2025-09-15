/**
 * @domain imageban.ru
 */
_.register({
  rule: {
    host: /^imageban\.ru$/,
  },
  async ready() {
    const i = $("#img_main");
    await $.openImage(i.src);
  },
});
