(function () {

  _.register({
    rule: [
      {
        host: [
          /^www\.(freebunker|imgcarry|imgshots)\.com$/,
          /^www\.imagesnake\.(com|org)$/,
        ],
        path: /^\/show\.php$/,
        query: /^\?/,
      },
      {
        host: /^www\.(freebunker|imgshots)\.com$/,
        path: /^\/show\//,
      },
      {
        host: [
          /^www\.imagesnake\.(com|org)$/,
          /^www\.imagefruit\.com$/,
        ],
        path: /^\/(img|show)\/.+/,
      },
      {
        host: /^imageban\.(ru|net)$/,
        path: /^\/show\/\d{4}\/\d{2}\/\d{2}\/.+/,
      },
      'http://fotoo.pl/show.php?img=*.html',
      {
        host: /^www\.imagestime\.com$/,
        path: /^\/show\.php\/.*\.html$/,
      },
    ],
    ready: run,
  });

  _.register({
    rule: {
      host: /^www\.imgcarry\.com$/,
      path: /^\/show\//,
    },
    ready: run2,
  });

  async function run () {
    const i = $('#img_obj');
    await $.openImage(i.src, {
      referer: true,
    });
  }

  async function run2 () {
    const i = $('#img_obj');
    await $.openImage(i.src, {
      replace: true,
    });
  }

})();
