_.register({
  rule: {
    host: /^(www\.)?ouo\.(io|press)$/
  },
  async ready () {
    $('form[method="POST"]>input[name="_token"]').parentNode.submit();
  },
});
