$.register({
  rule: {
    host: /^pixhub\.eu$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe, .adultpage, #FFN_Banner_Holder');
    var i = $('.image-show img');
    $.openImage(i.src);
  },
});
