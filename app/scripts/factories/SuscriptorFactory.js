'use strict';
angular.module('softvApp')
  .factory('SuscriptorFactory', function($http, $q, $window, globalService, $localStorage, $location) {
      var factory = {};
      var paths = {
        getSuscriptorList: '/Suscriptor/GetSuscriptorList'
      };
      factory.getSuscriptorList = function() {
        var deferred = $q.defer();
        var config = {
          headers: {
            'Authorization': ''
          }
        };
        $http.get(globalService.getUrl() + paths.getSuscriptorList, config).then(function(response) {

        }).catch(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;


      });


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