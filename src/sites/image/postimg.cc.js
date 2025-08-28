_.register({
  rule: {
    host: [
      /^postimg\.cc$/,
      /^postlmg\.cc$/,
      /^pixxxels\.cc$/,
    ],
  },
  async ready () {
    const ele = $('#download');
    const img = ele.href.replace('?dl=1', '');
    await $.openImage(img);
  },
});
