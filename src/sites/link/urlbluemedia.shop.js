/**
 * @domain urlbluemedia.shop
 */
_.register({
  rule: {
    host: /^urlbluemedia\.shop$/,
  },
  async ready() {
    await _.wait(7000);
    const a = $("input#nut");
    a.click();
  },
});
