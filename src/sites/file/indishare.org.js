_.register({
  rule: {
    host: [
      /^(www\.)?indishare\.(org|me)$/,
      /^bdupload\.(info|asia)$/,
      /^upgrand\.site$/,
    ],
  },
  async ready () {
    const btn = $('button#downloadbtn.downloadbtn');
    btn.removeAttribute('disabled');
    btn.click();
  },
});
