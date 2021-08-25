_.register({
  rule: {
    host: /^www\.imagebam\.com$/,
    path: /^\/(view|image)\/.*$/,
  },
  async ready () {
    let o = $.$('div.view-navigation > a:nth-child(3)');
    if (o) {
      await $.openImage(o.href);
      return;
    }
    o = $('#app > main > div > h2 > a');
    await $.openLink(o.href);
  },
});
