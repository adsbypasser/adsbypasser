_.register({
  rule: {
    host: /^link\.tl$/,
    path: /\//,
  },
  async ready () {
    let m = $.searchFromScripts(/eval\((.+}\))\)/);
    m = _.evil(`(${m[1]})`);
    let l = m.match(/(?:\$\.ajax.+|href=')(http.+skip.+|http[^']+)',data/);
    l = l[1];
    if (!l.match(/skip/)) {
      await $.openLink(l);
      return;
    }

    const token = m.match(/'X-CSRF-TOKEN':'([^']+)'},/);
    let rl = await $.post(l, '', {
      'X-CSRF-TOKEN': token[1],
    });
    rl = JSON.parse(rl);

    await $.openLink(rl.url);
  },
});
