_.register({
  rule: 'http://hentaimg.com/mg/lndex-1.php?img=*',
  async ready () {
    await $.openLink('index-1.php' + window.location.search);
  },
});

_.register({
  rule: 'http://hentaimg.com/mg/index-1.php?img=*',
  async ready () {
    const i = $('#content img');
    await $.openImage(i.src);
  },
});
