// second stage
_.register({
  rule: {
    host: /^imgbar\.net$/,
    path: /^\/img_show\.php$/,
    query: /^\?view_id=/,
  },
  async ready () {
    const i = $('center img');
    await $.openImage(i.src);
  },
});

// first stage
_.register({
  rule: {
    host: /^imgbar\.net$/,
  },
  async ready () {
    const i = $('div.panel.top form input[name=sid]');
    await $.openLink('/img_show.php?view_id=' + i.value);
  },
});
