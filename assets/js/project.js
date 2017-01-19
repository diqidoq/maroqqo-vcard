(function($){
    "use strict";

    $(document).on('ready', function(){
    
        /*
         * Project filtering. Requires isotope.
         */
        
        var $project = $('.projects'),
            $projectNav = $('.project-nav');
        
        $(window).smartload(function(){
            isotopeProject('*');
            
            $projectNav.find('a').click(function(e){ 
                var selector = $(this).data('filter');

                $projectNav.find('li').removeClass('active');
                $(this).parent('li').addClass('active');
                isotopeProject(selector);

                e.preventDefault();
            });
        });
        
        function isotopeProject(filter){
            $project.isotope({ 
                filter: filter, 
                animationOptions: { 
                    duration: 750, 
                    easing: 'linear', 
                    queue: false
                }
            });
            
            var $filteredItems = $project.isotope('getFilteredItemElements'),
                $lastItem = $($filteredItems).last();
        
            $project.find('.item').removeClass('filtered-item last-item');
            $($filteredItems).addClass('filtered-item');
            $lastItem.addClass('last-item');
        };
        
        
        
        /*
         * Project preview. Requires magnific popup.
         */
        
        // Define data for the popup
        var projectData = [];
        
        $project.find('.item').each(function(i){
            projectData[i] = {
                src: $(this).data('project-img'),
                projectTitle: $(this).data('project-title'),
                projectAbout: $(this).data('project-about'),
                projectLink_href: $(this).data('project-link')
            };
        });
        
        $project.find('.item').each(function(i){
            // Initalize popup
            $(this).magnificPopup({ 
                key: 'project-preview',
                items: projectData,
                index: i,
                removalDelay: 150,
                fixedContentPos: false,
                tLoading: '',
                type: 'image',
                image: {
                    // Define markup.
                    markup: '<div class="project-preview mfp-with-anim">' +
                                '<div class="mfp-figure">' +
                                    '<div class="mfp-img"></div>' +
                                    '<div class="mfp-preloader"></div>' +
                                '</div>' +

                                '<div class="mfp-projectDetail">' +
                                    '<div class="mfp-projectTrigger">' +
                                        '<div class="mfp-triggerBtn"><i class="icon-To-Top"></i></div>' +
                                        '<div class="mfp-projectTitleWrap">' +
                                            '<div class="display-table-cell vertical-align-middle">' +
                                                '<span class="display-block font-family-alt letter-spacing-1 text-small text-uppercase">Project</span>' +
                                                '<a class="mfp-projectLink display-inline-block font-weight-700 text-small text-uppercase" target="_blank">' +
                                                    '<div class="mfp-projectTitle"></div>' +
                                                '</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="mfp-projectAboutWrap">' +
                                        '<div id="scrollbar-project-preview" class="inner-content">' +
                                            '<div class="scrollbar">' +
                                                '<div class="track">' +
                                                    '<div class="thumb"><div class="end"></div></div>' +
                                                '</div>' +
                                            '</div>' +

                                            '<div class="viewport">' +
                                                '<div class="overview">' +
                                                    '<h3 class="display-inline-block font-family-alt text-extra-large text-uppercase title-underline">About</h3>' +
                                                    '<div class="mfp-projectAbout font-family-alt text-large"></div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="mfp-triggerClose text-center">' +
                                        '<span class="font-family-alt letter-spacing-2 text-uppercase text-extra-large text-white">Close Project</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                },
                gallery: {
                    enabled: true 
                },
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = 'mfp-zoom-in';
                        $('body').css('overflow-y', 'hidden');
                    },
                    open: function() {
                        // Open & close project project detail
                        $('.mfp-triggerBtn').click(function(){
                            $('.mfp-projectDetail').toggleClass('is-open');
                            $(this).toggleClass('trigger-close');
                        });

                        // Project preview scrollbar
                        $('#scrollbar-project-preview').tinyscrollbar();

                        // Close project preview
                        $('.mfp-triggerClose').click(function(){
                            $.magnificPopup.close();
                        });
                    },
                    beforeClose: function() {
                        $('body').css('overflow-y', 'scroll');
                    },
                    close: function() {
                        $('.mfp-projectDetail').removeClass('is-open');
                        $('.mfp-triggerBtn').removeClass('trigger-close');
                    }
                }
            });
        });     
    });
})(jQuery);