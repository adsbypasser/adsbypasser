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

    // If the target is a direct link, then our script opens it, and afterwards the script of the website opens it too if the timer is not stopped
    $.removeAllTimer();

    var matches = $.searchScripts(/'slug':\s*'([^']+)',\s*'hoster':\s*'([^']+)'/);

    var slug = matches[1];
    var hoster = matches[2];

    $.post('/get/link/', {
      'slug': slug,
      'hoster': hoster
    }).then(function(response) {
      var respJSON = _.parseJSON(response);
      $.openLink(respJSON.url);
    });
  },
});
