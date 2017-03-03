'use strict';
angular.module('softvFrostApp').controller('EditaUsuarioCtrl', EditaUsuarioCtrl);

function EditaUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify, $stateParams) {

  function init() {
    var user = $stateParams.obj;
    console.log(user);
    vm.Id = user.IdUsuario;
    rolFactory.GetRoleList().then(function(data) {
      vm.Roles = data.GetRoleListResult;
      for (var a = 0; a < vm.Roles.length; a++) {
        if (vm.Roles[a].IdRol == user.IdRol) {
          vm.Rol = vm.Roles[a];
        }
      }
      vm.Nombre = user.Nombre;
      vm.Correo = user.Email;
      vm.Descripcion = user.Usuario;
      vm.Password = user.Password;
      vm.Contrasena = user.Password;

    });
  };

  function GuardarUsuario() {
    alert('this');
    if (vm.Contrasena === vm.Contrasena2) {
      var obj = {};
      obj.IdUsuario = vm.Id;
      obj.IdRol = vm.Rol.IdRol;
      obj.Nombre = vm.Nombre;
      obj.Email = vm.Correo;
      obj.Usuario = vm.Descripcion;
      obj.Password = vm.Contrasena;

      usuarioFactory.UpdateUsuario(obj).then(function(data) {
        $state.go('home.provision.usuarios');
        ngNotify.set('Usuario Editado correctamente.', 'success');
      });
    } else {
      ngNotify.set('Las contraseña no coincide.', 'error');
    }

  }

  function ValidaPass() {
    if (vm.PassValidate === vm.Password) {
      vm.ValidatePanel = false;
      vm.passwordPanel = true;
      ngNotify.set('Contraseña válida', 'grimace');
    } else {
      ngNotify.set('Contraseña no es  válida', 'error');
    }
  }


  var vm = this;
  vm.titulo = 'Edita usuario';
  vm.passwordPanel = false;
  vm.ValidatePanel = true;
  init();
  vm.ValidaPass = ValidaPass;
  vm.GuardarUsuario = GuardarUsuario;

}
