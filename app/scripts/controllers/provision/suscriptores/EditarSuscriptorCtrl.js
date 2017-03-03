'use strict';

function EditarSuscriptorCtrl(nuevoSuscriptorFactory, ngNotify, $state, $stateParams) {
	this.$onInit = function() {
		nuevoSuscriptorFactory.getSuscriptor($stateParams.id).then(function(data) {
			vm.suscriptor = data.GetSuscriptorResult;
			nuevoSuscriptorFactory.getEstados().then(function(estados) {
				vm.estados = estados.GetEstadoListResult;
				vm.estados.forEach(function(entry, index) {
					if (entry.IdEstado == vm.suscriptor.IdEstado) {
						vm.estado = vm.estados[index];
					}
				});
			});

			if (vm.suscriptor.Telefono) {
				vm.telefono = parseInt(vm.suscriptor.Telefono);
			}
		});
	}

	function guardar() {
		var sus = {
			id: vm.suscriptor.IdSuscriptor,
			estado: vm.estado.IdEstado,
			nombre: vm.suscriptor.Nombre,
			apellidos: vm.suscriptor.Apellido,
			telefono: vm.suscriptor.Telefono,
			email: vm.suscriptor.Email,
			cp: vm.suscriptor.CP,
			calle: vm.suscriptor.Calle,
			numero: vm.suscriptor.Numero,
			colonia: vm.suscriptor.Colonia,
			ciudad: vm.suscriptor.Ciudad,
			referencia: vm.suscriptor.Referencia
		};
		nuevoSuscriptorFactory.updateSuscriptor(sus).then(function(data) {
			$state.go('home.provision.suscriptores');
			ngNotify.set('Suscriptor actualizado correctamente.', 'success');
		});
	}

	var vm = this;
	vm.guardar = guardar;
}
angular.module('softvFrostApp').controller('EditarSuscriptorCtrl', EditarSuscriptorCtrl);
