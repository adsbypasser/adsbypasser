$.register({
  rule: {
    host: /^hotshorturl\.com$/,
  },
  ready: function () {
    'use strict';

    var frame = $('frame[scrolling=yes]');
    $.openLink(frame.src);
  },
});
