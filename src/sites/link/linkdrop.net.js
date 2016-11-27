$.register({
  rule: {
    host: [
      /^(www\.)?linkdrop\.net$/,
      /^dmus\.in$/,
      /^ulshare\.net$/,
    ],
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var jQuery = $.window.$;
    var f = jQuery('form.hidden[action="/links/go"]');
    if (f.length <= 0) {
      return;
    }

    jQuery.ajax({
      dataType: 'json',
      type: 'POST',
      url: f.attr('action'),
      data: f.serialize(),
      success: function (result, status, xhr) {
        if (result.url) {
          $.openLink(result.url);
        } else {
          _.warn(result.message);
        }
      },
      error: function (xhr, status, error) {
        _.warn(xhr, status, error);
      },
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
