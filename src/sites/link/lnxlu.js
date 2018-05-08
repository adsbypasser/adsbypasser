_.register({
  rule: {
    host: [
      /^lnx\.lu$/,
      /^url\.fm$/,
    ],
  },
  async ready () {
    const a = $('#clickbtn a');
    await $.openLink(a.href);
  },
});
