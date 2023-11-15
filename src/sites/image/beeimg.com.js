_.register({
  rule: {
    host: /^beeimg\.com$/,
    path: /\/view\/.*/,
  },
  async ready () {
    const img = $('[id="beeimage"]');
    await $.openImage(img.src);
  },
});
