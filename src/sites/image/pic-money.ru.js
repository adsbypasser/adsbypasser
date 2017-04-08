$.register({
  rule: 'http://pic-money.ru/*.html',
  ready: function () {
    'use strict';

    var f = document.forms[0];
    var sig = $('input[name="sig"]', f).value;
    var pic_id = $('input[name="pic_id"]', f).value;
    var referer = $('input[name="referer"]', f).value;
    var url = _.T('/pic.jpeg?pic_id={pic_id}&sig={sig}&referer={referer}');
    $.openImage(url({
      sig: sig,
      pic_id: pic_id,
      referer: referer,
    }));
  },
});
