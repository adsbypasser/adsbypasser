_.register({
  rule: {
    host: /^xxx\.fopkodiak\.site$/,
  },
  async ready () {
    if (document.referrer == document.location.href) {
      let img = $("#container > a > img");
      $.openImage(img.src);
    } else {
      let f = $("form");
      await $.openLink(f.action, { 
        post: {
          imgContinue: "Continue to image ...",
        }
      });
    }
  }
});
