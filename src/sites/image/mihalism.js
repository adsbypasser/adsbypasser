(function () {

  // mihalism v1
  _.register({
    rule: {
      host: [
        /^(hentai-hosting|miragepics|funextra\.hostzi|imgrex|cdn\.javtotal|img3x)\.com$/,
        /^bilder\.nixhelp\.de$/,
        /^imagecurl\.(com|org)$/,
        /^imagevau\.eu$/,
        /^img\.deli\.sh$/,
        /^img(dream|soo|nm|silo)\.net$/,
        /^imgsicily\.it$/,
        /^www\.imghere\.net$/,
      ],
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });

  // dwimg.com
  _.register({
    rule: {
      host: [
        /^(dwimg|imgsin)\.com$/,
        /^www\.pictureshoster\.com$/,
      ],
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    async start (m) {
      await $.openImage('/files/' + m.query[1]);
    },
  });

  // imageview.me
  _.register({
    rule: {
      host: [
        /^img(nip|central|cream)\.com$/,
        /^imageview\.me$/,
        /^244pix\.com$/,
        /^postimg\.net$/,
      ],
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
      host: /^dumppix\.com$/,
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    async start (m) {
      await $.openImage('/images/' + m.query[1], {
        referer: true,
      });
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
