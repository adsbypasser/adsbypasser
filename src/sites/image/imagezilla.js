$.register({
  rule: {
    host: /^imagezilla\.net$/,
  },
  ready: function () {
    'use strict';
    var i = $('#photo');
    $.openImage(i.src, {
      referer: true,
    });
  },
});
