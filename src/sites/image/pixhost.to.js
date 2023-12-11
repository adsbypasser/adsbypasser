_.register({
  rule: [
    {
      host: /^(www\.)?pixhost\.to$/,
      path: /^\/show\//,
    },
    {
      host: [
        /^3xplanet\.(com|net)$/,
        /^javtenshi\.com$/,
        /^jav-load\.com$/,
      ],
      path: /^\/viewimage\//,
    }
  ],
  async ready () {
    $.remove('iframe, #ad');

    let o = $.$('#all');
    if (o) {
      o.style.display = '';
    }

    o = $('#show_image, #image');
    await $.openImage(o.src);
  },
});
