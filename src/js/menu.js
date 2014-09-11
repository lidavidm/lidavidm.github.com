$(function() {
    // Mobile menu
    var visible = false;
    $('#mobile-menu').click(function() {
        if (visible) {
            $('#navigation').css({
                opacity: 0,
                '-webkit-transform': 'translateX(-100%)',
                '-moz-transform': 'translateX(-100%)',
                '-o-transform': 'translateX(-100%)',
                '-ms-transform': 'translateX(-100%)',
                'transform': 'translateX(-100%)'
            });
        }
        else {
            $('#navigation').css({
                opacity: 1,
                '-webkit-transform': 'translateX(0%)',
                '-moz-transform': 'translateX(0%)',
                '-o-transform': 'translateX(0%)',
                '-ms-transform': 'translateX(0%)',
                'transform': 'translateX(0%)'
            });
        }
        visible = !visible;
    });
});
