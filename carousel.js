/* 
------------------------------------------|
------------------------------------------|
Module: Basic Responsive Carousel.
Author: Michalis Tsougkranis.
Technique: Module-Pattern.
-------------------------------------------|
-------------------------------------------|
*/
(function($,window, document, undefined ) { 
  var rCarousel = {
      viewPortWidth:parseInt($( window ).width()),
      nodeWidth :$('.carousel').width(),
      nodeHeight :$('.carousel').height(),
      carousel : $('.carousel'),
      carouselUl : $('.carousel > ul'),
      carouselUlLi : $('.carousel > ul li'),
      carouselUlLiFirts : $('.carousel > ul li:first'),
      carouselUlLiLast : $('.carousel > ul li:last'),
      animationVelocity : 1000,
      timeout: 0,

      init : function () {//Initialiaze carousel
        rCarousel.initializeCarousel();
        rCarousel.trigerFunctionality();
      },
      trigerFunctionality: function(){//Triger functionality
          rCarousel.clickPrev();
          rCarousel.clickNext();
          rCarousel.windowResize();
      },
      initializeCarousel: function(){
        rCarousel.appendArrows(); //append navigation arrows
        rCarousel.setCarouselUlWidth();// set carousel Ul dimentions
        rCarousel.setCarouselLiDim();//set carousel Li dementions 
        rCarousel.setFirstLastClasses();//set First Last Class             
      },
      clickPrev: function(){
        $('.prev').click(function(){//Prev Click 
          if (rCarousel.timeout==0 ){
              if(!(rCarousel.isFirst() == 'firstActive')){
                  rCarousel.executePrevSlide();
              } 
          }
        });
      },
      windowResize: function(){
        $( window ).resize(function() { //recalculate dimentions and margins
          rCarousel.setCarouselLiDim();
          rCarousel.onResizeRecalculateUlMargin();      
        });
      },
      clickNext: function(){
         $('.next').click(function(){ //Next Click 
          if (rCarousel.timeout==0 ){ 
              if(!(rCarousel.isLast() == 'lastActive')){
                  rCarousel.executeNextSlide();
              }
          }
        });        
      },
      executeNextSlide: function(){
          rCarousel.timeout = 1; 
          rCarousel.setNextActive();
          rCarousel.slideNext(); //slide Next
      },
      executePrevSlide: function(){
          rCarousel.timeout = 1; 
          rCarousel.setPrevActive();
          rCarousel.slidePrev(); //slide Prev  
      },
      setCarouselLiDim : function(){ // set LI Width
        rCarousel.carouselUlLi.css('width', rCarousel.carousel.width());
      },

      setCarouselUlWidth : function(){ // set UL Dimentions
        rCarousel.carouselUl.css('width',  rCarousel.nodeNumber() * 200+"%");
      },
      setFirstLastClasses : function(){//initialize class's
        rCarousel.carouselUlLiFirts.addClass('first');
        rCarousel.carouselUlLiFirts.addClass('active');
        rCarousel.carouselUlLiLast.addClass('last');
      },
      isLast: function(){
        if($('.last').hasClass('active'))
          {return  'lastActive';}
      },
      isFirst: function(){
        if($('.first').hasClass('active'))
          {return  'firstActive';}
      },      
      nodeNumber : function(){ // returns the number of list items
        var i=0;
        rCarousel.carouselUlLi.each(function(){
          i++;
        });
        return i;
      }, 
      appendArrows: function(){//appends navigation arrows
        rCarousel.carousel.append('<div class="nav-arrows"><ul><li class="prev">prev</li> <li class="next">next</li> </ul></div>');
      },
      slideNext : function(){// Slide Left
        rCarousel.carouselUl.animate({ marginLeft:(parseInt(rCarousel.carouselUl.css('marginLeft'))-parseInt(rCarousel.carouselUlLi.css('width')))},{duration: rCarousel.animationVelocity, complete:function(){ rCarousel.timeout = 0;}});
      },
      setNextActive: function(){ //set next active
        var activeNode = $('.carousel ul li.active');
        if(!activeNode.hasClass('last')){
            activeNode.removeClass('active').next().addClass('active');
            return 1;
        }
        return 0;
      },
      slidePrev : function(){// Slide Prev
        rCarousel.carouselUl.animate({ marginLeft:(parseInt(rCarousel.carouselUl.css('marginLeft'))+parseInt(rCarousel.carouselUlLi.css('width')))},{duration: rCarousel.animationVelocity, complete:function(){ rCarousel.timeout = 0;}});
      },
      setPrevActive: function(){ // set perv active
        var activeNode = $('.carousel ul li.active');
        if(!activeNode.hasClass('first')){
          activeNode.removeClass('active').prev().addClass('active');
            return 1;
        }
        return 0;
      },  
      onResizeRecalculateUlMargin : function(){//reset UL margin on window resize
        if(!$('.carousel ul li.first').hasClass('active')){
          rCarousel.carouselUl.css('marginLeft', - rCarousel.carousel.width()*rCarousel.returnNumerOfActiveNode());
     
        }       console.log(rCarousel.returnNumerOfActiveNode());
      },
      returnNumerOfActiveNode : function(){//return's the the nth active LI
        var n=0;
        $('.carousel > ul li').each(function(){   
        n++; 
        if($(this).hasClass('active')){     
             return false;
          }
        });
        return n-1;
      }
  }
  $(function() {//execute carousel
    rCarousel.init();
  });
})( jQuery, window, document);
