_.register({
  rule: {
    host: [
      /^(www\.)?indishare\.(org|me)$/,
      /^bdupload\.(info|asia)$/,
      /^upgrand\.site$/,
      /^3zfile\.net$/,
      /^uploadrar\.com$/,
    ],
  },
  async ready () {
    const btn = $('button#downloadbtn.downloadbtn');
    btn.removeAttribute('disabled');
    btn.click();
  },
});
