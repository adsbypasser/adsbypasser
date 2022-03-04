_.register({
  rule: {
    host: [
      // org
      /^corepix\.org$/,
      /^(www\.)?xxximagetpb\.org$/,
      // else
      /^imghost\.(top|club)$/,
      /^pornbaker\.men$/,
      /^somnath2003\.xyz$/,
      /^starimage\.club$/,
    ],
    path: /^\/image\/.+$/,
  },
  async ready () {
    const i = $('input#embed-code-2.text-input').getAttribute('value');
    await $.openImage(i);
  },
});
