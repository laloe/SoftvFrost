'use strict';
angular.module('softvFrostApp')
  .factory('usuarioFactory', function($http, $q, $window, globalService, $localStorage) {
    var factory = {};
    var paths = {
      getUsuarioList: '/Usuario/GetUsuarioList',
      AddUsuario: '/Usuario/AddUsuario',
      UpdateUsuario: '/Usuario/UpdateUsuario',
    };

    factory.getUsuarioList = function() {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.getUsuarioList, config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    factory.AddUsuario = function(object) {
      var deferred = $q.defer();
      var Parametros = {

        'objUsuario': {
          'IdRol': object.IdRol,
          'Nombre': object.Nombre,
          'Email': object.Email,
          'Usuario': object.Usuario,
          'Password': object.Password
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddUsuario, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;

    };
    factory.UpdateUsuario = function(object) {
      var deferred = $q.defer();
      var Parametros = {

        'objUsuario': {
          'IdUsuario': object.IdUsuario,
          'IdRol': object.IdRol,
          'Nombre': object.Nombre,
          'Email': object.Email,
          'Usuario': object.Usuario,
          'Password': object.Password
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.UpdateUsuario, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;

    }

    return factory;
  });
