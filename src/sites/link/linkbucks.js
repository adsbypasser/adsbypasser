$.register({
  rule: {
    host: /^[\w]{8}\.(allanalpass|a[mn]y|cash4files|deb|drstickyfingers|dyo|fapoff|filesonthe|free(an|gaysitepass)|galleries|goneviral|hornywood|link(babes|bucks|galleries|seer)|megaline|miniurls|picbucks|picturesetc|poontown|qqc|qvvo|realfiles|rqq|serious(deals|files|urls)|sexpalace|these(blogs|files|forums)|(these|those|u)galleries|tiny(bucks|links)|tnabucks|tubeviral|uber(picz|vidz)|ubucks|ultrafiles|url(beat|pulse)|whackyvidz|youfap|yyv|zff|zxxo)\.(com?|net|gs|me|tv|bz|us)/,
  },
  ready: function () {
    'use strict';

    $.removeAllTimer();
    $.resetCookies();

    if (window.location.pathname.indexOf('verify') >= 0) {
      $.openLink('/');
      return;
    }

    if (unsafeWindow && unsafeWindow.Lbjs && unsafeWindow.Lbjs.TargetUrl) {
      $.openLink(unsafeWindow.Lbjs.TargetUrl);
      return;
    }

    var matches = document.body.innerHTML.match(/TargetUrl\s*=\s*['"]([^'"]+)['"]/);
    if (matches) {
      $.openLink(matches[1]);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
