(function(){
	'use strict';

	angular.module('common').factory('loadingHttpInterceptor', LoadingInterceptor);

	LoadingInterceptor.$inject = ['$rootScope', '$q'];

	function LoadingInterceptor($rootScope, $q){
		var count = 0;
		var EventName = 'spinner:activate';
		return{
			request: function (config) {
				if(++count === 1){
					$rootScope.$broadcast(EventName, {on: true});
				}
				return config;
			},

			response: function(response){
				if (--count === 0) {
					$rootScope.$broadcast(EventName, {on: false});
				}
				return response;
			},

			responseError: function(response){
				if (--count === 0) {
					$rootScope.$broadcast(EventName, {on: false});
				}
				return $q.reject(response);
			}
		};
	}
})();