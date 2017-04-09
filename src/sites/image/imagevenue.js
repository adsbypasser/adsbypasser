// I don't think these sites are the same
_.register({
  rule: [
    'http://*.imagevenue.com/img.php?*',
    'http://hotchyx.com/d/adult-image-hosting-view-08.php?id=*',
    'http://www.hostingfailov.com/photo/*',
  ],
  async ready () {
    const i = $('#thepic');
    await $.openImage(i.src);
  },
});
