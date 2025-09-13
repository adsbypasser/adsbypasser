_.register({
  rule: {
    host: /^imgbox\.com$/,
  },
  async ready() {
    const i = $("#img");
    await $.openImage(i.src);
  },
});
