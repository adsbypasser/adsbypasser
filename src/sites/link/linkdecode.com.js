$.register({
  rule: {
    host: [
      /^www\.linkdecode\.com$/,
      /^www\.fastdecode\.com$/,
    ],
    path: /^\/$/,
    query: /^\?(.+)$/,
  },
  ready: function (m) {
    'use strict';

    $.removeNodes('iframe');

    // Either base64 + salt, or a plain URL
    var lnk = m.query[1];

    // If plain URL
    if (m.query[1].match(/^https?:\/\//)) {
    	$.openLink(lnk);
    	return;
    }

    // Else if base64 + salt, we get the decrypted URL from the website
    var b = $('#m > .Visit_Link');
    b = b.onclick.toString().match(/window\.open\(\'([^']+)\'/);
    if (!b) {
      throw new _.AdsBypasser('pattern changed');
    }

    // Plain link
    lnk = b[1].match(/\?(https?:\/\/.*)$/);
    if (lnk) {
        $.openLink(lnk[1]);
        return;
    }

    // Continue the decryption
    $.openLink(b[1], {referer: false});
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
