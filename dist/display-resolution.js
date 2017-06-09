/*
 * Display Resolution v1.1.1
 * http://webgadgets.net/plugins/display-box-resolution
 *
 * Copyright 2017, WebGadgets
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2017-04-03
 */
jQuery.wgDisplayResolution = function (options) {
    // default settings:
    var defaults = {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        debug: true,
        responsive: {
            0: {
                resolutionName: "Extra small devices"
            },
            576: {
                resolutionName: "Small devices"
            },
            768: {
                resolutionName: "Medium devices"
            },
            992: {
                resolutionName: "Large devices"
            },
            1200: {
                resolutionName: "Extra large devices"
            }
        }
    };
    var settings = $.extend({}, defaults, options);

    var el = this;

    el.init = function () {
        $('body').prepend('<div id="wgDisplayResolution"><div class="viewport"></div><div class="resolutionName"></div></div>');
    };

    el.init();

    checkResponsive();
    setup(el, true);
    $(window).on("resize", function (e) {
        checkResponsive();
        setup(el, false);
    });


    function checkResponsive() {
        var responsive_obj = settings.responsive;
        if (Object.keys(responsive_obj).length !== 0) {

            var windowW = $(window).width();
            var breakpoint = null;
            $.each(responsive_obj, function (key, value) {
                if (windowW > key) {
                    breakpoint = key;
                }
            });

            if (breakpoint !== null) {
                settings = $.extend({}, settings, options);

                if (options !== undefined && options.responsive !== undefined) {
                    settings = $.extend({}, settings, options.responsive[breakpoint]);
                } else {
                    settings = $.extend({}, settings, settings.responsive[breakpoint]);
                }
            } else {
                settings = $.extend({}, settings, options);
            }
        }
    }
    function setup(this_e, refresh) {
        console.log(settings);
        if (settings.debug === true) {
            if (settings.bottom === 'auto' && settings.top === 'auto' && settings.left === 'auto' && settings.right === 'auto') {
                settings.top = 0;
                settings.left = 0;
            }
            $('#wgDisplayResolution').css({
                top: settings.top,
                bottom: settings.bottom,
                left: settings.left,
                right: settings.right,
                position: 'fixed',
                'background-color': 'rgba(255,255,255,.75)',
                border: '1px solid #999',
                'font-family': 'arial',
                'font-size': '13px',
                padding: '5px',
                'line-height': '1',
            });
                var window_width = $(window).width();
                var window_height = $(window).height();

                console.log(settings.resolutionName);
                $('#wgDisplayResolution .viewport').html(window_width + ' x ' + window_height);
                $('#wgDisplayResolution .resolutionName').html(settings.resolutionName);

        }
    }
};