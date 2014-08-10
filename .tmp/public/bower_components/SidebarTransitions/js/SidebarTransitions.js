(function ( $ ) {
    $.fn.SidebarTransitions = function( options ) {
 		
    	function is_touch_device() {  
		  try {
		    document.createEvent("TouchEvent");
		    return true; 
		    console.log("Touchy"); 
		  } catch (e) {  
		    return false;
		    console.log("No Touch");  
		  }  
		}

 		var settings = $.extend({
            // These are the defaults.
            container: ".st-container",
            opts: {
            	'CloseOnMouseLeave' : false,
            	'OpenOnLoad' : false
            }
        }, options );

 		var inlineOptions = typeof $(settings.container).data().options !== undefined ? $(settings.container).data().options.split(';') : [];
 		for(var option in inlineOptions){
 			//console.log(inlineOptions[option]);
 			var params = inlineOptions[option].split(':');
 			settings.opts[params[0]] = eval(params[1]);
 		}

 		var container 	= $(settings.container),

	        reset 		= $( '.closeMenu' ),
	        buttons		= Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > button' ) ),
			
			// event type (if mobile use touch events)
			eventtype	= is_touch_device() ? 'touchstart' : 'click',
			
			openMenu	= function(effect) {
				$(settings.container).addClass(effect);
				setTimeout( function() {
					$(settings.container).addClass( 'st-menu-open' );
				}, 25 );
				document.addEventListener( eventtype, bodyClickFn );
				document.addEventListener( eventtype, resetClickFn );
			},
			resetMenu 	= function() {
				container.removeClass( 'st-menu-open' );
			},
			bodyClickFn = function(evt) {
				var target = $(evt.target);
				if(target.parents('.st-menu').length){
					
				}else{
					resetMenu();
					document.removeEventListener( eventtype, bodyClickFn );
				}
			},
			resetClickFn = function(evt) {
				if (evt.target == reset) {
					resetMenu();
					document.removeEventListener( eventtype, bodyClickFn );
				}
			};
			
			if(settings.opts.CloseOnMouseLeave == true){
				$('.st-menu').mouseleave(function() {
					resetMenu();
  				});
			}

			if(settings.opts.OpenOnLoad != false){
				openMenu(settings.opts.OpenOnLoad);
			}

			$('[data-st-trigger]').on(eventtype, function(evt){
				var effect = $(this).attr( 'data-effect' );
				evt.stopPropagation();
				evt.preventDefault();
				openMenu(effect);
						

			});	
    };
 
}( jQuery ));