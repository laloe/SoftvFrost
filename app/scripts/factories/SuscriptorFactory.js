'use strict';
angular.module('softvFrostApp')
	.factory('SuscriptorFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getSuscriptorList: '/Suscriptor/GetSuscriptorList',
			getTerminals: '/Terminal/GetDeepIdSuscriptor',
			buscarSuscriptor: '/Suscriptor/GetFilterSuscriptorList'
		};

		factory.buscarSuscriptor = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarSuscriptor, JSON.stringify(obj), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		factory.getTerminals = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSuscriptor': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getTerminals, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};


		factory.getSuscriptorList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getSuscriptorList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};


		// factory.getSuscriptorList = function() {
		// 	var deferred = $q.defer();
		// 	var Parametros = {
		// 		'Id': 0,
		// 		'Codigo': 0
		// 	};
		// 	var config = {
		// 		headers: {
		// 			'Authorization': token
		// 		}
		// 	};
		// 	$http.post(globalService.getUrl() + paths.getSuscriptorList, JSON.stringify(Parametros), config).then(function(response) {
		//
		// 	}).catch(function(data) {
		// 		deferred.reject(data);
		// 	});
		//
		// 	return deferred.promise;
		// };


    return factory;
  });