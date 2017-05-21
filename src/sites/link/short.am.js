$.register({
  rule: {
    host: /^short\.am$/,
  },
  ready: function () {
    'use strict';

    // somehow the recaptcha can be skipped, lucky one
    // wait few seconds to avoid infinity loop
    _.wait(5000).then(function () {
      $.openLink('', {
        post: {
          image: 'Continue',
        },
      });
    });
  },
});
