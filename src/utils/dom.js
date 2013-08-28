(function (root) {
  'use strict';


  function NoPicAdsError (message) {
    this.message = message;
    this._setupStack();
  }
  NoPicAdsError.prototype = Object.create(Error.prototype);
  NoPicAdsError.prototype.constructor = NoPicAdsError;
  NoPicAdsError.prototype.name = 'NoPicAdsError';
  NoPicAdsError.prototype._setupStack = function () {
    if (Error.captureStackTrace) {
      // V8-like
      Error.captureStackTrace(this, this.constructor);
    } else {
      // fallback to Mozilla-like
      this._stack = this._stack ? this._stack.slice(1) : Error().stack.split('\n').slice(2);
      var e = this._stack[0].match(/^.*@(.*):(\d*)$/);
      this.fileName = e[1];
      this.lineNumber = e[2];
      this.stack = this._stack.join('\n');
    }
  };
  root.NoPicAdsError = NoPicAdsError;

  function DomNotFoundError (selector) {
    NoPicAdsError.call(this, $T('`{0}` not found')(selector));
    this._setupStack();
  }
  DomNotFoundError.prototype = Object.create(NoPicAdsError.prototype);
  DomNotFoundError.prototype.constructor = DomNotFoundError;
  DomNotFoundError.prototype.name = 'DomNotFoundError';
  root.DomNotFoundError = DomNotFoundError;


  function log (method, args) {
    args = Array.prototype.slice.call(args);
    args.unshift('NoPicAds:');
    console[method].apply(console, args);
  }

  root.$info = function () {
    log('info', arguments);
  };

  root.$warn = function () {
    log('warn', arguments);
  };


  function toQuery (data) {
    if (typeof data === 'string') {
      return data;
    }
    if (data instanceof String) {
      return data.toString();
    }
    return $C(data).map(function (v, k) {
      return $T('{0}={1}')(encodeURIComponent(k), encodeURIComponent(v));
    }).join('&');
  }

  function ajax (method, url, data, callback) {
    var controller = GM_xmlhttpRequest({
      method: method,
      url: url,
      data: toQuery(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function (response) {
        callback(response.responseText);
      }
    });

    return controller;
  }

  function go (path, params, method) {
    // Set method to post by default, if not specified.
    method = method || 'post';

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement('form');
    form.method = method;
    form.action = path;

    $C(params).each(function (value, key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  root.$post = function (url, data, callback) {
    return ajax('POST', url, data, callback);
  };

  root.$postAndGo = function (url, data) {
    go(url, data, 'post');
  };


  root.$ = function (selector, context) {
    if (!context || !context.querySelector) {
      context = document;
    }
    var n = context.querySelector(selector);
    if (!n) {
      throw new DomNotFoundError(selector);
    }
    return n;
  };

  root.$_ = function (selector, context) {
    try {
      return $(selector, context);
    } catch (e) {
      $info(e.message);
      return null;
    }
  };

  root.$$ = function (selector, context) {
    if (!context || !context.querySelectorAll) {
      context = document;
    }
    var ns = context.querySelectorAll(selector);
    return $C(ns);
  };


  root.$redirect = function (to) {
    if (!to) {
      $warn('false URL');
      return;
    }
    var from = window.location.toString();
    $info($T('{0} -> {1}')(from, to));
    window.top.location.replace(to);
  };

  root.$removeAllTimer = function () {
    var intervalID = window.setInterval($nop, 10);
    while (intervalID > 0) {
      window.clearInterval(intervalID--);
    }
  };

  function disableWindowOpen () {
    if (unsafeWindow) {
      unsafeWindow.open = $nop;
    }
    if (window) {
      window.open = $nop;
    }
  }

  root.$enableScrolling = function () {
    var o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
    o.style.overflow = '';
  };

  root.$replaceBody = function (imgSrc) {
    $removeAllTimer();
    var i = document.createElement('img');
    i.setAttribute('src', imgSrc);
    document.body = document.createElement('body');
    document.body.style.textAlign = 'center';
    document.body.style.background = 'black';
    document.body.appendChild(i);
  };

  root.$removeNodes = function (selector) {
    $$(selector).each(function (e) {
      e.parentNode.removeChild(e);
    });
  };

  root.$captcha = function (imgSrc, cb) {
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
      $post('http://www.wcpan.info/cgi-bin/captcha.cgi', {
        i: e,
      }, cb);
    };
  };


  var patterns = [];

  root.$register = function (pattern) {
    patterns.push(pattern);
  };

  function find (uri) {
    var matched = {};
    var pattern = $C(patterns).find(function (pattern) {
      var tmp = $C(pattern.rule).all(function (pattern, part) {
        matched[part] = uri[part].match(pattern);
        return !!matched[part];
      });
      if (!tmp) {
        matched = {};
      }
      return tmp;
    });
    if (!pattern) {
      return null;
    }
    return {
      runner: pattern.run,
      matched: matched,
    };
  }

  disableWindowOpen();
  document.addEventListener('DOMContentLoaded', function () {
    // <scheme>//<host>:<port><path><query><hash>
    var handler = find({
      scheme: window.location.protocol,
      host: window.location.hostname,
      port: window.location.port,
      path: window.location.pathname,
      query: window.location.search,
      hash: window.location.hash,
    });

    if (handler) {
      handler.runner(handler.matched);
    }
  });


})((0,eval)('this'));


// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
