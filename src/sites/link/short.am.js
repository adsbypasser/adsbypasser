$.register({
  rule: {
    host: /^short.am$/,
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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
