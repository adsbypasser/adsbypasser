$.register({
  rule: {
    host: /^srnk\.co$/,
    path: /^\/i\//,
  },
  ready: function () {
    'use strict';

    var a = $.$('#btn-with-link');
    if (!a) {
      // recaptcha stage
      return;
    }

    var href = a.href;
    var method = a.dataset.method;
    if (method) {
      // waiting stage
      var csrfParam = $('meta[name="csrf-param"]').content;
      var csrfToken = $('meta[name="csrf-token"]').content;

      var form = document.createElement('form');
      form.method = 'post';
      form.action = href;
      var input = document.createElement('input');
      input.name = '_method';
      input.value = method;
      form.appendChild(input);
      input = document.createElement('input');
      input.name = csrfParam;
      input.value = csrfToken;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();
      return;
    }

    // final stage
    $.post(location.pathname + '.js').then(function (script) {
      var m = script.match(/var link = "([^"]+)";/);
      if (!m) {
        _.warn('script changed');
        return;
      }
      $.openLink(m[1]);
    });
  },
});
