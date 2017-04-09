$.register({
  rule: {
    host: /^pic(4|5)you.ru$/
  },
  ready: function () {
  // img is a direct child only if it's a thumb
  if ($.$('#d1 > img') != null) {
    // Basically append /1/ to the URL
    var URLparams = location.href.split("/", 5);
    var next = URLparams[0] + '/' + URLparams[1] + '/' + URLparams[2] + '/' + URLparams[3] + '/' + URLparams[4] + '/1/';

    // Necessary otherwise it doesn't redirect correctly to the image
    $.setCookie('p4yclick','1');

    $.openLink(next);

  // We are on the full-scaled image
  } else {
    var i = $('#d1 img').src;
    $.openImage(i);
  }
  },
});
