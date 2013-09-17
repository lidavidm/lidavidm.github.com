$(function() {
    $('#content').find('h2,h3,h4,h5,h6').each(function() {
        var title = $(this).html();
        var anchor = title.toLocaleLowerCase().trim().replace(/ +/g, "-");
        $(this).html('<a id="' + anchor + '">' + title + '</a>');
    });

    var headers = $('#content').find('h2,h3,h4,h5,h6');
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
        var panel = $('<div>').addClass('panel-body');
        var html = '<div class="toc"><div class="panel panel-default"><div class="panel-body">';
        html += '</div></div></div>';
        var panel = $(html).prependTo($('#content'));
        toc.appendTo(panel.find('.panel-body'));

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
});
