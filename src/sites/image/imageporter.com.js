(function () {

  _.register({
    rule: {
      host: /^www\.imageporter\.com$/,
      path: /^\/\w{12}\/.*\.html$/,
    },
    ready: run,
  });

  _.register({
    rule: {
      host: [
        /^(www\.)?image(carry|dunk|porter|switch)\.com$/,
        /^(www\.)?pic(leet|turedip|tureturn)\.com$/,
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
