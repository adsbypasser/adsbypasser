_.register({
  rule: {
    host: [
      /^(www\.)?indishare\.(org|me)$/,
      /^bdupload\.(info|asia)$/,
    ],
  },
  async ready () {
    const btn = $('button#downloadbtn.downloadbtn');
    btn.removeAttribute('disabled');
    btn.click();
  },
});
