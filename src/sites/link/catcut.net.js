_.register({
  rule: {
    host: /^catcut\.net$/,
  },
  async ready () {
    let a = $.searchFromScripts(/decodeURIComponent\('([^']+)'\)/);
    a = decodeURIComponent(a[1]);
    a = new URL(a);
    a = a.searchParams.get('a');
    a = atob(a);
    await $.openLink(a);
  },
});
