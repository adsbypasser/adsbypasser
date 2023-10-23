_.register({
  rule: {
    host: [
      /^prnt\.sc$/,
    ],
    path: /\.html$/,
  },
});

_.register({
  rule: {
    host: [
      /^prnt\.sc$/,
    ],
  },
  async ready () {
    const i = $('#screenshot-image');
    await $.openImage(i.src);
  },
});
