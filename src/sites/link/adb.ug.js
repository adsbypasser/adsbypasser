(function () {
  'use strict';

  $.register({
    rule: 'http://adb.ug/*',
    ready: function () {
      $.removeNodes('iframe');

      var script = $.$$('script').find(function (v) {
        return v.innerHTML.indexOf('_args') >= 0;
      });
      var m = script.innerHTML.match(/\{_args.+\}\}/);
      if (!m) {
        throw new _.NoPicAdsError('script content changed');
      }
      m = eval('(' + m[0] + ')');
      script = window.location.pathname + '/skip_timer';

      var i = setInterval(function () {
        $.post(script, m, function (text) {
          var jj = JSON.parse(text);
          if (!jj.errors && jj.messages) {
            clearInterval(i);
            $.openLink(jj.messages.url);
          }
        });
      }, 1000);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
