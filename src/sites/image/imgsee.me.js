$.register({
    rule:  {
        host: /^(www\.)?imgsee\.me$/,
    },
    ready: function () {
        'use strict';

        try {
            var form = $('body > form');
            form.submit();
        } catch (e) {
            $.openImage($('.pic').src);
        }
    },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
