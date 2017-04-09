$.register({
  rule: {
    host: /^javcity\.com$/,
  },
  ready: function () {
    'use strict';

    var a = $('.entry-content > h1:nth-child(1) > a:nth-child(1)');
    var url = a.onclick.toString();
    url = url.match(/window\.open\('([^']+)'\)/);
    if (!url) {
      _.info('pattern changed')
      return;
    }
    // NOTE actually this site points to another image host
    $.openImage(url[1]);
  },
});
