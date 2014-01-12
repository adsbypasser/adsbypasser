$.register({
  rule: {
    host: /^cloudimg\.net|imageheli\.com$/,
    path: /^\/img-.*\.jpeg$/,
  },
  ready: function () {
    'use strict';

    var a = $.$('a[rel="lightbox"]');
    if (!a) {
      $.postAndGo('', {
        browser_fingerprint: '',
        ads: '0',
      });
      return;
    }
    $.openImage(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
