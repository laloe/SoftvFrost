'use strict';
angular.module('softvFrostApp').controller('NuevoSuscriptorCtrl', NuevoSuscriptorCtrl);

function NuevoSuscriptorCtrl(nuevoSuscriptorFactory, ngNotify, $state) {

	this.$onInit = function() {
		nuevoSuscriptorFactory.getEstados().then(function(data) {
			vm.estados = data.GetEstadoListResult;
		});
	}

	function guardar() {
		var susc = {
			nombre: vm.nombre,
			apellidos: vm.apellidos,
			telefono: vm.telefono,
			email: vm.email,
			cp: vm.cp,
			calle: vm.calle,
			numero: vm.numero,
			colonia: vm.colonia,
			ciudad: vm.ciudad,
			referencia: vm.referencia,
			IdEstado: vm.estado.IdEstado
		};
		nuevoSuscriptorFactory.addSuscriptor(susc).then(function(data) {
			if (data.AddSuscriptorResult > 0) {
				ngNotify.set('Suscriptor agregado correctamente.', 'success');
				$state.go('home.provision.suscriptores');
			} else {
				ngNotify.set('Error al agregar el suscriptor.', 'error');
			}
		});
	}

	var vm = this;
	vm.guardar = guardar;
	vm.email = '';
	vm.referencia = '';
}
