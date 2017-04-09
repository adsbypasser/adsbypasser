_.register({
  rule: {
    host: [
      /^lnx\.lu$/,
      /^url\.fm$/,
      /^z\.gs$/,
    ],
  },
  async ready () {
    const a = $('#clickbtn a');
    await $.openLink(a.href);
  },
});
