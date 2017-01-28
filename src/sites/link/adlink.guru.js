(function () {
  'use strict';

  $.register({
    rule: {
      host: [
        /^adlink\.guru$/,
        /^cypt\.ga$/,
        /^filesbucks\.com$/,
        /^elink\.link$/,
        /^payurl\.me$/,
        /^www\.worldhack\.net$/,
        /^123link\.top$/,
      ],
    },
    ready: function () {
      firstStage().then(function (page) {
        return secondStage(page);
      }).then(function (url) {
        $.openLink(url);
      }).catch(function (e) {
        _.warn(e);
      });
    },
  });

  function firstStage () {
    return _.D(function (resolve, reject) {
      var f = $.$('#link-view');
      if (!f) {
        resolve(document);
        return;
      }

      var args = extractArgument(f);
      var url = f.getAttribute('action');
      var p = $.post(url, args).then(function (data) {
        return $.toDOM(data);
      });
      resolve(p);
    });
  }

  function secondStage (page) {
    var f = $('#go-link', page);
    var args = extractArgument(f);
    var url = f.getAttribute('action');
    return $.post(url, args).then(function (data) {
      data = JSON.parse(data);
      if (data && data.url) {
        return data.url;
      }
      throw new _.AdsBypasserError('wrong data');
    });
  }

  function extractArgument (form) {
    var args = {};
    $.$$('input', form).each(function (v) {
      args[v.name] = v.value;
    });
    return args;
  }

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
