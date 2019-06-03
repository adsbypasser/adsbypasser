_.register({
  rule: {
    host: /^(www\.)?indishare\.(org|me)$/,
  },
  async ready () {
    const btn = $('button#downloadbtn.downloadbtn');
    if (btn) {
      btn.removeAttribute('disabled');
      btn.click();
    } else {
      const link = $('#content span#direct_link a');
      await $.openLink(link.href);
    }
  },
});
