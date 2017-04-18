'use strict';
angular.module('softvFrostApp').config(reportesConf);

function reportesConf($stateProvider) {
	var states = [{
			name: 'home.reportes',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.reportes.planta',
			data: {
				pageTitle: 'SOFTV | REPORTES PLANTA'				
			},
			url: '/reportes',
			templateUrl: 'views/reportes/reportesplanta.html',
			controller: 'Reportes_PlantaCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.tokens',
			data: {
				pageTitle: 'SOFTV | REPORTES TOKENS'				
			},
			url: '/reportes',
			templateUrl: 'views/reportes/reportestokens.html',
			controller: 'Reportes_TokenCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.detalleTerminales',
			data: {
				pageTitle: 'SOFTV | REPORTES DETALLE TERMINALES'				
			},
			url: '/reportes',
			templateUrl: 'views/reportes/reportesdetalleterm.html',
			controller: 'Reportes_DetalleCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.migraciones',
			data: {
				pageTitle: 'SOFTV | REPORTES MIGRACIONES'				
			},
			url: '/reportes',
			templateUrl: 'views/reportes/reportesmigraciones.html',
			controller: 'Reportes_MigracionCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.movimientos',
			data: {
				pageTitle: 'SOFTV | REPORTES MOVIMIENTOS'				
			},
			url: '/reportes',
			templateUrl: 'views/reportes/reportesmovimientos.html',
			controller: 'Reportes_MovimientoCtrl',
			controllerAs: '$ctrl'
		}
		 /*, 
		{
			name: 'home.provision.editarol',
			data: {
				pageTitle: 'SOFTV | EDITA ROL',
				permissions: {
					only: ['rolesUpdate'],
					options: {
						reload: true
					}
				}
			},
			params: {
				obj: null
			},
			url: '/provision/rol/Edita/',
			templateUrl: 'views/configuracion/NuevoRol.html',
			controller: 'EditaRolCtrl',
			controllerAs: '$ctrl'
		}*/
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
