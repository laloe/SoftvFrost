'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalGetLatLongCtrl', ModalGetLatLongCtrl);

function ModalGetLatLongCtrl($uibModalInstance, $uibModal, SuscriptorFactory, $rootScope, ngNotify, NgMap, datosGis) {
	function initialData() {
		NgMap.getMap().then(function(map) {
			vm.latlng = [parseFloat(datosGis.lat), parseFloat(datosGis.long)];
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


}
