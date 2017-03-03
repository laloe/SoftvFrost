'use strict';
angular.module('softvFrostApp').controller('RolesCtrl', RolesCtrl);

function RolesCtrl(rolFactory, $state) {

  function Init() {
    rolFactory.GetRoleList().then(function(data) {
      vm.Roles = data.GetRoleListResult;
    });
  }

  function EditaRol(x) {
    $state.go('home.provision.editarol', {
      obj: x
    });
  }
  var vm = this;
  Init();
  vm.EditaRol = EditaRol;
}
