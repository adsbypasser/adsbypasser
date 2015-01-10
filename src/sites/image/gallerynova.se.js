$.register({
  rule: {
    host: /^(www\.)?gallerynova\.se$/,
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
    	var json = JSON.parse(rawJson);

    	// Allows to decode \n \t \r and other characters like this
    	var decodedHTML = document.createTextNode(json.content).data;

    	var imgURL = decodedHTML.match(/<a href="([^"]+)" target="_blank">/)[1];
    	$.openImage(imgURL);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
