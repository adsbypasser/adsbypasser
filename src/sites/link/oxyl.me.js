$.register({
  rule: {
    host: /^oxyl\.me$/,
  },
  ready: function () {
    'use strict';

    // If the list contains only one link
    var l = $.$$('.links-container.result-form > a.result-a');

    // If only one link, we redirect to it
    if (l.size() > 1) {
      return;
    }
    $.openLink(l.at(0).href);
  },
});
