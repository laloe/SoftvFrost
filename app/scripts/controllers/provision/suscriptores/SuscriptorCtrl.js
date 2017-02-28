'use strict';
angular.module('softvFrostApp').controller('SuscriptorCtrl', SuscriptorCtrl);

function SuscriptorCtrl(SuscriptorFactory) {

	function Init() {
		SuscriptorFactory.getSuscriptorList().then(function(data) {
			console.log(data);
		});
	}

	function DetalleSuscriptor(object) {
		alert('detalle');
	}

	function DetalleTerminales() {
		alert('terminales');
	}

	function DetalleMovimientos() {
		alert('Movimientos');
	}


	var vm = this;
	Init();
	vm.DetalleSuscriptor = DetalleSuscriptor;
	vm.DetalleTerminales = DetalleTerminales;
	vm.DetalleMovimientos = DetalleMovimientos;
	vm.hola = 'adsasdas';
}
