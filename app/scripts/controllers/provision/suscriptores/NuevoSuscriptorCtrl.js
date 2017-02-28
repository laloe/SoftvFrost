'use strict';

function NuevoSuscriptorCtrl(nuevoSuscriptorFactory) {
	function cancel() {
		nuevoSuscriptorFactory.addSuscriptor().then(function(data) {
			console.log(data);
		});
	}

	var vm = this;
	vm.cancel = cancel;
}
angular.module('softvFrostApp').controller('NuevoSuscriptorCtrl', NuevoSuscriptorCtrl);
