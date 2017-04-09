$.register({
  rule: {
    host: /^(www\.)?embedupload\.com$/,
    path: /^\/$/,
    query: /^\?\w{2}=\w+$/
  },
  ready: function () {
    'use strict';

    var downloadPage = $('.categories a[target=_blank]');
    $.openLink(downloadPage);
  },
});
