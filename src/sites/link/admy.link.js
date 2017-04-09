_.register({
  rule: {
    host: /^admy\.link$/,
  },
  async ready () {
    const f = $('form.edit_link');
    f.submit();
  },
});
