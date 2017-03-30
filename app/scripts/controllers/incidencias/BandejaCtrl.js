'use strict';

function BandejaCtrl($uibModal,incidenciasFactory, $scope) {
	function initial() {
		incidenciasFactory.getTickets().then(function(data) {
			vm.tickets = data.GetTicketListResult;
		});
	}

	function verDetalle(ticket) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/incidencias/modalDetalleTicket.html',
			controller: 'DetalleTicketCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg',
			resolve: {
				ticket: function() {
					return ticket;
				}
			}
		});
	}

	$scope.exportAction = function(){ 
		switch($scope.export_action){ 
			case 'pdf': $scope.$broadcast('export-pdf', {}); 
						break; 
			case 'excel': $scope.$broadcast('export-excel', {}); 
						break; 
			case 'doc': $scope.$broadcast('export-doc', {});
						break; 
			default: console.log('no event caught'); 
		}
	}

	var vm = this;
	vm.verDetalle = verDetalle;
	initial();
}

angular.module('softvFrostApp').controller('BandejaCtrl', BandejaCtrl);
