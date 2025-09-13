_.register({
  rule: {
    host: /^imgflip\.com$/,
  },

  async ready() {
    const i = $("#im");
    await $.openImage(i.src);
  },
});
