(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory;
  } else {
    factory(global, {
      xmlhttpRequest: GM_xmlhttpRequest,
    }, global._, global.$);
  }
}(this, function (global, GM, _, $) {
  'use strict';

  var window = global.window;
  var unsafeWindow = global.unsafeWindow;
  var document = window.document;


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
    // Host is not alway the same as window.location.host, for example foo.example.org can perform a request to example.org
    var l = document.createElement('a');
    l.href = url;
    var reqHost = l.hostname;
    headers.Host = reqHost || window.location.host;
    headers.Origin = window.location.origin;
    headers.Referer = window.location.href;
    headers['X-Requested-With'] = 'XMLHttpRequest';
    var controller = GM.xmlhttpRequest({
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

  $.get = function (url, data, callback, headers) {
    data = toQuery(data);
    // Don't request with '?' if there is no data
    data = data!==''? '?' + data : '';
    headers = headers || {};
    return ajax('GET', url + data, '', headers, callback);
  };

  $.post = function (url, data, callback, headers) {
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
    return ajax('POST', url, data, h, callback);
  };


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
