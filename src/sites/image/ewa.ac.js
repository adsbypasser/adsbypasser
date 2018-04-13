_.register({
  rule: {
    host: /^ewa\.ac$/,
    path: /^\/(.*)$/,
  },
  async ready (m) {
    await _.wait(5000);

    const url = await $.post('/site/get-new-redirect-link', {
      code: m.path[1],
      ads_blocked: false,
    });

    await $.openImage(url);
  },
});
