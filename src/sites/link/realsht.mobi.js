_.register({
  rule: {
    host: [
      /^realsht\.mobi$/,
    ],
  },
  async ready () {
    const n = $('#download_link');
    n.click();
  },
});
