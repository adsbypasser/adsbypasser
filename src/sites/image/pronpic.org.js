$.register({
  rule: {
    host: /^pronpic\.org$/,
  },
  ready: function () {
    'use strict';

    var urlBaseImg = $('table.new_table2:nth-child(1) img.link');
    var baseUrl = urlBaseImg.src.split('th_')[0];
    var img = $('table.new_table2:nth-child(2) img.link');
    var url = baseUrl + img.src.split('th_')[1];
    $.openImage(url);
  },
});
