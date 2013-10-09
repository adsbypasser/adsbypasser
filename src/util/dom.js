var $;
(function () {
  'use strict';


  var DomNotFoundError = _.NoPicAdsError.extend({
    name: 'DomNotFoundError',
    constructor: function (selector) {
      DomNotFoundError.super.constructor.call(this, _.T('`{0}` not found')(selector));
    },
  });


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

  var config = load();

  GM_registerMenuCommand(_.T('Turn {0} Image Center Aligning (will reload page)')(config.alignCenter ? 'Off' : 'On'), function () {
    config.alignCenter = !config.alignCenter;
    save(_onfig);
    window.location.reload();
  });

  GM_registerMenuCommand(_.T('Turn {0} Image Redirecting (will reload page)')(config.redirectImage ? 'Off' : 'On'), function () {
    config.redirectImage = !config.redirectImage;
    save(config);
    window.location.reload();
  });


  $ = function (selector, context) {
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
      _.info(e.message);
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


  function deepJoin (prefix, object) {
    return _.C(object).map(function (v, k) {
      var key = _.T('{0}[{1}]')(prefix, k);
      if (typeof v === 'object') {
        return deepJoin(key, v);
      }
      return _.T('{0}={1}').apply(this, [key, v].map(encodeURIComponent));
    }).join('&');
  }

  function toQuery (data) {
    if (typeof data === 'string') {
      return data;
    }
    if (data instanceof String) {
      return data.toString();
    }
    return _.C(data).map(function (v, k) {
      if (typeof v === 'object') {
        return deepJoin(k, v);
      }
      return _.T('{0}={1}').apply(this, [k, v].map(encodeURIComponent));
    }).join('&');
  }

  function ajax (method, url, data, headers, callback) {
    headers['X-Requested-With'] = 'XMLHttpRequest';
    var controller = GM_xmlhttpRequest({
      method: method,
      url: url,
      data: data,
      headers: headers,
      onload: function (response) {
        var headers = {
          get: function (key) {
            return this[key.toLowerCase()];
          },
        };
        response.responseHeaders.split(/[\r\n]+/g).filter(function (v) {
          return v.length !== 0;
        }).map(function (v) {
          return v.split(/:\s+/);
        }).forEach(function (v) {
          headers[v[0].toLowerCase()] = v[1];
        });
        callback(response.responseText, headers);
      },
    });

    return controller;
  }

  function head (url, callback) {
    return ajax('HEAD', url, '', {}, callback);
  }

  $.post = function (url, data, callback) {
    data = toQuery(data);
    return ajax('POST', url, data, {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': data.length,
    }, callback);
  };

  function go (path, params, method) {
    // Set method to post by default, if not specified.
    method = method || 'post';

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

    document.body.appendChild(form);
    form.submit();
  }

  $.postAndGo = function (url, data) {
    go(url, data, 'post');
  };


  function redirect (to) {
    if (!to) {
      _.warn('false URL');
      return;
    }
    var from = window.location.toString();
    _.info(_.T('{0} -> {1}')(from, to));
    window.top.location.replace(to);
  }

  $.redirect = function (to) {
    if (config.redirectImage) {
      redirect(to);
      return;
    }
    head(to, function (text, headers) {
      if (!/^image\/.*/.test(headers.get('Content-Type'))) {
        redirect(to);
      }
    });
  };

  $.removeAllTimer = function () {
    var intervalID = window.setInterval(_.nop, 10);
    while (intervalID > 0) {
      window.clearInterval(intervalID--);
    }
  };

  $.enableScrolling = function () {
    var o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
    o.style.overflow = '';
  };

  function toggleShrinking () {
    this.classList.toggle('nopicads-shrinked');
  }

  function checkScaling () {
    var nw = this.naturalWidth;
    var nh = this.naturalHeight;
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;
    if ((nw > cw || nh > ch) && !this.classList.contains('nopicads-resizable')) {
      this.classList.add('nopicads-resizable');
      this.classList.add('nopicads-shrinked');

      this.addEventListener('click', toggleShrinking);
    } else {
      this.removeEventListener('click', toggleShrinking);

      this.classList.remove('nopicads-shrinked');
      this.classList.remove('nopicads-resizable');
    }
  }

  function alignCenter (d, i) {
    $.removeNodes('style, link[rel=stylesheet]');

    var imageStyle = GM_getResourceText('imageStyle');
    GM_addStyle(imageStyle);

    var bgImage = GM_getResourceURL('bgImage');
    document.body.style.backgroundImage = _.T('url(\'{0}\')')(bgImage);

    d.id = 'nopicads-wrapper';
    i.id = 'nopicads-image';

    if (i.naturalWidth && i.naturalHeight) {
      checkScaling.call(i);
    } else {
      i.addEventListener('load', checkScaling);
    }

    var h;
    window.addEventListener('resize', function () {
      window.clearTimeout(h);
      h = window.setTimeout(checkScaling.bind(i), 100);
    });
  }

  $.replace = function (imgSrc) {
    if (!imgSrc) {
      _.warn('false url');
      return;
    }
    _.info(_.T('replacing body with `{0}` ...')(imgSrc));

    $.removeAllTimer();
    $.enableScrolling();

    document.body = document.createElement('body');

    var d = document.createElement('div');
    document.body.appendChild(d);

    var i = document.createElement('img');
    i.src = imgSrc;
    d.appendChild(i);

    if (config.alignCenter) {
      alignCenter(d, i);
    }
  };

  $.removeNodes = function (selector, context) {
    $.$$(selector, context).each(function (e) {
      e.parentNode.removeChild(e);
    });
  };

  $.resetCookies = function () {
    var a = document.domain;
    var b = document.domain.replace(/^www\./, '');
    var c = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
    var d = (new Date(1e3)).toUTCString();

    _.C(document.cookie.split(';')).each(function (v) {
      var k = v.replace(/^\s*(\w+)=.+$/, '$1');

      document.cookie = _.T('{0}=;expires={1};')(k, d);
      document.cookie = _.T('{0}=;path=/;expires={1};')(k, d);
      var e = _.T('{0}=;path=/;domain={1};expires={2};');
      document.cookie = e(k, a, d);
      document.cookie = e(k, b, d);
      document.cookie = e(k, c, d);
    });
  };

  $.captcha = function (imgSrc, cb) {
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


  var patterns = [];

  $.register = function (pattern) {
    patterns.push(pattern);
  };

  function find (uri) {
    var matched = {};
    var pattern = _.C(patterns).find(function (pattern) {
      var tmp = _.C(pattern.rule).all(function (pattern, part) {
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
    return _.P(pattern.run, matched);
  }

  $.disableWindowOpen = function () {
    unsafeWindow.open = _.nop;
  };

  function disableLeavePrompt () {
    if (unsafeWindow.onbeforeunload) {
      unsafeWindow.onbeforeunload = _.nop;
    }
    if (unsafeWindow.document.body.onbeforeunload) {
      unsafeWindow.document.body.onbeforeunload = _.nop;
    }
  }

  $.main = function () {
    disableLeavePrompt();

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
      handler();
    }
  };


})();


if (window.parent === window.self) {
  $.disableWindowOpen();
  // do this in anon function may not work in TamperMonkey
  document.addEventListener('DOMContentLoaded', $.main);
}


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
