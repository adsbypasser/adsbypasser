(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var core = require('./core.js');
      return factory(context, GM, core);
    };
  } else {
    factory(context, {
      xmlhttpRequest: GM_xmlhttpRequest,
    }, context._);
  }
}(this, function (context, GM, _) {
  'use strict';

  var window = context.window;
  var document = window.document;
  var $ = context.$ || {};


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
    var type = typeof data;
    if (data === null || (type !== 'string' && type !== 'object')) {
      return '';
    }
    if (type === 'string') {
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

  function ajax (method, url, data, headers) {
    // Host is not always the same as window.location.host, for example foo.example.org can perform a request to example.org
    var l = document.createElement('a');
    l.href = url;
    var reqHost = l.hostname;
    headers.Host = reqHost || window.location.host;
    headers.Origin = window.location.origin;
    headers.Referer = window.location.href;
    headers['X-Requested-With'] = 'XMLHttpRequest';

    var xhr = null;
    var promise = _.D(function (resolve, reject) {
      xhr = GM.xmlhttpRequest({
        method: method,
        url: url,
        data: data,
        headers: headers,
        onload: function (response) {
          // HACK use this as fallback for zombie.js
          response = (typeof response.responseText !== 'undefined') ? response : this;
          if (response.status !== 200) {
            reject(response.responseText);
          } else {
            resolve(response.responseText);
          }
        },
        onerror: function (response) {
          // HACK use this as fallback for zombie.js
          response = (typeof response.responseText !== 'undefined') ? response : this;
          reject(response.responseText);
        },
      });
    });
    // Firefox 36+ does not like Function.bind
    promise.abort = function () {
      xhr.abort();
    };

    return promise;
  }

  $.get = function (url, data, headers) {
    data = toQuery(data);
    // Don't request with '?' if there is no data
    data = data ? '?' + data : '';
    headers = headers || {};
    return ajax('GET', url + data, '', headers);
  };

  $.post = function (url, data, headers) {
    data = toQuery(data);
    var h = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': data.length,
    };
    if (headers) {
      _.C(headers).each(function (v, k) {
        h[k] = v;
      });
    }
    return ajax('POST', url, data, h);
  };


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
