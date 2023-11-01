_.register({
  rule: {
    host: [
      /^shortlinkto\.site$/,
      /^uplinkto\.hair$/,
    ],  
  },
  async ready () {
    const b = $('.btn.btn-primary.btn-block');
    b.click();
  },
});
