_.register({
  rule: {
    host: [
      // org
      /^corepix\.org$/,
      /^(www\.)?xxximagetpb\.org$/,
      // else
      /^imghost\.(top|club)$/,
      /^somnath2003\.xyz$/,
      /^pornbaker\.men$/,
    ],
    path: /^\/image\/.+$/,
  },
  async ready () {
    const i = $('input#embed-code-2.text-input').getAttribute('value');
    await $.openImage(i);
  },
});
