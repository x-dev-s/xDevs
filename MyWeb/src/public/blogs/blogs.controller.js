(function(){
	'use strict';

	angular.module('public')
	.controller('blogsCtrl', blogsCtrl);

	blogsCtrl.$inject = ['AllContent'];
	function blogsCtrl(AllContent){
		var $ctrl = this;
		$ctrl.AllContent = AllContent;
	};
})();