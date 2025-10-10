/**
 * @domain imageupper.com
 * @domain imgbox.com
 */
_.register({
  rule: {
    host: [/^imageupper\.com$/, /^imgbox\.com$/],
  },
  async ready() {
    const i = $("#img");
    await $.openImage(i.src);
  },
});
