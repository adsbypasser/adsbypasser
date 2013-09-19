// ==UserScript==
// @include        /http://adcrun\.ch/.+/
// @include        /http://adli\.pw/[^.]+$/
// @include        /http://biaiai\.com/.+/
// @include        /http://bih\.cc/.+/
// @include        /http://fly2url\.com/.+/
// @include        /http://link\.tl/.+/
// @include        /http://raksoyun\.com/.+/
// @include        /http://ssl\.gs/.+/
// @include        /http://tr5\.in/.+/
// @include        /http://ultry\.net/.+/
// @include        /http://urlvisa\.com/.+/
// @include        /http://www\.budurl\.ru/.+/
// @include        /http://wwy\.me/.+/
// @include        /http://youlinking\.com/.+/
// @include        /http://zpoz\.net/.+/
// @match          http://bc.vc/*
// ==/UserScript==


(function () {
  'use strict';

  // bc.vc, shortcut, dirty hack
  $.register({
    rule: {
      host: /bc\.vc/,
      query: /^.+(https?:\/\/.+)/,
    },
    run: function (m) {
      $.redirect(m.query[1]);
    },
  });

  // bc.vc, shortcut
  // FIXME may cut hash or query string
  $.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^.+(https?:\/\/.+)$/,
    },
    run: function (m) {
      $.redirect(m.path[1]);
    },
  });

  function searchScript () {
      var content = $.$$('script').find(function (script) {
        return script.innerHTML.indexOf('make_log') >= 0;
      });
      return content.innerHTML;
  }

  function knockServer (script) {
    var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
    var make_url = matches[1];
    var make_opts = eval('(' + matches[2] + ')');

    var i = setInterval(function () {
      $.post(make_url, make_opts, function (text) {
        var jj = JSON.parse(text);
        if (jj.message) {
          clearInterval(i);
          $.redirect(jj.message.url);
        }
      });
    }, 1000);
  }

  // bc.vc
  $.register({
    rule: {
      host: /^bc\.vc$/,
    },
    run: function () {
      $.removeNodes('iframe');

      var content = searchScript();

      knockServer(content);
    },
  });

  $.register({
    rule: {
      host: /^adcrun\.ch|(youlinking|fly2url|urlvisa|biaiai|raksoyun)\.com|(zpoz|ultry)\.net|tr5\.in|wwy\.me|ssl\.gs|link\.tl|bih\.cc|xip\.ir|www\.budurl\.ru|adli\.pw$/,
    },
    run: function () {
      // prevent redirection by iframe
      $.removeNodes('iframe');

      var content = searchScript();
      var matches = content.match(/eval(.*)/);
      matches = matches[1];
      content = eval(matches);

      knockServer(content);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
