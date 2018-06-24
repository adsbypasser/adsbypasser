_.register({
  rule: {
    host: /^www\.noelshack\.com$/,
  },
  async ready () {
    const i = $('#elt_to_aff');
    await $.openImage(i.src);
  },
});
