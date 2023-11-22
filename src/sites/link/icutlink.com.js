_.register({
  rule: {
    host: /^icutlink\.com$/,
  },
  async ready () {
    await _.wait(10000);
    const a = $('a[class="btn btn-success btn-lg get-link"]');
    await $.openLink(a);
  },
});
            
_.register({
  rule: {
    host: /^zegtrends\.com$/,
  },
  async ready () {
    await _.wait(12000);
    const b = $('div > button.bsub');
    b.click();
  },
});
