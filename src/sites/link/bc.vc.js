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

  function decompress (script, unzip) {
    if (!unzip) {
      return script;
    }
    var matches = script.match(/eval(.*)/);
    matches = matches[1];
    script = eval(matches);
    return script;
  }

  function searchScript (unzip) {
    var content = $.$$('script').find(function (script) {
      if (script.innerHTML.indexOf('make_log') < 0) {
        return _.nop;
      }
      return script.innerHTML;
    });
    if (content) {
      return {
        direct: false,
        script: decompress(content.payload, unzip),
      };
    }
    content = $.$$('script').find(function (script) {
      if (script.innerHTML.indexOf('click_log') < 0) {
        return _.nop;
      }
      return script.innerHTML;
    });
    if (content) {
      return {
        direct: true,
        script: decompress(content.payload, unzip),
      };
    }
    throw _.NoPicAdsError('script changed');
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

  function knockServer2 (script) {
    // somehow I must use jQuery AJAX
    var post = unsafeWindow.$.post;
    // mock a fake AJAX function
    unsafeWindow.$.post = function (a, b, c) {
      if (typeof c === 'function') {
        setTimeout(function () {
          var data = {
            error: false,
            message: {
              url: '#',
            },
          };
          c(JSON.stringify(data));
        }, 1000);
      }
    };

    var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
    var make_url = matches[1];
    var make_opts = eval('(' + matches[2] + ')');

    function makeLog () {
        make_opts.opt = 'make_log';
        post(make_url, make_opts, function (text) {
          var data = JSON.parse(text);
          _.info('make_log', data);
          if (!data.message) {
            checksLog();
            return;
          }

          $.openLink(data.message.url);
        });
    }

    function checkLog () {
      make_opts.opt = 'check_log';
      post(make_url, make_opts, function (text) {
        var data = JSON.parse(text);
        _.info('check_log', data);
        if (!data.message) {
          checkLog();
          return;
        }

        makeLog();
      });
    }

    function checksLog () {
      make_opts.opt = 'checks_log';
      post(make_url, make_opts, function () {
        _.info('checks_log');
        checkLog();
      });
    }

    checksLog();
  }

  // bc.vc
  $.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^\/.+/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var result = searchScript(false);
      if (!result.direct) {
        knockServer2(result.script);
      } else {
        result = result.script.match(/top\.location\.href = '([^']+)'/);
        if (!result) {
          throw new _.NoPicAdsError('script changed');
        }
        result = result[1];
        $.openLink(result);
      }
    },
  });

  function run () {
    // prevent redirection by iframe
    $.removeNodes('iframe');

    var result = searchScript(true);
    if (!result.direct) {
      knockServer(result.script);
    } else {
      result = result.script.match(/top\.location\.href='([^']+)'/);
      if (!result) {
        throw new _.NoPicAdsError('script changed');
      }
      result = result[1];
      $.openLink(result);
    }
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
      host: /^adcrun\.ch|(fly2url|urlwiz)\.com|(zpoz|ultry)\.net|(wwy|myam)\.me|ssl\.gs|link\.tl|xip\.ir|hit\.us|shortit\.in|adbla\.us|www\.adjet\.eu|srk\.gs$/,
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
