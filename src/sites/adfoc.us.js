$.register({
  rule: 'http://adfoc.us/serve/?id=*',
  ready: function () {
    'use strict';

    // FIXME mutation events has been deprecated, consider rewrite with
    // mutation observer
    document.addEventListener('DOMNodeInserted', function () {
      var o = $.$('#showSkip');
      if (o) {
        o = o.querySelector('a');
        $.openLink(o.href);
      }
    }, null);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
