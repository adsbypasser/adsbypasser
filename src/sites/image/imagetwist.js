_.register({
  rule:
    {
      host: [
        /^imagetwist\.com$/,
        /^imagenpic\.com$/,
        /^imagexport\.com$/,
        /^imageshimage\.com$/,
        /^croea\.com$/,
        /^vipr\.im$/,
      ]
    },
  async ready () {
    const i = $('img.pic');
    await $.openImage(i.src);
  }
});
