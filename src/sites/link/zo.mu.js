_.register({
  rule: 'http://zo.mu/redirector/process?link=*',
  async ready () {
    $.remove('iframe');
    window.location.reload();
  },
});
