(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (global) {
      var core = require('./core.js');
      return factory(global, core);
    };
  } else {
    factory(global, global._);
  }
}(this, function (global, _) {
  'use strict';

  var window = global.window;
  var document = window.document;
  var $ = global.$ || {};


  function go (path, params, method) {
    // Set method to post by default, if not specified.
    method = method || 'post';

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement('form');
    form.method = method;
    form.action = path;

    _.C(params).each(function (value, key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  $.openLinkByPost = function (url, data) {
    go(url, data, 'post');
  };

  $.openLink = function (to) {
    if (!to) {
      _.warn('false URL');
      return;
    }
    var from = window.location.toString();
    _.info(_.T('{0} -> {1}')(from, to));
    window.top.location.replace(to);
  };

  $.openLinkWithReferer = function (to) {
    if (!to) {
      _.warn('false URL');
      return;
    }
    var from = window.location.toString();
    _.info(_.T('{0} -> {1}')(from, to));

    // Create a link on the page
    var a = document.createElement('a');
    a.href = to;
    a.style.display = 'none';
    document.body.appendChild(a);

    // Simulate a click on this link (so that the referer is sent)
    a.click();
  };


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
