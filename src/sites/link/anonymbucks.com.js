_.register({
  rule: {
    host: /^anonymbucks\.com$/,
  },
  async ready () {
    const a = $('#boton-continuar');
    a.click();
  },
});
