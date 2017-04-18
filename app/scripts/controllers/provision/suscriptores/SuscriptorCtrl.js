'use strict';

function SuscriptorCtrl(SuscriptorFactory, $uibModal, $state, nuevoSuscriptorFactory, $location) {

	this.$onInit = function() {
		SuscriptorFactory.getSuscriptorList().then(function(data) {
			vm.suscriptores = data.GetSuscriptorListResult;
			console.log(data);
		});
	}

	function DetalleSuscriptor(object) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalDetalleSuscriptor.html',
			controller: 'ModalDetalleSuscriptorCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				suscriptor: function() {
					return object;
				}
			}
		});
	}

	function editarSuscriptor(item) {
		$state.go('home.provision.suscriptoresEditar', {
			params: {
				suscriptor: item
			}
		});
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


	var vm = this;
	vm.DetalleSuscriptor = DetalleSuscriptor;
	vm.editarSuscriptor = editarSuscriptor;
	vm.cambiarBusqueda = cambiarBusqueda;
	vm.buscar = buscar;
}
angular.module('softvFrostApp').controller('SuscriptorCtrl', SuscriptorCtrl);
