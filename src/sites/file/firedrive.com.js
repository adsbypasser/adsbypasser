_.register({
  rule: {
    host: /^(www\.)?(firedrive|putlocker)\.com$/,
    path: /^\/file\/[0-9A-F]+$/,
  },
  async ready () {
    const c = $('#confirm_form');
    c.submit();
  },
});
