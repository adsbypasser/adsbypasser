$.register({
  rule: 'http://www.dl-protect.com/*',
  ready: function () {
    'use strict';
    // Button access to links
    var f = $.$('form[name=ccerure]');
    if (f) {
      // The onsubmit function is here only when  there is a captcha
      if (f.onsubmit !== null) {
        return;
      }

      // The pwd input is here only when we must input a password
      var p = $.$('form[name=ccerure] input[name=pwd]');
      if (p) {
        return;
      }

      f.submit();
      return;
    }

    // If the list contains only one link
    var l = $.$$('#slinks > a');

    // If only one link, we redirect to it
    if (l.size() === 1) {
      $.openLink(l.at(0).href);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
