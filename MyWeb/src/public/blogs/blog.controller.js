(function () {
	'use strict';

	angular.module('public')
	.controller('blogCtrl', blogCtrl);

	blogCtrl.$inject = ['blog'];
	function blogCtrl(blog) {
		var $ctrl = this;
		$ctrl.blog = blog;
	}
})();