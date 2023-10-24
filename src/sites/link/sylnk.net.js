// all blog type belong here?

_.register({
  rule: 
    {
      host: /^leechpremium\.link$/,
      path: /^\/cheat\//,
      query: /^\?link=([a-zA-Z0-9/=]+)$/,
    },
  async start (m) {
    const rawLink = atob(decodeURIComponent(m.query[1]));
    await $.openLink(rawLink);
  },
});

_.register({
  rule: {
    host: [
      /^lonelymoon\.net$/,
      /^(intercelestial|sweetlantern)\.com$/,
    ],
  },
  async ready () {
    await _.wait(1000);
    const ln = $('#landing.soractrl .to a');
    ln.click();

    await _.wait(2000); //if someone has better solution than waiting these 2 seconds, send PR
    const tl = $('.soractrl img#showlink.spoint');
    tl.click();
  },
});

_.register({
  rule: {
    host: /^boost\.ink$/,
  },
  async start () {
    const b = $('body').getAttribute('result');
    if (b) {
      await $.openLink(atob(b));
    } else {
      return;
    }
  },
});

_.register({
  rule: {
    host: /^(sataniabatch|get-click2)\.blogspot\.com$/,
  },
  async ready () {
    const clbt = $('button#gotolink');
    clbt.removeAttribute('disabled');
    await _.wait(1);
    clbt.click();
  },
});
