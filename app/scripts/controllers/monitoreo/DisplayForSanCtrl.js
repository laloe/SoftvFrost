'use strict';
angular
	.module('softvFrostApp')
	.controller('DisplayForSanCtrl', function ($uibModal, $state, ngNotify, $location, displayFactory, diagnosticFactory) {
		var vm = this;
		vm.displayTest = displayTest;
		vm.validate = validate;

		function validate() {
			diagnosticFactory.getLoginUid().then(function (data) {
				vm.token = data[0].loginuuid;
				var san = hughesGetSanCompuesto(vm.SAN);
				displayFactory.displaySpeed(vm.token, san).then(function (data) {
					vm.datos = JSON.parse(data);
					vm.ip = vm.datos.IPConnectivityStatus;
					vm.jul1 = vm.datos.JuDDLevel1;
					vm.jul2 = vm.datos.JuDDLevel2;
					vm.jul3 = vm.datos.JuDDLevel3;

					vm.str1 = vm.jul2['Event Entry-1'];
					vm.entry1 = vm.str1.split(",");

					vm.str2 = vm.jul2['Event Entry-2'];
					vm.entry2 = vm.str2.split(",");

					vm.str3 = vm.jul2['Event Entry-3'];
					vm.entry3 = vm.str3.split(",");

					vm.str4 = vm.jul2['Event Entry-4'];
					vm.entry4 = vm.str4.split(",");

					vm.str5 = vm.jul2['Event Entry-5'];
					vm.entry5 = vm.str5.split(",");

				});
			});
		}

		function hughesGetSanCompuesto(obj) {
			var a = obj.toString();
			var i;
			for (i = a.length; i < 9; i++) {
				a = '0' + a;
			}
			return 'TLV' + a;
		};

		function displayTest() {
			var san = hughesGetSanCompuesto(vm.SAN);
			displayFactory.speed(vm.token, san).then(function (data) {
				vm.datos = JSON.parse(data);
				var modalInstance = $uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/monitoreo/modalSpeedTest.html',
					controller: 'SpeedTestCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'sm',
					resolve: {
						items: function () {
							return vm.datos;
						}
					}
				});
			});
		}

	});
