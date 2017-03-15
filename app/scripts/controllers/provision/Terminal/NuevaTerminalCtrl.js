'use strict';
angular.module('softvFrostApp').controller('NuevaTerminalCtrl', NuevaTerminalCtrl);

function NuevaTerminalCtrl(terminalFactory, $uibModal, $rootScope, ngNotify, $state) {
	this.$onInit = function() {
		terminalFactory.getServicioList().then(function(data) {
			vm.Servicios = data.GetServicioListResult;
		});
	}

	function BuscaSuscriptor() {
		var modalInstance = $uibModal.open({
			animation: true,
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
		var obj = {
			lat: 23.96617587126503,
			long: -101.953125
		};
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalGetLatLong.html',
			controller: 'ModalGetLatLongCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg',
			resolve: {
				datosGis: function() {
					return obj;
				}
			}
		});
	}
	$rootScope.$on('cliente_seleccionado', function(e, detalle) {
		vm.IdSuscriptor = detalle.IdSuscriptor;
		vm.NombreSuscriptor = detalle.Nombre + ' ' + detalle.Apellido;
	});

	$rootScope.$on('get_LatLong', function(e, detalle) {
		vm.Latitud = detalle[0];
		vm.Longuitud = detalle[1];
	});

	function GuardaTerminal() {
		if (vm.IdSuscriptor == null || vm.IdSuscriptor == undefined) {
			ngNotify.set('No se ha definido un suscriptor para la terminal', 'error');
			return;
		}

		var parametros = {
			'IdSuscriptor': vm.IdSuscriptor,
			'IdServicio': vm.Servicio.IdServicio,
			'Latitud': vm.Latitud,
			'Longitud': vm.Longuitud,
			'Estatus': vm.Status.clave,
			'FechaAlta': vm.FechaAlta,
			'FechaSuspension': '',
			'ESN': vm.ESN,
			'Comentarios': vm.Comentarios
		};
		terminalFactory.GuardaTerminal(parametros).then(function(data) {
			ngNotify.set('La terminal se ha guardado correctamente', 'success');
			$state.go('home.provision.terminales');
		});
	}




	var vm = this;
	vm.titulo = 'Nueva Terminal';
	vm.BuscaSuscriptor = BuscaSuscriptor;
	vm.BuscaLatLong = BuscaLatLong;
	vm.GuardaTerminal = GuardaTerminal;
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
