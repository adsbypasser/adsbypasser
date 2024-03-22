_.register({
  rule: {
    host: [
      /^dewimg\.com$/,
      /^outletpic\.com$/,
      /^pictwn\.com$/,
      /^picyield\.com$/,
      /^tezzpic\.com$/,
    ],  
  },
  async ready () {
    const img = $('center > img.picview');
    await $.openImage(img.src);
  },
});
