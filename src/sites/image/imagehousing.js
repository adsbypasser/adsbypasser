_.register({
  rule: 'http://www.imagehousing.com/image/*',
  async ready () {
    const i = $('td.text_item img');
    await $.openImage(i.src);
  },
});
