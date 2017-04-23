(function () {
  'use strict';

  $.register({
    rule: {
      host: [
        /^adlink\.guru$/,
        /^cypt\.ga$/,
        /^filesbucks\.com$/,
        /^elink\.link$/,
        /^(payurl|urlst)\.me$/,
        /^url\.ht$/,
        /^urle\.co$/,
        /^cut-urls\.com$/,
        /^(hashe|trlink)\.in$/,
        /^www\.worldhack\.net$/,
        /^123link\.top$/,
        /^pir\.im$/,
        /^bol\.tl$/,
        /^tl\.tc$/,
        /^tmearn\.com$/,
        /^adfu\.us$/,
        /^short\.pastewma\.com$/,
        /^adfly\.tc$/,
        /^linkfly\.gaosmedia\.com$/,
      ],
    },
    ready: function () {
      $.removeNodes('iframe', '.BJPPopAdsOverlay');

      firstStage().then(function (page) {
        return secondStage(page);
      }).then(function (url) {
        // nuke for bol.tl, somehow it will interfere click event
        $.nuke(url);
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
