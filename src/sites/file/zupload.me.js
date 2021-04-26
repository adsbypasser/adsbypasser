_.register({
  rule: {
    host: [
      /^zupload\.me$/,
      /^zeefiles\.download$/,
    ],
  },
  async ready () {
    const z = $('button#link_button');
    z.removeAttribute('disabled');
    z.click();
  },
});
