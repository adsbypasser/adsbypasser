$.register({
  rule: {
    host: /^www\.linkarus\.com$/,
  },
  ready: function () {
    'use strict';

    var a = $('#skip-ad');
    // var href = a.onclick.toString();
    // url = url.match(/window\.open\('([^']+)'\)/);
    // if (!url) {
    //   _.info('pattern changed')
    //   return;
    // }
    $.openLink(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
