'use strict';
angular.module('softvFrostApp').config(provisionConf);

function provisionConf($stateProvider) {
	var states = [{
			name: 'home.provision',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.provision.suscriptores',
			data: {
				pageTitle: 'SOFTV | SUSCRIPTORES',
			},
			url: '/provision/suscriptores',
			templateUrl: 'views/provision/suscriptores.html',
			controller: 'SuscriptorCtrl',
			controllerAs: '$ctrl'
		}, {
			name: 'home.provision.terminales',
			data: {
				pageTitle: 'SOFTV | Terminales',
			},
			url: '/provision/terminales',
			templateUrl: 'views/provision/Terminales.html',
			controller: 'TerminalCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.provision.terminalesgestion',
			data: {
				pageTitle: 'SOFTV | Gestionar Terminal',
			},
			url: '/provision/terminales/gestion',
			templateUrl: 'views/provision/GestionTerminales.html',
			controller: 'TerminalGestionCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.provision.terminalesmovimientos',
			data: {
				pageTitle: 'SOFTV | Terminales',
			},
			url: '/provision/terminales/movimientos',
			templateUrl: 'views/provision/MovimientosTerminales.html',
			controller: 'TerminalMovimientosCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.provision.suscriptoresNuevo',
			data: {
				pageTitle: 'SOFTV | NUEVO SUSCRIPTOR',
			},
			url: '/provision/nuevo/suscriptor',
			templateUrl: 'views/provision/nuevoSuscriptor.html',
			controller: 'NuevoSuscriptorCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
