// browser specific js

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = "" + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;


// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
}
// In Chrome, the true version is after "Chrome"
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
}
// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
}
// In Firefox, the true version is after "Firefox"
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
}
// In most other browsers, "name/version" is at the end of userAgent
else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
}
var OSName = "UnknownOS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
jQuery("body,html")
    .addClass(browserName.toLowerCase())
    .addClass(OSName.toLowerCase());

if (navigator.userAgent.match(/iP(hone|od|ad)/i)) {
    jQuery("body,html").addClass("browser-ios");
}

function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

    return is_ie;
}

/***Add browser specific class***/
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Edge",
        identity: "MS Edge"
    },
    {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
    },
    {
        string: navigator.userAgent,
        subString: "Trident",
        identity: "Explorer"
    },
    {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    },
    {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
    },
    {
        string: navigator.userAgent,
        subString: "OPR",
        identity: "Opera"
    },
    {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
    {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
    }
    ]
};

BrowserDetect.init();

var bv = BrowserDetect.browser;
if (bv == "Chrome") {
    jQuery("html").addClass("chrome");
} else if (bv == "MS Edge") {
    jQuery("html").addClass("edge");
} else if (bv == "Explorer") {
    jQuery("html").addClass("ie");
} else if (bv == "Firefox") {
    jQuery("html").addClass("Firefox");
}

// footer js
function footerAdj() {
    var footerH = jQuery("footer").innerHeight();
    jQuery("footer").css({ "margin-top": -footerH });
    jQuery(".wrapper").css({ "padding-bottom": footerH });
}
function header_padding() {
    var header_height = jQuery('.site-header').innerHeight();
    jQuery('.wrapper').css('padding-top', header_height);

}
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
    jQuery('.home-benefits-section .benefits-list .benefits-detail .detail-inner h3').equalHeight();
    jQuery('.graduate-section .graduate-profile-list h4').equalHeight();
    jQuery('.graduate-section .graduate-profile-list p').equalHeight();
    jQuery('.graduate-section .graduate-profile-list .list-inner .profile-detail').equalHeight();
    
}

function login_wrapper_height() {
       var header_footer_h = jQuery('header').innerHeight() + jQuery('footer').innerHeight() ;
       jQuery(".login-section").css(
        'min-height' , 'calc(100vh - ' + header_footer_h + 'px)'
       );
}

jQuery(document).ready(function () {
    footerAdj();
    equalHeight();
    header_padding();
    login_wrapper_height();
    jQuery('.custom-dropdown select').select2({
        closeOnSelect: true
    });
    jQuery(".custom-datepicker .form-control").datepicker();
    //Prevent Page Reload on all # links
    jQuery("a[href='#']").click(function (e) {
        e.preventDefault();
    });

    //placeholder
    jQuery("[placeholder]").each(function () {
        jQuery(this).attr("data-placeholder", this.placeholder);

        jQuery(this).bind("focus", function () {
            this.placeholder = '';
        });
        jQuery(this).bind("blur", function () {
            this.placeholder = jQuery(this).attr("data-placeholder");
        });
    });
    jQuery('.site-header .profile-block .profile-link').click(function (e) {
        e.stopPropagation();
        jQuery(this).closest('.profile-block').toggleClass('profile-menu-open');
    });
    jQuery('.site-header .profile-block .profile-menu a').click(function (e) {
        e.stopPropagation();

    });
    jQuery(".site-header .hambuger-menu a").click(function () {
        jQuery('html,body').toggleClass("menu-open");
    });
    jQuery('body').click(function () {
        if (jQuery('.profile-block').length) {
            jQuery('.profile-block').removeClass('profile-menu-open');
        }
    });
    jQuery('.filter-accordian .filter-heading').click(function () {
        jQuery(this).closest('.filter-block').find('.filter-content').stop(true, true).slideToggle();
        jQuery(this).closest('.filter-block').toggleClass('active');
    })

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                jQuery('.edit-profile-section .edit-profile .user-img').attr('style',"background-image:url("+e.target.result+")" );
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    jQuery(".edit-profile-section .edit-profile .btn-block input").on('change', function () {
        readURL(this);
    });
    jQuery(".form-group-row .form-col .upload-block input").click(function () {
        this.value = null;
    });
    jQuery(".form-group-row .form-col .upload-block input").on('change', function () {
        var _this = jQuery(this);
        if (_this.closest(".form-group").find(".upload-block input")[0].files.length < 1) {
            alert("Please select atleast one file")
        } else {
            jQuery.each(_this.closest(".form-group").find(".upload-block input")[0].files, function (key, value) {
                fileName = value.name;
                _this.closest('.form-group').find('.form-control').val(fileName);
            })
        }
    });

});

jQuery(window).on('load', function () {
    footerAdj();
    equalHeight();
    header_padding();
    login_wrapper_height();

});

jQuery(window).resize(function () {
    footerAdj();
    header_padding();
    login_wrapper_height();
    setTimeout(function () {
        equalHeight();
    }, 500);
});

jQuery(window).on('scroll', function () {

});