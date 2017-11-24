'use strict';

/**
 * @ngdoc function
 * @name fbxApp.controller:NuevapracticasCtrl
 * @description
 * # NuevapracticasCtrl
 * Controller of the fbxApp
 */
angular.module('fbxApp')
  .controller('NuevapracticasCtrl', ['$scope','firebase','$state','fb',function ($scope,firebase,$state,fb) {

    $scope.createNewPractica=function(nombre, descripcion,publico){
    console.log("createNewPractica");
    console.log(nombre);
    console.log(descripcion);
    console.log(publico);
    $scope.error=null;
        if(!nombre){
         $scope.error="Ingrese el monbre de la Practica"
        } else  if(!descripcion){
         $scope.error="Ingrese el descripcion de la Practica"
        }else  if(publico==undefined){
         $scope.error="Ingrese el monbre si es publico o Privada"
        } else{
            var userKey=fb.getUserKey();
            var propiedades={};
            propiedades.nombre=nombre;
            propiedades.descripcion=descripcion;
            propiedades.publico=publico;
            console.log("fb.getUser()");
            propiedades.usuarioCreador=fb.getUser();
            // propiedades.usuarioCreador=fb.getUser();
            var dropzones= {
                "A": [
                    {
                        "type": "container",
                        "id": 1,
                        "columns": []
                    }]
                };
            var model=angular.toJson(dropzones, true);

            fb.writePractica(userKey, model,propiedades)
        }

    };




  }]);
