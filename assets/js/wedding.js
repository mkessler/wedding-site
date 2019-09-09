$(function(){
	// jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
	    if ($('.navbar').offset().top > 50) {
	        $('.navbar-fixed-top').addClass('top-nav-collapse');
	    } else {
	        $('.navbar-fixed-top').removeClass('top-nav-collapse');
	    }
	});

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
	    $('a.page-scroll').bind('click', function(event) {
	        var $anchor = $(this);
	        $('html, body').stop().animate({
	            scrollTop: $($anchor.attr('href')).offset().top - 50
	        }, 1500, 'easeInOutExpo');
	        event.preventDefault();
	    });
	});

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
	    $('.navbar-toggle:visible').click();
	});

	// Lazy Load Images
	$('.bg-lazy, .img-lazy').lazyload({
		effect: 'fadeIn',
		threshold: 500
	});

	// Venue Headers
	function measureElements(el){
		var elsHeight = 0;
		var elsHeights = [];
		el.removeAttr('style');
		el.each(function(){
			elsHeight += $(this).height();
			elsHeights.push($(this).height());
		});
		elsHeights = elsHeights.sort(function(a, b){return b-a});
		return elsHeights[0];
	}

	function equalizeLocationBoxes(){
		$('.location h3').height(measureElements($('.location h3')));
		$('.location .details > span').height(measureElements($('.location .details > span')));
	}

	equalizeLocationBoxes();

	// Initialize front end validation
	$('form').parsley();

	// Modal Datepicker
	$("#inlineDate").datepicker({
		altField: "#contact_event_date",
		hideIfNoPrevNext: true,
		minDate: 0,
		nextText: "<i class='fa fa-angle-right'></i>",
		prevText: "<i class='fa fa-angle-left'></i>",
		onSelect: function(){
			$('#contact_event_date').trigger('keyup');
			$('#inlineDate').slideUp();
		}
	});
	$('#contact_event_date').on('focus', function(){
		$('#inlineDate').slideDown();
	}).val('');

	// Modal Progress Bar
	NProgress.configure({
		parent: '.modal-body',
		showSpinner: false
	});

	// Disable buttons and links
	$('html').on('submit', 'form', function(){
		$('input[data-wd-disable]', this).attr('disabled', true);
	}).on('click', 'a[data-wd-disable]', function(){
		$(this).attr('disabled', true);
	});

	//Init wow animations
	new WOW().init();

	// Set timeline vertical bar position
	function setTimelineBar(){
		$('#timelineBarAdjustment').remove();
		var bottomPos = $('.timeline').outerHeight() - ($('.timeline-badge:last').offset().top - ($('.intro').outerHeight() + $('#story .section-header').outerHeight() + 54));
		$('head').append('<style id="timelineBarAdjustment">body.crisp .timeline:before{bottom: '+bottomPos+'px;}</style>');
	}

	//Trigger scroll to display navbar if user reloads page below the fold
	$(window).scroll();

	$(window).on('load', function(){
		setTimelineBar();
	});

	$(window).on('resize', function(){
		setTimelineBar();
		equalizeLocationBoxes();
	});
});
