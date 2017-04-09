_.register({
  rule: 'http://www.casimages.com/img.php?*',
  async ready () {
    const img = $('td a img');
    await $.openImage(img.src);
  },
});
