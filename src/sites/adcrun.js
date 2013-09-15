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
// @include        /http://urlvisa\.com/.+/
// @include        /http://www\.budurl\.ru/.+/
// @include        /http://wwy\.me/.+/
// @include        /http://youlinking\.com/.+/
// @include        /http://zpoz\.net/.+/
// ==/UserScript==

$.register({
  rule: {
    host: /^adcrun\.ch|(youlinking|fly2url|urlvisa|biaiai|raksoyun)\.com|zpoz\.net|tr5\.in|wwy\.me|ssl\.gs|link\.tl|bih\.cc|xip\.ir|www\.budurl\.ru|adli\.pw$/,
  },
  run: function () {
    'use strict';

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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
