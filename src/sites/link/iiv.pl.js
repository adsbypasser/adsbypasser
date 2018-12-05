_.register({
  rule: {
    host: /^iiv\.pl$/,
  },
  async ready () {
    let d = $('#counting');
    let rv = await $.post(location.pathname, {
      blocker: 0,
      salt: d.dataset.salt,
    }, {
      'X-OCTOBER-REQUEST-HANDLER': 'onAfterShortcutView',
      'X-OCTOBER-REQUEST-PARTIALS': 'shortcut/link_show',
    });
    rv = JSON.parse(rv);
    d = $.toDOM(rv['shortcut/link_show']);
    rv = $('a', d);
    await $.openLink(rv.href);
  },
});
