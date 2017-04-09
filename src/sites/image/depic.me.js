_.register({
  rule: {
    host: [
      /^depic\.me$/,
      /^(www\.)?picamatic\.com$/,
    ],
  },
  async ready () {
    const i = $('#pic');
    await $.openImage(i.src);
  },
});
