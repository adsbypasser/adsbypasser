/**
 * @domain ak.sv
 */
_.register({
  rule: {
    host: /^ak\.sv$/,
  },
  async ready() {
    await _.wait(1000);
    const any = $('html');
    any.click();
    await _.wait(6000);
    const a = $('a[class="download_button"]');
    await $.openLink(a);
  },
});
