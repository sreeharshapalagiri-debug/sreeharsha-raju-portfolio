/************* Main Javasript ************************

    Template Name: Adrian - Personal Portfolio Template
    Author: cosmos-themes
    Version: 2.0
    Copyright 2018

****************************************/



'use strict';

$(window).on('load', function () {

    // NAVBAR SMOOTH SCROLL
    var sections = $('section'),
        nav = $('nav'),
        nav_height = nav.outerHeight();

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 500);
        return false;
    });
    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });


    // PORTFOLIO ISOTOPE - Disabled (using tab switching instead)
    // if ($('.portfolio-items').length) {
    //     var $elements = $('.portfolio-items');
    //     $elements.isotope();

    //     $('.portfolio-filter ul li').on('click', function () {
    //         $('.portfolio-filter ul li').removeClass('sel-item');
    //         $(this).addClass('sel-item');
    //         var selector = $(this).attr('data-filter');
    //         $(".portfolio-items").isotope({
    //             filter: selector,
    //             animationOptions: {
    //                 duration: 750,
    //                 easing: 'linear',
    //                 queue: false,
    //             }
    //         });
    //     });
    // }
});

$(document).ready(function () {

    // WOW JS
    new WOW({
        mobile: false
    }).init();

    // Banner Height
    function bannerHeight() {
        var banner = $("#banner");
        banner.css({
            "height": $(window).height() + "px"
        });
    }
    bannerHeight();

    $(window).resize(bannerHeight);

    // NAVBAR TRANSPARENT-DARK
    $(window).scroll(function () {
        var $window = $(window),
            logo = $('.navbar .navbar-brand img');

        var win_height = $window.height() / 2;
        if ($window.scrollTop() >= win_height) {
            $('.navbar').removeClass('navbar-dark')
                .addClass('bg-light')
                .addClass('navbar-scroll-fixed')
                .addClass('navbar-light');
            logo.attr('src', 'images/logo/logo-dark.png');
        } else {
            $('.navbar').removeClass('navbar-scroll-fixed')
                .removeClass('navbar-light')
                .addClass('navbar-dark')
                .removeClass('bg-light');
            logo.attr('src', 'images/logo/logo.png');
        }
    });

    // Background Image
    $("[data-bg-image]").each(function () {
        var $this = $(this);
        $this.css("background-image", "url(" + $this.attr("data-bg-image") + ")");
    });

    //Animate progress-bar in About me section
    $(".progress").each(function () {
        var $this = $(this);
        $this.find(".ts-progress-value").text($this.attr("data-progress-width"));
        if (typeof $.fn.isInViewport === "function") {
            $this.isInViewport(function (status) {
                if (status === "entered") {
                    $this.find(".progress-bar").width($this.attr("data-progress-width"));
                    $this.find(".ts-progress-value").css("left", $this.attr("data-progress-width"));
                }
            });
        }
    });

    // MAGNIFIC POPUP FOR PORTFOLIO
    $('.single-item a').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        zoom: { enabled: true, duration: 250 }
    });

    // HOME TYPED JS
    if ($('#typed').length) {
        var typed = new Typed('#typed', {
            stringsElement: '#typed-strings',
            smartBackspace: true,
            loop: true,
            typeSpeed: 30,
            backSpeed: 20,
            backDelay: 3000
        });
    }

});

// CONTACT FORM JS
(function ($) {
    'use strict';

    // Form handler is now in index.html for Vercel integration

    $(".con-validate").keyup(function () {
        $(this).removeClass('con-error');
    });

    //Safari Background Attachment Bug Fixed
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        $("#banner, .blog-banner").css("background-attachment", "scroll");
    }

})(jQuery);

