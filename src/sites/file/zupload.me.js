_.register({
  rule: {
    host: /^zupload\.me$/,
  },
  async ready () {
    const z = $('button#link_button');
    z.removeAttribute('disabled');
    z.click();
  },
});
