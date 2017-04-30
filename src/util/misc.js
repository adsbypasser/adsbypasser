(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      var ajax = require('./ajax.js');
      var $ = ajax(context);
      return factory(context, core, $);
    };
  } else {
    factory(context, context._, context.$);
  }
}(this, function (context, _, $) {
  'use strict';

  var window = context.window;
  // Violentmonkey passes unsafeWindow by closure/arguments
  // need to break the sandbox to get unsafeWindow
  var unsafeWindow = context.unsafeWindow || (0, eval)('this').window;
  var document = window.document;


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

  $.nuke = function (url) {
    try {
      $.window.document.write('nuked by AdsBypasser, leading to ...<br/>');
    } catch (e) {
      _.warn('nuke failed', e);
    }
    var a = document.createElement('a');
    a.href = url;
    a.textContent = url;
    document.body.appendChild(a);
  };

  $.generateRandomIP = function () {
    return [0,0,0,0].map(function () {
      return Math.floor(Math.random() * 256);
    }).join('.');
  };

  $.captcha = function (imgSrc, cb) {
    if (!$.config.externalServerSupport) {
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


  // Firefox only
  // cloneInto is too buggy
  // TODO Date, Regexp, subclasses
  function clone (safe) {
    if (safe === null || !(safe instanceof Object)) {
      return safe;
    }
    if (safe === unsafeWindow) {
      return safe;
    }
    if (safe instanceof String) {
      return safe.toString();
    }
    if (safe instanceof Function) {
      return exportFunction(safe, unsafeWindow, {
        allowCrossOriginArguments: true,
      });
    }
    if (safe instanceof Array) {
      var unsafe = new unsafeWindow.Array();
      for (var i = 0; i < safe.length; ++i) {
        unsafe.push(clone(safe[i]));
      }
      return unsafe;
    }
    var unsafe = new unsafeWindow.Object();
    _.C(safe).each(function (v, k) {
      unsafe[k] = clone(v);
    });
    return unsafe;
  }

  // magic property to get the original object
  var MAGIC_KEY = '__adsbypasser_reverse_proxy__';

  $.window = (function () {
    // GreaseMonkey 1.15 won't pass this test
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
      // other browsers does not need this
      return unsafeWindow;
    }

    var decorator = {
      set: function (target, key, value) {
        if (key === MAGIC_KEY) {
          return false;
        }
        // GreaseMonkey 2.1 has a bug
        // unsafeWindow.open will become read-only after modifying
        // so we have to explicitly assign property descriptor
        if (target === unsafeWindow && key === 'open') {
          var d = Object.getOwnPropertyDescriptor(target, key);
          // wrap the returned object back so that content script can see
          // through the object
          d.value = clone(function () {
            var rv = value();
            return cloneInto(rv, unsafeWindow);
          });
          Object.defineProperty(target, key, d);
        } else {
          target[key] = clone(value);
        }
        return true;
      },
      get: function (target, key) {
        if (key === MAGIC_KEY) {
          return target;
        }
        var value = target[key];
        var type = typeof value;
        if (value === null || (type !== 'function' && type !== 'object')) {
          // primitive values does not need this
          return value;
        }
        return new Proxy(value, decorator);
      },
      apply: function (target, self, args) {
        args = Array.prototype.slice.call(args);

        // special hack for Object.defineProperty
        if (target === unsafeWindow.Object.defineProperty) {
          args[0] = args[0][MAGIC_KEY];
        }
        // special hack for Function.apply
        if (target === unsafeWindow.Function.apply) {
          self = self[MAGIC_KEY];
          args[1] = Array.prototype.slice.call(args[1]);
        }
        // special hack for querySelector
        if (target === unsafeWindow.document.querySelector) {
          self = self[MAGIC_KEY];
        }
        // special hack for write
        if (target === unsafeWindow.document.write) {
          self = self[MAGIC_KEY];
        }

        var usargs = clone(args);

        return target.apply(self, usargs);
      },
      construct: function (target, args) {
        args = Array.prototype.slice.call(args);
        // insert this argument
        args.unshift(undefined);
        var usargs = clone(args);
        var bind = unsafeWindow.Function.prototype.bind;
        return new (bind.apply(target, usargs));
      },
    };
    return new Proxy(unsafeWindow, decorator);
  })();


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
