_.register({
  rule: {
    host: [
      /^pic4you\.ru$/,
      /^pic5you\.ru$/,
    ],
  },
  async ready () {
    // img is a direct child only if it's a thumb
    if ($.$('#d1 > img') != null) {
      // Basically append /1/ to the URL
      const URLparams = location.href.split('/', 5);
      let next = URLparams.join('/');
      next = next + '/1/';

      // Necessary otherwise it doesn't redirect correctly to the image
      $.setCookie('p4yclick', '1');

      await $.openLink(next);
    } else {
      // We are on the full-scaled image
      const i = $('#d1 img').src;
      await $.openImage(i);
    }
  },
});
