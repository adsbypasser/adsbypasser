$.register({
  rule: {
    host: /^fit\.sh$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('.container-body');

    var m = $.searchScripts(/token="([^"]+)"/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    m = m[1];

    var interLink = '/go/' + m + '?fa=15466&a=' + window.location.hash.substr(1);

    setTimeout(function () {
      $.openLink(interLink);
    }, 6000);
  },
});
