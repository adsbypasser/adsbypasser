_.register({
  rule: {
    host: [
      /^(www\.)?arab\.sh$/,
      /^arabsh\.com$/,
    ],
    path: /^\/\w+$/,
  },
  async ready () {
    const f = $('form[name=F1]');
    await _.wait(20 * 1000);
    f.submit();
  },
});
