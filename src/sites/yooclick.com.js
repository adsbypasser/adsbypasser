$.register({
  rule: 'http://www.yooclick.com/l/*',
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var uniq = unsafeWindow.uniq;
    var path = window.location.pathname;
    // this site doesn't really parse the query string
    // the order of param matters
    var url = _.T('{0}?ajax=true&adblock=false&old=false&framed=false&uniq={1}')(path, uniq);
    $.get(url, {
    }, function (text) {
      $.openLink(text);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
