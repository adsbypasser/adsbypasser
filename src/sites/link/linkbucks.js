(function() {
  'use strict';

  var hostRules = [
    /^(([\w]{8}|www)\.)?(allanalpass|cash4files|drstickyfingers|fapoff|freegaysitepass|(gone|tube)viral|(pic|tna)bucks|whackyvidz)\.com$/,
    /^(([\w]{8}|www)\.)?(a[mn]y|deb|dyo|sexpalace)\.gs$/,
    /^(([\w]{8}|www)\.)?(filesonthe|poontown|seriousdeals|ultrafiles|urlbeat)\.net$/,
    /^(([\w]{8}|www)\.)?freean\.us$/,
    /^(([\w]{8}|www)\.)?galleries\.bz$/,
    /^(([\w]{8}|www)\.)?hornywood\.tv$/,
    /^(([\w]{8}|www)\.)?link(babes|bucks(media)?)\.com$/,
    /^(([\w]{8}|www)\.)?(megaline|miniurls|qqc|rqq|tinylinks|yyv|zff)\.co$/,
    /^(([\w]{8}|www)\.)?(these(blog|forum)s)\.com$/,
    /^(([\w]{8}|www)\.)?youfap\.me$/,
    /^warning-this-linkcode-will-cease-working-soon\.www\.linkbucksdns\.com$/,
  ];

  $.register({
    rule: {
      host: hostRules,
      path: /^\/\w+\/url\/(.*)$/,
    },
    ready: function(m) {
      $.removeAllTimer();
      $.resetCookies();
      $.removeNodes('iframe');

      if (m.path[1] !== null) {
        $.openLink(m.path[1]);
      }
    }
  });

  $.register({
    rule: {
      host: hostRules,
    },
    ready: function () {
      $.removeAllTimer();
      $.resetCookies();
      $.removeNodes('iframe');

      if (window.location.pathname.indexOf('verify') >= 0) {
        // NOTE dirty fix
        $.openLink('../');
        return;
      }

      var script = $.$$('script').find(function (n) {
        if (n.innerHTML.indexOf('window[\'init\' + \'Lb\' + \'js\' + \'\']') < 0) {
          return _.nop;
        }
        return n.innerHTML;
      });
      if (!script) {
        _.warn('pattern changed');
        return;
      }
      script = script.payload;

      var m = script.match(/AdPopUrl\s*:\s*'.+\?ref=([\w\d]+)'/);
      var token = m[1];
      m = script.match(/=\s*(\d+);/);
      var ak = parseInt(m[1], 10);
      var re = /\+\s*(\d+);/g;
      var tmp = null;
      // get second (i.e. the real) salt
      while((m = re.exec(script)) !== null) {
        tmp = m[1];
      }
      ak += parseInt(tmp, 10);

      _.info({
        t: token,
        aK: ak,
      });

      var i = setInterval(function () {
        $.get('/intermission/loadTargetUrl', {
          t: token,
          aK: ak,
        }, function (text) {
          var data = JSON.parse(text);
          _.info(data);
          if (!data.Success && data.Errors[0] === 'Invalid token') {
            // somehow this token is invalid, reload to get new one
            window.location.reload();
            return;
          }
          if (data.Success && !data.AdBlockSpotted && data.Url) {
            clearInterval(i);
            $.openLink(data.Url);
          }
        });
      }, 1000);
    },
  });
})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
