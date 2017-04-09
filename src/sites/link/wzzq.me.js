$.register({
  rule: {
    host: /^(www\.)?wzzq\.me$/,
  },
  ready: function () {
    'use strict';
    try {
      var l = $('#img_loading_table2  div.wz_img_hit a[target=_blank]').href;
      $.openLink(l);
    } catch (e) {
      // Not on a redirection link
    }
  },
});
