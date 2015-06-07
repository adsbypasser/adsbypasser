(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';

  var window = context.window;
  var document = window.document;
  var $ = context.$ || {};


  function go (path, params, method) {
    // Set method to post by default, if not specified.
    method = method || 'post';
    params = params || {};

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

    // HACK create a body if called before DOMContentLoaded
    if (!document.body) {
      document.body = document.createElement('body');
    }
    document.body.appendChild(form);
    form.submit();
  }


  // TODO erase history if possible
  $.openLink = function (to, options) {
    if (typeof to !== 'string' && !to) {
      _.warn('false URL');
      return;
    }
    options = options || {};
    var withReferer = typeof options.referer === 'undefined' ? true : options.referer;
    var postData = options.post;

    var from = window.location.toString();
    _.info(_.T('{0} -> {1}')(from, to));

    if (postData) {
      go(to, postData, 'post');
      return;
    }

    if (withReferer) {
      go(to, null, 'get');
      return;
    }

    window.top.location.replace(to);
  };

  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
