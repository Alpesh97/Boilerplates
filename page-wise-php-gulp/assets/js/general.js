// equal height
function equalHeight() {
    jQuery.fn.extend({
        equalHeight: function () {
            var top = 0;
            var row = [];
            var classname = ('equalHeight' + Math.random()).replace('.', '');
            jQuery(this).each(function () {
                var thistop = jQuery(this).offset().top;
                if (thistop > top) {
                    jQuery('.' + classname).removeClass(classname);
                    top = thistop;
                }
                jQuery(this).addClass(classname);
                jQuery(this).height('auto');
                var h = (Math.max.apply(null, jQuery('.' + classname).map(function () {
                    return jQuery(this).outerHeight();
                }).get()));
                jQuery('.' + classname).height(h);
            }).removeClass(classname);
        }
    });
    // jQuery('class-name').equalHeight();
}

jQuery(document).ready(function () {

    // For load fonts dynamically
    WebFontConfig = {
        google: { families: ['Roboto+Slab:400,700&display=swap', 'Open+Sans:400,600&display=swap'] }
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

    if (!(/Edge\/\d./i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(
        navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent))) {
        LazyLoad.init();
    }

    if (/Edge\/\d./i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(
        navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent)) {
        if (jQuery("html").hasClass('ie') || jQuery("html").hasClass('edge')) {
            jQuery(".js-lazy-image").each(function () {
                jQuery(this).attr("src", jQuery(this).attr('data-src'));
                jQuery(this).removeAttr('data-src');
                jQuery(this).removeClass("js-lazy-image");
            });
            jQuery(".lazybg").each(function () {
                jQuery(this).css("background-image", "url(" + jQuery(this).attr('data-lazybg') + ")");
                jQuery(this).removeAttr('data-lazybg');
                jQuery(this).removeClass("lazybg");
            });
        }
    }
});

jQuery(window).on('load', function () {
    equalHeight();
});

jQuery(window).resize(function () {
    setTimeout(function () {
        equalHeight();
    }, 500);
});

jQuery(window).on('scroll', function () {
    
});