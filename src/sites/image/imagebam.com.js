_.register({
  rule: {
    host: /^www\.imagebam\.com$/,
    path: /^\/(view|image)\/.*$/,
  },
   async ready () {
      const img = $('img.main-image');
      await $.openImage(img.src);
    },
  });
