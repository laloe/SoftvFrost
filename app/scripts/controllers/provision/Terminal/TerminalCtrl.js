'use strict';
angular.module('softvFrostApp').controller('TerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory) {
	this.$onInit = function() {
		terminalFactory.getTerminalList().then(function(data) {
			vm.terminales = data.GetTerminalListResult;
		});
	}
	var vm = this;
	vm.titulo = "Terminales";
}
