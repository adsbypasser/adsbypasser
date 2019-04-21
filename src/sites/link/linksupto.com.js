_.register({
  rule: {
    host: [
      /^linksupto\.com$/,
      /^uplinkto\.me$/,
    ],
    path: /^\/view\//,
  },
  async ready () {
    const l = $('.submit-captcha.row .col-sm-3.col-sm-offset-4 button');
    l.click();
  },
});
