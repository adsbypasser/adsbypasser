$.register({
  rule: {
    host: [
      /^depic\.me$/,
      /^(www\.)?picamatic\.com$/,
    ],
  },
  ready: function () {
    'use strict';

    var i = $('#pic');
    $.openImage(i.src);
  },
});
