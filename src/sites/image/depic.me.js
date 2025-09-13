_.register({
  rule: {
    host: /^(depic|dpic)\.me$/,
  },
  async ready() {
    const i = $("#pic");
    await $.openImage(i.src);
  },
});
