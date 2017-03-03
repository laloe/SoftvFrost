'use strict';

function DetalleTicketCtrl($uibModalInstance, $localStorage, ticket, incidenciasFactory, $filter, ngNotify, $state) {
    function initial() {
        vm.fecha = new Date();
        vm.showFirstTab = function(){
            angular.element('[data-target="#tab1"]').tab('show');
        }
        incidenciasFactory.getTicketDetalle(ticket).then(function(data) {
			vm.detalleTicket = data.GetDeepTicketResult;
            incidenciasFactory.getSintoma().then(function(data) {
    			vm.sintomas = data.GetSintomaListResult;
                // for (var i = 0; i < vm.sintomas.length; i++) {
                //     if (vm.sintomas[i].IdSintoma == vm.detalleTicket.IdSintoma) {
                //         vm.sintoma = vm.sintomas[i].Descripcion;
                //     }
                // }
                vm.sintomas.forEach(function(entry, index) {
                    if (entry.IdSintoma == vm.detalleTicket.IdSintoma) {
                        vm.sintoma = vm.sintomas[index].Descripcion;
                    }
                });
    		});
		});
        incidenciasFactory.getSolucion().then(function(data) {
			vm.solucion = data.GetSolucionTicketListResult;
		});
    }

    function ValidaArchivo() {
		var files = $("#inputFile2").get(0).files;
		incidenciasFactory.UpdateFile(files).then(function(data) {
			console.log(data);
		});
	}

    function avanceTicket() {
        console.log('avance');
    }

    function closeTicket() {
        vm.fechaCierre = new Date();
		vm.auxFecha = $filter('date')(vm.fechaCierre, 'yyyy/MM/dd HH:mm:ss');
		var closeTi = {
			ticket: ticket,
			fechaCierre: vm.auxFecha,
			solucion: vm.selectedSolucion.IdSolucion,
			causa: vm.causa,
			descripcionSolucion: vm.descripcionSolucion
		};
		incidenciasFactory.closeTicket(closeTi).then(function(data) {
			if (data.UpdateTicketResult > 0) {
				ngNotify.set('Ticket cerrado correctamente.', 'success');
				$state.go('home.incidencias.registro');
			} else {
				ngNotify.set('Error al cerrar Ticket.', 'error');
			}
		});
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

	var vm = this;
    vm.cancel = cancel
    vm.avanceTicket = avanceTicket;
    vm.closeTicket = closeTicket;
    vm.ValidaArchivo = ValidaArchivo;
    initial();
}

angular.module('softvFrostApp').controller('DetalleTicketCtrl', DetalleTicketCtrl);
