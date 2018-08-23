_.register({
  rule: {
    host: /^www\.comandotorrents\.com$/,
    path: /\/[\w-]+\/$/,
  },
  async ready () {
    let mod;
    const l = $.$$('p > a');
    for (let i=0; i < l.length; i++) {
      if (l[i].hasAttribute('href') && l[i].getAttribute('href').match(/\?id=(.+)$/)) {
        mod = l[i].getAttribute('href');
        mod = mod.match(/\?id=(.+)$/);
        mod = atob(mod[1].split('').reverse().join(''));
        document.querySelectorAll('p > a')[i].removeAttribute('target');
        document.querySelectorAll('p > a')[i].setAttribute('href', mod);
      }
    }
  },
});
