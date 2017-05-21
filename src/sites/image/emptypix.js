$.register({
  rule: [
    {
      host: [
        /^(emptypix|imgdomino)\.com$/,
        /^overdream\.cz$/,
        /^www\.sexseeimage\.com$/,
      ],
      path: /^\/image\//,
    },
    {
      host: /^10\.imageleon\.com$/,
      path: /^\/img-(.+)\.html$/,
    },
  ],
  ready: function () {
    'use strict';

    var img = $('#full_image');
    $.openImage(img.src);
  },
});

$.register({
  rule: {
    host: /^sexyxpixels\.com$/,
    query: /^\?v=/,
  },
  ready: function () {
    'use strict';

    var img = $('#full_image');
    $.openImage(img.src, {
      referer: true,
    });
  },
});
