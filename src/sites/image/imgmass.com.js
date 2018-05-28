_.register({
  rule: {
    host: /^imgmass\.com$/,
    path: /^\/image\/[\d\w]+$/,
  },
  async ready () {
    // This page has multiple contents, just reveal all of them.
    $.remove('#loading2');
    const d = $('.box');
    d.style.display = 'initial';
    d.style.opacity = 'initial';
  },
});
