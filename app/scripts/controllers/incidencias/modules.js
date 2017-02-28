'use strict';
angular.module('softvFrostApp').config(incidendiasConf);

function incidendiasConf($stateProvider) {
	var states = [{
			name: 'home.incidencias',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.incidencias.registro',
			data: {
				pageTitle: 'SOFTV | REGISTRO',
			},
			url: '/incidencias/registro',
			templateUrl: 'views/incidencias/registro.html',
			controller: 'RegistroCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.incidencias.bandeja',
			data: {
				pageTitle: 'SOFTV | BANDEJA',
			},
			url: '/incidencias/bandeja',
			templateUrl: 'views/incidencias/bandeja.html',
			controller: 'BandejaCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.incidencias.registroSistema',
			data: {
				pageTitle: 'SOFTV | REGISTRO TICKETS',
			},
			url: '/incidencias/registroSistema',
			templateUrl: 'views/incidencias/registroSistema.html',
			controller: 'RegistroSistemaCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
