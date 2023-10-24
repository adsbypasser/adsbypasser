_.register({
  rule: {
    host: /^realsht\.mobi$/,
  },
  async ready () {
    const n = $('#section1 form input#section1');
    n.click();
  },
});
