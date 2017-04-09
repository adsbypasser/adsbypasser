$.register({
  rule: {
    host: /^(www\.)?cvc\.la$/,
    path: /^\/\w+$/,
  },
  start: function () {
    'use strict';

    $.post(document.location.href, {
      hidden: 24, // Either 24 or 276, but both seem to work anyway
      image: ' ',
    }).then(function (text) {
      var matches = text.match(/window\.location\.replace\('([^']+)'\);/);
      $.openLink(matches[1]);
    });
  },
});
