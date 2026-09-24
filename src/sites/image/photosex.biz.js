/**
 * @domain photosex.biz
 */
_.register({
  rule: {
    host: /^photosex\.biz$/,
  },
  async ready() {
    const i = $("#img");
    await $.openImage(i.src);
  },
});
