function commit () {}
(() => {
  'use strict';

  const view = {
    panel: $('#panel'),
    options: $('#options'),
    save: $('#save'),
    msg: $('#msg'),
    installHint: $('#install-hint'),
  };
  const template = {
    checkbox: _.template($('#template-checkbox').text()),
    select: _.template($('#template-select').text()),
  };
  const factory = {

    checkbox (key, data) {
      const html = template.checkbox({
        key: key,
        checked: data.value,
        label: data.label,
        help: data.help,
      });
      return $.parseHTML(html);
    },

    select (key, data) {
      const html = template.select({
        key: key,
        value: data.value,
        menu: data.menu,
        label: data.label,
        help: data.help,
      });
      return $.parseHTML(html);
    },

  };


  window.render = (data) => {
    clearTimeout(detection);

    view.msg.addClass('animated');

    _.each(data.options, (v, k) => {
      const createUI = factory[v.type];

      if (!createUI) {
        return;
      }

      const d = createUI(k, v);
      view.options.append(d);
    });

    view.panel.css('display', 'block');

    view.msg.on('transitionend webkitTransitionEnd', () => {
      view.msg.removeClass('dismissed');
    });

    view.save.on('click', (event) => {
      event.preventDefault();

      const data = {};

      // checkbox
      view.options.find('input[type="checkbox"]').each(function (k, v) {
        data[v.name] = v.checked;
      });
      // select
      view.options.find('select').each(function (k, v) {
        data[v.name] = v.value;
      });

      // commit changes
      commit(data);

      view.msg.addClass('dismissed');
    });
  };


  const detection = setTimeout(() => {
    view.installHint.addClass('animated');
    view.installHint.css({
      'opacity': 1,
      'display': 'block',
    });
  }, 1000);

})();
