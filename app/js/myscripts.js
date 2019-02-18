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
		total 				  = $('.card-main-block-description-row-cost__number_main:visible span'),
		totalCount 			  = parseInt(total.text().replace(/\s+/g, '')),
		discontGalleryMini    = $('.discont-row-item-gallery-mini'),
		discontGalleryMiniArrowPrev = '.discont-row-item-gallery-mini__arrow-prev',
		discontGalleryMiniArrowNext = '.discont-row-item-gallery-mini__arrow-next',
		discontGalleryBig     = $('.discont-row-item-gallery-big'),
		windowWidth			  = $(window).innerWidth(),
		heightTextSectionRec;

	$('.header-nav-list-item-ul-side-ul-item').hover(function(){
		let a = $(this).find('path');
		$(this).find('circle').css('stroke', '#D71921');

		a.each(function(){
			if ($(this).attr('stroke')) {
				if($(this).attr('stroke') == 'black') {
					$(this).attr('stroke', '#D71921');
				}
				if ($(this).attr('stroke') == '#BEBEBE') {
					$(this).attr('stroke', '#444');
				}
			}

			if ($(this).attr('fill')) {
				if($(this).attr('fill') == 'black') {
					$(this).attr('fill', '#D71921');
				}
				if ($(this).attr('fill') == '#BEBEBE') {
					$(this).attr('fill', '#444');
				}
			}
		});


		
	}, function(){
		let a = $(this).find('path');
		$(this).find('circle').css('stroke', 'black');

		a.each(function(i){
			if ($(this).attr('stroke')) {
				if($(this).attr('stroke') == '#D71921') {
					$(this).attr('stroke', 'black');
				}
				if ($(this).attr('stroke') == '#444') {
					$(this).attr('stroke', '#BEBEBE');
				}
			}

			if ($(this).attr('fill')) {
				if($(this).attr('fill') == '#D71921') {
					$(this).attr('fill', 'black');
				}
				if ($(this).attr('fill') == '#444') {
					$(this).attr('fill', '#BEBEBE');
				}
			}
		})
	})

	if (windowWidth <= 480) {
		$('.card-main, .tabs').remove();
	} else {
		$('.card-main-mob').remove();
	}

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
		let	a = $('[data-result]').find('.active'),
			b = $('[data-result-material]').find('div').data('cost'),
			c = $('[data-result-material-dop]').find('div').data('cost'),
			previewTotal = $('.card-preview-cost__number'),
			typeResult = 0,
			totalCountNew;

			a.each(function(){
				typeResult += $(this).data('cost');

			});

			totalCountNew = parseInt(totalCount) + parseInt(typeResult) + parseInt(b) + parseInt(c);

			totalCountNew = parseInt(totalCountNew);

			totalCountNew = totalCountNew.toLocaleString('ru');

		 total.text(totalCountNew);
		 previewTotal.text(totalCountNew);


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
		$( "#slider-range-width .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').val('30 см');
        $( "#slider-range-width .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').val('350 см');

		$( "#slider-range-cost" ).slider('values', 0, 13500).slider('values', 1, 26000);
		$( "#slider-range-cost .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').val('13 500 ₽');
        $( "#slider-range-cost .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').val('26 000 ₽');


		$('.filter-select').selectmenu('destroy');
		$('.filter-select').each(function(index, item){
			$(this).find('option').eq(0).prop('selected', true);
		});
		$('.filter-select').selectmenu();
	};

	//Функция сброса фильтра
	const resetFiltrFabrics = function() {
		$('.fabrics-filter-column-row-value-row-item_osob').removeClass('fabrics-active');
		$('.fabrics-filter-column-row-value-row-item:not(.fabrics-filter-column-row-value-row-item_osob)').removeClass('fabrics-active');
		$('.fabrics-filter-letter').removeClass('fabrics-active');
		$('.card-item-row-colors__color').removeClass('active');

		$('.filter-checkbox input').prop('checked', false);

		$('.fabrics-filter-select').find('option').prop('selected', false);
		$('.fabrics-filter-select')[0].sumo.reload();
	};

	firstSlider.slick({
		arrows: false,
		dots: true,
		autoplay: true,
		draggable: true
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
		variableWidth: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
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
			let a = $(this).closest('.discont-row-item-gallery-mini-wrapper').find('.discont-row-item-gallery-mini__arrow-prev');
			let b = $(this).closest('.discont-row-item-gallery-mini-wrapper').find('.discont-row-item-gallery-mini__arrow-next');
			let slider = $(this);
			slider.slick({
				slidesToShow: 3,
			    slidesToScroll: 1,
			    asNavFor: discontGalleryBig.eq(index),
			    dots: false,
			    arrows: false,
			    infinite: true,
			    draggable: true,
			    vertical: false,
			    centerMode: false,
			    focusOnSelect: true,
			    responsive: [
			    	{
			    		breakpoint: 480,
			    		settings: {
			    			vertical: false
			    		}
			    	}
			    ]
			});

			$(a).on('click', function(){
				slider.slick('slickPrev');
				return false;
			});

			$(b).on('click', function(){
				slider.slick('slickNext');
				return false;
			});
		});
	})();

	let mechGalleryBig = $('.mech-row-gallery-big');
	let mechGalleryMini = $('.mech-row-gallery-mini');

	mechGalleryBig.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		draggable: false
	});

	//инициализация галлерей на связывание их на странице МЕХАНИЗМЫ
	(function(){
		mechGalleryMini.each(function(index){
			let a = $(this).closest('.mech-row-gallery-mini-wrapper').find('.mech-row-gallery-mini__arrow-prev');
			let b = $(this).closest('.mech-row-gallery-mini-wrapper').find('.mech-row-gallery-mini__arrow-next');
			let slider = $(this);
			slider.slick({
				slidesToShow: 3,
			    slidesToScroll: 1,
			    asNavFor: mechGalleryBig.eq(index),
			    dots: false,
			    arrows: false,
			    infinite: true,
			    draggable: true,
			    vertical: false,
			    centerMode: false,
			    focusOnSelect: true,
			    responsive: [
			    	{
			    		breakpoint: 480,
			    		settings: {
			    			vertical: false
			    		}
			    	}
			    ]
			});

			$(a).on('click', function(){
				slider.slick('slickPrev');
				return false;
			});

			$(b).on('click', function(){
				slider.slick('slickNext');
				return false;
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
      	$( "#slider-range-width .ui-slider-handle" ).eq(0).append('<input class="slider-range-cost-text" disabled value="30 см">');
      	$( "#slider-range-width .ui-slider-handle" ).eq(1).append('<input class="slider-range-cost-text" disabled value="350 см">');
      },
      slide: function( event, ui ) {
        $( "#amount-width-min" ).val(ui.values[ 0 ]);
        $( "#amount-width-max" ).val(ui.values[ 1 ]);
        $( "#slider-range-width .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').val(ui.values[ 0 ] + ' см');
        $( "#slider-range-width .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').val(ui.values[ 1 ] + ' см');
      }
    });

    $( "#slider-range-cost" ).slider({
      range: true,
      min: 13500,
      max: 26000,
      values: [ 13500, 26000 ],
      create: function() {
      	$( "#slider-range-cost .ui-slider-handle" ).eq(0).append('<input class="slider-range-cost-text" disabled value="13 500 ₽">');
      	$( "#slider-range-cost .ui-slider-handle" ).eq(1).append('<input class="slider-range-cost-text" disabled value="26 000 ₽">');
      },
      slide: function( event, ui ) {
        $( "#amount-cost-min" ).val(ui.values[ 0 ]);
        $( "#amount-cost-max" ).val(ui.values[ 1 ]);
        $( "#slider-range-cost .ui-slider-handle" ).eq(0).find('.slider-range-cost-text').val(ui.values[ 0 ].toLocaleString('ru') + ' ₽');
        $( "#slider-range-cost .ui-slider-handle" ).eq(1).find('.slider-range-cost-text').val(ui.values[ 1 ].toLocaleString('ru') + ' ₽');
      }
    });

	//Инициализация выпадающего меню
	$('.filter-sort').selectmenu();
	$('.discont-dropdown-menu').selectmenu();

	//Инциализация маски
	$('.contacts-form-input_phone').mask('+7 (999) 999-99-99');

	let prevIndex;

	//Открытие выпадающего списка в навигации
	$(document).on('click', '.header-nav-list-item', function() {
		if ($(this).hasClass('active')) {
			$('.header-nav-list-item').removeClass('active');
			$('.header-nav-list-item-ul').removeClass('active');
			return false;
		}


		$(this).siblings('.header-nav-list-item').removeClass('active');
		$(this).addClass('active');
		if (prevIndex !== undefined) {
			$('.header-nav-list-ul-outter').removeClass(`active-${prevIndex}`);
		}
		
		let a = $(this).index('.header-nav-list-item');
		prevIndex = a;
		$('.header-nav-list-item-ul').eq(a).addClass('active').siblings('.header-nav-list-item-ul').removeClass('active');
		$('.header-nav-list-ul-outter').addClass(`active-${a}`);
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
	$(document).on('click', '.card-main-block-description-row-item_left .type-item', function(){
		// let clickedItem       = $(this),
		// 	targetItem        = $('.card-main-block-description-row-item_left .type-item'),
		// 	targetItemParent  = $('[data-result]'),
		// 	clickedItemParent = $(this).closest('.card-main-block-description-row-item-ul-horiz__item');

		// targetItem.remove();
		// clickedItem.remove();

		// targetItemParent.append(clickedItem);
		// clickedItemParent.append(targetItem);

		// $('.card-main-block-description-row-item-ul-horiz').fadeOut('slow');

		$(this).toggleClass('active');

		totalResult();
	});

	$(document).on('click', '.card-main-block-description-row-item-ul-vert:eq(0) .material-item', function(){
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

	$(document).on('click', '.card-main-block-description-row-item-ul-vert:eq(1) .material-item', function(){
		let clickedItem       = $(this),
			targetItem        = $('[data-result-material-dop] .material-item'),
			targetItemParent  = $('[data-result-material-dop]'),
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

		$(this).closest('.card-main-block-gallery-mini').siblings('.card-main-block-gallery-big').find('.card-main-block-gallery-big-item').removeClass('active').eq(indexMini).addClass('active');
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

	//переключение цвета на странице fabrics-active
	$(document).on('click', '.fabrics-active-colors-row-item:not(.active)', function(){
		$('.fabrics-active-colors-row-item').removeClass('active');
		$(this).addClass('active');
	});

	//функция фильтра на странице fabrics
	$(document).on('click', '.fabrics-filter-letter', function(e){
		e.preventDefault();
		if ( $(this).hasClass('fabrics-active') ) {
			$(this).removeClass('fabrics-active');
			return false;
		}
		$(this).addClass('fabrics-active');
	});

	//функция фильтра на странице fabrics
	$(document).on('click', '.fabrics-filter-column-row-value-row-item:not(.fabrics-filter-column-row-value-row-item_osob)', function(e){
		e.preventDefault();
		if ( $(this).hasClass('fabrics-active') ) {
			$(this).removeClass('fabrics-active');
			return false;
		}
		$(this).addClass('fabrics-active');
	});

	//функция фильтра на странице fabrics
	$(document).on('click', '.fabrics-filter-column-row-value-row-item_osob', function(e){
		e.preventDefault();
		if ( $(this).hasClass('fabrics-active') ) {
			$(this).removeClass('fabrics-active');
			return false;
		}		
		$(this).addClass('fabrics-active');
		
	});

	$(document).on('click', '.fabrics-btn_cancel', function(e){
		e.preventDefault();
		resetFiltrFabrics();
	})

	$('.designers-projects-gallery').each(function(){
		let arrowPrev = $(this).closest('.designers-projects-gallery-wrapper').find('.designers-projects-gallery-arrow__prev'),
			arrowNext = $(this).closest('.designers-projects-gallery-wrapper').find('.designers-projects-gallery-arrow__next'),
			slider    = $(this);

		slider.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			dots: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true
					}
				}
			]
		});

		$(arrowPrev).on('click', function(){
			slider.slick('slickPrev');
			return false;
		});
		$(arrowNext).on('click', function(){
			slider.slick('slickNext');
			return false;
		});
	});

	//to top
	$(window).scroll(function() {
		if ($('html, body').scrollTop() > 500) {
			$('.to-top').addClass('active');
		} else {
			$('.to-top').removeClass('active');
		}
	});

	$(document).on('click', '.to-top', function() {
		$('html, body').animate({scrollTop: 0}, 500);
	});

	$(document).on('click', '.card-item-row__like', function(){
		changeLike($(this));
	});

	$(document).on('click', '.card-main-block__like', function(){
		changeLike($(this));
	});

	var changeLike = function(like) {
		let a = like.find('img').attr('src');

		a = a.split('/');

		if (a[a.length - 1] == 'heart.svg') {
			like.find('img').attr('src', a.splice(0,(a.length-1)).join('/') + '/heart-active.svg');
		} else {
			like.find('img').attr('src', a.splice(0,(a.length-1)).join('/') + '/heart.svg');
		}
	};

	var changeLikeRed = function(like) {
		let a = like.find('img').attr('src');

		a = a.split('/');

		if (a[a.length - 1] == 'heart-red.svg') {
			like.find('img').attr('src', a.splice(0,(a.length-1)).join('/') + '/heart-active.svg');
		} else {
			like.find('img').attr('src', a.splice(0,(a.length-1)).join('/') + '/heart-red.svg');
		}
	};

	$(document).on('click', '.card-main-block-description-row-btn-wrapper-like', function(e){
		e.preventDefault();
		changeLikeRed($(this));
	})

	$(document).on('click', '.where-buy-big-info-gallery__item:not(.active)', function(){
		console.log($(this));
		$(this).addClass('active').siblings().removeClass('active');
		$(this).closest('.where-buy-big.active').find('.where-buy-big-img__item').removeClass('active').eq($(this).index()).addClass('active');
	});

	$(document).on('click', '.card-main-block-description-row-item-list-item:not(.active)', function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	$(document).on('click', '.filter-mob-btn[data-sort]', function(e){
		e.preventDefault();

		$('.filter-mob-sort').addClass('active');
		$('html, body').css('overflow', 'hidden');
	});
	$(document).on('click', '.fabrics-filter_mob-btn', function(e){
		e.preventDefault();

		$('.filter-mob-filter-fabrics').addClass('active');
		$('html, body').css('overflow', 'hidden');
	})

	$(document).on('click', '.filter-mob-sort .filter-mob-main-row', function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.filter-mob-sort').removeClass('active');
	});

	$(document).on('click', '.filter-mob-header-btn-cross', function(){
		$('html, body').css('overflow', 'auto');
		$('.filter-mob-side').removeClass('active');
	});

	$(document).on('click', '.filter-mob-header-btn-back', function(){
		$(this).closest('.filter-mob-side').removeClass('active');
	});

	$(document).on('click', '.filter-mob-btn[data-filter-catalog]', function(e){
		e.preventDefault();

		$('.filter-mob-filter-catalog').addClass('active');
		$('html, body').css('overflow', 'hidden');
	});

	$(document).on('click', '[data-filter-type]', function(e){
		$('.filter-mob-filter-type').addClass('active');
	});
	$(document).on('click', '[data-filter-fabric]', function(e){
		$('.filter-mob-filter-fabric').addClass('active');
	});
	$(document).on('click', '[data-filter-color]', function(e){
		$('.filter-mob-filter-color').addClass('active');
	});
	$(document).on('click', '[data-filter-collection]', function(e){
		$('.filter-mob-filter-collection').addClass('active');
	});
	$(document).on('click', '[data-filter-cost]', function(e){
		$('.filter-mob-filter-cost').addClass('active');
	});
	$(document).on('click', '[data-filter-width]', function(e){
		$('.filter-mob-filter-width').addClass('active');
	});


	$(document).on('click', '[data-filter-fabrics-alphabet]', function(e){
		$('.filter-mob-filter-fabrics-alphabet').addClass('active');
	});
	$(document).on('click', '[data-filter-fabrics-type]', function(e){
		$('.filter-mob-filter-fabrics-type').addClass('active');
	});
	$(document).on('click', '[data-filter-fabrics-cost-category]', function(e){
		$('.filter-mob-filter-fabrics-cost-category').addClass('active');
	});
	$(document).on('click', '[data-filter-fabrics-specials]', function(e){
		$('.filter-mob-filter-fabrics-specials').addClass('active');
	});
	$(document).on('click', '[data-filter-fabrics-design]', function(e){
		$('.filter-mob-filter-fabrics-design').addClass('active');
	});



	$(document).on('click', '.filter-mob-side-additional .filter-mob-main-row', function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).closest('.filter-mob-side-additional').removeClass('active');
	});
	$(document).on('click', '.filter-mob-filter-color-row .card-item-row-colors__color', function(){
		$(this).closest('.filter-mob-side-additional').removeClass('active');
	});

	$(document).on('click', '.filter-btn_cancel-mob', function(e){
		e.preventDefault();
		$('.filter-mob-side-additional .filter-mob-main-row').removeClass('active');
		$('.filter-mob-filter-color-row .card-item-row-colors__color').removeClass('active');

		$('.filter-mob-main-input').val('');
		$('.filter-mob-main-custom .filter-checkbox').find('input').prop('checked', false);
	});

	$(document).on('click', '.card-main-mob-main-accordion-item-head', function(){
		

		if ($(this).hasClass('active')) {
			$('.card-main-mob-main-accordion-item-head').removeClass('active');
			$('.card-main-mob-main-accordion-item-main').hide();
			$('.card-main-mob-main-accordion-item').removeClass('active');
			return false;
		}

		$('.card-main-mob-main-accordion-item-head').removeClass('active');

		$(this).addClass('active');
		$('.card-main-mob-main-accordion-item').removeClass('active');
		$('.card-main-mob-main-accordion-item-main').hide();
		$(this).closest('.card-main-mob-main-accordion-item').addClass('active');
		$(this).siblings('.card-main-mob-main-accordion-item-main').show();
	});


	$('.designers-block-gallery-inn').each(function() {
		let a = $(this).closest('.designers-block-gallery').find('.designers-block-gallery-arrow');
		let slider = $(this);
		$(this).slick({
			infinity: true,
			arrows: false,
			dots: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 480,
					slidesToShow: 1,
					draggable: true
				}
			]
		});
		a.on('click', function(){
			slider.slick('slickNext');
			return false;
		});
	});

	$(document).on('click', '.search-tag:not(.active)', function(e){
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');

	});

	;(function(){
		let item = $('.header-nav-list-item-ul-side-ul-item');
		
		item.each(function(){
			let a = $(this).find('.header-nav-list-item-ul-side-ul-item__text');
			if ( a.text() == 'Реклайнер' || a.text() == 'Качалка с вращением') {
				$(this).find('.header-nav-list-item-ul-side-ul-item__icon').addClass('transformed-mod');
			}
		});

		
	})();

	;(function(){
		let a = $(document).find('a.header-wrapper-item-list-item');
		a.each(function(){
			if( $(this).text() == 'Где купить' ) {
				$(this).attr('href', '#');
			}
		})
	})();

	$(document).on('click', '.card-preview-cross', function(){
		$('.card-preview').removeClass('active').addClass('closed');
	});

	$(document).on('click', '.card-preview-arrow', function(){
		$('.card-preview').removeClass('closed').addClass('active');
	});

	let offsetCardItem = $('.card-main-block-description-row-cost__number').offset().top

	$(window).scroll(function(){
		let windowHeight = $(window).height();
		if ($(this).scrollTop() >= (offsetCardItem - windowHeight / 2)) {
			if ($('.card-preview').hasClass('closed')) {
				return false;
			}
			$('.card-preview').addClass('active');
			return false;
		}
		if ($(this).scrollTop() < (offsetCardItem - windowHeight / 2)) {
			$('.card-preview').removeClass('active');
			$('.card-preview').removeClass('closed');
			return false;
		}
	});

	function changeColorPreview(color, material, fabrics) {
		$('.card-preview-img').find('style').eq(1).html(`.cls-1{fill:${color}`);
		$('.type-material').text(material);
		$('.type-fabrics').text(fabrics);
	}

	$('.tabs-container-list-item-innercontainer-side-material-list-item').on('click', function(){
		let color = $(this).data('color');
		let material = $(this).data('prev-material');
		let fabrics = $(this).data('prev-fabrics');

		changeColorPreview(color, material, fabrics);
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