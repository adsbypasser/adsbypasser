_.register({
  rule: {
    host: /^(rd?)lnk\.co|reducelnk\.com$/,
    path: /^\/[^.]+$/,
  },
  async ready () {
    const f = $.$('iframe#dest');
    if (f) {
      await $.openLink(f.src);
      return;
    }

    $.remove('iframe');

    let o = $.$('#urlholder');
    if (o) {
      await $.openLink(o.value);
      return;
    }

    o = $.$('#skipBtn');
    if (o) {
      o = o.querySelector('a');
      await $.openLink(o.href);
      return;
    }

    o = document.title.replace(/(LNK.co|Linkbee)\s*:\s*/, '');
    await $.openLink(o);
  },
});
