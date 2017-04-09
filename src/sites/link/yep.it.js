_.register({
  rule: 'http://yep.it/preview.php?p=*',
  async ready () {
    const link = $('font[color="grey"]').innerHTML;
    await $.openLink(link);
  },
});
