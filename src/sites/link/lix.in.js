$.register({
  rule: 'http://lix.in/-*',
  ready: function () {
    'use strict';

    var i = $.$('#ibdc');
    if (i) {
      // captcha, do nothing
      return;
    }
    i = $.$('form');
    if (i) {
      i.submit();
      return;
    }
    i = $('iframe');
    $.openLink(i.src);
  },
});
