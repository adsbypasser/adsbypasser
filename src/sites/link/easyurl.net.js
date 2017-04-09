$.register({
  rule: {
    host: /easyurl\.net|(atu|clickthru|redirects|readthis)\.ca|goshrink\.com$/,
  },
  ready: function () {
    'use strict';

    var f = $('frame[name=main]');

    $.openLink(f.src);
  },
});
