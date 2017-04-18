'use strict';
angular.module('softvFrostApp')
	.factory('mapaBeamFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetBeamList: '/Terminal/GetBeamList',
		
		};
		factory.GetBeamList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetBeamList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;

	});
