(function(){
	'use strict';

	angular.module('common')
	.component('loading', {
		template: '<div id="loader" ng-if="$ctrl.show"><img src="images/LOGO3.png" width="250" height="85"><br><img src="images/loading.gif"></div>',
		controller: LoadingController
	});

	LoadingController.$inject = ['$rootScope'];
	function LoadingController($rootScope){
		var $ctrl = this;
		var listener;
		$ctrl.$onInit = function(){
			$ctrl.show = false;
			listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
		};
		$ctrl.$onDestroy = function(){
			listener();
		};
		function onSpinnerActivate(event, data) {
			$ctrl.show = data.on;
		}
	}
})();
 // <br> <script>$("ui-view, header, footer, ul.container-fluid").hide()</script>