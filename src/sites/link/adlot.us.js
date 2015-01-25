$.register({
  rule: {
    host: /^(www\.)?adlot\.us$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var script = $.searchScripts('form');
    var p = /name='([^']+)' value='([^']+)'/g;
    var opt = {
      image: ' ',
    };
    var tmp = null;
    while (tmp = p.exec(script)) {
      opt[tmp[1]] = tmp[2];
    }
    $.openLinkByPost('', opt);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
