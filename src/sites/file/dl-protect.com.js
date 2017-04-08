(function() {
  'use strict';

  $.register({
    rule: {
      host: /^(www\.)?dl-protect\.com$/,
      path: /\/[A-Z0-9]+/,
    },
    ready: function () {
      if ($.$('#captcha')) {
        return;
      }

      // Button access to links
      var f = $.$('form[name=ccerure]');
      if (f) {
        var observer = new MutationObserver(function (mutations) {
          // Tracking number
          var iIn = $('input[id=in]');

          // If tracker (which contains a lot of information like plugins, java state, etc.) was calculated and filled in
          for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].target.value && mutations[i].attributeName === 'value') {
              observer.disconnect();

              // Remove tracking because it sends WAY too much information about the user
              // See https://gist.github.com/devnoname120/7cfaf46943c4f7eda290 to see how the tracking number is calculated
              iIn.value = "Tracking too much hurts users' privacy";

              if (!canFastRedirect()) {
                return;
              }

              setTimeout(function() {
                f.submit();
              }, 600);
              break;
            }
          }

        });

        // Wait for the tracking number to be filled in
        var iIn = $('input[id=in]');
        if (iIn.value) {
          setTimeout(function() {
            f.submit();
          }, 600);
        } else {
          observer.observe(iIn, {
            attributes: true,
          });
        }

        return;
      }

      // If the list contains only one link
      var l = $.$$('#slinks > a');

      // We redirect to it
      if (l.size() === 1) {
        $.openLink(l.at(0).href);
      }
    },
  });

  // If there is no captcha/password that the user must fill before proceeding
  function canFastRedirect () {
    // The onsubmit function is here only when there is a captcha
    // The pwd input is here only when we must input a password
    return !$.$('form[name=ccerure]').onsubmit && !$.$('form[name=ccerure] input[name=pwd]');
  }
})();
