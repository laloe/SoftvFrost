'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalGetLatLongCtrl', function($uibModalInstance, $uibModal, SuscriptorFactory, $rootScope, ngNotify, NgMap) {

		function initialData() {
			NgMap.getMap().then(function(map) {
				vm.latlng = [23.96617587126503, -101.953125];
				vm.map = map;
				google.maps.event.trigger(vm.map, 'resize');
			});


		}

		function ok() {
			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit('get_LatLong', vm.latlng);
		}

		function getpos(event) {
			vm.latlng = [event.latLng.lat(), event.latLng.lng()];
		};



		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.getpos = getpos;
		initialData();


	})
