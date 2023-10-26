_.register({
  rule: {
    host: [
      /^vyvmedia\.my\.id$/,
      /^realsht\.mobi$/,
    ],
  },
  async ready () {
    const n = $('#download_link');
    n.click();
  },
});
