_.register({
  rule: {
    host: /^ad2links\.com$/,
    path: /^\/\w-.+$/,
  },
  async ready () {
    $.remove('iframe');
    await $.openLink(window.location.toString(), {
      post: {
        image: 'Skip Ad.',
      },
    });
  },
});
