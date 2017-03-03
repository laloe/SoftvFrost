'use strict';
angular.module('softvFrostApp').controller('EditaTerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory, nuevoSuscriptorFactory, $uibModal, $rootScope, ngNotify, $stateParams, $state) {
	this.$onInit = function() {
		terminalFactory.getTerminalById($stateParams.Id).then(function(data) {
			vm.terminal = data.GetByTerminalResult;
			console.log(data);
			vm.IdSuscriptor = vm.terminal.IdSuscriptor;
			vm.ESN = vm.terminal.ESN;
			vm.Latitud = vm.terminal.Latitud;
			vm.Longuitud = vm.terminal.Longitud;
			nuevoSuscriptorFactory.getSuscriptor(vm.terminal.IdSuscriptor).then(function(data) {
				vm.suscriptor = data.GetSuscriptorResult;
				vm.NombreSuscriptor = vm.suscriptor.Nombre + ' ' + vm.suscriptor.Apellido
			});
			terminalFactory.getServicioList().then(function(data) {
				vm.Servicios = data.GetServicioListResult;
				vm.Servicios.forEach(function(entry, index) {
					if (entry.IdServicio == vm.terminal.IdServicio) {
						vm.Servicio = vm.Servicios[index];
					}
				});
			});
			vm.ListaStatus.forEach(function(entry, index) {
				if (entry.clave == vm.terminal.Estatus) {
					vm.Status = vm.ListaStatus[index];
				}
			});
			var date = vm.terminal.FechaAlta.replace(/[^0-9\.]+/g, '');
			var pattern = /(\d{2})(\d{2})(\d{4})/;
			date = new Date(date.replace(pattern, '$2/$1/$3'));
			vm.FechaAlta = date;
			vm.Comentarios = vm.terminal.Comentarios;
		});
	}

	function BuscaSuscriptor() {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalBusquedaSuscriptor.html',
			controller: 'ModalBusquedaSuscriptorCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}

	function BuscaLatLong() {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalGetLatLong.html',
			controller: 'ModalGetLatLongCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}
	$rootScope.$on('cliente_seleccionado', function(e, detalle) {
		vm.IdSuscriptor = detalle.IdSuscriptor;
		vm.NombreSuscriptor = detalle.Nombre + '' + detalle.Apellido;
	});

	$rootScope.$on('get_LatLong', function(e, detalle) {
		vm.Latitud = detalle[0];
		vm.Longuitud = detalle[1];
	});

	function EditaTerminal() {
		var obj = {
			'objTerminal': {
				'SAN': vm.terminal.SAN,
				'IdSuscriptor': vm.IdSuscriptor,
				'IdServicio': vm.Servicio.IdServicio,
				'Latitud': vm.Latitud,
				'Longitud': vm.Longuitud,
				'Estatus': vm.Status.clave,
				'FechaAlta': vm.FechaAlta,
				'FechaSuspension': '',
				'ESN': vm.ESN,
				'Comentarios': vm.Comentarios
			}
		};
		console.log(obj);
		terminalFactory.updateTerminal(obj).then(function(data) {
			ngNotify.set('La terminal se ha actualizado correctamente', 'success');
			$state.go('home.provision.terminales');
		});
	}




	var vm = this;
	vm.titulo = "Edita Terminal";
	vm.BuscaSuscriptor = BuscaSuscriptor;
	vm.BuscaLatLong = BuscaLatLong;
	vm.GuardaTerminal = EditaTerminal;
	vm.ListaStatus = [{
			'clave': 'A',
			'Nombre': 'Activo'
		},
		{
			'clave': 'S',
			'Nombre': 'Supendido'
		},
		{
			'clave': 'B',
			'Nombre': 'Baja'
		},
		{
			'clave': 'C',
			'Nombre': 'Cancelado'
		}
	];
}
