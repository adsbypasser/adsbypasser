$.register({
  rule: {
    host: /^oxyl\.me$/,
  },
  ready: function () {
    'use strict';

    // If the list contains only one link
    try {
      var l = $.$$('.links-container.result-form > a.result-a');

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