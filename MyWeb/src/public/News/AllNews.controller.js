(function(){
	'use strict';

	angular.module('public')
	.controller('AllNewsCtrl', AllNewsCtrl);

	AllNewsCtrl.$inject = ['AllContent'];
	function AllNewsCtrl(AllContent){
		var $ctrl = this;
		$ctrl.AllContent = AllContent;
	};
})();