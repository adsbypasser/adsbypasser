$.register({
  rule: {
    host: /^(www\.)?filoops.info$/
  },
  ready: function () {
    'use strict';
    var a = $('#text > center a, #text > div[align=center] a');
    $.openLink(a.href);
  },
});
