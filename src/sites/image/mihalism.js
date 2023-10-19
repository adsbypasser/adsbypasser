(function () {

  // mihalism v1
  _.register({
    rule: {
      host: [
        /^miragepics\.com$/,
        /^bilder\.nixhelp\.de$/,
        /^foto-pic\.net$/,
      ],
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });

  _.register({
    rule: {
      host: /^imgcream\.com$/,
      path: /^\/viewerr.*\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });

  // overpic.net
  _.register({
    rule: [
      'http://www.overpic.net/viewer.php?file=*',
    ],
    async ready () {
      const i = $('#main_img');
      await $.openImage(i.src);
    },
  });

  _.register({
    rule: [
      'https://pacific.picturedent.org/image/*',
    ],
    async ready () {
      const i = $('#full_img');
      await $.openImage(i.src);
    },
  });

  async function helper (m) {
    await $.openImage('/images/' + m.query[1]);
  }

})();
