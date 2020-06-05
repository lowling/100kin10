// Nav toggler
function toggleNav() {
    var element = document.getElementsByTagName('body')[0];
    element.classList.toggle('show_nav');
}

// lazyloader
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });

$(document).ready(function() {

    //Navigation
    $('nav a, ul.toc a').click(function(e){
        e.preventDefault();
        let target = $(this).attr('href');
        $(window).scrollTo($(target),1000);
        if( $(this).parent().prop('nodeName') == "NAV"){
            toggleNav();
        }
    });

    $('ul.toc a.anim').hover(
        function(){
            $(this).children('video')[0].play();
        },
        function(){
            var el = $(this).children("video")[0];
            el.pause();
            el.currentTime = 0;
        });

    
    //Section Waypoints
    /* 
    let waypoints = [];
    $('section').each( function() {
        let id = $(this).attr('class');
        if (id == undefined){
            id = $(this).attr('id')
        }
        //console.log( id );
        
        var waypoint = new Waypoint.Inview({
            element: $(this) ,
            enter: function(direction) {
                $('section').removeClass('active');
                $(this.element).addClass('active');
            } 
        });
        waypoints[id] = waypoint;
    })
    */
    $(
        `h1,h2,h3,p,li,
        .b1_section-14 .block-1 div,.b1_section-14 .block-2 div,.b1_section-14 .block-3 div, 
        .b1_section-4 .img-2,.b1_section-4 .img-3`
    )
    .onScreen({
        container: window,
        direction: 'vertical',
        toggleClass: 'active',
    });

    $('video').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function(){
            $(this)[0].play();
        }
    });

    $('.countup').onScreen({
        doIn: function(){
            var $this = $(this),
            countTo = $this.attr('data-count');
            $({ countNum: $this.text()}).animate(
                {
                    countNum: countTo
                },
                {
                    duration: 500,
                    easing:'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                }
            );  
        
        },
    });
        
});