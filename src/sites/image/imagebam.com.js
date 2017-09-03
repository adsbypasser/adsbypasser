_.register({
  rule: 'http://www.imagebam.com/image/*',
  async ready () {
    const o = $('.image-container img[id]');
    // somehow the server send image as an attachment
    // so I replace whole document.body with single img
    await $.openImage(o.src, {
      replace: true,
    });
  },
});
