$.register({
  rule: {
    host: /^www.mirrorupload.net$/,
  },
  ready: function () {
    'use strict';

    // Find the form leading to the mirrors page
    var accessForm = $('form[name=form_upload]');

    // We need to append this field or this doesn't redirect correctly
    var accessInput = document.createElement('input');
    accessInput.type = 'hidden';
    accessInput.name = 'access';
    accessInput.value = Math.random();
    accessForm.appendChild(accessInput);

    accessForm.submit();
  },
});
