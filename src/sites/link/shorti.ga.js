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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
