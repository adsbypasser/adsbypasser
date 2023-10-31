_.register({
  rule: {
  host: /^shortlinkto\.site$/,
},
async ready () {
  const b = $('.btn.btn-primary.btn-block');
  b.click();
 },
});
