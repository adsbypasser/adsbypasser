_.register({
  rule: {
    host: /^(www\.)?apunkasoftware\.net$/,
  },
  async ready() {
    const a = $("div#proceed-now > a#dlink");
    await $.openLink(a.href);
  },
});

_.register({
  rule: {
    host: /^thefileslocker\.net$/,
  },
  async ready() {
    const button = $("#downloadbtn");
    button.click();
  },
});
