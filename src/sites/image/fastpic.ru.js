_.register({
  rule: {
    host: /^fastpic\.ru$/,
    path: /^\/view\//,
  },
  async ready () {
    const img = $('#picContainer #image:last-child');
    await $.openImage(img.src, {
      // prevent loopback if image not found
      referer: true,
    });
  },
});
