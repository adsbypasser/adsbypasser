$.register({
  rule: {
    host: /^pixxxels\.org$/,
  },
  ready: function () {
    'use strict';

    var img = $.$('#main-image');
    $.openImage(img.dataset.full);
  },
});
