$.register({
  rule: {
    host: /^linksas\.us$/,
    path: /^(\/\w+)$/,
  },
  ready: function (m) {
    'use strict';

    _.try(1000, function () {
      var recaptcha = $('#g-recaptcha-response');
      if (!recaptcha) {
        // no recaptcha, unlikely to happen
        return null;
      }
      if (!recaptcha.value) {
        // not ready yet
        return _.none;
      }
      return recaptcha.value;
    }).then(function (recaptcha) {
      // get random ip info
      var url = _.T('http://ipinfo.io/{0}/json')($.generateRandomIP());
      return $.get(url).then(function (ipinfo) {
        ipinfo = _.parseJSON(ipinfo);
        return {
          codeAds: 1,
          country: ipinfo.country,
          ipAddress: ipinfo.ip,
          recaptcha: recaptcha,
        };
      });
    }).then(function (payload) {
      // finally send the request
      var token = $.getCookie('XSRF-TOKEN');
      return $.post('/go' + m.path[1], payload, {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token,
      });
    }).then(function (data) {
      data = _.parseJSON(data);
      $.openLink(data.message);
    }).catch(function (e) {
      _.warn(e);
    });

  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
