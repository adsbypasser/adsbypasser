$.register({
  rule: {
    host: /^(www\.)?shorti\.ga$/,
    path: [
      /^\/\w+$/,
      /^\/url_redirector\.html$/,
    ],
  },
  ready: function () {
    'use strict';

    var f = $.$$('frame');

    // Find the right frame
    var fl = f.find(function(value, key, self) {
      if (value.getAttribute('class')) {
        return _.none;
      }

      // Target frame has no class
      return 'Target frame found';
    });

    $.openLink(fl.value.src);
  },
});
