_.register({
  rule: {
    host: [
      /^imgbaron\.com$/,
      /^imgsto\.com$/,
      /^silverpic\.com$/,
      /^www\.fappic\.com$/,
    ],
  },
  async ready () {
    const i = $.$('img.pic');
    if (i) {
      await $.openImage(i.src);
    }

    const f = $('form');
    f.submit();
  },
});
