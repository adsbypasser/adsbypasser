$.register({
  rule: 'http://my-link.pro/*',
  ready: function () {
    'use strict';

    // Find the iframe that is used to display the real link
    var i = $('iframe[scrolling=auto]');

    if (i) {
      $.openLink(i.src);
    }
  },
});
