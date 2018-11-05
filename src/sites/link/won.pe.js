_.register({
  rule: {
    host: /^won\.pe$/,
  },
  async ready () {
    // remove the fake progress bar and ad skip button
    $.remove('.progress.captcha_loader, skipbox');

    // show recaptcha immediately
    const captcha = $('#recaptcha');
    captcha.style.display = 'block';

    // if recaptcha is done, it will be display: none
    const p = new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (captcha.style.display === 'none') {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(captcha, {
        attributes: true,
      });
    });
    await p;

    // it will store target link to window.longURL
    await $.openLink($.window.longURL);
  },
});
