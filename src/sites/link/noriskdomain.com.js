_.register({
  rule: {
    host: /^noriskdomain\.com$/,
  },
  async ready () {
    await _.wait(10000);
    const b = $('.uk-button.uk-button-large.uk-button-primary.go-to-button');
    if (b) {
      b.click();
    }
    const a = $('.uk-button.uk-button-large.uk-button-primary.go-to-button');
    if (a) {
      a.click();
    }
  },
});
