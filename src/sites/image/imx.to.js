_.register({
  rule: {
    host: /^imx\.to$/,
  },
  async ready () {
    let a = $('#continuebutton');
    if (a) {
      a.click();
    }
    a = $('.centred');
    await $.openImage(a.src);
  },
});
