/* global skrollr, Chartist, Pace */

(function($){
    "use strict";

    /*
     * Preloader init. Requires jpreLoader.
     */

    if ($.fn.jpreLoader){
        $('body').jpreLoader({
            showPercentage: false,
            splashID: "#jSplash",
            loaderVPos: '80%',
            splashVPos: '20%',
            closeBtnText: ''
        });
    }
    
    
    
    /*
     * Preloader pace js init. Requires pace js.
     */
    
    if (typeof Pace !== 'undefined'){
        Pace.on('done', function(){
            $('.pace-preloader').fadeOut();
        });
    }
    
    
    
    $(document).ready(function(){
        
        /*
         * Detect mobile device.
         * Source: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
         */
        
        var isMobile = {
            Android: function(){
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function(){
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function(){
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function(){
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function(){
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function(){
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        
        
        
        /*
         * Parallax init. Requires skrollr js.
         */ 
        
        $(window).smartload(function(){
            if (! isMobile.any()){
                skrollr.init({
                    forceHeight: false
                });
            }
        });
        
        
        
        /*
         * Bootstrap scrollspy.
         */
        
        var $body = $('body'),
            ww = Math.max($(window).width(), window.innerWidth);
        
        $(window).smartload(function(){
            $body.scrollspy({    
                target: '#navigation',
                offset: ww > 992 ? $('.border-site.bs-top').height() : $('.nav-trigger').height()
            });
        });
        
        $(window).smartresize(function(){
            var dataScrollSpy = $('body').data('bs.scrollspy'),
                ww = Math.max($(window).width(), window.innerWidth),
                offset = ww > 992 ? $('.border-site.bs-top').height() : $('.nav-trigger').height();
        
            dataScrollSpy.options.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');
        });
        
        
        
        /*
         * Page scrolling feature, requires jQuery easing.
         */
        
        $(window).smartload(function(){
            pageScroll();
        });
        
        $(window).smartresize(function(){
            pageScroll();
        });
        
        function pageScroll(){
            $('.page-scroll > a').bind('click', function(e){
                var ww = Math.max($(window).width(), window.innerWidth),
                    anchor = $(this),
                    href = anchor.attr('href'),
                    offset = ww > 992 ? $('.border-site.bs-top').height() : $('.nav-trigger').height();

                $('html, body').stop().animate({
                    scrollTop: $(href).offset().top - (offset - 1)
                }, 1000, 'easeInOutExpo');
                
                $('#navigation').fadeOut('fast');
                
                e.preventDefault();
            });
        };
        
        
        
        /*
         * Show & hidden navigation.
         */
        
        var $navigation = $('#navigation');
        
        $('.nav-trigger-open').click(function(){
            $navigation.fadeIn('fast');
        });
        
        $('.nav-trigger-close').click(function(){
            $navigation.fadeOut('fast');
        });
        
        
        
        /*
         * Section profile - gauge chart, requires chartist js.
         */
        
        var $profile = $('.profile'),
            $profileChart = $('.profile-chart'),
            $ctChartWrapper = $('<div>', {class: 'ct-chart-wrapper'}),
            $ctChart = $('<div>', {class: 'gauge-chart-graph ct-chart ct-square'}),
            ctSeries = [],
            ctTotal = 0,
            ctPercent;
        
        $ctChartWrapper.appendTo($profile);
        $ctChart.appendTo($ctChartWrapper);
        
        $profileChart.find('.item').each(function(){
            ctPercent = $('span', $(this)).data('percent');
            ctSeries.push(ctPercent);
            ctTotal += (ctPercent * 2);
            $('<span class="percent font-family-alt text-uppercase"></span>').prependTo($(this));
            $('.percent', $(this)).text(ctPercent + '%.');
        });
        
        if ($profileChart.length > 0){
            $(window).smartload(function(){
                new Chartist.Pie('.gauge-chart-graph', {
                    series: ctSeries
                }, {
                    donut: true,
                    donutWidth: 60,
                    startAngle: 180,
                    total: ctTotal,
                    showLabel: false
                });
            });
        }
        
        
        
        /*
         * Section studio - gallery carousel, requires flickity.
         */
        
        $(window).smartload(function(){
            var $carousel = $('.gallery-carousel'),
                $carouselNav = $('.gallery-nav', $carousel);
            
            $carousel.flickity({
                cellSelector: '.gallery-cell',
                draggable: false,
                freeScroll: true,
                pageDots: false,
                prevNextButtons: false,
                wrapAround: true
            });
            
            $carouselNav.find('.nav-previous').click(function(){
                $carousel.flickity('previous');
            });
            
            $carouselNav.find('.nav-next').click(function(){
                $carousel.flickity('next');
            });
        });
        
        
        
        /*
         * 8. Testimonial slider, requires flexslider.
         */
        
        $(window).smartload(function(){
            var $testimonialSlider = $('.testimonial-slider'),
                $testimonialSliderNav = $('.testimonial-slider-nav', $testimonialSlider);
            
            $testimonialSlider.flexslider({
                controlNav: false,
                directionNav : false,
                selector: '.slides > .item',
                slideshowSpeed: 4000,
                slideshow: false
            });
            
            $testimonialSliderNav.find('i.nav-previous').click(function(){
                $testimonialSlider.flexslider('prev');
            });
            
            $testimonialSliderNav.find('i.nav-next').click(function(){
                $testimonialSlider.flexslider('next');
            });
        });
        
        
        
        /*
         * Section stats - area chart, requires chartist js.
         */
        
        var $areaChart = $('#area-chart'),
            $areaChartData = $('.area-chart-data', $areaChart),
            $areaChartDataLabels = $('.area-chart-label', $areaChartData),
            $areaChartDataSeries = $('.area-chart-series', $areaChartData),
            $areaChartGraph = '.area-chart-graph',
            areaChartDataLabels = [],
            areaChartDataSeries = [],
            areaChartLegend = [];
        
        if ($areaChartData.length > 0){
            buildAreaChartData();
            buildAreaChartLegend();

            $(window).smartload(function(){
                buildAreaChart();
            });
        }
        
        function buildAreaChartData(){
            $areaChartDataLabels.find('span').each(function(){
                areaChartDataLabels.push($(this).text());
            });

            $areaChartDataSeries.find('.series').each(function(i){
                var dataSeries = [];

                $(this).find('span').each(function(){
                    dataSeries.push(parseInt($(this).text()));
                });

                areaChartDataSeries.push(dataSeries);
                areaChartLegend.push($(this).data('legend'));
            });
        }
        
        function buildAreaChartLegend(){
            var $legendUl = $('<ul>', {class: 'legend list-inline list-unstyled text-center text-uppercase'});
            $legendUl.prependTo($areaChart);
            
            for(var i = 0; i <= areaChartLegend.length - 1; i++){
                var $legendLi = $('<li>'),
                    $legendSpan = $('<span>', {class: 'display-inline-block font-family-alt text-small'});
            
                $legendSpan.appendTo($legendLi.appendTo($legendUl));
                $legendSpan.text(areaChartLegend[i]);
            }
        }
        
        function buildAreaChart(){
            var data = {
                labels: areaChartDataLabels,
                series: areaChartDataSeries
            };

            var options = {
                axisX: {
                    showGrid: false
                },
                axisY: {
                    showGrid: false,
                    showLabel: false
                },
                chartPadding: {
                    right: 60
                },
                fullWidth: true,
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                showArea: true,
                showLine: false,
                showPoint: false
            };

            var responsiveOptions = [
                ['screen and (min-width: 640px) and (max-width: 1279px)', {
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value.substr(0, 3);
                        }
                    }
                }],
                ['screen and (max-width: 639px)', {
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value.substr(0, 1);
                        }
                    }
                }]
            ];

            new Chartist.Line($areaChartGraph, data, options, responsiveOptions);
        }
    });
})(jQuery);