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


  function prepare (e) {
    // HACK create a body if called before DOMContentLoaded
    if (!document.body) {
      document.body = document.createElement('body');
    }
    document.body.appendChild(e);
  }


  function get (url) {
    // Create a link on the page
    var a = document.createElement('a');
    a.href = url;
    // Prevent event interfering
    a.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    // Simulate a click on this link (so that the referer is sent)
    prepare(a);
    a.click();

    // Warning if the page still not redirecting
    _.wait(10 * 1000).then(function () {
      _.warn('previous click does not work');
    });
  }


  function post (path, params) {
    params = params || {};

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement('form');
    form.method = 'post';
    form.action = path;

    _.C(params).each(function (value, key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    prepare(form);
    form.submit();
  }


  // TODO erase history if possible
  $.openLink = function (to, options) {
    if (!_.isString(to) && !to) {
      _.warn('false URL');
      return;
    }
    options = options || {};
    var withReferer = typeof options.referer === 'undefined' ? true : options.referer;
    var postData = options.post;

    var from = window.location.toString();
    _.info(_.T('{0} -> {1}')(from, to));

    if (postData) {
      post(to, postData);
      return;
    }

    if (withReferer) {
      get(to);
      return;
    }

    window.top.location.replace(to);
  };

  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
