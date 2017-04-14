_.register({
  rule: [
    'http://amateurfreak.org/share-*.html',
    'http://amateurfreak.org/share.php?id=*',
    'http://images.maxigame.by/share-*.html',
    'http://picfox.org/*',
    'http://www.euro-pic.eu/share.php?id=*',
    'http://www.gratisimage.dk/share-*.html',
    'http://xxx.freeimage.us/share.php?id=*',
    'http://npicture.net/share-*.html',
    'http://www.onlinepic.net/share.php?id=*',
    'http://www.pixsor.com/share.php?id=*',
    'http://www.pixsor.com/share-*.html',
    'http://pixsor.com/XXX/share-*.html',
    'http://holdthemoan.net/x/share-*.html',
    'http://imgurx.net/x/share-*.html',
    'http://www.imgz.pw/share-*.html',
  ],
  async ready () {
    const o = $('#iimg');
    await $.openImage(o.src);
  },
});
