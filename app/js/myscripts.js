$(document).ready(function() {
	$(document).on('click', '.header-nav-list-item:not(.active)', function() {
		$(this).siblings('.header-nav-list-item').removeClass('active');
		$(this).addClass('active');

		let a = $(this).index('.header-nav-list-item');
		$('.header-nav-list-item-ul').eq(a).addClass('active').siblings('.header-nav-list-item-ul').removeClass('active');
	});

	$(document).on('click', '.header-nav-search-bar', function(e){

		if (!$(e.target).closest('.header-nav-search-bar_wrapper').length) {
			$('.header-nav-search-bar').closest('.header-nav-search-bar_wrapper').removeClass('active');
			$('.header-nav-search-bar').find('.header-nav-search-bar__search-input').removeClass('active');
			$('.header-nav-search-bar').removeClass('active');
			$('.header-nav-list').removeClass('active');
			$('.header-nav-list-item').removeClass('active');
			$('.header-nav-list-item-ul').removeClass('active');
			return;
		} else {
			$(this).closest('.header-nav-search-bar_wrapper').addClass('active');
			$(this).find('.header-nav-search-bar__search-input').addClass('active');
			$(this).addClass('active');
			$('.header-nav-list').addClass('active');
			$('.header-nav-list-item').removeClass('active');
			$('.header-nav-list-item-ul').removeClass('active');
		}
	});

	// $(document).on('click', function(e){

	// 	console.log($(e.target).closest('.header-nav-search-bar_wrapper').length);

	// 	if (!$(e.target).closest('.header-nav-search-bar_wrapper').length) {
	// 		$('.header-nav-search-bar').closest('.header-nav-search-bar_wrapper').removeClass('active');
	// 		$('.header-nav-search-bar').find('.header-nav-search-bar__search-input').removeClass('active');
	// 		$('.header-nav-search-bar').removeClass('active');
	// 		$('.header-nav-list').removeClass('active');
	// 		$('.header-nav-list-item').removeClass('active');
	// 		$('.header-nav-list-item-ul').removeClass('active');
	// 	}
	// })
});