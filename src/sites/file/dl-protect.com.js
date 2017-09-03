(function () {
  _.register({
    rule: {
      host: /^(www\.)?dl-protect\.com$/,
      path: /\/[A-Z0-9]+/,
    },
    async ready () {
      if ($.$('#captcha')) {
        return;
      }

      // Button access to links
      const f = $.$('form[name=ccerure]');
      if (f) {
        // Wait for the tracking number to be filled in
        const iIn = $('input[id=in]');
        if (iIn.value) {
          await _.wait(600);
          f.submit();
        } else {
          const [, , p] = await waitDOM(iIn, {
            attributes: true,
          }, (mutation) => {
            if (!mutation.target.value || mutation.attributeName !== 'value') {
              return _.none;
            }
            // Remove tracking because it sends WAY too much information about the user
            // See https://gist.github.com/devnoname120/7cfaf46943c4f7eda290 to see how the tracking number is calculated
            iIn.value = 'Tracking too much hurts users\' privacy';

            if (!canFastRedirect()) {
              return;
            }

            return _.wait(600);
          });
          if (p) {
            await p;
            f.submit();
          }
        }

        return;
      }

      // If the list contains only one link
      const l = $.$$('#slinks > a');

      // We redirect to it
      if (l.length === 1) {
        await $.openLink(l[0].href);
      }
    },
  });


  // If there is no captcha/password that the user must fill before proceeding
  function canFastRedirect () {
    // The onsubmit function is here only when there is a captcha
    // The pwd input is here only when we must input a password
    return !$.$('form[name=ccerure]').onsubmit && !$.$('form[name=ccerure] input[name=pwd]');
  }


  function waitDOM (element, config, fn) {
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutations) => {
        const [k, v, r] = _.find(mutations, fn);
        if (k !== _.none) {
          observer.disconnect();
          resolve([k, v, r]);
          return;
        }
      });
      observer.observe(element, config);
    });
  }
})();
