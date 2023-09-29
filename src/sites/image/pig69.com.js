_.register({
  rule: {
    host: /^pig69\.com$/,
  },
  async ready () {
    const img = $('.fileviewer-file img');

    const url = img.src.replace(/\?.*/, '');
    await $.openImage(url);
  },
});
