_.register({
  rule: {
    host: [
      /^moe\.god\.jp$/,
      /^moesubs\.akurapopo\.pro$/,
      /^dl\.nsfk\.in$/,
    ]
  },
  async ready () {
    const a = $('div div center a');
    await $.openLink(a.href);
  },
});
