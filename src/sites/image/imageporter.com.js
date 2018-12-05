(function () {

  _.register({
    rule: {
      host: /^(www\.)?imageporter\.com$/,
      path: /^\/\w{12}\/.*\.html$/,
    },
    ready: run,
  });

  _.register({
    rule: {
      host: [
        /^(www\.)?(imagecarry|imagedunk|imageporter|imageswitch)\.com$/,
        /^(www\.)?(picleet|picturedip|pictureturn)\.com$/,
        /^(www\.)?imgspice\.com$/,
        /^(www\.)?(piclambo|yankoimages)\.net$/,
      ],
    },
    ready: run,
  });

  async function run () {
    const o = $('#download_box img[id]');
    await $.openImage(o.src);
  }

})();
