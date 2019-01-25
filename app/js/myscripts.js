$(document).ready(function() {
	let firstSlider  		  = $('.first-slider'),
		secondSlider 		  = $('.second-slider'),
		firstSliderArrowPrev  = '.first-slider__arrow-prev',
		firstSliderArrowNext  = '.first-slider__arrow-next',
		secondSliderArrowPrev = '.second-slider__arrow-prev',
		secondSliderArrowNext = '.second-slider__arrow-next',
		heightTextSectionMain = $('.text-section-main').height(),
		textSectionMain 	  = $('.text-section-main'),
		textSectionRec        = $('.recomendation-text__main'),
		recArrow              = $('.recomendation-text__arrow'),
		aboutSlider           = $('.about-slider'),
		aboutSliderArrowPrev  = '.about-slider__arrow-prev',
		aboutSliderArrowNext  = '.about-slider__arrow-next',
		total 				  = $('.card-main-block-description-row-cost__number span'),
		totalCount 			  = parseInt(total.text()),
		discontGalleryMini    = $('.discont-row-item-gallery-mini'),
		discontGalleryBig     = $('.discont-row-item-gallery-big'),
		heightTextSectionRec;

	//Функция навешивания класса на Body на странице ДИСКОНТ
	(function () {
		let location = window.location.href;
		location = location.split('/');
		location = location[location.length - 1];

		if (location == 'discount.html') {
			$('body').addClass('discont-page');
			console.log('success');
			return false;
		}
	})();

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
	const hideTextSectionMain = function(textSection) {
		textSection.addClass('hidden');
	}

	//Функция скрытие текста
	const recHideTextSectionMain = function(textSection, heightTextSection, arrow) {
		if (heightTextSection >= 160) {
			textSection.addClass('hidden');
		} else {
			arrow.css('display', 'none');
		}
	};
	
	//Функция общего рассчета
	const totalResult = function() {
		let	a = $('[data-result]').find('div').data('cost'),
			b = $('[data-result-material]').find('div').data('cost'),
			totalCountNew;
			totalCountNew = totalCount + a + b;

		total.text(totalCountNew);
	};

	//Функция сброса фильтра
	const resetFiltr = function() {
		$('.card-item-row-colors.card-item-row-colors_horiz').find('.card-item-row-colors__color').removeClass('active').eq(0).addClass('active');
		$('.filter .filter-checkbox').find('input').prop('checked', false);
		$('.filter .filter-checkbox').eq(0).find('input').prop('checked', true);
		$('#amount-width-min').val('30');
		$('#amount-width-max').val('350');
		$('#amount-cost-min').val('13500');
		$('#amount-cost-max').val('26000');
		$( "#slider-range-width" ).slider('values', 0, 30).slider('values', 1, 350);
		$( "#slider-range-width .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').text('30 см');
        $( "#slider-range-width .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').text('350 см');

		$( "#slider-range-cost" ).slider('values', 0, 13500).slider('values', 1, 26000);
		$( "#slider-range-cost .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').text('13500 ₽');
        $( "#slider-range-cost .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').text('26000 ₽');


		$('.filter-select').selectmenu('destroy');
		$('.filter-select').each(function(index, item){
			$(this).find('option').eq(0).prop('selected', true);
		});
		$('.filter-select').selectmenu();
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
		variableWidth: true,
		responsive: [
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true
			}
		}

		]
	});

	aboutSlider.slick({
		arrows: false,
		dots: false,
		draggable: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true
	});

	discontGalleryBig.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		draggable: false
	});

	//инициализация галлерей на связывание их на странице ДИСКОНТ
	(function(){
		discontGalleryMini.each(function(index){
			$(this).slick({
				slidesToShow: 3,
			    slidesToScroll: 1,
			    asNavFor: discontGalleryBig.eq(index),
			    dots: false,
			    arrows: false,
			    infinite: true,
			    draggable: true,
			    vertical: true,
			    centerMode: false,
			    focusOnSelect: true
			});
		});
	})();

	galleryArrows(firstSlider, firstSliderArrowPrev, firstSliderArrowNext);
	galleryArrows(secondSlider, secondSliderArrowPrev, secondSliderArrowNext);
	galleryArrows(aboutSlider, aboutSliderArrowPrev, aboutSliderArrowNext);


	//UI инициализация селектов и рэндж
	$('.filter-select').selectmenu();

	$( "#slider-range-width" ).slider({
      range: true,
      min: 0,
      max: 400,
      values: [ 30, 350 ],
      create: function() {
      	$( "#slider-range-width .ui-slider-handle" ).eq(0).append('<span class="slider-range-cost-text">30 см</span>');
      	$( "#slider-range-width .ui-slider-handle" ).eq(1).append('<span class="slider-range-cost-text">350 см</span>');
      },
      slide: function( event, ui ) {
        $( "#amount-width-min" ).val(ui.values[ 0 ]);
        $( "#amount-width-max" ).val(ui.values[ 1 ]);
        $( "#slider-range-width .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').text(ui.values[ 0 ] + ' см');
        $( "#slider-range-width .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').text(ui.values[ 1 ] + ' см');
      }
    });

    $( "#slider-range-cost" ).slider({
      range: true,
      min: 13500,
      max: 26000,
      values: [ 13500, 26000 ],
      create: function() {
      	$( "#slider-range-cost .ui-slider-handle" ).eq(0).append('<span class="slider-range-cost-text">13500 ₽</span>');
      	$( "#slider-range-cost .ui-slider-handle" ).eq(1).append('<span class="slider-range-cost-text">26000 ₽</span>');
      },
      slide: function( event, ui ) {
        $( "#amount-cost-min" ).val(ui.values[ 0 ]);
        $( "#amount-cost-max" ).val(ui.values[ 1 ]);
        $( "#slider-range-cost .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').text(ui.values[ 0 ] + ' ₽');
        $( "#slider-range-cost .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').text(ui.values[ 1 ] + ' ₽');
      }
    });

	//Инициализация выпадающего меню
	$('.filter-sort').selectmenu();
	$('.discont-dropdown-menu').selectmenu();

	//Инциализация маски
	$('.contacts-form-input_phone').mask('+7 (999) 999-99-99');

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
		if ($(this).closest('.catalog-main-gallery.linear').length) {
			return false;
		}
		$(this).addClass('active');
		$(this).find('.card-item_hide').show();
	}, function(){
		if ($(this).closest('.catalog-main-gallery.linear').length) {
			return false;
		}
		$(this).removeClass('active');
		$(this).find('.card-item_hide').hide();
	});

	//Скрыть текст после того как посчитаем его высоту в развернутом виде
	hideTextSectionMain(textSectionMain);

	$(document).on('click', '.text-section-main__arrow', function(){
		$(this).closest('.text-section-main').animate({height: heightTextSectionMain}, 500).removeClass('hidden');
		$(this).animate({opacity: 0}, 500, function() {
			$(this).css('display', 'none');
		});
	});

	//Скрыть текст после того как посчитаем его высоту в развернутом виде
	$(document).on('click', '.recomendation-text__arrow', function(){
		$(this).siblings('.recomendation-text__main').animate({height: heightTextSectionRec}, 300).removeClass('hidden');
		$(this).animate({opacity: 0}, 500, function(){
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
		let clickedItem       = $(this),
			targetItem        = $('.card-main-block-description-row-item_left .type-item'),
			targetItemParent  = $('[data-result]'),
			clickedItemParent = $(this).closest('.card-main-block-description-row-item-ul-horiz__item');

		targetItem.remove();
		clickedItem.remove();

		targetItemParent.append(clickedItem);
		clickedItemParent.append(targetItem);

		$('.card-main-block-description-row-item-ul-horiz').fadeOut('slow');

		totalResult();
	});

	$(document).on('click', '.card-main-block-description-row-item-ul-vert .material-item', function(){
		let clickedItem       = $(this),
			targetItem        = $('[data-result-material] .material-item'),
			targetItemParent  = $('[data-result-material]'),
			clickedItemParent = $(this).closest('.card-main-block-description-row-item-ul-vert__item');

		targetItem.remove();
		clickedItem.remove();

		targetItemParent.append(clickedItem);
		clickedItemParent.append(targetItem);

		$('.card-main-block-description-row-item-ul-vert').slideUp('slow');

		totalResult();
	});

	//Переключение табов
	$(document).on('click', '.tabs-list-item:not(active)', function(){
		$(this).addClass('active').siblings('.tabs-list-item').removeClass('active');
		console.log($(this).index());
		$('.tabs-container-list-item').removeClass('active').eq($(this).index()).addClass('active');
		if($(this).index() == 3) {
			textSectionRec.removeClass('hidden');
			recArrow.css('display', 'block');
			heightTextSectionRec = $('.recomendation-text__main').height();
			recHideTextSectionMain(textSectionRec, heightTextSectionRec, recArrow);
		};
	});

	//включение проигрывателя
	$(document).on('click', '.tabs-container-list-item-innercontainer-side-video__play-btn', function(){
		let video = $(this).siblings('video');

		video.get(0).play();

		$(this).fadeOut('slow');
	});

	//Галлерея переключение на странице карточка товара
	$(document).on('click', '.card-main-block-gallery-mini__item:not(active)', function(){
		$(this).addClass('active').siblings().removeClass('active');
		let indexMini = $(this).index();

		$('.card-main-block-gallery-big-item').removeClass('active').eq(indexMini).addClass('active');
	});

	//Переключение дополнительных цветов
	$(document).on('click', '[data-color]', function(e){
		// e.preventDefault();
		$('.tabs-list-item').removeClass('active').eq(4).addClass('active');

		$('.tabs-container-list-item').removeClass('active').eq(4).addClass('active');

		let a = $('.tabs-list').offset().top;
		$('html, body').animate({scrollTop: a}, 500);
	});

	//Сбрасывание фильтра по нажаитию на кнопку
	$(document).on('click', '.filter-btn_cancel', function(e){
		e.preventDefault();
		resetFiltr();
	});

	//Переключение раскладки на странице каталог
	$(document).on('click', '.catalog-main-head-grid__item:not(active)', function() {
		$(this).addClass('active').siblings('.catalog-main-head-grid__item').removeClass('active');
		$('.catalog-main-gallery-linear').slideToggle('400');


		if ($('.catalog-main-head-grid__item.catalog-main-head-grid__list').hasClass('active')) {
			let a = ($('.catalog-main-gallery-linear').offset().top - 200);

			$('html, body').animate({scrollTop: a}, 500);
		}
	});

	//Клик по бургеру в моб версии
	$(document).on('click', '.header-mob-burger', function() {
		$(this).toggleClass('active');
		$('.header-mob-menu').toggleClass('active');

	});

	//инициализация выпдающего селекта на странице ОБИВКИ
	$('.fabrics-filter-select').SumoSelect({
		csvDispCount: 2,
		captionFormat: '{0} выбрано',
		captionFormatAllSelected: 'Выбраны все',

	});
});


	//plz dont delete me, i'm usefull in dev progress
	//
	//
	//
	// (function(){
	// 	let a = $(document).find('.fabrics-filter-column-row-value-row').eq(1).text();
	// 	a = a.split(' ');

	// 	let b = a.map(function(item, index){
	// 		item = '<a href="#" class="fabrics-filter-letter">' + item + '</a>';
	// 		$(document).find('.fabrics-filter-column-row-value-row').eq(1).append(item);
	// 	});
	// })()