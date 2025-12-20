/**
 * @domain imageup.ru
 * @domain imageupper.com
 * @domain imgbox.com
 */
_.register({
  rule: {
    host: [/^imageup\.ru$/, /^imageupper\.com$/, /^imgbox\.com$/],
  },
  async ready() {
    const i = $("#img, #image");
    await $.openImage(i.src);
  },
});
