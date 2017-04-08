$.register({
  rule: 'http://richlink.com/app/webscr?cmd=_click&key=*',
  ready: function () {
    'use strict';

    var f = $('frameset');
    f = f.onload.toString();
    f = f.match(/url=([^&]+)/);
    if (f) {
      f = decodeURIComponent(f[1]);
    } else {
      f = $('frame[name=site]');
      f = f.src;
    }
    $.openLink(f);
  },
});
