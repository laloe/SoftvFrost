'use strict';
angular
	.module('softvFrostApp')
	.controller('SpeedTestCtrl', function($state, ngNotify, $location, displayFactory,items, $uibModalInstance, diagnosticFactory) {

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.test = items.TDD_STR;
		console.log(items);
	});
