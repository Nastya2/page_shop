var SliderWidget = (function(){
    
    var _insertValues = function($this){
        var
            container = $this.closest('.filter__slider'),
            from = container.find('.filter__slider-input_from'),
            to = container.find('.filter__slider-input_to');
    var values = $this.slider('option','values');
        
        from.val(values[0]);
        to.val(values[1]);
    }
   
    return {
        init: function() {
          
        $( ".filter__slider-element").each(function(){
            var $this = $(this),
                min = parseInt($this.data('min')),
                max = parseInt($this.data('max'));
            
            
            $this.slider({
                 range: true,
                  min: min,
                  max: max,
                  values: [min, max ],
                  slide: function() {
                      _insertValues($this)
                  },
                  create : function(){
                        _insertValues($this);
                    }
                   
                  });
                });
               
}
            
        }
    
}());
            
           
            
  var ViewStateChange = (function(){
      
      var _previousClass = '';
      
      var _changeState = function($this){
          var item = $this.closest('.sort__view-item'),
              view = item.data('view'),
              listOfItems = $('#product'),
              modificatorPrefix = ' products__list_',
              classOfViewState = modificatorPrefix + view;
          
          if (_previousClass === '') {
              _previousClass = listOfItems.attr('class');
          }
          
         _changeActiveClass($this); listOfItems.attr('class',_previousClass + '' + classOfViewState);
      };
      
      var _changeActiveClass = function($this) {
          $this.closest('.sort__view-item').addClass('active')
               .siblings().removeClass('active');
      }
      return {
          init: function(){
              $('.sort__view-link').on('click',function(e){
                  e.preventDefault();
                  _changeState($(this));
              });
          }
      }
  }());

var Slideshow = (function(){
    var _changeSlide = function($this){
        var 
            container = $this.closest('.products__slideshow'),
            path = $this.find('img').attr('src'),
            display = container.find('.products__slideshow-img');
        
        $this.closest('.products__slideshow-item').addClass('active')
            .siblings().removeClass('active');
        
        display.fadeOut(function(){
            $(this).attr('src',path).fadeIn();
        });
    }
    
    return {
        init: function(){
            $('.products__slideshow-link').on('click',function(e){
                e.preventDefault();
                
                var
                   $this = $(this);
                _changeSlide($this);
            });
        }
    }
}());
$(document).ready(function(){
    ViewStateChange.init();
    
    if ($('.filter__slider-element').length){
        SliderWidget.init();
    }
    
   if ($('.products__slideshow').length) {
       Slideshow.init();
   }
   
}); 