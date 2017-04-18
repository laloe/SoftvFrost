'use strict';
angular
  .module('softvFrostApp')
  .controller('MapaTerminalesCtrl', ModalGetLatLongCtrl);

function ModalGetLatLongCtrl(SuscriptorFactory, $rootScope, ngNotify, NgMap, mapaBeamFactory, globalService) {
  this.$onInit = function () {

    mapaBeamFactory.GetBeamList().then(function (data) {
      console.log(data);
      vm.Beams=data.GetBeamListResult;     
      vm.UrlBeam = globalService.getUrlBeams() + data.GetBeamListResult[1].FilePath;
       console.log( vm.UrlBeam );
    });

    NgMap.getMap().then(function (map) {
      vm.map = map;
      google.maps.event.trigger(vm.map, 'resize');
    });
  }

 

  function DetalleBeam(obj){
     vm.UrlBeam = globalService.getUrlBeams() + obj.FilePath;
     google.maps.event.trigger(vm.map, 'resize');
  }
  var vm = this;
  vm.DetalleBeam=DetalleBeam;
 
 


}
