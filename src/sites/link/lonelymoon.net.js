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
