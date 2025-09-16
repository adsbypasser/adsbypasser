/**
 * @domain realsht.mobi
 */
_.register({
  rule: {
    host: [/^realsht\.mobi$/],
  },
  async ready() {
    const n = $("#download_link");
    n.click();
  },
});
