_.register({
  rule: {
    host: [
      /^gsurl\.(me|in)$/,
      /^(gsul|getsl|glinks)\.me$/,
      /^gsur\.in$/,
      /^g5u\.pw$/,
      /^gurl\.ly$/,
    ],
  },
  async ready () {
    $.remove('#container');

    const a = $('#link');
    await $.openLink(`${a.href}&ab=${$.window.x}`);
  },
});
