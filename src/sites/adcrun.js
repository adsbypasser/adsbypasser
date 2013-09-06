// ==UserScript==
// @match          http://adcrun.ch/*
// @match          http://biaiai.com/*
// @match          http://bih.cc/*
// @match          http://www.budurl.ru/*
// @match          http://fly2url.com/*
// @match          http://link.tl/*
// @match          http://raksoyun.com/*
// @match          http://short.pk/*
// @match          http://ssl.gs/*
// @match          http://tr5.in/*
// @match          http://urlsir.com/*
// @match          http://urlvisa.com/*
// @match          http://wwy.me/*
// @match          http://youlinking.com/*
// @match          http://zpoz.net/*
// @exclude        http://adcrun.ch/
// @exclude        http://biaiai.com/
// @exclude        http://bih.cc/
// @exclude        http://www.budurl.ru/
// @exclude        http://fly2url.com/
// @exclude        http://link.tl/
// @exclude        http://raksoyun.com/
// @exclude        http://short.pk/
// @exclude        http://short.pk/*.php
// @exclude        http://ssl.gs/
// @exclude        http://tr5.in/
// @exclude        http://urlsir.com/
// @exclude        http://urlvisa.com/
// @exclude        http://wwy.me/
// @exclude        http://youlinking.com/
// @exclude        http://zpoz.net/
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /^adcrun\.ch|(youlinking|fly2url|urlsir|urlvisa|biaiai|raksoyun)\.com|zpoz\.net|tr5\.in|wwy\.me|ssl\.gs|link\.tl|bih\.cc|short\.pk|xip\.ir|www\.budurl\.ru$/,
    },
    run: function () {
      // prevent redirection by iframe
      $.removeNodes('iframe');

      var content = $.$$('script').find(function (script) {
        return script.innerHTML.indexOf('make_log') >= 0;
      });
      var matches = content.innerHTML.match(/eval(.*)/);
      matches = matches[1];
      content = eval(matches);

      // inject AJAX into body
      matches = content.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
      var url = matches[1];
      var opts = eval('(' + matches[2] + ')');
      function bc () {
        unsafeWindow.$.post(url, opts, function (text) {
          var jj = JSON.parse(text);
          if (jj.message) {
            $.redirect(jj.message.url);
          }
        });
      }
      unsafeWindow.bc = bc;
      content = 'setInterval(bc,1000);';
      matches = document.createElement('script');
      matches.textContent = content;
      document.body.appendChild(matches);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
