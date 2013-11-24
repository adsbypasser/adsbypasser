(function () {
  'use strict';

  // bc.vc, shortcut, dirty hack
  $.register({
    rule: {
      host: /^bc\.vc$/,
      query: /^.+(https?:\/\/.+)/,
    },
    start: function (m) {
      $.openLink(m.query[1]);
    },
  });

  // bc.vc, shortcut
  // FIXME may cut hash or query string
  $.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^.+(https?:\/\/.+)$/,
    },
    start: function (m) {
      $.openLink(m.path[1]);
    },
  });

  function searchScript () {
      var content = $.$$('script').find(function (script) {
        return script.innerHTML.indexOf('make_log') >= 0;
      });
      return content.innerHTML;
  }

  function knockServer (script, dirtyFix) {
    var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
    var make_url = matches[1];
    var make_opts = eval('(' + matches[2] + ')');

    var i = setInterval(function () {
      $.post(make_url, make_opts, function (text) {
        if (dirtyFix) {
          // dirty fix for tr5.in
          text = text.match(/\{.+\}/)[0];
        }
        var jj = JSON.parse(text);
        if (jj.message) {
          clearInterval(i);
          $.openLink(jj.message.url);
        }
      });
    }, 1000);
  }

  // bc.vc
  $.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^\/.+/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var content = searchScript();

      knockServer(content);
    },
  });

  function run () {
    // prevent redirection by iframe
    $.removeNodes('iframe');

    var content = searchScript();
    var matches = content.match(/eval(.*)/);
    matches = matches[1];
    content = eval(matches);

    knockServer(content);
  }

  // adli.pw
  $.register({
    rule: {
      host: /^adli\.pw$/,
      path: /^\/[^.]+$/,
    },
    ready: run,
  });

  $.register({
    rule: {
      host: /^adcrun\.ch|(fly2url|urlwiz)\.com|(zpoz|ultry)\.net|(wwy|myam)\.me|(ssl|adfro)\.gs|link\.tl|xip\.ir|juuh\.de|www\.adjet\.eu|hit\.us|shortit\.in$/,
      path: /^\/.+/,
    },
    ready: run,
  });

  $.register({
    rule: {
      host: /^tr5\.in$/,
      path: /^\/.+/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var content = searchScript();
      var matches = content.match(/eval(.*)/);
      matches = matches[1];
      content = eval(matches);

      knockServer(content, true);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
