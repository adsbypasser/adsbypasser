_.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/go\/\w+$/,
  },
  async ready () {
    const id = $.searchFromScripts(/\{id:'(\d+)'\}/);
    await _.wait(3000);
    const url = await $.post('/site/getRedirectLink', {
      id: id[1],
    });
    await $.openLink(url);
  },
});


_.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/s\/\w+$/,
  },
  async ready () {
    const captcha = $('#globalCaptchaConfirm');
    captcha.click();
    // need to wait for animation
    await _.wait(1000);

    for (let i = 0; i < 3; ++i) {
      const word = $('#currentCapQue').textContent;
      await _.wait(100);
      $(`[data-id='${word}']`).click();
    }

    $('#template-contactform-submit').click();
  },
});
