_.register({
  rule: {
    host: [
      /^imgchili\.(com|net)$/,
      /^(www\.)?pixhost\.to$/,
    ],
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
