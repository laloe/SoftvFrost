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

		function cambiarBusqueda(id) {
			vm.tipoBusqueda = 0;
			if (id == 1) {
				if (vm.bsan == '') {
					vm.tipoBusqueda = 0;
				} else {
					vm.bnombre = ''
					vm.tipoBusqueda = 1;
				}
			} else {
				if (vm.bnombre == '') {
					vm.tipoBusqueda = 0;
				} else {
					vm.bsan = '';
					vm.tipoBusqueda = 2;
				}
			}
		}

		function buscar() {
			if (vm.tipoBusqueda == 1) {
				vm.busObj = {
					'IdSuscriptor': vm.bsan,
					'Nombre': '',
					'Apellido': '',
					'Telefono': '',
					'Email': '',
					'Calle': '',
					'Numero': '',
					'Colonia': '',
					'Ciudad': '',
					'Op': 1
				};
			} else if (vm.tipoBusqueda == 2) {
				vm.busObj = {
					'IdSuscriptor': 0,
					'Nombre': vm.bnombre,
					'Apellido': '',
					'Telefono': '',
					'Email': '',
					'Calle': '',
					'Numero': '',
					'Colonia': '',
					'Ciudad': '',
					'Op': 2
				};
			}
			if (vm.tipoBusqueda == undefined || vm.tipoBusqueda == 0) {
				SuscriptorFactory.getSuscriptorList().then(function(data) {
					vm.suscriptores = data.GetSuscriptorListResult;
					$('.buscarSuscriptor').collapse('hide');
				});
			} else {
				SuscriptorFactory.buscarSuscriptor(vm.busObj).then(function(data) {
					vm.suscriptores = data.GetFilterSuscriptorListResult;
					$('.buscarSuscriptor').collapse('hide');
				});
			}
		}



		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
		vm.SeleccionarSusc = SeleccionarSusc;
		vm.cambiarBusqueda = cambiarBusqueda;
		vm.buscar = buscar;
	})
