$(document).ready(function() {
	let firstSlider  		  = $('.first-slider'),
		secondSlider 		  = $('.second-slider'),
		firstSliderArrowPrev  = '.first-slider__arrow-prev',
		firstSliderArrowNext  = '.first-slider__arrow-next',
		secondSliderArrowPrev = '.second-slider__arrow-prev',
		secondSliderArrowNext = '.second-slider__arrow-next',
		heightTextSectionMain = $('.text-section-main').height(),
		textSectionMain 	  = $('.text-section-main');

	//Функция для стрелок слайдеров
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

	//Функция скрытие текста
	const hideTextSectionMain = function() {
		textSectionMain.addClass('hidden');
	}

	//Функция общего рассчета
	const totalResult = function() {
		let a = $('.card-main-block-description-row-item_left .type-item').data('cost');
	};

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

	//Открытие выпадающего списка в навигации
	$(document).on('click', '.header-nav-list-item:not(.active)', function() {
		$(this).siblings('.header-nav-list-item').removeClass('active');
		$(this).addClass('active');

		let a = $(this).index('.header-nav-list-item');
		$('.header-nav-list-item-ul').eq(a).addClass('active').siblings('.header-nav-list-item-ul').removeClass('active');
	});

	//Открытие поиска при клике на него
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

	//закрытие поиска при клике не на нем и раскрытие навигации
	$(document).on('click', function(e){
		if (!$(e.target).closest('.header-nav-search-bar_wrapper').length) {
			$('.header-nav-search-bar').closest('.header-nav-search-bar_wrapper').removeClass('active');
			$('.header-nav-search-bar').find('.header-nav-search-bar__search-input').removeClass('active');
			$('.header-nav-search-bar').removeClass('active');
			$('.header-nav-list').removeClass('active');
		};
	});

	//закрытие нав бара при клике не на нем
	$(document).on('click', function(e){
		if(!$(e.target).closest('.header-nav-list-item-ul.active').length && !$(e.target).closest('.header-nav-list-item').length) {
			$('.header-nav-list-item-ul.active').removeClass('active');
			$('.header-nav-list-item').removeClass('active');
		}
	});

	//Галочка на выбор цвета
	$(document).on('click', '.card-item-row-colors__color:not(.active)', function(){
		$(this).siblings('.card-item-row-colors__color').removeClass('active');
		$(this).addClass('active');
	});

	//Ховер на карточку
	$('.card-item').hover(function() {
		$(this).addClass('active');
		$(this).find('.card-item_hide').show();
	}, function(){
		$(this).removeClass('active');
		$(this).find('.card-item_hide').hide();
	});

	//Скрыть текст после того как посчитаем его высоту в развернутом виде
	hideTextSectionMain();

	$(document).on('click', '.text-section-main__arrow', function(){
		$(this).closest('.text-section-main').animate({height: heightTextSectionMain}, 500).removeClass('hidden');
		$(this).animate({opacity: 0}, 500, function() {
			$(this).css('display', 'none');
		});
	});

	//Расркытие скрытых списков
	$(document).on('click', '.card-main-block-description-row-item__btn-change', function(){
		let ulHoriz = $(this).siblings('.card-main-block-description-row-item-ul-horiz');

		if (ulHoriz.is(':visible')) {
			ulHoriz.fadeOut('slow');
		} else {
			ulHoriz.fadeIn('slow');
		};
	});
	$(document).on('click', '.card-main-block-description-row-item__btn-change', function(){
		let ulVert = $(this).closest('.card-main-block-description-row_column').find('.card-main-block-description-row-item-ul-vert');

		if (ulVert.is(':visible')) {
			ulVert.slideUp('slow');
		} else {
			ulVert.slideDown('slow');
		};
	});

	//Изменение Результата
	$(document).on('click', '.card-main-block-description-row-item-ul-horiz__item .type-item', function(){
		let a = $(this).data('typeNumber'),
			b = $(this).text(),
			c = $('.card-main-block-description-row-item_left .type-item'),
			d = c.text(),
			f = c.data('typeNumber'),
			g = $(this).data('cost'),
			h = c.data('cost');

		console.log('clicked: \n' + a + '\n' + b + '\n' +g + '\n\nResult: \n' + d + '\n' + f + '\n' + h);

		$(this).attr('data-type-number', f).attr('data-cost', h).text(d); //

		c.attr('data-type-number', a).attr('data-cost', g).text(b); //

		$('.card-main-block-description-row-item-ul-horiz').fadeOut('slow');
	});

	$(document).on('click', '.card-main-block-description-row-item-ul-vert .material-item', function(){
		let a = $(this).data('materialNumber'),
			b = $(this).text(),
			c = $('.card-main-block-description-row-item-result .material-item'),
			d = c.text(),
			f = c.data('materialNumber');

		$(this).attr('data-material-number', f).text(d);

		c.attr('data-material-number', a).text(b);

		$('.card-main-block-description-row-item-ul-vert').slideUp('slow');
	});
});