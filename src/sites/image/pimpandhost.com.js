_.register({
  rule: {
    host: /^(www\.)?pimpandhost\.com$/,
    path: /^\/image\//,
  },
  async ready () {
    // Retrieve the normal-sized image
    const a = $('#image_original');

    // Grab its URL
    const el = document.createElement('div');
    el.innerHTML = a.value;
    const img = $('img', el);

    await $.openImage(img.src);
  },
});
