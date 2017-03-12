$.register({
  rule: {
    host: /^get\.shrink-service\.it$/,
    path: /^\/(.+)/,
  },
  start: function (m) {
    'use strict';

    var url = _.T('//www.shrink-service.it/shrinked/{0}');
    $.openLink(url(m.path[1]));
  },
});

$.register({
  rule: {
    host: /^www\.shrink-service\.it$/,
    path: /^\/shrinked\//,
  },
  ready: function (m) {
    'use strict';

    var i = $('input[id][name]');
    $.openLink(i.value);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
