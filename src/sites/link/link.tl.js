_.register({
  rule: {
    host: /^link\.tl$/,
    path: /\//,
  },
  async ready () {
    let m = $.searchFromScripts(/eval\((.+}\))\)/);
    m = eval('var f = function(){ return '+m[1]+';}; f() ;');
    let l = m.match(/(?:\$\.ajax.+|href=')(http.+skip.+|http[^']+)',data/);
    l = l[1];
    if (!l.match(/skip/)) {
      await $.openLink(l);
      return;
    }

    const token = m.match(/'X-CSRF-TOKEN':'([^']+)'},/);
    const rl = await $.post(l, '', {
      'X-CSRF-TOKEN': token[1]
    });

    await $.openLink(JSON.parse(rl).url);
  },
});
