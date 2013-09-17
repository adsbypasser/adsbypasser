var _ = {};
(function () {
  'use strict';


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

  function NoPicAdsError (message) {
    setupStack.call(this);
    this.message = message;
  }
  NoPicAdsError.prototype = Object.create(Error.prototype);
  NoPicAdsError.prototype.constructor = NoPicAdsError;
  NoPicAdsError.prototype.name = 'NoPicAdsError';
  NoPicAdsError.extend = function (protoProps, staticProps) {
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
  NoPicAdsError.super = null;
  _.NoPicAdsError = NoPicAdsError;


  function any (c, fn) {
    if (c.some) {
      return c.some(fn);
    }
    if (c instanceof NodeList) {
      Array.prototype.some.call(c, fn);
    }
    return Object.keys(c).some(function (k) {
      return fn(c[k], k, c);
    });
  }

  function all (c, fn) {
    if (c.every) {
      return c.every(fn);
    }
    if (c instanceof NodeList) {
      Array.prototype.every.call(c, fn);
    }
    return Object.keys(c).every(function (k) {
      return fn(c[k], k, c);
    });
  }

  function each (c, fn) {
    if (c.forEach) {
      c.forEach(fn);
    } else if (c instanceof NodeList) {
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
    if (c instanceof NodeList) {
      Array.prototype.map.call(c, fn);
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

  CollectionProxy.prototype.each = function (fn) {
    each(this._c, fn);
    return this;
  };

  CollectionProxy.prototype.find = function (fn) {
    var result;
    any(this._c, function (value, index, self) {
      if (fn(value, index, self)) {
        result = value;
        return true;
      }
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
      throw new NoPicAdsError('template must be a string');
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
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(slice.call(arguments)));
    };
  };


  _.nop = function () {
  };


  function log (method, args) {
    args = Array.prototype.slice.call(args);
    args.unshift('NoPicAds:');
    console[method].apply(console, args);
  }

  _.info = function () {
    log('info', arguments);
  };

  _.warn = function () {
    log('warn', arguments);
  };


  function load () {
    var tmp = {
      version: GM_getValue('version', 0),
      alignCenter: GM_getValue('align_center', true),
      redirectImage: GM_getValue('redirect_image', true),
    };
    save(tmp);
    _.info('loaded config:', tmp);
    return tmp;
  }

  function save (c) {
    GM_setValue('version', c.version);
    GM_setValue('align_center', c.alignCenter);
    GM_setValue('redirect_image', c.redirectImage);
  }

  _.config = load();

  GM_registerMenuCommand(_.T('Turn {0} Image Center Aligning (will reload page)')(_.config.alignCenter ? 'Off' : 'On'), function () {
    _.config.alignCenter = !_.config.alignCenter;
    save(_.config);
    window.location.reload();
  });

  GM_registerMenuCommand(_.T('Turn {0} Image Redirecting (will reload page)')(_.config.redirectImage ? 'Off' : 'On'), function () {
    _.config.redirectImage = !_.config.redirectImage;
    save(_.config);
    window.location.reload();
  });


})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
