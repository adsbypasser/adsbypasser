$.register({
  rule: 'http://imgtheif.com/image/*.html',
  ready: function () {
    'use strict';

    var a = $('div.content-container a');
    $.openImage(a.href);
  },
});
