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
    $.window.open = _.nop;
    $.window.alert = _.nop;
    $.window.confirm = _.nop;
  }


  function changeTitle () {
    document.title += ' - AdsBypasser';
  }


  function beforeDOMReady (handler) {
    _.info('working on\n%s \nwith\n%s', window.location.toString(), JSON.stringify($.config));
    hijackEvents({
      'beforeunload': [$.window],
      'click': [$.window.document],
    });
    disableWindowOpen();
    handler.start();
  }


  function afterDOMReady (handler) {
    // some sites bind the event on body
    hijackEvents({
      'beforeunload': [$.window.document.body],
      'click': [$.window.document.body],
    });
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


  // HACK really should not do this, but ... (sigh)
  function hijackEvents (blackList) {
    hijackOnProperties(blackList);
    hijackAddEventListener(blackList);
  }


  function hijackOnProperties (blackList) {
    Object.keys(blackList).forEach(function (type) {
      var propertyName = 'on' + type;
      blackList[type].forEach(function (element) {
        // release existing events
        element[propertyName] = undefined;

        // prevent they bind the event again
        if (isSafari) {
          // Safiri must use old-style method
          element.__defineSetter__(propertyName, seal.set);
        } else {
          $.window.Object.defineProperty(element, propertyName, {
            configurable: true,
            enumerable: false,
            get: undefined,
            // this will turn to undefined in Firefox, need upstream fix
            set: function (handler) {
              _.info('blocked', type, this, handler);
              return false;
            },
          });
        }
      });
    });
  }


  // use $.window will be very complex, just use unsafeWindow at here
  function hijackAddEventListener (blackList) {
    var oael = unsafeWindow.EventTarget.prototype.addEventListener;
    var wrapper = function (type, handler, useCapture) {
      if (blackList.hasOwnProperty(type) && blackList[type].indexOf(this)) {
        _.info('blocked', type, this, handler);
        return;
      }
      return oael.call(this, type, handler, useCapture);
    };
    if (typeof exportFunction === 'function') {
      wrapper = exportFunction(wrapper, unsafeWindow, {
        allowCrossOriginArguments: true,
      });
    }
    unsafeWindow.EventTarget.prototype.addEventListener = wrapper;
  }


  $._main = function () {
    var findHandler = $._findHandler;

    delete $._main;
    delete $._findHandler;

    if (window.top !== window.self) {
      // skip frames
      return;
    }

    GM.registerMenuCommand('AdsBypasser - Configure', function () {
      GM.openInTab('https://adsbypasser.github.io/configure.html');
    });

    // find by URL
    var handler = findHandler(true);
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

    // if log level less than 2, disable console log
    if ($.config.logLevel < 2) {
      _._quiet = true;
    }

    _.info('does not match location on `%s`, will try HTML content', window.location.toString());
    waitDOM().then(function () {
      // find again by HTML content
      handler = findHandler(false);
      if (!handler) {
        _.info('does not match HTML content on `%s`', window.location.toString());
        return;
      }

      beforeDOMReady(handler);
      afterDOMReady(handler);
    });
  };

  return $;

}));
$._main();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
