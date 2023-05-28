(function(){
	'use strict';

	angular.module('public')
	.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['AllContent'];
	function homeCtrl(AllContent){
		var $ctrl = this;
		$ctrl.AllContent = AllContent;
	}
})();