(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    context.$ = factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';

  var window = context.window;
  var document = window.document;


  var DomNotFoundError = _.AdsBypasserError.extend({
    name: 'DomNotFoundError',
    constructor: function (selector) {
      DomNotFoundError.super.constructor.call(this, _.T('`{0}` not found')(selector));
    },
  });


  var $ = function (selector, context) {
    if (!context || !context.querySelector) {
      context = document;
    }
    var n = context.querySelector(selector);
    if (!n) {
      throw new DomNotFoundError(selector);
    }
    return n;
  };

  $.$ = function (selector, context) {
    try {
      return $(selector, context);
    } catch (e) {
      return null;
    }
  };

  $.$$ = function (selector, context) {
    if (!context || !context.querySelectorAll) {
      context = document;
    }
    var ns = context.querySelectorAll(selector);
    return _.C(ns);
  };

  $.toDOM = function(rawHTML) {
    try {
      var parser = new DOMParser();
      var DOMHTML = parser.parseFromString(rawHTML, "text/html");
      return DOMHTML;
    } catch (e) {
      throw new _.AdsBypasserError('could not parse HTML to DOM');
    }
  };

  $.removeNodes = function (selector, context) {
    $.$$(selector, context).each(function (e) {
      e.parentNode.removeChild(e);
    });
  };

  function searchScriptsByRegExp (pattern, context) {
    var m = $.$$('script', context).find(function (s) {
      var m = s.innerHTML.match(pattern);
      if (!m) {
        return _.none;
      }
      return m;
    });
    if (!m) {
      return null;
    }
    return m.payload;
  }

  function searchScriptsByString (pattern, context) {
    var m = $.$$('script', context).find(function (s) {
      var m = s.innerHTML.indexOf(pattern);
      if (m < 0) {
        return _.none;
      }
      return m;
    });
    if (!m) {
      return null;
    }
    return m.value.innerHTML;
  }

  $.searchScripts = function (pattern, context) {
    if (pattern instanceof RegExp) {
      return searchScriptsByRegExp(pattern, context);
    } else if (typeof pattern === 'string') {
      return searchScriptsByString(pattern, context);
    } else {
      return null;
    }
  };


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
