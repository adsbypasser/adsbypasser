_.register({
  rule: {
    host: /^boost\.ink$/,
  },
  async ready () {
    let b = $('.locker_card button.complete_btn').data('href');
    const target = atob(b);
    await $.openLink(target);
  },
});
