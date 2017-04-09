_.register({
  rule: {
    host: /^img(dino|tiger|zap)\.com$/,
    path: /^\/viewer\.php$/,
    query: /^\?file=/,
  },
  async ready () {
    const o = $('#cursor_lupa');
    await $.openImage(o.src);
  },
});
