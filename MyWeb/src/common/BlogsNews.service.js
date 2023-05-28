(function(){
	'use strict';

	angular.module('common')
	.service('BlogsNewsService', BlogsNewsService);

	BlogsNewsService.$inject = ['$http'];
	function BlogsNewsService($http){
		var service = this;

		service.getAllBlogsNews = function(){
			return $http.get('data/Content.json').then(function(response){
				return response.data;
			});
		};

		service.getBlogNews = function(articlename){
			var config = {};
			if (articlename){
				config.params = {'articlename': articlename};
			}
			return $http.get('data/BlogNews/' + articlename + '.json', config).then(function(response){
				return response.data;
			});
		};
	}
})();