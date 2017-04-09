$.register({
  rule: {
    host: /^admy\.link$/,
  },
  ready: function () {
    'use strict';

    var f = $('form.edit_link');
    f.submit();
  },
});
