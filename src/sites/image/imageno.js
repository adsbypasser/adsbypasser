_.register({
  rule: 'http://imageno.com/*.html',
  async ready () {
    const i = $('#image_div img');
    await $.openImage(i.src);
  },
});
