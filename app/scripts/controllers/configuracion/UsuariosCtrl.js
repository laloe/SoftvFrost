'use strict';
angular.module('softvFrostApp').controller('UsuariosCtrl', UsuariosCtrl);

function UsuariosCtrl(usuarioFactory, $state) {

  function Init() {
    usuarioFactory.getUsuarioList().then(function(data) {
      vm.Usuarios = data.GetUsuarioListResult;
    });
  }

  function EditaUsuario(x) {

    $state.go('home.provision.editausuario', {
      obj: x
    });
  }

  var vm = this;
  Init();
  vm.EditaUsuario = EditaUsuario;
}
