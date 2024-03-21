_.register({
  rule: {
    host: [
      /^fotokiz\.com$/,
      /^imgbaron\.com$/,
      /^imgsen\.com$/,
      /^imgsto\.com$/,
      /^kropic\.com$/,
      /^kvador\.com$/,
      /^picbaron\.com$/,
      /^picdollar\.com$/,
      /^pics4upload\.com$/,
      /^silverpic\.com$/,
      /^barbit\.net$/,
      /^pics4you\.net$/,
      /^imgstar\.eu$/,
      /^www\.fappic\.com$/,
    ],
  },
  async ready () {
    const i = $.$('img.pic');
    if (i) {
      // second stage
      await $.openImage(i.src);
      return;
    }

    const f = $('form');
    f.submit();
  },
});
