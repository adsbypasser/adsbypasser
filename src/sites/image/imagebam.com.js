_.register({
  rule: {
    host: /^www\.imagebam\.com$/,
  },
  async ready () {
    let a = $.$('#continue > a');
    if (a) {
      a.click();
    }
    a = $('.main-image');
    await $.openImage(a.src);
  },
});
