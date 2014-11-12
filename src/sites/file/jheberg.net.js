$.register({
  rule: {
    host: /^(www\.)?jheberg\.net$/,
    path: /^\/captcha\//,
  },
  ready: function () {
    'use strict';

    $('.dl-button').click();
  },
});

$.register({
  rule: {
    host: /^(www\.)?jheberg\.net$/,
    path: /^\/redirect\//,
  },
  ready: function () {
    'use strict';

    var matches = $.searchScripts(/'slug':\s*'([^']+)',\s*'hoster':\s*'([^']+)'/);

    var slug = matches[1];
    var hoster = matches[2];

    $.post('/get/link/', {'slug': slug, 'hoster': hoster}, function(response) {
      var respJSON = JSON.parse(response);
      $.openLink(respJSON.url);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
