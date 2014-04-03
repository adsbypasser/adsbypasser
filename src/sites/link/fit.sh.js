$.register({
  rule: {
    host: /^fit\.sh$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('.container-body');

    var l = $.$$('script').find(function (script) {
      var m = script.innerHTML.match(/token="([^"]+)"/);
      if (!m) {
        return _.nop;
      }
      return m[1];
    });

    if (!l) {return;}

    var interLink = '/go/' + l.payload + '?a=' + window.location.hash.substr(1);
    //alert(interLink);
    setTimeout(function() {$.openLink(interLink)}, 6000);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;