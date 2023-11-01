_.register({
  rule: {
    host: /^(www\.)?keeplinks\.org$/,
  },
  async ready () {
    const button = $('[id="btnproceedsubmit"]');
    button.click();
  },
});
