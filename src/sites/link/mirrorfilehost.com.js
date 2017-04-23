$.register({
  rule: {
    host: /^mirrorfilehost\.com$/,
  },
  ready: function () {
    'use strict';

    // seems need an interval to avoid looping
    _.wait(3 * 1000).then(function () {
      var frame = frames[0];
      var form = frame.document.createElement('form');
      form.target = '_parent';
      form.action = location.toString();
      var input = frame.document.createElement('input');
      input.value = 'Download';
      input.type = 'submit';
      form.appendChild(input);
      frame.document.body.appendChild(form);
      input.click();
    });
  },
});
