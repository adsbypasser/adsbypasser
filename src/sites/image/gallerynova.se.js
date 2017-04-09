$.register({
  rule: {
    host: /^(www\.)?gallery(nova|sense)\.se$/,
    path: /^\/site\/v\//,
  },
  ready: function () {
    'use strict';

    var i = $('#myUniqueImg').parentNode;
    $.openImage(i.href);
  },
});

$.register({
  rule: {
    host: /^(www\.)?gallerynova\.se$/,
    path: /^\/site\/viewImage\/(\w+)/,
  },
  ready: function (m) {
    'use strict';

    // Confirm value, seems to always be '0' yet, but we anyways get it in case it changes in the future.
    var confirm = $.searchScripts(/\$\("#confirmImage"\).val\("([^"]+)"\)/)[1];

    $.post('/site/viewConfirmCode/' + m.path[1], {
      confirm: confirm
    }).then(function (rawJson) {
      // Good to know: the image is already present in the JSON as base64
      var json = _.parseJSON(rawJson);

      // Allows to decode \n \t \r and other characters like this
      var decodedHTML = document.createTextNode(json.content).data;

      var imgURL = decodedHTML.match(/<a href="([^"]+)" target="_blank">/)[1];
      $.openImage(imgURL);
    });
  },
});
