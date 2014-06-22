$(function() {
    $('article').find('h2,h3,h4,h5,h6').each(function() {
        var title = $(this).html();
        var anchor = title.toLocaleLowerCase().trim().replace(/ +/g, "-");
        $(this).html('<a id="' + anchor + '">' + title + '</a>');
    });

    var headers = $('article').find('h2,h3,h4,h5,h6');
    var levelOf = function(h) {
        return parseInt(h.get(0).tagName[1]);
    };
    var makeItem = function(toc, h) {
        var entry = $('<li></li>').html(h.html());
        var link = entry.find('a');
        link.attr('href', '#' + link.attr('id'));
        link.attr('id', '');
        entry.appendTo(toc);
    }
    if (headers.length) {
        headers = $.map(headers, $);
        var superToc = [];
        var toc = $('<ol/>');
        var html = '<div class="toc"></div>';
        var panel = $(html).append(toc).prependTo($('article'));

        var currentLevel = levelOf(headers[0]);
        for (var i = 0; i < headers.length; i++) {
            var h = headers[i];
            if (levelOf(h) > currentLevel) {
                currentLevel = levelOf(h);

                superToc.push(toc);
                toc = $('<ol/>');
                toc.appendTo(superToc[superToc.length - 1]);

                makeItem(toc, h);
            }
            else if (levelOf(h) == currentLevel) {
                makeItem(toc, h);
            }
            else if (levelOf(h) < currentLevel) {
                currentLevel = levelOf(h);
                toc = superToc.pop();
                makeItem(toc, h);
            }
        }
    }


    // Mobile menu
    var visible = false;
    $('#mobile-menu').click(function() {
        if (visible) {
            $('header #navigation').css({
                opacity: 0,
                '-webkit-transform': 'translateX(-100%)',
                '-moz-transform': 'translateX(-100%)',
                '-o-transform': 'translateX(-100%)',
                '-ms-transform': 'translateX(-100%)',
                'transform': 'translateX(-100%)'
            });
        }
        else {
            $('header #navigation').css({
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
