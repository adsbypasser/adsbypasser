$.register({
  rule:{
    host:/^(www\.)?imgpics\.net$/,
    path:/^\/img-\w{13}\.html$/
  },
  ready:function(){
    if($('#continuetoimage'))
    {
      $.post(window.location, {imgContinue: '1'}).then(function(text){
        var i=text.match(/return popitup\('([^']*)'\)/i);
        if(i&&i.length>0)
          $.openImage(i[1]);
      });
    }
  }
});
