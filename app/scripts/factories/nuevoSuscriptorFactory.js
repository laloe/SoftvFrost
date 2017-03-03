'use strict';
angular.module('softvFrostApp')
	.factory('nuevoSuscriptorFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addSuscriptor: '/Suscriptor/AddSuscriptor',
			getEstados: '/Estado/GetEstadoList',
			getSuscriptor: '/Suscriptor/GetSuscriptor',
			updateSuscriptor: '/Suscriptor/UpdateSuscriptor'
		};

		factory.getEstados = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getEstados, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.updateSuscriptor = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objSuscriptor': {
					'IdSuscriptor': obj.id,
					'IdEstado': obj.estado,
					'Nombre': obj.nombre,
					'Apellido': obj.apellidos,
					'Telefono': obj.telefono,
					'Email': obj.email,
					'CP': obj.cp,
					'Calle': obj.calle,
					'Numero': obj.numero,
					'Colonia': obj.colonia,
					'Ciudad': obj.ciudad,
					'Referencia': obj.referencia,
					'FechaAlta': ''
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.updateSuscriptor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getSuscriptor = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSuscriptor': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getSuscriptor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.addSuscriptor = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objSuscriptor': {
					'IdEstado': obj.IdEstado,
					'Nombre': obj.nombre,
					'Apellido': obj.apellidos,
					'Telefono': obj.telefono,
					'Email': obj.email,
					'CP': obj.cp,
					'Calle': obj.calle,
					'Numero': obj.numero,
					'Colonia': obj.colonia,
					'Ciudad': obj.ciudad,
					'Referencia': obj.referencia,
					'FechaAlta': ''
				}

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addSuscriptor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;
	});
