_.register({
  rule: {
    host: /^(www\.)?cvc\.la$/,
    path: /^\/\w+$/,
  },
  async start () {
    const text = await $.post(document.location.href, {
      hidden: 24, // Either 24 or 276, but both seem to work anyway
      image: ' ',
    });
    const matches = text.match(/window\.location\.replace\('([^']+)'\);/);
    await $.openLink(matches[1]);
  },
});
