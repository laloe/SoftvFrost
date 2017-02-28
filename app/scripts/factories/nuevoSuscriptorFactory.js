'use strict';
angular.module('softvFrostApp')
	.factory('nuevoSuscriptorFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addSuscriptor: '/Suscriptor/AddSuscriptor'
		};
		factory.addSuscriptor = function() {
			var deferred = $q.defer();
			var Parametros = {
				'Apellido': 'APELLIDO SUSCRIPTOR 2',
				'CP': '20580',
				'Calle': 'calle 2',
				'Ciudad': 'ciudad2',
				'Colonia': 'colonia 2',
				'Email': 'email@email.com',
				'Estado': 1,
				'FechaAlta': 1,
				'IdEstado': 1,
				'IdSuscriptor': 4,
				'Nombre': 'SUSCRIPTOR 2',
				'Numero': '25',
				'Referencia': 'sin ref',
				'Telefono': '4651258989',
				'Terminal': 1
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addSuscriptor, JSON.stringify(Parametros), config).then(function(response) {

			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		return factory;
	});
