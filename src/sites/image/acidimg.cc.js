_.register({
  rule: {
    host: [
      /^acidimg\.cc$/,
      /^imx\.to$/,
    ],
  },
  async ready () {
    let a = $.$('#continuebutton, .button');
    if (a) {
      a.click();
    }
    a = $('.centred');
    await $.openImage(a.src);
  },
});
