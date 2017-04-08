(function () {
  'use strict';

  function run () {
    var o = $('#download_box img[id]');
    $.openImage(o.src);
  }

  $.register({
    rule: {
      host: /^www\.imageporter\.com$/,
      path: /^\/\w{12}\/.*\.html$/,
    },
    ready: run,
  });

  $.register({
    rule: {
      host: /^(www\.)?(image(carry|dunk|porter|switch)|pic(leet|turedip|tureturn)|imgspice)\.com|(piclambo|yankoimages)\.net$/,
    },
    ready: run,
  });

})();
