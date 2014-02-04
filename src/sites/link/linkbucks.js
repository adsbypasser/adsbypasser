$.register({
  rule: [
  {
    host: /^([\w]{8}|www)\.(allanalpass|a[mn]y|cash4files|deb|drstickyfingers|dyo|fapoff|filesonthe|free(an|gaysitepass)|galleries|goneviral|hornywood|link(babes|bucks|galleries|seer)|megaline|miniurls|picbucks|picturesetc|poontown|qqc|qvvo|realfiles|rqq|serious(deals|files|urls)|sexpalace|these(blogs|files|forums)|(these|those|u)galleries|tiny(bucks|links)|tnabucks|tubeviral|uber(picz|vidz)|ubucks|ultrafiles|url(beat|pulse)|whackyvidz|youfap|yyv|zff|zxxo)\.(com?|net|gs|me|tv|bz|us)/,
  },
  {
    host: /^warning-this-linkcode-will-cease-working-soon\.www\.linkbucksdns\.com$/,
  },
  ],
  ready: function () {
    'use strict';

    $.removeAllTimer();
    $.resetCookies();
    $.removeNodes('iframe');

    if (window.location.pathname.indexOf('verify') >= 0) {
      // NOTE dirty fix
      $.openLink('../');
      return;
    }

    var script = $.$$('script').find(function (n) {
      return n.innerHTML.indexOf('AdPopUrl') >= 0;
    });
    if (!script) {
      _.warn('pattern changed');
      return;
    }
    script = script.innerHTML;

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
        if (data.Success && !data.AdBlockSpotted && data.Url) {
          clearInterval(i);
          $.openLink(data.Url);
        }
      });
    }, 1000);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
