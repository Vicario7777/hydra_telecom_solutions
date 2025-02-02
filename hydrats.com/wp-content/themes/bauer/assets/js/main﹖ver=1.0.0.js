;(function($) {
    'use strict';

    var bauerTheme = {

        // Main init function
        init : function() {
            this.config();
            this.events();
        },

        // Define vars for caching
        config : function() {
            this.config = {
                $window : $( window ),
                $document : $( document ),
            };
        },

        // Events
        events : function() {
            var self = this;

            // Run on document ready
            self.config.$document.on( 'ready', function() {

                // PreLoader
                self.preLoader();

                // Menu Search Icon
                self.searchIcon();
                
                // Cart Icon
                self.cartIcon();

                // Mobile Nav
                self.mobileNav();

                // Fix Nav
                self.fixNav();

                // One Page
                self.onePage();

                // Featured Media
                self.featuredMedia();

                // Related Post
                self.relatedPost();

                // Responsive Videos
                self.responsiveVideos();

                // Header Fixed
                self.headerFixed();

                // Scroll to Top
                self.scrollToTop();

                // Spacer
                self.widgetSpacer();

                // Mega menu
                self.megaMenu();

                // AddGridVC
                self.AddGridVC();
            } );

            // Run on Window Load
            self.config.$window.on( 'load', function() {

            } );
        },

        AddGridVC: function() {
            if ( $('body').hasClass('is-page') ) {
                var vcGrid = $('.wpb_row');

                if ( vcGrid.length == 0 ) {
                    $('#content-wrap').addClass('bauer-container');
                }
            }
        },

        // Mega Menu
        megaMenu: function() {
            $(window).on('load resize', function() {
                var 
                du = $('#main-nav .megamenu > ul'),
                siteNav = $('#main-nav'),
                siteHeader = $( '#site-header' );

                if ( du.length ) {
                    var
                    o = siteHeader.find(".bauer-container").outerWidth(),
                    a = siteNav.outerWidth(),
                    n = siteNav.css("right"),
                    n = parseInt(n,10),
                    d = o-a-n; 
                    if ( $('.site-navigation-wrap').length ) d = 0;
                    du.css({ width: o, "margin-left": -d })
                }
            });
        },

        // PreLoader
        preLoader: function() {
            if ( $().animsition ) {
                $('.animsition').animsition({
                    inClass: 'fade-in',
                    outClass: 'fade-out',
                    inDuration: 1500,
                    outDuration: 800,
                    loading: true,
                    loadingParentElement: 'body',
                    loadingClass: 'animsition-loading',
                    timeout: false,
                    timeoutCountdown: 5000,
                    onLoadEvent: true,
                    browser: [
                        '-webkit-animation-duration',
                        '-moz-animation-duration',
                        'animation-duration'
                        ],
                    overlay: false,
                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function(url){ window.location.href = url; }
                });
            }
        },

        // Menu Search Icon
        searchIcon: function() {
            var search_wrap = $('.search-style-fullscreen');
            var search_trigger = $('.header-search-trigger');
            var search_field = search_wrap.find('.search-field');

            search_trigger.on('click', function(e) {
                if ( ! search_wrap.hasClass('search-opened') ) {
                    search_wrap.addClass('search-opened');
                    search_field.get(0).focus();

                } else if (search_field.val() == '') {
                    if ( search_wrap.hasClass('search-opened') )
                        search_wrap.removeClass('search-opened');
                    else search_field.get(0).focus();

                } else {
                     search_wrap.find('form').get(0).submit();
                }

                $('html').addClass( 'disable-scroll' );
                e.preventDefault();
                return false;
            });

            search_wrap.find('.search-close').on('click', function(e) {
                search_wrap.removeClass('search-opened');
                $('html').removeClass( 'disable-scroll' );
                e.preventDefault();
                return false;
            });
        },

        // Menu Cart Icon
        cartIcon: function() {
            $( document ).on( 'woocommerce-cart-changed', function( e, data ) {
                if ( parseInt(data.items_count,10) >= 0 ) {
                    $('.shopping-cart-items-count')
                        .text( data.items_count )
                }
            } );
        },

        // Mobile Navigation
        mobileNav: function() {

            var menuType = 'desktop';

            $(window).on('load resize', function() {
                var
                mode = 'desktop',
                wrapMenu = $('#site-header-inner .wrap-inner'),
                navExtw = $('.nav-extend'),
                navExt = $('.nav-extend').children('.ext').filter(':not(".menu-logo")'),
                navLogo = $('.nav-extend').children('.menu-logo');

                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                    mode = 'mobile';

                if ( mode != menuType ) {
                    menuType = mode;

                    if ( mode == 'mobile' ) {

                        if ( $('#main-nav').length ) {
                            $('.mobile-button').show();

                            $('#main-nav').attr('id', 'main-nav-mobi')
                                .appendTo('body')
                                .children('.menu').prepend(navLogo).append(navExt)
                                    .find('li:has(ul)')
                                    .children('ul')
                                        .removeAttr('style')
                                        .hide()
                                        .before('<span class="arrow"></span>');
                        }

                    } else {

                        $('.mobile-button').removeClass('hide');
                        $('html').removeClass( 'disable-scroll' );
                        $( '.mobi-overlay' ).removeClass('show');
                        $('.mobile-button').hide();

                        if ( $('body').is('.header-style-5, .header-style-6') )
                            wrapMenu = $('.site-navigation-wrap > .inner');

                        $('#main-nav-mobi').attr('id', 'main-nav')
                            .removeAttr('style')
                            .appendTo(wrapMenu)
                                .find('.ext').appendTo(navExtw)
                            .parent().siblings('#main-nav')
                                .find('.sub-menu')
                                    .removeAttr('style')
                                .prev().remove();
                    }
                }
            });

            // Close mobi-menu when clicking on overlay
            $('.mobi-overlay').on('click', function() {
                $('.mobile-button').removeClass('hide');
                $(this).removeClass('show');
                $("#main-nav-mobi").animate({ left: "-300px" }, 300, 'easeInOutExpo');
                $('html').removeClass( 'disable-scroll' );

            } );

            // Show mobi-menu when clicking on mobi-button
            $(document).on('click', '.mobile-button', function() {
                $('.mobile-button').addClass('hide');
                $( '.mobi-overlay' ).addClass('show');
                $("#main-nav-mobi").animate({ left: "0"}, 300, 'easeInOutExpo');
                $('html').addClass( 'disable-scroll' );
            })

            $(document).on('click', '#main-nav-mobi .arrow', function() {
                $(this).toggleClass('active').next().stop().slideToggle();
            })
        },

        fixNav: function() {
            var
            nav = $('#main-nav'),
            wNav = $('.widget_nav_menu'),
            docW = $(window).width(),
            c = $('#site-header-inner'),
            cl = c.offset().left,
            cw = c.width();

            if ( nav )
                nav.find('.sub-menu').each(function() {
                var
                off = $(this).offset(),
                l = off.left,
                w = $(this).width(),
                il = l - cl,
                over = ( il + w >= cw );

                if ( over )
                    $(this).addClass('left');

                })

            if ( wNav.size() != 0 )
                wNav.find('a:empty')
                    .closest('li').remove();
        },

        // One Page
        onePage: function() {
            $('#menu-one-page li').filter(':first').addClass('current-menu-item');

	        $('#menu-one-page li a').on('click',function() {
	            var anchor = $(this).attr('href').split('#')[1];

	            if ( anchor ) {
	                if ( $('#'+anchor).length > 0 ) {
	                    var headerHeight = 0;

	                    if ( $('body').hasClass('header-sticky') )
	                        headerHeight = $('#site-header').height();

	                    var target = $('#' + anchor).offset().top - headerHeight;

	                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
	               }
	            }
	            return false;
	        });

            $(window).on("scroll", function() {
                var scrollPos = $(window).scrollTop();

                $('#menu-one-page li a').each(function () {
                    var link = $(this);
                    var block = $( link.attr("href") );
                    if ( block.offset().top <= scrollPos 
                        && block.offset().top + block.height() > scrollPos ) {
                        $('#menu-one-page li').removeClass("current-menu-item");
                        link.parent().addClass("current-menu-item");
                    } else {
                        link.parent().removeClass("current-menu-item");
                    }
                });
            });
        },

        // Responsive Videos
        responsiveVideos: function() {
            if ( $().fitVids ) {
                $('.bauer-container').fitVids();
            }
        },

        // Header Fixed
        headerFixed: function() {
            if ( $('body').hasClass('header-fixed') ) {
                var nav = $('#site-header');

                if ( $('body').is('.header-style-5, .header-style-6') )
                    nav = $('.site-navigation-wrap');

                if ( nav.length ) {
                    var
                    offsetTop = nav.offset().top,
                    headerHeight = nav.height(),
                    injectSpace = $('<div />', {
                        height: headerHeight
                    }).insertAfter(nav);

                    $(window).on('load scroll', function(){
                        if ( $(window).scrollTop() > offsetTop ) {
                            nav.addClass('fixed-hide');
                            injectSpace.show();
                        } else {
                            nav.removeClass('fixed-hide');
                            injectSpace.hide();
                        }

                        if ( $(window).scrollTop() > 500 ) {
                            nav.addClass('fixed-show');
                        } else {
                            nav.removeClass('fixed-show');
                        }
                    })
                }
            }     
        },

        // Scroll to Top
        scrollToTop: function() {
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 800 ) {
                    $('#scroll-top').addClass('show');
                } else {
                    $('#scroll-top').removeClass('show');
                }
            });

            $('#scroll-top').on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
            });
        },

        // Featured Media
        featuredMedia: function() {
            if ( $().slick ) {
                $('.blog-gallery').slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    fade: true,
                    cssEase: 'linear'
                });
            }
        },

        // Related Post
        relatedPost: function() {
            if ( $().slick ) {
                $('.related-post').slick({
                    dots: false,
                    arrows: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                    ]
                });
            }
        },

        // Widget Spacer
        widgetSpacer: function() {
            $(window).on('load resize', function() {
                var mode = 'desktop';

                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                    mode = 'mobile';

                $('.spacer').each(function(){
                    if ( mode == 'mobile' ) {
                        $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                    } else {
                        $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                    }
                })
            });
        },

    }; // end bauerTheme

    // Start things up
    bauerTheme.init();

})(jQuery);