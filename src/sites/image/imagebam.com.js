_.register({
  rule: 'http://www.imagebam.com/image/*',
  async ready () {
    let o = $.$('.image-container img[id]');
    if (o) {
      o = $('.container-full img.image[src^="http"]');
      await $.openLink(o.src);
      
      return;
    }

    o = $('body > div > div > a');
    await $.openLink(o.href);
  },
});
