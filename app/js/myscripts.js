$(document).ready(function() {
	let firstSlider  		  = $('.first-slider'),
		secondSlider 		  = $('.second-slider'),
		firstSliderArrowPrev  = '.first-slider__arrow-prev',
		firstSliderArrowNext  = '.first-slider__arrow-next',
		secondSliderArrowPrev = '.second-slider__arrow-prev',
		secondSliderArrowNext = '.second-slider__arrow-next',
		heightTextSectionMain = $('.text-section-main').height(),
		textSectionMain 	  = $('.text-section-main');

	const galleryArrows = function (slider, arrowPrev, arrowNext) {
		$(document).on('click', arrowPrev, function(){
	        slider.slick('slickPrev');
	        return false;
	    });
	    $(document).on('click', arrowNext, function(){
	        slider.slick('slickNext');
	        return false;
	    });
	};

	const hideTextSectionMain = function() {
		textSectionMain.addClass('hidden');
	}

	firstSlider.slick({
		arrows: false,
		dots: true,
		autoplay: true
	});

	secondSlider.slick({
		arrows: false,
		dots: false,
		draggable: false,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: true
	});

	galleryArrows(firstSlider, firstSliderArrowPrev, firstSliderArrowNext);
	galleryArrows(secondSlider, secondSliderArrowPrev, secondSliderArrowNext);

	$(document).on('click', '.header-nav-list-item:not(.active)', function() {
		$(this).siblings('.header-nav-list-item').removeClass('active');
		$(this).addClass('active');

		let a = $(this).index('.header-nav-list-item');
		$('.header-nav-list-item-ul').eq(a).addClass('active').siblings('.header-nav-list-item-ul').removeClass('active');
	});

	$(document).on('click', '.header-nav-search-bar', function(e){
		if ($(e.target).closest('.header-nav-search-bar_wrapper').length) {
			$(this).closest('.header-nav-search-bar_wrapper').addClass('active');
			$(this).find('.header-nav-search-bar__search-input').addClass('active');
			$(this).addClass('active');
			$('.header-nav-list').addClass('active');
			$('.header-nav-list-item').removeClass('active');
			$('.header-nav-list-item-ul').removeClass('active');
		};
	});

	$(document).on('click', function(e){
		if (!$(e.target).closest('.header-nav-search-bar_wrapper').length) {
			$('.header-nav-search-bar').closest('.header-nav-search-bar_wrapper').removeClass('active');
			$('.header-nav-search-bar').find('.header-nav-search-bar__search-input').removeClass('active');
			$('.header-nav-search-bar').removeClass('active');
			$('.header-nav-list').removeClass('active');
		};
	});

	$(document).on('click', function(e){
		console.log($(e.target).closest('.header-nav-list-item-ul.active').length );
		console.log($(e.target).closest('.header-nav-list-item').length);
		if(!$(e.target).closest('.header-nav-list-item-ul.active').length && !$(e.target).closest('.header-nav-list-item').length) {
			$('.header-nav-list-item-ul.active').removeClass('active');
			$('.header-nav-list-item').removeClass('active');
		}
	});

	$(document).on('click', '.card-item-row-colors__color:not(.active)', function(){
		$(this).siblings('.card-item-row-colors__color').removeClass('active');
		$(this).addClass('active');
	});

	$('.card-item').hover(function() {
		$(this).addClass('active');
		$(this).find('.card-item_hide').show();
	}, function(){
		$(this).removeClass('active');
		$(this).find('.card-item_hide').hide();
	});


	hideTextSectionMain();

	$(document).on('click', '.text-section-main__arrow', function(){
		$(this).closest('.text-section-main').animate({height: heightTextSectionMain}, 500).removeClass('hidden');
		$(this).css('display', 'none');
	});
});