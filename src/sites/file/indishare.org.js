_.register({
  rule: {
    host: /^(www\.)?indishare\.(org|me)$/,
  },
  async ready () {
    let btn = $('button#downloadbtn.downloadbtn');
    if (btn) {
      const clkbtn = btn.removeAttribute("disabled");
      btn.click();
    } else {
      const link = $('#content span#direct_link a');
      await $.openLink(link.href);
    }
  },
});
