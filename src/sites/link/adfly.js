(function () {
  'use strict';

  function combineRegExp (res) {
    var re = res.map(function (re) {
      return re.source;
    }).join('|');
    re = new RegExp('^' + re + '$');
    return re;
  }

  // too long, split them
  var hostRule = [
    /(www\.)?adf\.(ly|acb\.im|sazlina\.com|animechiby\.com)/,
    /[jq]\.gs/,
    /go\.(phpnulledscripts|nicoblog-games)\.com/,
    /ay\.gy/,
    /(chathu|alien)\.apkmania\.co/,
    /ksn\.mx/,
    /goto\.adflytutor\.com/,
    /dl\.apkpro\.net/,
    /adf(ly\.itsrinaldo|\.tuhoctoan)\.net/,
    /.*\.gamecopyworld\.com/,
    /adv\.coder143\.com/,
    /(dl|david)\.nhachot\.info/,
    /file\.tamteo\.com/,
    /(n|u)\.shareme\.in/,
    /ddl\.animesave\.com/,
  ];
  hostRule = combineRegExp(hostRule);

  $.register({
    rule: {
      host: hostRule,
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    start: function (m) {
      $.resetCookies();
      $.openLink('/' + m.query[1]);
    },
  });

  $.register({
    rule: {
      host: hostRule,
    },
    ready: function () {
      // check if this is ad page
      var h = $.$('#adfly_html'), b = $.$('#home');
      if (!h || !b || h.nodeName !== 'HTML' || b.nodeName !== 'BODY') {
        // this is not a ad page
        return;
      }

      $.removeNodes('iframe');

      h = unsafeWindow.eu;
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
      h = atob(a + b);
      h = h.substr(2);
      if (location.hash) {
        h += location.hash;
      }
      // some sites need Referer header
      $.openLinkWithReferer(h);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
