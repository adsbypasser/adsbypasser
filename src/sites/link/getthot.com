_.register({
  rule: {
    host: /^getthot\.com$/,
  },
   async ready () {
     await _.wait(12000);
     const a = $('.skip-btn');
     await $.openLink(a.href);
  },
});
