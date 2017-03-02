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
				permissions: {
					only: ['incidencias'],
					options: {
						reload: true
					}
				}
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
				permissions: {
					only: ['bandejadeticketsSelect'],
					options: {
						reload: true
					}
				}
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
				permissions: {
					only: ['registroticketsistemaSelect'],
					options: {
						reload: true
					}
				}
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
