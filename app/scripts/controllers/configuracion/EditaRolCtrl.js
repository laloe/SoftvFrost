'use strict';
angular.module('softvFrostApp').controller('EditaRolCtrl', EditaRolCtrl);

function EditaRolCtrl(usuarioFactory, rolFactory, $state, ngNotify, $stateParams) {

  function init() {
    var Rol = $stateParams.obj;
    console.log(Rol);
    vm.Estatus = Rol.Estado;
    vm.Nombre = Rol.Nombre;
    vm.Descripcion = Rol.Descripcion;
    vm.IdRol = Rol.IdRol;

  };

  function GuardarRol() {
    var obj = {};

    obj.IdRol = vm.IdRol
    obj.Nombre = vm.Nombre;
    obj.Descripcion = vm.Descripcion;
    obj.Estado = vm.Estatus;
    rolFactory.UpdateRole(obj).then(function(data) {
      $state.go('home.provision.roles');
      ngNotify.set('Rol editado correctamente.', 'success');
    });
  }
  var vm = this;
  vm.titulo = 'Edita Rol';
  init();
  vm.GuardarRol = GuardarRol;
}
