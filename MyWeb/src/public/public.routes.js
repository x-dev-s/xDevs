(function () {
	'use strict'

	angular.module('public')
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];
	function routeConfig($stateProvider){

		$stateProvider
			.state('public', {
				abstract: true,
				templateUrl: 'src/public/public.html'
			})

			.state('public.home', {
				url: '/',
				templateUrl: 'src/public/home/home.html',
				controller: "homeCtrl",
				controllerAs: "HomeController",
				resolve: {
					AllContent: ["BlogsNewsService", function(BlogsNewsService){
						return BlogsNewsService.getAllBlogsNews();
					}] 
				}
			})

			.state('public.about', {
				url: '/about',
				templateUrl: 'src/public/about.html'
			})

			.state('public.blogs', {
				url: '/blogs',
				templateUrl: "src/public/blogs/Blogs.html",
				controller: "blogsCtrl",
				controllerAs: "BlogsController",
				resolve: {
					AllContent: ["BlogsNewsService", function(BlogsNewsService){
						return BlogsNewsService.getAllBlogsNews();
					}] 
				}
			})

			.state('public.blog', {
				url: '/blogs/{articlename}',
				templateUrl: 'src/public/blogs/BlogContent.html',
				controller: "blogCtrl",
				controllerAs: "BlogController",
				resolve: {
					blog: ['$stateParams', 'BlogsNewsService', function($stateParams, BlogsNewsService){
						return BlogsNewsService.getBlogNews($stateParams.articlename);
					}]
				}
			})

			.state('public.AllNews', {
				url: '/news',
				templateUrl: "src/public/News/News.html",
				controller: "AllNewsCtrl",
				controllerAs: "AllNewsController",
				resolve: {
					AllContent: ["BlogsNewsService", function(BlogsNewsService){
						return BlogsNewsService.getAllBlogsNews();
					}] 
				}
			})

			.state('public.news', {
				url: '/news/{articlename}',
				templateUrl: 'src/public/News/NewsContent.html',
				controller: "newsCtrl",
				controllerAs: "NewsController",
				resolve: {
					news: ['$stateParams', 'BlogsNewsService', function($stateParams, BlogsNewsService){
						return BlogsNewsService.getBlogNews($stateParams.articlename);
					}]
				}
			})
	}
})();