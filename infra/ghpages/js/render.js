window.render = null;
window.commit = function commit () {};
(function () {
  'use strict';

  var view = {
    panel: $('#panel'),
    options: $('#options'),
    save: $('#save'),
    msg: $('#msg'),
    installHint: $('#install-hint'),
  };
  var template = {
    checkbox: _.template($('#template-checkbox').text()),
    select: _.template($('#template-select').text()),
  };
  var factory = {

    checkbox: function (key, data) {
      var html = template.checkbox({
        key: key,
        checked: data.value,
        label: data.label,
        help: data.help,
      });
      return $.parseHTML(html);
    },

    select: function (key, data) {
      var html = template.select({
        key: key,
        value: data.value,
        menu: data.menu,
        label: data.label,
        help: data.help,
      });
      return $.parseHTML(html);
    },

  };


  window.render = function (data) {
    clearTimeout(detection);

    view.msg.addClass('animated');

    _.each(data.options, function (v, k) {
      var createUI = factory[v.type];

      if (!createUI) {
        return;
      }

      var d = createUI(k, v);
      view.options.append(d);
    });

    view.panel.css('display', 'block');

    view.msg.on('transitionend webkitTransitionEnd', function () {
      view.msg.removeClass('dismissed');
    });

    view.save.on('click', function (event) {
      event.preventDefault();

      var data = {};

      // checkbox
      view.options.find('input[type="checkbox"]').each(function (k, v) {
        data[v.name] = v.checked;
      });
      // select
      view.options.find('select').each(function (k, v) {
        // TODO not always integer
        data[v.name] = parseInt(v.value, 10);
      });

      // commit changes
      // TODO this returns a promise.
      commit(data);

      view.msg.addClass('dismissed');
    });
  };


  var detection = setTimeout(function () {
    view.installHint.addClass('animated');
    view.installHint.css({
      'opacity': 1,
      'display': 'block',
    });
  }, 1000);

})();
