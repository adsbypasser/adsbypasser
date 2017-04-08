$.register({
  rule: {
    host: /^(www\.)?safeurl\.eu$/,
    path: /\/\w+/,
  },
  ready: function () {
    'use strict';

    var directUrl = $.searchScripts(/window\.open\("([^"]+)"\);/);
    if (!directUrl) {
      throw new _.AdsBypasserError('script content changed');
    }
    directUrl = directUrl[1];
    $.openLink(directUrl);
  },
});
