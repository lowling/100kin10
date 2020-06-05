function toggleNav() {
    var element = document.getElementsByTagName('body')[0];
    element.classList.toggle('show_nav');
  }

$(document).ready(function() {

    //
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
        .b1_section-4 .img-2,.b1_section-4 .img-3,
        .b1_section-1_logo_img`
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