_.register({
  rule: {
    host: /^elde\.me$/,
  },
  async ready () {
    // do not remove recaptcha
    $.remove('iframe:not([name=undefined])');

    const a = $('#modal-alert');
    a.style.display = 'block';
    a.style.top = 0;
    a.style.left = 0;
  },
});
