(function () {

  // mihalism v1
  _.register({
    rule: {
      host: [
        /^miragepics\.com$/,
        /^funextra\.hostzi\.com$/,
        /^bilder\.nixhelp\.de$/,
        /^imagecurl\.(com|org)$/,
      ],
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });

  _.register({
    rule: {
      host: /^imgsin\.com$/,
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    async start (m) {
      await $.openImage('/files/' + m.query[1]);
    },
  });

  _.register({
    rule: {
      host: /^(imgnip|imgcentral|imgcream)\.com$/,
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
    rule: {
      host: /^xxxhost\.me$/,
      path: /^\/viewer\d+\.php$/,
      query: /file=([^&]+)/,
    },
    async start (m) {
      await $.openImage('files/' + m.query[1]);
    },
  });

  async function helper (m) {
    await $.openImage('/images/' + m.query[1]);
  }

})();
