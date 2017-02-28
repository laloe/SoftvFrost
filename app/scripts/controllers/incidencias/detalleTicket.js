'use strict';

function DetalleTicketCtrl($uibModalInstance, $localStorage, ticket, incidenciasFactory, $filter, ngNotify, $state) {
    function initial() {
        vm.fecha = new Date();
        vm.showFirstTab = function(){
            angular.element('[data-target="#tab1"]').tab('show');
        }
        incidenciasFactory.getTicketDetalle(ticket).then(function(data) {
			vm.detalleTicket = data.GetDeepTicketResult;
		});
        incidenciasFactory.getSintoma().then(function(data) {
			vm.sintomas = data.GetSintomaListResult;
            console.log(vm.sintomas);
            // for (var i = 0; i < vm.sintomas.length; i++) {
            //     if (vm.sintomas[i].IdSintoma == vm.detalleTicket.IdSintoma) {
            //         vm.sintoma = vm.sintomas[i].Descripcion;
            //         console.log(vm.sintoma);
            //     }
            // }
            vm.sintomas.forEach(function(entry, index) {
                if (entry.IdSintoma == vm.detalleTicket.IdSintoma) {
                    vm.sintoma = vm.sintomas[index];
                }
            });
		});
        incidenciasFactory.getSolucion().then(function(data) {
			data.GetSolucionTicketListResult.unshift({
				'Descripcion': 'Seleccione solución',
				'IdSolucion': 0
			});
			vm.solucion = data.GetSolucionTicketListResult;
			vm.selectedSolucion = vm.solucion[0];
		});
    }

    function closeTicket() {
        if (vm.selectedSolucion.IdSolucion == 0 || vm.descripcionSolucion == null || vm.descripcionSolucion == '' || vm.causa == '') {
			ngNotify.set('Inserte todos los campos para cerrar el ticket.', 'error');
		}else {
			vm.auxFecha = $filter('date')(vm.fechaCierre, 'yyyy/MM/dd');
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
    }

    function enviar() {
        var file = vm.imagen;
        var fd = new FormData();
        fd.append('file', file);
        $http.post('post.php', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
            })
            .success(function(response){
                //Guardamos la url de la imagen y hacemos que la muestre.
                vm.imagen = response;
                vm.img = true;
            })
            .error(function(response){

        });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

	var vm = this;
    vm.cancel = cancel
    vm.usuario = $localStorage.currentUser.usuario;
    vm.closeTicket = closeTicket;
    vm.enviar = enviar;
    vm.fechaCierre = new Date();

    initial();
}

angular.module('softvFrostApp').controller('DetalleTicketCtrl', DetalleTicketCtrl);
