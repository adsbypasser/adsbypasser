_.register({
  rule: {
    host: /^www\.oni\.vn$/,
  },
  async ready () {
    $.remove('iframe');

    let data = $.searchFromScripts(/data:"([^"]+)"/);
    if (!data) {
      throw new _.AdsBypasserError('pattern changed');
    }
    data = data[1];

    const url = await $.get('/click.html', data);
    await $.openLink(url);
  },
});
