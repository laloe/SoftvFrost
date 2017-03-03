'use strict';
angular.module('softvFrostApp')
  .factory('rolFactory', function($http, $q, $window, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetRoleList: '/Role/GetRoleList',
      AddRole: '/Role/AddRole',
      UpdateRole: '/Role/UpdateRole',
    };

    factory.GetRoleList = function() {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetRoleList, config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    }


    factory.AddRole = function(object) {
      var deferred = $q.defer();
      var Parametros = {
        'objRole': {
          'Nombre': object.Nombre,
          'Descripcion': object.Descripcion,
          "Estado": object.Estado

        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddRole, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;

    }

    factory.UpdateRole = function(object) {
      var deferred = $q.defer();
      var Parametros = {
        'objRole': {
          'IdRol': object.IdRol,
          'Nombre': object.Nombre,
          'Descripcion': object.Descripcion,
          "Estado": object.Estado

        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.UpdateRole, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;

    }

    return factory;
  });
