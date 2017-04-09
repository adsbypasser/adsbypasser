$.register({
  rule: 'http://www.imagehousing.com/image/*',
  ready: function () {
    'use strict';

    var i = $('td.text_item img');
    $.openImage(i.src);
  },
});
