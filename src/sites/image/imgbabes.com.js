_.register({
  rule: {
    host: /^www\.(imgbabes|imgflare)\.com$/,
  },
  async ready () {
    let i = $.$('input[onclick]');
    if (i) {
      $.window.Decode();
      return;
    }

    i = $('#this_image');
    await $.openImage(i.src);
  },
});
