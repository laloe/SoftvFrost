'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalBusquedaSuscriptorCtrl', function($uibModalInstance, $uibModal, SuscriptorFactory, $rootScope, ngNotify) {

		function initialData() {
			SuscriptorFactory.getSuscriptorList().then(function(data) {
				vm.suscriptores = data.GetSuscriptorListResult;
			});
		}

		function ok() {

		}

		function SeleccionarSusc(x) {

			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit('cliente_seleccionado', x);

		}



		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
		vm.SeleccionarSusc = SeleccionarSusc;
	})
