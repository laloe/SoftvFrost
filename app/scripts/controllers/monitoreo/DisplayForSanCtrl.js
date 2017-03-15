'use strict';
angular
	.module('softvFrostApp')
	.controller('DisplayForSanCtrl', function($uibModal, $state, ngNotify, $location, displayFactory, diagnosticFactory) {
		function initial() {
			diagnosticFactory.getLoginUid().then(function(data) {
				vm.token = data[0].loginuuid;

				displayFactory.displaySpeed(vm.token).then(function(data) {
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

		function displayTest() {
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/monitoreo/modalSpeedTest.html',
				controller: 'SpeedTestCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm'
			});
		}


		var vm = this;
		vm.displayTest = displayTest;
		initial();
	});
