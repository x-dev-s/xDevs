(function(){
	'use strict';

	angular.module('public')
	.component('homeblogs', {
		templateUrl: 'src/public/home/homeBlogs.html',
		bindings: {
			blog: '<'
		}
	})

	.component('homenews', {
		templateUrl: 'src/public/home/homeNews.html',
		bindings: {
			news: '<'
		}
	})
})();