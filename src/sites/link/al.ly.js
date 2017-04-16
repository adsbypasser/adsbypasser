$.register({
  rule: {
    host: [
      /^al\.ly$/,
      /^ally\.sh$/,
    ],
  },
  ready: function () {
    'use strict';

    // first stage
    var i = $.$('body > section > iframe');
    if (i) {
      // the site will detect iframe being removed or not
      i.src = 'about:blank';

      // wait a reasonable time to avoid AdsBlock detection
      _.wait(3000).then(function () {
        var a = $('a.redirect');
        a.click();
      });

      return;
    }

    // second stage
    i = $.searchScripts(/"href","([^"]+)"\)\.remove/);
    if (!i) {
      _.warn('site changed');
      return;
    }
    i = i[1];

    $.openLink(i);
  },
});
