$.register({
  rule: {
    host: /^comyonet\.com$/,
  },
  ready: function () {
    'use strict';

    var input = $('input[name="enter"]');
    input.click();
  },
});
