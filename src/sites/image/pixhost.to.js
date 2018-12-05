_.register({
  rule: {
    host: /^(www\.)?pixhost\.to$/,
    path: /^\/show\//,
  },
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
