$.register({
  rule: 'http://www.dl-protect.com/*',
  ready: function () {
    'use strict';
    // Button access to links
    try {
      var f = $('form[name=ccerure]');
      // The onsubmit function is here only when  there is a captcha
      if (f.onsubmit != null) {return;}

      // The pwd input is here only when we must input a password
      try {
        $('form[name=ccerure] > input[name=pwd]');
        return;
      }
      catch (e) {
      }

      f.submit();

    }
    catch (e) {
    }

    // If the list contains only one link
    try {
      var l = $.$$('#slinks > a');

      // Convert to JS Object so we can count the number of links
      var aLinks = l.map(function (value) {
        return value;
      });

      // If only one link, we redirect to it
      if (aLinks.length == 1) {
        $.openLink(aLinks[0].href);
        return;
      }
    }
    catch (e) {
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
