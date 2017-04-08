$.register({
  rule: 'http://zo.mu/redirector/process?link=*',
  ready: function () {
    'use strict';

    $.removeNodes('iframe');
    window.location.reload();
  },
});
