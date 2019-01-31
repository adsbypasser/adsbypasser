_.register({
  rule: {
    host: /^xxx\.fopkodiak\.site$/,
    path: /^\/img-/,
  },
  async ready () {
    if (document.referrer == document.location.href) {
      let img = $.$('#container > a > img');
      if (!img) {
        img = $('#container > img');
      }
      await $.openImage(img.src);
    } else {
      const f = $('form');
      await $.openLink(f.action, { 
        post: {
          imgContinue: 'Continue to image ...',
        }
      });
    }
  }
});
