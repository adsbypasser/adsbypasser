(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(context, Promise);
  } else {
    var P = null;
    if (context.unsafeWindow.Future) {
      // HACK: for Gecko 24, so far only Pale Moon
      // need dom.future.enabled = true
      P = function (fn) {
        return context.unsafeWindow.Future.call(this, function (fr) {
          fn(fr.resolve.bind(fr), fr.reject.bind(fr));
        });
      };
    } else if (context.PromiseResolver) {
      // HACK: for Gecko 25, so far only Pale Moon
      // need dom.promise.enabled = true
      P = function (fn) {
        return new context.Promise(function (pr) {
          fn(pr.resolve.bind(pr), pr.reject.bind(pr));
        });
      };
    } else {
      P = context.Promise;
    }
    factory(context, P);
  }
}(this, function (context, Promise) {
  'use strict';

  var _ = context._ = {};

  function setupStack () {
    if (Error.captureStackTrace) {
      // V8-like
      Error.captureStackTrace(this, this.constructor);
    } else if (!this.hasOwnProperty('stack')) {
      // fallback to Mozilla-like
      var stack = (new Error()).stack.split('\n').slice(2);
      var e = stack[0].match(/^.*@(.*):(\d*)$/);
      this.fileName = e[1];
      this.lineNumber = parseInt(e[2], 10);
      this.stack = stack.join('\n');
    }
  }

  function AdsBypasserError (message) {
    setupStack.call(this);
    this.message = message;
  }
  AdsBypasserError.prototype = Object.create(Error.prototype);
  AdsBypasserError.prototype.constructor = AdsBypasserError;
  AdsBypasserError.prototype.name = 'AdsBypasserError';
  AdsBypasserError.extend = function (protoProps, staticProps) {
    var parent = this, child = function () {
      setupStack.call(this);
      protoProps.constructor.apply(this, arguments);
    };
    extend(child, parent, staticProps);

    child.prototype = Object.create(parent.prototype);
    extend(child.prototype, protoProps);
    child.prototype.constructor = child;

    child.super = parent.prototype;

    return child;
  };
  AdsBypasserError.super = null;
  _.AdsBypasserError = AdsBypasserError;


  function any (c, fn) {
    if (c.some) {
      return c.some(fn);
    }
    if (typeof c.length === 'number') {
      return Array.prototype.some.call(c, fn);
    }
    return Object.keys(c).some(function (k) {
      return fn(c[k], k, c);
    });
  }

  function all (c, fn) {
    if (c.every) {
      return c.every(fn);
    }
    if (typeof c.length === 'number') {
      return Array.prototype.every.call(c, fn);
    }
    return Object.keys(c).every(function (k) {
      return fn(c[k], k, c);
    });
  }

  function each (c, fn) {
    if (c.forEach) {
      c.forEach(fn);
    } else if (typeof c.length === 'number') {
      Array.prototype.forEach.call(c, fn);
    } else {
      Object.keys(c).forEach(function (k) {
        fn(c[k], k, c);
      });
    }
  }

  function map (c, fn) {
    if (c.map) {
      return c.map(fn);
    }
    if (typeof c.length === 'number') {
      return Array.prototype.map.call(c, fn);
    }
    return Object.keys(c).map(function (k) {
      return fn(c[k], k, c);
    });
  }

  function extend(c) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
      if (!source) {
        return;
      }
      _.C(source).each(function (v, k) {
        c[k] = v;
      });
    });
    return c;
  }

  function CollectionProxy (collection) {
    this._c = collection;
  }

  CollectionProxy.prototype.size = function () {
    if (typeof this._c.length === 'number') {
      return this._c.length;
    }
    return Object.keys(c).length;
  };

  CollectionProxy.prototype.at = function (k) {
    return this._c[k];
  };

  CollectionProxy.prototype.each = function (fn) {
    each(this._c, fn);
    return this;
  };

  CollectionProxy.prototype.find = function (fn) {
    var result;
    any(this._c, function (value, index, self) {
      var tmp = fn(value, index, self);
      if (tmp !== _.none) {
        result = {
          key: index,
          value: value,
          payload: tmp,
        };
        return true;
      }
      return false;
    });
    return result;
  };

  CollectionProxy.prototype.all = function (fn) {
    return all(this._c, fn);
  };

  CollectionProxy.prototype.map = function (fn) {
    return map(this._c, fn);
  };

  _.C = function (collection) {
    return new CollectionProxy(collection);
  };


  _.T = function (s) {
    if (typeof s === 'string') {
    } else if (s instanceof String) {
      s = s.toString();
    } else {
      throw new AdsBypasserError('template must be a string');
    }
    var T = {
      '{{': '{',
      '}}': '}',
    };
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var kwargs = args[args.length-1];

      return s.replace(/\{\{|\}\}|\{([^\}]+)\}/g, function (m, key) {
        if (T.hasOwnProperty(m)) {
          return T[m];
        }
        if (args.hasOwnProperty(key)) {
          return args[key];
        }
        if (kwargs.hasOwnProperty(key)) {
          return kwargs[key];
        }
        return m;
      });
    };
  };


  _.P = function (fn) {
    if (typeof fn !== 'function') {
      throw new _.AdsBypasserError('must give a function');
    }
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(slice.call(arguments)));
    };
  };


  _.D = function (fn) {
    return new Promise(fn);
  };


  _.parseJSON = function (json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      _.warn(e, json);
    }
    return _.none;
  };


  _.isString = function (value) {
    return (typeof value === 'string') || (value instanceof String);
  };


  _.nop = function () {
  };
  _.none = _.nop;


  _.wait = function (msDelay) {
    return _.D(function (resolve, reject) {
      setTimeout(resolve, msDelay);
    });
  };

  _.try = function (msInterval, fn) {
    return _.D(function (resolve, reject) {
      var handle = setInterval(function () {
        var result = fn();
        if (result !== _.none) {
          clearInterval(handle);
          resolve(result);
        }
      }, msInterval);
    });
  };


  function log (method, args) {
    if (_._quiet) {
      return;
    }
    args = Array.prototype.slice.call(args);
    if (_.isString(args[0])) {
      args[0] = 'AdsBypasser: ' + args[0];
    } else {
      args.unshift('AdsBypasser:');
    }
    var f = console[method];
    if (typeof f === 'function') {
      f.apply(console, args);
    }
  }

  // HACK cyclic reference between $ and _
  _._quiet = false;

  _.info = function () {
    log('info', arguments);
  };

  _.warn = function () {
    log('warn', arguments);
  };


  return _;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
