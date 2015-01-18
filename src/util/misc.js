(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (global) {
      var core = require('./core.js');
      var ajax = require('./ajax.js');
      var $ = ajax(global);
      return factory(global, core, $);
    };
  } else {
    factory(global, global._, global.$);
  }
}(this, function (global, _, $) {
  'use strict';

  var window = global.window;
  var unsafeWindow = global.unsafeWindow;
  var document = window.document;


  function injectClone (vaccine) {
    var injected;
    if (typeof cloneInto !== 'function') {
      injected = vaccine;
    } else {
      injected = cloneInto(vaccine, unsafeWindow, {
        cloneFunctions: true,
        wrapReflectors: true,
      });
    }
    return injected;
  }

  function injectFunction (vaccine) {
    var injected;
    if (typeof exportFunction !== 'function') {
      injected = vaccine;
    } else {
      try {
        injected = exportFunction(vaccine, unsafeWindow, {
          allowCrossOriginArguments: true,
        });
      } catch(e) {
        console.error(e);
      }
    }
    return injected;
  }

  function injectReference () {
    var injected;
    if (typeof createObjectIn !== 'function') {
      injected = {};
    } else {
      injected = createObjectIn(unsafeWindow);
    }
    return injected;
  }

  $.inject = function (vaccine) {
    if (typeof vaccine === 'function') {
      return injectFunction(vaccine);
    } else if (typeof vaccine === 'undefined') {
      return injectReference();
    } else {
      return injectClone(vaccine);
    }
  };


  $.removeAllTimer = function () {
    var handle = window.setInterval(_.nop, 10);
    while (handle > 0) {
      window.clearInterval(handle--);
    }
    handle = window.setTimeout(_.nop, 10);
    while (handle > 0) {
      window.clearTimeout(handle--);
    }
  };

  $.captcha = function (imgSrc, cb) {
    if (!config.externalServerSupport) {
      return;
    }

    var a = document.createElement('canvas');
    var b = a.getContext('2d');
    var c = new Image();
    c.src = imgSrc;
    c.onload = function () {
      a.width = c.width;
      a.height = c.height;
      b.drawImage(c, 0, 0);
      var d = a.toDataURL();
      var e = d.substr(d.indexOf(',') + 1);
      $.post('http://www.wcpan.info/cgi-bin/captcha.cgi', {
        i: e,
      }, cb);
    };
  };

  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
