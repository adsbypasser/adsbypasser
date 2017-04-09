$.register({
  rule: 'http://www.fotosik.pl/pokaz_obrazek/pelny/*.html',
  ready: function () {
    'use strict';

    var i = $('a.noborder img');
    $.openImage(i.src);
  },
});
