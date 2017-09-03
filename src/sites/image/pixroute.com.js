_.register({
  rule: {
    host: /^(www\.)?pixroute\.com$/
  },
  async ready () {
    // the img ID is a random string
    const o = $('.fr4me > div:nth-child(20) > a:nth-child(1) > img:nth-child(1)');
    await $.openImage(o.src);
  },
});
