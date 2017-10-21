_.register({
  rule: {
    host: /^(www\.)?image(pearl|crest)\.com$/,
    path: /^\/verify\/(.+)$/,
  },
  async ready () {
    const w = screen.width;
    const h = screen.height;
    const i = $('#i').value;
    const r = $('#r').value;
    await $.get('verify.php', {
      w,
      h,
      i,
      r,
    });
    location.reload();
  },
});

_.register({
  rule: [
    'http://*.abload.de/image.php?img=*',
    'http://www.imageup.ru/*/*/*.html',
    // different layout same handler
    'http://itmages.ru/image/view/*/*',
    // different layout same handler
    {
      host: /^(www\.)?image(pearl|crest)\.com$/,
      path: /^\/view\//,
    },
  ],
  async ready () {
    const i = $('#image');
    await $.openImage(i.src);
  },
});
