$.register({
  rule: {
    host: /^ad7.biz$/,
    path: /^\/\w+$/
  },
  ready: function () {
    $.removeNodes('iframe');

    var script = $.$$('script').find(function (v) {
      if (v.innerHTML.indexOf('var r_url') < 0) {
        return _.nop;
      }
      return v.innerHTML;
    });
    var url = script.payload.match(/&url=([^&]+)/);
    url = url[1];
    $.openLink(url);
  },
});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;