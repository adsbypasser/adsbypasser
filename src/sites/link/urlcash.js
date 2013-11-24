$.register({
  rule: {
    host: /urlcash\.(com|net|org)|(bat5|detonating|celebclk|eightteen|smilinglinks|peekatmygirlfriend|pornyhost|clb1|urlgalleries)\.com|looble\.net|xxxs\.org$/,
  },
  ready: function () {
    'use strict';

    if (unsafeWindow && unsafeWindow.linkDestUrl) {
      $.openLink(unsafeWindow.linkDestUrl);
      return;
    }

    var matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
    if (matches) {
      $.openLink(matches[1]);
      return;
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
