$.register({
  rule: {
    host: /^(www\.)?adfe\.es$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var f = $('#frmvideo');

    // Not at the final step?
    if (!f.STEP4) {
      return;
    }

    f.submit();
  },
});
