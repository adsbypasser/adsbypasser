$.register({
  rule: {
    host: /^javcity\.com$/,
  },
  ready: function () {
    'use strict';

    var a = $('.entry-content > h1:nth-child(1) > a:nth-child(1)');
    var url = a.onclick.toString();
    url = url.match(/window\.open\('([^']+)'\)/);
    if (!url) {
      _.info('pattern changed')
      return;
    }
    // NOTE actually this site points to another image host
    $.openImage(url[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
