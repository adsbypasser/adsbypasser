_.register({
  rule: {
    host: [/^(www\.)?indishare\.org$/, /^uploadrar\.com$/],
  },
  async ready() {
    const btn = $("button#downloadbtn.downloadbtn");
    btn.removeAttribute("disabled");
    btn.click();
  },
});
