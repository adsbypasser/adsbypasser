_.register({
  rule: [
    {
      host: [
        /^overdream\.cz$/,
        /^www\.sexseeimage\.com$/,
      ],
      path: /^\/image\//,
    },
  ],
  async ready () {
    const img = $('#full_image');
    await $.openImage(img.src);
  },
});
