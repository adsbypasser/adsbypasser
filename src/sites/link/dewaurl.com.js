$.register({
  rule: {
    host: /^www\.dewaurl\.com$/,
  },
  ready: function () {
    'use strict';

    var f = $('.framedRedirectTopFrame');
    $.get(f.src).then(function (html) {
      html = $.toDOM(html);
      var a = $('#continueButton > a', html);
      $.openLink(a.href);
    }).catch(function (e) {
      _.warn(e);
    });
  },
});
