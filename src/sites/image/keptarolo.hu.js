$.register({
  rule: {
    host: /keptarolo\.hu$/,
    path: /^(\/[^\/]+\/[^\/]+\.jpg)$/,
  },
  start: function (m) {
    'use strict';

    $.openImage('http://www.keptarolo.hu/kep' + m.path[1]);
  },
});
