_.register({
  rule: {
    host: /^noriskdomain\.com$/,
  },
  async ready () {
    await _.wait(10000);
    const b = $('.uk-button-primary.go-to-button');
    b.click();
    await _.wait(1000);
    const a = $('.uk-button-primary.go-to-button');
    a.click();
  },
});
