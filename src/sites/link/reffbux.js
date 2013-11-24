$.register({
  rule: 'http://reffbux.com/refflinx/view/*',
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var id = null, share = null;
    $.$$('script').find(function (script) {
      var m = script.innerHTML.match(/skip_this_ad_(\d+)_(\d+)/);
      if (m) {
        id = m[1];
        share = m[2];
        return true;
      }
      return false;
    });
    var fp = 0;
    var location = window.location;

    $.post('http://reffbux.com/refflinx/register', {
      id: id,
      share: share,
      fp: 0,
      location: location,
      referer: '',
    }, function (text) {
      var m = text.match(/'([^']+)'/);
      if (!m) {
        throw new _.NoPicAdsError('pattern changed');
      }
      $.openLink(m[1]);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
