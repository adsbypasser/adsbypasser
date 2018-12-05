_.register({
  rule: {
    host: [
      /^dailyss\.net$/,
      /^i\.hentai-ddl\.org$/,
      /^imghost\.top$/,
    ],
    path: /^\/image\/.+$/,
  },
  async ready () {
    const i = $('#image-viewer-container img');
    await $.openImage(i.src);
  },
});
