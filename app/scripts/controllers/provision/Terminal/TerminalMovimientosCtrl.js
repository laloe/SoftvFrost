'use strict';
angular.module('softvFrostApp').controller('TerminalMovimientosCtrl', TerminalMovimientosCtrl);

function TerminalMovimientosCtrl($uibModalInstance, $uibModal, terminal, terminalFactory) {
	var vm = this;
	vm.Terminal = terminal;
	vm.cancel = cancel;
	vm.detalleMovimiento = detalleMovimiento;

	this.$onInit = function () {
		terminalFactory.getMovimientosBySan(terminal.SAN).then(function (data) {
			vm.movimientos = data.GetMovimientoListBySANResult;
		});
	}

	function detalleMovimiento(movimiento) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/detalleMovimiento.html',
			controller: 'DetalleMovimientoCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				movimiento: function () {
					return movimiento;
				}
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
