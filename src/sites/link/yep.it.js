$.register({
  rule: 'http://yep.it/preview.php?p=*',
  ready: function () {
    'use strict';

    var link = $('font[color="grey"]').innerHTML;
    $.openLink(link);
  },
});
