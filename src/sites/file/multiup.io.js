_.register({
  rule: {
    host:
      /^multiup\.io$/,
  },
  async ready () {
    const b = $('button[class="btn btn-info btn-lg btn-block p-xlg hvr-shutter-out-horizontal"]');
    b.click();
  },
});
