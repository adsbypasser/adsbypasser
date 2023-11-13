_.register({
  rule: {
    host: /^mangalist\.org$/,
  },
  async ready () {
    await _.wait(1000);
    const b = $('[class="btn btn-primary url text-center center-block"]');
    b.click();
  },
});
