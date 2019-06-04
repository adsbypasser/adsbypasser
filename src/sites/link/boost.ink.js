_.register({
  rule: {
    host: /^boost\.ink$/,
  },
  async ready () {
    const b = $('.locker_card button.complete_btn').data('href');
    const target = atob(b);
    await $.openLink(target);
  },
});
