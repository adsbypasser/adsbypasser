$.register({
  rule: {
    host: /^(www\.)?ouo\.(io|press)$/
  },
  ready: function (m) {
    'use strict';
    $('form[method="POST"]>input[name="_token"]').parentNode.submit();
  },
});
