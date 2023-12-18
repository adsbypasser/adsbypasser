_.register({
  rule: {
    host: [
      /^shink\.me$/,
      /^shon\.xyz$/,
    ],
  },
  async ready () {
    const f = $('#skip');
    f.submit();
  },
});
