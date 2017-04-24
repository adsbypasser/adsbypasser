(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var _ = require('lodash');
      var core = require('./core.js');
      var misc = require('./misc.js');
      var dispatcher = require('./dispatcher.js');
      var modules = [misc, dispatcher].map(function (v) {
        return v.call(null, context, GM);
      });
      var $ = _.assign.apply(_, modules);
      return factory(context, GM, core, $);
    };
  } else {
    factory(context, {
      openInTab: GM_openInTab,
      registerMenuCommand: GM_registerMenuCommand,
    }, context._, context.$);
  }
}(this, function (context, GM, _, $) {
  'use strict';

  var window = context.window;
  var document = window.document;
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;


  function disableWindowOpen () {
    $.window.open = function () {
      return {
        closed: false,
      };
    };
    $.window.alert = _.nop;
    $.window.confirm = _.nop;
  }


  // NOTE maybe break in future Firefox release
  function disableLeavePrompt (element) {
    if (!element) {
      return;
    }

    var seal = {
      set: function () {
        _.info('blocked onbeforeunload');
      },
    };

    // release existing events
    element.onbeforeunload = undefined;
    // prevent they bind event again
    if (isSafari) {
      // Safiri must use old-style method
      element.__defineSetter__('onbeforeunload', seal.set);
    } else {
      $.window.Object.defineProperty(element, 'onbeforeunload', {
        configurable: true,
        enumerable: false,
        get: undefined,
        // this will turn to undefined in Firefox, need upstream fix
        set: seal.set,
      });
    }

    // block addEventListener
    var oael = element.addEventListener;
    var nael = function (type) {
      if (type === 'beforeunload') {
        _.info('blocked addEventListener onbeforeunload');
        return;
      }
      return oael.apply(this, arguments);
    };
    element.addEventListener = nael;
  }


  function changeTitle () {
    document.title += ' - AdsBypasser';
  }


  function beforeDOMReady (handler) {
    _.info('working on\n%s \nwith\n%s', window.location.toString(), JSON.stringify($.config));
    disableLeavePrompt($.window);
    disableWindowOpen();
    handler.start();
  }


  function afterDOMReady (handler) {
    // some sites bind the event on body
    disableLeavePrompt($.window.document.body);
    changeTitle();
    handler.ready();
  }


  function waitDOM () {
    return _.D(function (resolve, reject) {
      // DOM is ready
      if (document.readyState !== 'loading') {
        // means 'interactive' or 'complete'
        resolve();
        return;
      }
      // DOM is not ready
      document.addEventListener('DOMContentLoaded', function () {
        resolve();
      });
    });
  }


  $._main = function () {
    var findHandler = $._findHandler;

    delete $._main;
    delete $._findHandler;

    // use unsafeWindow here because usi (a manager for Android Firefox) does
    // not implement the sandbox correctly
    if (unsafeWindow.top !== unsafeWindow.self) {
      // skip frames
      return;
    }

    GM.registerMenuCommand('AdsBypasser - Configure', function () {
      GM.openInTab('https://adsbypasser.github.io/configure.html');
    });

    // find by URL
    var handler = findHandler();
    if (handler) {
      // if log level is 0, disable console log
      if ($.config.logLevel <= 0) {
        _._quiet = true;
      }

      beforeDOMReady(handler);

      waitDOM().then(function () {
        afterDOMReady(handler);
      });

      return;
    }
  };

  return $;

}));
$._main();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
