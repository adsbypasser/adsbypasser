$.register({
  rule: 'http://hentaimg.com/mg/lndex-1.php?img=*',
  ready: function () {
    'use strict';

    $.openLink('index-1.php' + window.location.search);
  },
});

$.register({
  rule: 'http://hentaimg.com/mg/index-1.php?img=*',
  ready: function () {
    'use strict';

    var i = $('#content img');
    $.openImage(i.src);
  },
});
