$.register({
  rule: {
    host: /^akoam\.com$/,
    path: /^\/download\//,
  },
  start: function () {
    'use strict';

    // the site's rule
    var location_link = location.hash;
    $.post(location_link).then(function (data) {
      data = JSON.parse(data);
      if (!data.hash_data) {
        _.warn('rule changed');
        return;
      }
      $.openLink(data.direct_link);
    });
  },
});
