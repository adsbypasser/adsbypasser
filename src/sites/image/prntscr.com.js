_.register({
  rule: {
    host: [
      /^prntscr\.com$/,
      /^prnt\.sc$/,
    ],
    path: /\.html$/,
  },
});

_.register({
  rule: {
    host: [
      /^prntscr\.com$/,
      /^prnt\.sc$/,
    ],
  },
  async ready () {
    const i = $('#screenshot-image');
    await $.openImage(i.src);
  },
});
