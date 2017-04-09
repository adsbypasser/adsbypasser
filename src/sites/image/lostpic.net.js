_.register({
  rule: {
    host: /^lostpic\.net$/,
    query: /^\?photo=\d+$/,
  },
  async ready () {
    const i = $('img.notinline.circle');
    await $.openImage(i.src);
  },
});
