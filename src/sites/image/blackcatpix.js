_.register({
  rule: 'http://blackcatpix.com/v.php?*',
  async ready () {
    const img = $('td center img');
    await $.openImage(img.src);
  },
});
