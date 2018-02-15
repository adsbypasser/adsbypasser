_.register({
  rule: {
    host: [
      /^gsurl\.(me|in)$/,
      /^g5u\.pw$/,
    ],
  },
  async ready () {
    $.remove('#container');

    const a = $('#link');
    await _.wait(5000);
    await $.openLink(a.href);
  },
});
