_.register({
  rule: {
    host: [
      /^outletpic\.com$/,
      /^tezzpic\.com$/,
    ],  
  },
  async ready () {
    const img = $('center > img.picview');
    await $.openImage(img.src);
  },
});
