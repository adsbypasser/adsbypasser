$.register({
  rule: {
    host: /^pronpic\.org$/,
  },
  ready: function () {
    'use strict';

    var img = $('table.new_table2:nth-child(2) img.link');
    var url = img.src.replace('th_', '');
    $.openImage(url);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
