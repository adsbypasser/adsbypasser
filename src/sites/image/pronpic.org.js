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
