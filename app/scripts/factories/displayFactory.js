'use strict';
angular
	.module('softvFrostApp')
	.factory('displayFactory', function ($http, $q, globalService) {
		var factory = {};
		var paths = {
			speedTest: '/HuguesRequest/TestMethod',
		};

		factory.speed = function (token, san) {
			var deferred = $q.defer();
			var Parametros = {
				'loginuuid': token,
				'san': san,
				'command': 'TDD_STR',
				'operator_id': 'televera'
			};
			$http.post(globalService.getUrlHughesMonitoreo() + paths.speedTest, JSON.stringify(Parametros)).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		factory.displaySpeed = function (token, san) {
			var deferred = $q.defer();
			var Parametros = {
				'loginuuid': token,
				'san': san,
				'command': 'TDD',
				'operator_id': 'televera'
			};
			$http.post(globalService.getUrlHughesMonitoreo() + paths.speedTest, JSON.stringify(Parametros)).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		return factory;
	});
