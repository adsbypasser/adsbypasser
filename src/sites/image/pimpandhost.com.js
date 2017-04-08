$.register({
  rule: {
    host: /^(www\.)?pimpandhost\.com$/,
    path: /^\/image\//,
  },
  ready: function () {
    'use strict';

    // Retrieve the normal-sized image
    var a = $('#image_original');

    // Grab its URL
    var el = document.createElement('div');
    el.innerHTML = a.value;
    var img = $('img', el);

    $.openImage(img.src);
  },
});
