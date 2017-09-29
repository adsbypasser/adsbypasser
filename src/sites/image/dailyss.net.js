_.register({
  rule: {
    host: [
      /^dailyss\.net$/,
      /daily-img\.com$/,
      /img-365\.com$/,
      /^365-img\.com$/,
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

_.register({
  rule: {
    host: /^xxx\.porn0day\.com$/,
    path: /^\/image\/.+$/,
  },
  async ready () {
    // the URL in img is a thumbnail
    const i = $('link[rel^=image_src]');
    await $.openImage(i.href);
  },
});
