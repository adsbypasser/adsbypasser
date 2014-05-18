var render;
function commit () {}
(function () {
  'use strict';

  var view = {
    panel: $('#panel'),
    options: $('#options'),
    save: $('#save'),
    msg: $('#msg'),
  };
  var tpl = {
    cb: $('#tpl-cb').text(),
  };


  function createCheckbox (key, checked, labelText, helpText) {
    var html = _.template(tpl.cb, {
      key: key,
      checked: checked,
      label: labelText,
      help: helpText,
    });
    return $.parseHTML(html);
  }


  render = function (data) {
    _.each(data.options, function (v, k) {
      var type = v.type;

      if (typeof type === 'string' && type === 'checkbox') {
        // checkbox
        var d = createCheckbox(k, v.value, v.label, v.help);
        view.options.append(d);
      }
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

      // commit changes
      commit(data);

      view.msg.addClass('dismissed');
    });
  };

})();
// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
