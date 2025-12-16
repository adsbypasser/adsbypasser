/**
 * @domain pixxxels.cc
 * @domain postimg.cc
 */
_.register({
  rule: {
    host: [/^pixxxels\.cc$/, /^postimg\.cc$/],
  },
  async ready() {
    const ele = $("#download");
    const img = ele.href.replace("?dl=1", "");
    await $.openImage(img, { referer: true });
  },
});
