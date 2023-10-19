_.register({
  rule: {
    host: /^uploadrar\.com$/,
  },
  async ready () {
    const btn = $('button#downloadbtn.downloadbtn');
    btn.removeAttribute('disabled');
    btn.click();
  },
});
