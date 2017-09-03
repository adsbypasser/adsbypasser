_.register({
  rule: {
    host: /^(www\.)?piccash\.net$/,
  },
  async ready () {
    const i = $('.container > img');
    const m = i.onclick.toString().match(/mshow\('([^']+)'\);/);
    await $.openImage(m[1]);
  },
});
