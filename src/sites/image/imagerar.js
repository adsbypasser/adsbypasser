$.register({
    rule: {
        host: /^imagerar\.com$/,
        path: /^\/img-/
    },
    ready: function () {
        $.openLink(linkid, {replace: true});
    },
});

$.register({
    rule: {
        host: /^imagerar\.com$/,
        path: /^\/img2-/
    },
    ready: function () {
        var i = $('img[title="Click to view full size"]');
        if (i) {
            $.openImage(i.src, {replace: false});
            return;
        }
    },
});



