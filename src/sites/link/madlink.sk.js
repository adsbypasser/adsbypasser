_.register({
  rule: [
    'http://madlink.sk/',
    'http://madlink.sk/*.html',
  ],
});

_.register({
  rule: 'http://madlink.sk/*',
  async start (m) {
    $.remove('iframe');
    const text = await $.post('/ajax/check_redirect.php', {
      link: m[1],
    });
    await $.openLink(text);
  },
});
