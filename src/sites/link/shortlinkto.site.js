_.register({
  rule: {
    host: [
      /^shortlinkto\.biz$/,
      /^uplinkto\.hair$/,
    ],  
  },
  async ready () {
    const a = $('.view-well a');
    await $.openLink(a.href);
  },
});
