_.register({
  rule: {
    host: /^boost\.ink$/,
  },
  async start() {
    const b = $("body").getAttribute("result");
    if (b) {
      await $.openLink(atob(b));
    } else {
      return;
    }
  },
});
