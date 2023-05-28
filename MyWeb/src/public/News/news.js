(function(){
	'use strict';

	angular.module('public')
	.component('newscategories', {
		templateUrl: 'src/public/News/news-categories.html',
		bindings:{
			category:'<'
		}
	})
	.component('news', {
		templateUrl: 'src/public/News/newsPage.html',
		bindings: {
			news:'<'
		}
	});
})();