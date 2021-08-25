_.register({
  rule: [
    {
      host: /^(www\.)?pixhost\.to$/,
      path: /^\/show\//,
    },
    {
      host: /^3xplanet\.com$/,
      path: /^\/viewimage\//,
    },
  ],
  async ready () {
    $.remove('iframe, #ad');

    let o = $.$('#all');
    if (o) {
      o.style.display = '';
    }

    let o = $('#show_image, #image');
    await $.openImage(o.src);
  },
});
