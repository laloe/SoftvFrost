'use strict';

function RegistroCtrl(ngNotify, incidenciasFactory, $state, $filter) {
	function initial() {
		incidenciasFactory.getMotivo().then(function(data) {
			data.GetMotivoTicketListResult.unshift({
				'Descripcion': 'Seleccione motivo',
				'IdMotivoTicket': 0
			});
			vm.motivo = data.GetMotivoTicketListResult;
			vm.selectedMotivo = vm.motivo[0];
		});
		incidenciasFactory.getSintoma().then(function(data) {
			data.GetSintomaListResult.unshift({
				'Descripcion': 'Seleccione síntoma',
				'IdSintoma': 0
			});
			vm.sintoma = data.GetSintomaListResult;
			vm.selectedSintoma = vm.sintoma[0];
		});
		incidenciasFactory.getTipoContrato().then(function(data) {
			data.GetTipoContactoListResult.unshift({
				'Nombre': 'Seleccione tipo contacto',
				'IdTipoContacto': 0
			});
			vm.tipoContacto = data.GetTipoContactoListResult;
			vm.selectedTipoContacto = vm.tipoContacto[0];
		});
		incidenciasFactory.getMedio().then(function(data) {
			data.GetMedioComunicacionListResult.unshift({
				'Nombre': 'Seleccione medio de comunicación',
				'IdMedioComunicacion': 0
			});
			vm.medioComun = data.GetMedioComunicacionListResult;
			vm.selectedMedioComun = vm.medioComun[0];
		});
	}

	function guardar() {
		if (vm.san == undefined) {
			ngNotify.set('Inserte todos los campos para generar el ticket.', 'error');
		}else {
			vm.auxFecha = $filter('date')(vm.fechaRegistro, 'yyyy/MM/dd');
			var addTi = {
				san: vm.san,
				fecha: vm.auxFecha,
				sintoma: vm.selectedSintoma.IdSintoma,
				motivo: vm.selectedMotivo.IdMotivoTicket,
				prioridad: vm.prioridad,
				descripcion: vm.descripcion,
				tipoContacto: vm.selectedTipoContacto.IdTipoContacto,
				nombreContacto: vm.nombreContacto,
				medioComun: vm.selectedMedioComun.IdMedioComunicacion,
				numeroContacto: vm.numeroContacto
			};
			incidenciasFactory.addTicket(addTi).then(function(data) {
				console.log(data);
				if (data.AddTicketResult > 0) {
					ngNotify.set('Suscriptor agregado correctamente.', 'success');
					$state.go('home.incidencias.registro');
				} else {
					ngNotify.set('Error al agregar el suscriptor.', 'error');
				}
			});
		}
	}

	function getTerminal() {
		if (vm.san == undefined) {
			ngNotify.set('Inserte número de terminal.', 'error');
		}else {
			incidenciasFactory.getTerminal(vm.san).then(function(data) {
				if (data.GetByTerminalResult == null) {
					vm.busqueda = false;
					ngNotify.set('No se encontro registro.', 'error');
				}else {
					vm.busqueda = true;
					vm.terminalDatos = data.GetByTerminalResult;
				}
			});
		}
	}

	function limpiar() {
		vm.san = '';
		vm.motivo = '';
		vm.sintoma = '';
		vm.tipoContacto = '';
		vm.medioComun = '';
		vm.prioridad = '';
		vm.nombreContacto = '';
		vm.numeroContacto = '';
		vm.descripcion = '';
		vm.busqueda = false;
		initial();
	}

	var vm = this;
	vm.guardar = guardar;
	vm.limpiar = limpiar;
	vm.getTerminal = getTerminal;
	vm.fechaRegistro = new Date();
	initial();
}
angular.module('softvFrostApp').controller('RegistroCtrl', RegistroCtrl);
