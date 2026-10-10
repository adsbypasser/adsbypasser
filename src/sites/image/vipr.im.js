/**
 * @domain vipr.im
 */

_.register({
  rule: {
    host: [/^vipr\.im$/],
  },
  async ready() {
    const i = $(".pic");
    // to ignore download header
    await $.openImage(i.src, {
      replace: true,
    });
  },
});
