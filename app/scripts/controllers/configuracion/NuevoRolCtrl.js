'use strict';
angular.module('softvFrostApp').controller('NuevoRolCtrl', NuevoRolCtrl);

function NuevoRolCtrl(usuarioFactory, rolFactory, $state, ngNotify) {

  function init() {

  };

  function GuardarRol() {
    var obj = {};
    obj.Nombre = vm.Nombre;
    obj.Descripcion = vm.Descripcion;
    obj.Estado = vm.Estatus;
    rolFactory.AddRole(obj).then(function(data) {
      $state.go('home.provision.roles');
      ngNotify.set('Rol agregado correctamente.', 'success');
    });
  }
  var vm = this;
  init();
  vm.Estatus = false;
  vm.GuardarRol = GuardarRol;
  vm.titulo = 'Nuevo Rol';
}
