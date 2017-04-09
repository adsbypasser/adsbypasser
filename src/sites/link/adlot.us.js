$.register({
  rule: {
    host: /^(www\.)?adlot\.us$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var script = $.searchScripts('form');
    var p = /name='([^']+)' value='([^']+)'/g;
    var opt = {
      image: ' ',
    };
    var tmp = null;
    while (tmp = p.exec(script)) {
      opt[tmp[1]] = tmp[2];
    }
    $.openLink('', {
      path: opt,
    });
  },
});
