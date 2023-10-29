_.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/site\//,
  },
  async ready () {
    // time needed to complete captcha
    await _.wait(15000);
    $('#template-contactform-submit').click();
  },
});
