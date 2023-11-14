_.register({
  rule: [
    {
      host: /^beeimg\.com$/,
      path: /\/view\/.*/,
    },
    {
      host: /^imagehaha\.com$/,
      path: /\/*\/.*/,
    },
  ],
  async ready () {
    const img = $('img.img-responsive');
    await $.openImage(img.src, {
      replace: true,
    });
  },
});
