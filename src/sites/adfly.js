// ==UserScript==
// @match          http://adf.ly/*
// @match          http://go.phpnulledscripts.com/*
// @match          http://j.gs/*
// @match          http://q.gs/*
// @match          http://u.bb/*
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
// ==/UserScript==

$.register({
  rule: {
    host: /^adf\.ly|u\.bb|[jq]\.gs|go\.phpnulledscripts\.com$/,
    path: /\/locked$/,
    query: /url=([^&]+)/,
  },
  run: function (m) {
    'use strict';

    $.resetCookies();
    $.redirect(m.query[1]);
  },
});

$.register({
  rule: {
    host: /^adf\.ly|u\.bb|[jq]\.gs|go\.phpnulledscripts\.com$/,
  },
  run: function () {
    'use strict';

    $.removeNodes('iframe');
    $.resetCookies();

    var h = unsafeWindow.eu, b64 = unsafeWindow.Base64;
    if (!h) {
      h = $('#adfly_bar');
      unsafeWindow.close_bar();
      return;
    }
    var a = h.indexOf('!HiTommy'), b = '';
    if (a >= 0) {
      h = h.substring(0, a);
    }
    a = '';
    for (var i = 0; i < h.length; ++i) {
      if (i % 2 === 0) {
        a = a + h.charAt(i);
      } else {
        b = h.charAt(i) + b;
      }
    }
    h = b64.decode(a + b);
    h = h.substr(2);
    if (location.hash) {
      h += location.hash;
    }
    $.redirect(h);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
