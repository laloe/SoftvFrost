'use strict';
angular.module('softvFrostApp').controller('TerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory, $uibModal, $state, SuscriptorFactory, nuevoSuscriptorFactory, $stateParams) {
	this.$onInit = function() {
		if ($stateParams.idSuscriptor != undefined) {
			SuscriptorFactory.getTerminals($stateParams.idSuscriptor).then(function(data) {
				vm.terminales = data.GetDeepIdSuscriptorResult;
				console.log(vm.terminales);
			});
		} else {
			terminalFactory.getTerminalList().then(function(data) {
				vm.terminales = data.GetTerminalListResult;

			});
		}
		terminalFactory.getServicioList().then(function(data) {
			data.GetServicioListResult.unshift({
				'Nombre': 'Todos los Servicios',
				'IdServicio': 0
			});
			vm.servicios = data.GetServicioListResult;
			vm.bservicio = vm.servicios[0];
		});
	}

	function GestionTerminal(object) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalGestionTerminal.html',
			controller: 'ModalGestionTerminalCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				terminal: function() {
					return object;
				}
			}
		});

	}

	function EditarTerminal(obj) {
		$state.go('home.provision.terminalesEdita', {
			'Id': obj.SAN
		});
	}

	function busquedaCambio(x) {
		vm.tipoBusqueda = 0;
		if (x == 1) {
			if (vm.bsan == '') {
				vm.tipoBusqueda = 0;
			} else {
				vm.tipoBusqueda = 1;
				vm.bsus = '';
				vm.bservicio = vm.servicios[0];
			}
		} else if (x == 2) {
			if (vm.bsus == '') {
				vm.tipoBusqueda = 0;
			} else {
				vm.tipoBusqueda = 2;
				vm.bsan = '';
				vm.bservicio = vm.servicios[0];
			}
		} else if (x == 3) {
			if (vm.servicios.IdServicio == 0) {
				vm.tipoBusqueda = 0;
			} else {
				vm.tipoBusqueda = 3;
				vm.bsan = '';
				vm.bsus = '';
			}

		}
	}

	function buscar() {
		if (vm.tipoBusqueda == 1) {
			vm.obj = {
				san: vm.bsan,
				suscriptor: '',
				estatus: '',
				servicio: '',
				op: 1
			};
		} else if (vm.tipoBusqueda == 2) {
			vm.obj = {
				san: 0,
				suscriptor: vm.bsus,
				estatus: '',
				servicio: '',
				op: 3
			};
		} else if (vm.tipoBusqueda == 3) {
			vm.obj = {
				san: 0,
				suscriptor: '',
				estatus: '',
				servicio: vm.bservicio.IdServicio,
				op: 4
			};
		}
		if (vm.tipoBusqueda == 0 || vm.tipoBusqueda == undefined) {
			terminalFactory.getTerminalList().then(function(data) {
				vm.terminales = data.GetTerminalListResult;
			});
		} else {
			terminalFactory.buscarTerminal(vm.obj).then(function(data) {
				vm.terminales = data.GetFilterTerminalListResult;
			});
		}
	}

	var vm = this;
	vm.GestionTerminal = GestionTerminal;
	vm.EditarTerminal = EditarTerminal;
	vm.titulo = "Terminales";
	vm.busquedaCambio = busquedaCambio;
	vm.buscar = buscar;
}
