_.register({
  rule: {
    host: /^pixhub\.eu$/,
  },
  async ready () {
    $.removeNodes('iframe, .adultpage, #FFN_Banner_Holder');
    const i = $('.image-show img');
    await $.openImage(i.src);
  },
});
