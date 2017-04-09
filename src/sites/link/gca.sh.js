(function () {

  var hosts = /^gca\.sh|repla\.cr$/;

  $.register({
    rule: {
      host: hosts,
      path: /^\/adv\/\w+\/(.*)$/,
      query: /^(.*)$/,
      hash: /^(.*)$/,
    },
    start: function (m) {
      'use strict';

      var l = m.path[1] + m.query[1] + m.hash[1];
      $.openLink(l);
    },
  });

  $.register({
    rule: {
      host: hosts,
    },
    ready: function () {
      'use strict';

      $.removeNodes('iframe');

      var jQuery = $.window.$;
      setTimeout(function () {
        jQuery("#captcha-dialog").dialog("open");
      }, 1000);
    },
  });

})();
