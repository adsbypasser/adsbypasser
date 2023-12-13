_.register({
  rule: {
    host: /^www\.imagebam\.com$/,
    path: /^\/(view|image)\/.*$/,
  },
  async ready () {
    let a = $('#continue > a');
    if (a) {
      a.click();
    }
    a = $('img.main-image');
    await $.openImage(a.src);
  },
});
