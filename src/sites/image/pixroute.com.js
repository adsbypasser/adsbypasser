$.register({
  rule: {
    host: /^(www\.)?pixroute\.com$/
  },
  ready: function () {
    'use strict';

    // the img ID is a random string
    var o = $('.fr4me > div:nth-child(20) > a:nth-child(1) > img:nth-child(1)');
    $.openImage(o.src);
  },
});
