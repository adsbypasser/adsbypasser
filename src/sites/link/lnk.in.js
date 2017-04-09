$.register({
  rule: {
    host: /^lnk\.in$/,
  },
  ready: function () {
    'use strict';

    var a = $('#divRedirectText a');
    $.openLink(a.innerHTML);
  },
});
