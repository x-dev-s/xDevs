(function(){
	'use strict';

	angular.module('public')
	.component('blogcategories', {
		templateUrl: 'src/public/blogs/blog-categories.html',
		bindings:{
			category:'<'
		}
	})
	.component('blogs', {
		templateUrl: 'src/public/blogs/blogPage.html',
		bindings: {
			blog:'<'
		}
	});
})();