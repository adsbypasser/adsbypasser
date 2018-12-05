_.register({
  rule: {
    host: /^link4ad\.com$/,
    path: /^\/(.+)$/,
  },
  async ready (m) {
    let d = $('div[id^=module_]');
    d = d.id.match(/module_(\d+)/);
    d = d[1];

    const url = await $.post('form.php?block_id=' + d, {
      cmd: 'get_source',
      act: 'waiting',
      id: m.path[1],
    });
    await $.openLink(url);
  },
});
