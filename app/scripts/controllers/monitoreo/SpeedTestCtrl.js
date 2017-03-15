'use strict';
angular
	.module('softvFrostApp')
	.controller('SpeedTestCtrl', function($state, ngNotify, $location, displayFactory, $uibModalInstance, diagnosticFactory) {
		function initialData() {

			diagnosticFactory.getLoginUid().then(function(data) {
				vm.token = data[0].loginuuid;

				displayFactory.speed(vm.token).then(function(data) {
					vm.datos = JSON.parse(data);
					vm.test = vm.datos.TDD_STR;
				});
			});

		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initialData();
	});
