_.register({
  rule: {
    host: /^www\.ron\.vn$/,
  },
  async ready () {
    const script = $.searchFromScripts('linknexttop');
    const data = script.match(/data:"([^"]+)"/);
    let url = $.window.domain + 'click.html?' + data[1];
    url = await $.get(url, {}, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    await $.openLink(url);
  },
});
