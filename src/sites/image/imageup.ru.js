/**
 * @domain imageup.ru
 * @domain imgbox.com
 */
_.register({
  rule: {
    host: [/^imageup\.ru$/, /^imgbox\.com$/],
  },
  async ready() {
    const i = $("#img, #image");
    await $.openImage(i.src);
  },
});
