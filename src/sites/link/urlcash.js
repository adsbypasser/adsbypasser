$.register({
  rule: {
    host: [
      /^urlcash\.(com|net|org)$/,
      /^(bat5|detonating|celebclk|eightteen|smilinglinks|peekatmygirlfriend|pornyhost|clb1|urlgalleries)\.com$/,
      /^looble\.net$/,
      /^xxxs\.org$/,
    ],
  },
  ready: function () {
    'use strict';

    if ($.window && $.window.linkDestUrl) {
      $.openLink($.window.linkDestUrl);
      return;
    }

    var matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
    if (matches) {
      $.openLink(matches[1]);
      return;
    }
  },
});
