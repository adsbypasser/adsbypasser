$.register({
  rule: {
    host: /^(www\.)?leechbd\.tk$/,
    path: /^\/Shortener\/(\w+)$/,
  },
  start: function (m) {
    'use strict';

    $.get('/Shortener/API/read/get', {id: m.path[1], type: 'json'}).then(function (text) {
      var r = _.parseJSON(text);
      if (r.success == true && r.data.full) {
        $.openLink(r.data.full);
      } else {
        _.warn('API Error ' + r.error.code + ' : ' + r.error.msg);
      }
    });
  },
});
