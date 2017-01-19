(function($){
    "use strict";

    $(document).on('ready', function(){
        var $elem = $('#hero'),
            $textRotator = $('.text-rotator', $elem),
            totalItems = $('.item', $textRotator).length,
            currentIndex = 0,
            time = 5; // Time in seconds
        
        var $progressBar,
            $bar,
            $pagination,
            $pageNumber,
            $number,
            tick, 
            percentTime,
            i;
            
        $(window).smartload(function(){
            textRotator(); 
            
            $('.rotator-pagination', $textRotator).find('.page').click(function(){
                currentIndex = $('.page', $textRotator).index($(this));
                slide(currentIndex);
            });
        });
        
        function textRotator(){
            buildPagination();
            buildPageNumber();
            buildProgressBar();
            start();
        }
        
        function buildPagination(){
            $pagination = $('<div>', {class: 'rotator-pagination'});
            $pagination.prependTo($textRotator);
            
            for (i = 0; i < totalItems; i++) { 
                $('<span class="page"></span>').appendTo($pagination, $textRotator);
            }
            
            $($pagination).find('.page:first-child').addClass('active');
        }
        
        function buildPageNumber()
        {
            $pageNumber = $('<div>', {class: 'rotator-page-number'});
            $number = $('<div>', {class: 'number'});
            
            $number.prependTo($pageNumber.appendTo($textRotator));
            
            for (i = 0; i < totalItems; i++) { 
                $('<span class="current-index"></span>').appendTo($number, $textRotator);
                $($pageNumber).find('.current-index:eq(' + i + ')').text('0' + (i + 1));
            }
            
            $($pageNumber).find('.current-index:first-child').addClass('active');
            $('<span class="total-items"></span>').appendTo($number, $textRotator);
            $($pageNumber).find('.total-items').text('/0' + totalItems);
        }
        
        function buildProgressBar(){
            $progressBar = $('<div>', {class: 'rotator-progress-bar'});
            $bar = $('<div>', {class: 'rotator-bar'});
            
            $progressBar.append($bar).prependTo($textRotator);
        }
         
        function start(){
            // Reset timer
            percentTime = 0;
            
            // Run interval every 0.01 second
            tick = setInterval(interval, 10);
        };
        
        function interval(){
            percentTime += 1 / time;
                
            $($bar, $textRotator).css({
                width: percentTime + '%'
            });

            // If percentTime is equal or greater than 100
            if(percentTime >= 100){
                if(currentIndex < totalItems - 1){
                    currentIndex = currentIndex += 1;
                }
                else{
                    currentIndex = 0;
                }
                
                slide(currentIndex);
            }
        }
        
        function slide(currentIndex){
            // Pagination
            $('.rotator-pagination').find('.page').removeClass('active');
            $('.rotator-pagination').find('.page:eq(' + currentIndex + ')').addClass('active');
            
            // Page number
            $('.rotator-page-number', $textRotator).find('.current-index').removeClass('active');
            $('.rotator-page-number', $textRotator).find('.current-index:eq(' + currentIndex + ')').addClass('active animated zoomIn');
            
            // Item
            $('.text-rotator-item', $textRotator).find('.item').removeClass('active');
            $('.text-rotator-item', $textRotator).find('.item:eq(' + currentIndex + ')').addClass('active animated bounceIn');
            
            restart();
        }
        
        // Restart callback
        function restart(){
          // Clear interval
          clearTimeout(tick);
          
          // Start again
          start();
        } 
    });
})(jQuery);