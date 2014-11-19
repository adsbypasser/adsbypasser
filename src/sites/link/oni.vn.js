$.register({
  rule: {
    host: /^www\.oni\.vn$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var url = $.searchScripts(/window\.location='([^']+)'/);
    if (!url) {
      throw new _.AdsBypasserError('pattern changed');
    }
    $.openLink(url[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
