_.register({
  rule: 'http://www.imagebam.com/image/*',
  async ready () {
    let o = $.$('.image-container img[id]');
    if (o) {
      // somehow the server send image as an attachment
      // so I replace whole document.body with single img
      await $.openImage(o.src, {
        replace: true,
      });
      return;
    }

    o = $('body > div > div > a');
    await $.openLink(o.href);
  },
});
