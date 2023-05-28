(function () {
	'use strict';

	angular.module('public')
	.controller('newsCtrl', newsCtrl);

	newsCtrl.$inject = ['news'];
	function newsCtrl(news) {
		var $ctrl = this;
		$ctrl.news = news;
	}
})();