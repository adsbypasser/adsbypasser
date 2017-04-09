$.register({
  rule: {
    host: /^(www\.)?1tiny\.net$/,
    path: /\/\w+/
  },
  ready: function () {
    'use strict';

    var directUrl = $.searchScripts(/window\.location='([^']+)';/);

    if (!directUrl) {
      throw new _.AdsBypasserError('script content changed');
    }

    $.openLink(directUrl[1]);
  },
});
